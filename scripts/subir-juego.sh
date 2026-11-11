#!/bin/bash
# Exporta la versión web desde Godot (~/pokemon-tcg) y la publica en
# play.neotcg.cl (bucket R2 neotcg-game).
# Uso: npm run subir-juego
set -e

ORIGEN="/Users/mouzeh/Ejecutable TCG NEO/Web"
DESTINO="$(cd "$(dirname "$0")/.." && pwd)/public/game"
URL="https://play.neotcg.cl"
PROYECTO="/Users/mouzeh/pokemon-tcg"
GODOT="/Users/mouzeh/Downloads/Godot.app/Contents/MacOS/Godot"

# Lo publicado debe corresponder a un commit: no se sube con cambios sin guardar
# en el cliente (los archivos sueltos que no están en git no cuentan).
# Para saltarse el chequeo: SIN_CHEQUEO=1 npm run subir-juego
if [ -z "$SIN_CHEQUEO" ] && [ -n "$(git -C "$PROYECTO" status --porcelain --untracked-files=no)" ]; then
  echo "⛔ El cliente tiene cambios sin commit:"
  git -C "$PROYECTO" status --short --untracked-files=no
  echo "   Haz commit (o usa SIN_CHEQUEO=1 npm run subir-juego) y vuelve a intentar."
  exit 1
fi

if [ ! -x "$GODOT" ]; then
  echo "⛔ No encuentro Godot en $GODOT (edita GODOT en este script)."
  exit 1
fi

echo "🛠  Exportando versión web desde Godot ($(git -C "$PROYECTO" log -1 --format='%h %s'))..."
EXPORT_LOG="$(mktemp)"
MARCA="$(mktemp)"   # se crea antes de exportar: el .pck tiene que quedar más nuevo
if ! "$GODOT" --headless --path "$PROYECTO" --export-release "Web" >"$EXPORT_LOG" 2>&1; then
  tail -20 "$EXPORT_LOG"
  echo "⛔ Falló la exportación de Godot (log completo: $EXPORT_LOG)."
  exit 1
fi
# Godot puede terminar con código 0 aunque no exporte: se confirma que el .pck es nuevo
if [ -z "$(find "$ORIGEN/NeoTcgMac.pck" -newer "$MARCA" 2>/dev/null)" ]; then
  tail -20 "$EXPORT_LOG"
  echo "⛔ La exportación no generó un NeoTcgMac.pck nuevo (log completo: $EXPORT_LOG)."
  exit 1
fi
rm -f "$EXPORT_LOG" "$MARCA"
echo "  ✓ Exportación lista"
echo ""

echo "📦 Copiando exportación desde $ORIGEN..."
cp "$ORIGEN"/NeoTcgMac.* "$DESTINO"/

echo "☁️  Subiendo a R2..."
node "$DESTINO/upload.cjs"

echo ""
echo "🔍 Verificando archivos publicados..."
cd "$ORIGEN"
fallos=0
for f in NeoTcgMac.*; do
  if [[ $f == *.html ]]; then
    # Cloudflare no entrega ETag para HTML: comparamos el contenido
    curl -s "$URL/$f" | cmp -s - "$f" && ok=1 || ok=0
  else
    remoto=$(curl -sI "$URL/$f" | grep -i '^etag' | tr -d '"\r' | awk '{print $2}')
    [ "$(md5 -q "$f")" = "$remoto" ] && ok=1 || ok=0
  fi
  if [ $ok = 1 ]; then echo "  ✓ $f"; else echo "  ✗ $f NO coincide"; fallos=$((fallos + 1)); fi
done

echo ""
if [ $fallos = 0 ]; then
  echo "🎮 Listo: todos los archivos están publicados en $URL/NeoTcgMac.html"
else
  echo "⚠️  $fallos archivo(s) no coinciden. Vuelve a correr el comando."
  exit 1
fi
