export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, downloads } = body

  // Verificar credenciales
  if (username !== 'Mouzeh' || password !== '$Rudy1997') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales incorrectas'
    })
  }

  // En un entorno real, aquí actualizarías una base de datos
  console.log('Enlaces actualizados:', downloads)

  return {
    success: true,
    message: 'Enlaces de descarga actualizados correctamente',
    downloads
  }
})