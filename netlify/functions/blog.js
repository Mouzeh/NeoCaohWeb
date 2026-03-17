// Simple in-memory storage (en producción usarías una base de datos)
let blogPosts = [
  {
    id: 1,
    title: 'Bienvenidos a NeoCaoh TCG Alpha',
    slug: 'bienvenidos-neocaoh-tcg-alpha',
    excerpt: 'Comenzamos esta increíble aventura en el mundo del TCG Pokémon con nuestra primera versión Alpha.',
    content: `# Bienvenidos a NeoCaoh TCG Alpha

¡Estamos emocionados de presentar la primera versión Alpha de NeoCaoh TCG!

## ¿Qué es NeoCaoh?

NeoCaoh es un simulador de Pokémon TCG desarrollado por y para la comunidad hispana. Nuestro objetivo es crear la mejor plataforma para jugar TCG Pokémon en español.

## Características de la Alpha

- Motor de juego básico funcional
- Más de 1000 cartas implementadas
- Modo de práctica contra IA
- Constructor de mazos básico

## Próximas actualizaciones

Estamos trabajando en:
- Modo multijugador online
- Más cartas de diferentes expansiones
- Mejor interfaz de usuario
- Sistema de rankings

¡Únete a nuestro Discord para estar al día con las últimas noticias!`,
    author: 'Mouzeh',
    publishedAt: '2024-03-13T00:00:00.000Z',
    featured: true,
    tags: ['alpha', 'lanzamiento', 'noticias']
  }
]

let nextId = 2

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
      // Obtener todos los posts
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ posts: blogPosts })
      }
    }

    if (event.httpMethod === 'POST') {
      const { username, password, post, action } = JSON.parse(event.body)

      // Verificar credenciales
      if (username !== 'Mouzeh' || password !== '$Rudy1997') {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Credenciales incorrectas' })
        }
      }

      if (action === 'create') {
        // Crear nuevo post
        if (!post.title || !post.content) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Título y contenido son requeridos' })
          }
        }

        const newPost = {
          id: nextId++,
          title: post.title,
          slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          excerpt: post.excerpt || post.content.substring(0, 150) + '...',
          content: post.content,
          author: 'Mouzeh',
          publishedAt: new Date().toISOString(),
          featured: post.featured || false,
          tags: post.tags ? post.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
        }

        blogPosts.unshift(newPost)

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Post creado correctamente',
            post: newPost
          })
        }
      }

      if (action === 'delete') {
        // Eliminar post
        const postId = parseInt(post.id)
        const initialLength = blogPosts.length
        blogPosts = blogPosts.filter(p => p.id !== postId)

        if (blogPosts.length === initialLength) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Post no encontrado' })
          }
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Post eliminado correctamente'
          })
        }
      }

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Acción no válida' })
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