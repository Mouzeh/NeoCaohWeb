// Variables globales para demo (en producción usar base de datos)
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

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, post, action } = body

  // Verificar credenciales
  if (username !== 'Mouzeh' || password !== '$Rudy1997') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales incorrectas'
    })
  }

  if (action === 'create') {
    // Crear nuevo post
    if (!post.title || !post.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Título y contenido son requeridos'
      })
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
      success: true,
      message: 'Post creado correctamente',
      post: newPost
    }
  }

  if (action === 'delete') {
    // Eliminar post
    const postId = parseInt(post.id)
    const initialLength = blogPosts.length
    blogPosts = blogPosts.filter(p => p.id !== postId)

    if (blogPosts.length === initialLength) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post no encontrado'
      })
    }

    return {
      success: true,
      message: 'Post eliminado correctamente'
    }
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Acción no válida'
  })
})