#!/bin/bash
# Publica la exportación web de Godot en play.neotcg.cl (bucket R2 neotcg-game).
# Uso: npm run subir-juego
set -e

ORIGEN="/Users/mouzeh/Ejecutable TCG NEO/Web"
DESTINO="$(cd "$(dirname "$0")/.." && pwd)/public/game"
URL="https://play.neotcg.cl"

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
