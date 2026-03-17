// Simple in-memory storage para demo
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

export default defineEventHandler(async (event) => {
  return { posts: blogPosts }
})