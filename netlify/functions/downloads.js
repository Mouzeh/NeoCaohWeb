exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    }
  }

  try {
    if (event.httpMethod === 'GET') {
      // Obtener enlaces de descarga
      const downloads = {
        windows: process.env.DOWNLOAD_WINDOWS || 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file',
        mac: process.env.DOWNLOAD_MAC || 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file',
        linux: process.env.DOWNLOAD_LINUX || 'https://www.mediafire.com/file/5orodrm1ey10oeb/NeoCaohTCG-windows-Alpha_-_v0.10.0..zip/file'
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ downloads })
      }
    }

    if (event.httpMethod === 'POST') {
      const { username, password, downloads } = JSON.parse(event.body)

      // Verificar credenciales
      if (username !== 'Mouzeh' || password !== '$Rudy1997') {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Credenciales incorrectas' })
        }
      }

      // En un entorno real, aquí actualizarías las variables de entorno
      // Por ahora, simulamos que se guardan correctamente
      console.log('Enlaces actualizados:', downloads)

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Enlaces de descarga actualizados correctamente',
          downloads
        })
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' })
    }

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    }
  }
}