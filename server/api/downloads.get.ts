export default defineEventHandler(async (event) => {
  // Obtener enlaces de descarga
  const downloads = {
    windows: 'https://www.mediafire.com/file/rvhehqy4azo2h1h/NeoTCG-windows-Alpha+-+v0.11.1..zip/file',
    mac: 'https://www.mediafire.com/file/z0jqyb42zary7a1/NEOTCG-macos-v011.1.zip/file',
    linux: 'https://www.mediafire.com/file/rvhehqy4azo2h1h/NeoTCG-windows-Alpha+-+v0.11.1..zip/file',
    version: 'v0.11.1 Alpha ~250 MB'
  }

  return { downloads }
})