<script setup lang="ts">
definePageMeta({
  layout: false,
});

const isAuthenticated = ref(false);
const loginForm = ref({
  username: "",
  password: "",
});
const loginError = ref("");
const loading = ref(false);

// Admin data
const adminData = ref({
  downloads: {
    windows: "",
    mac: "",
    linux: "",
    version: "",
  },
});

// Blog posts
const blogPosts = ref([]);

const newPost = ref({
  title: "",
  content: "",
  excerpt: "",
  tags: "",
  featured: false,
});

const activeTab = ref("downloads");

// --- Funciones Conectadas a la API (Vercel KV) ---

const loadDownloads = async () => {
  try {
    const saved = await $fetch("/api/downloads");
    if (saved) {
      adminData.value.downloads = saved;
    } else {
      adminData.value.downloads = {
        windows:
          "https://www.mediafire.com/file/rvhehqy4azo2h1h/NeoTCG-windows-Alpha+-+v0.11.1..zip/file",
        mac: "https://www.mediafire.com/file/z0jqyb42zary7a1/NEOTCG-macos-v011.1.zip/file",
        linux:
          "https://www.mediafire.com/file/rvhehqy4azo2h1h/NeoTCG-windows-Alpha+-+v0.11.1..zip/file",
        version: "v0.11.1 Alpha ~250 MB",
      };
    }
  } catch (error) {
    console.error("Error loading downloads:", error);
  }
};

const saveDownloads = async () => {
  loading.value = true;
  try {
    await $fetch("/api/downloads", {
      method: "POST",
      body: adminData.value.downloads,
    });
    alert("Enlaces de descarga guardados en la nube correctamente");
  } catch (error) {
    console.error("Error saving downloads:", error);
    alert("Error al guardar los enlaces");
  } finally {
    loading.value = false;
  }
};

const loadBlogPosts = async () => {
  try {
    const saved = await $fetch("/api/blog");
    if (saved && saved.length > 0) {
      // Formatear las fechas al cargar desde la base de datos
      blogPosts.value = saved.map((post) => ({
        ...post,
        publishedAt: new Date(post.publishedAt),
      }));
    } else {
      blogPosts.value = [];
    }
  } catch (error) {
    console.error("Error loading blog posts:", error);
  }
};

const createPost = async () => {
  if (!newPost.value.title || !newPost.value.content) {
    alert("Por favor completa al menos el título y contenido");
    return;
  }

  loading.value = true;
  try {
    const post = {
      id: Date.now(), // Usar Date.now() para un ID más seguro
      title: newPost.value.title,
      slug: newPost.value.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      excerpt:
        newPost.value.excerpt ||
        newPost.value.content.substring(0, 150) + "...",
      content: newPost.value.content,
      author: "Mouzeh",
      publishedAt: new Date().toISOString(), // Guardar la fecha como string para Redis
      featured: newPost.value.featured,
      tags: newPost.value.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    // Agregar al arreglo local
    blogPosts.value.unshift({
      ...post,
      publishedAt: new Date(post.publishedAt), // Mantenerlo como Date para el template
    });

    // Guardar todo el arreglo en Vercel KV
    const dataToSave = blogPosts.value.map((p) => ({
      ...p,
      publishedAt: p.publishedAt.toISOString(),
    }));

    await $fetch("/api/blog", {
      method: "POST",
      body: dataToSave,
    });

    // Limpiar formulario
    newPost.value = {
      title: "",
      content: "",
      excerpt: "",
      tags: "",
      featured: false,
    };

    alert("Post creado y guardado en la nube correctamente");
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Error al crear el post");
  } finally {
    loading.value = false;
  }
};

const deletePost = async (id) => {
  if (
    !confirm("¿Estás seguro de que quieres eliminar este post para siempre?")
  ) {
    return;
  }

  loading.value = true;
  try {
    // Eliminar del arreglo local
    blogPosts.value = blogPosts.value.filter((post) => post.id !== id);

    // Guardar el nuevo arreglo (sin el post) en Vercel KV
    const dataToSave = blogPosts.value.map((p) => ({
      ...p,
      publishedAt: p.publishedAt.toISOString(),
    }));

    await $fetch("/api/blog", {
      method: "POST",
      body: dataToSave,
    });

    alert("Post eliminado de la nube correctamente");
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Error al eliminar el post");
  } finally {
    loading.value = false;
  }
};

// Login function
const login = async () => {
  loading.value = true;
  try {
    if (
      loginForm.value.username === "Mouzeh" &&
      loginForm.value.password === "$Rudy1997"
    ) {
      isAuthenticated.value = true;
      loginError.value = "";

      // Cargar datos reales desde Vercel KV después de iniciar sesión
      await Promise.all([loadDownloads(), loadBlogPosts()]);
    } else {
      loginError.value = "Credenciales incorrectas";
      setTimeout(() => {
        loginError.value = "";
      }, 3000);
    }
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  isAuthenticated.value = false;
  loginForm.value = { username: "", password: "" };
  adminData.value.downloads = { windows: "", mac: "", linux: "", version: "" };
  blogPosts.value = [];
};
</script>

<template>
  <div class="min-h-screen bg-ink text-white">
    <div
      v-if="!isAuthenticated"
      class="min-h-screen flex items-center justify-center px-4"
    >
      <div class="max-w-md w-full">
        <div
          class="bg-gradient-to-br from-panel/80 to-ink2/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div class="text-center mb-8">
            <div
              class="w-20 h-20 bg-gradient-to-br from-lime/20 to-green/20 rounded-full flex items-center justify-center mx-auto mb-4 p-3"
            >
              <img
                src="/icons/celebi.png"
                alt="Celebi"
                class="w-full h-full object-contain"
              />
            </div>
            <h1 class="font-display font-extrabold text-2xl text-white mb-2">
              Panel Celebi
            </h1>
            <p class="text-muted text-sm">
              Acceso restringido - Solo administradores
            </p>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <div>
              <label
                for="username"
                class="block text-sm font-medium text-white mb-2"
                >Usuario</label
              >
              <input
                id="username"
                v-model="loginForm.username"
                type="text"
                required
                class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-white mb-2"
                >Contraseña</label
              >
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                required
                class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <div
              v-if="loginError"
              class="bg-scarlet/10 border border-scarlet/20 rounded-lg p-3"
            >
              <p class="text-scarlet text-sm">{{ loginError }}</p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full btn-primary"
            >
              <span v-if="loading">Iniciando sesión...</span>
              <span v-else>Iniciar Sesión</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen">
      <header class="bg-panel/50 border-b border-white/10 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-gradient-to-br from-lime/20 to-green/20 rounded-full flex items-center justify-center p-1"
            >
              <img
                src="/icons/celebi.png"
                alt="Celebi"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 class="font-display font-bold text-xl text-white">
                Panel Celebi
              </h1>
              <p class="text-muted text-sm">Administración de NeoCaoh</p>
            </div>
          </div>
          <button @click="logout" class="btn-outline text-sm">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <nav class="bg-ink2/30 border-b border-white/5 px-6">
        <div class="flex gap-1">
          <button
            @click="activeTab = 'downloads'"
            :class="[
              'px-6 py-3 text-sm font-medium transition-all',
              activeTab === 'downloads'
                ? 'text-gold border-b-2 border-gold'
                : 'text-muted hover:text-white',
            ]"
          >
            Enlaces de Descarga
          </button>
          <button
            @click="activeTab = 'blog'"
            :class="[
              'px-6 py-3 text-sm font-medium transition-all',
              activeTab === 'blog'
                ? 'text-gold border-b-2 border-gold'
                : 'text-muted hover:text-white',
            ]"
          >
            Blog & Noticias
          </button>
        </div>
      </nav>

      <main class="p-6">
        <div v-if="activeTab === 'downloads'" class="max-w-4xl mx-auto">
          <h2 class="font-display font-bold text-2xl text-white mb-6">
            Enlaces de Descarga
          </h2>

          <div
            class="bg-gradient-to-br from-panel/40 to-ink2/40 border border-white/5 rounded-2xl p-8"
          >
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-white mb-2"
                  >Windows</label
                >
                <input
                  v-model="adminData.downloads.windows"
                  type="url"
                  class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white mb-2"
                  >macOS</label
                >
                <input
                  v-model="adminData.downloads.mac"
                  type="url"
                  class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white mb-2"
                  >Linux</label
                >
                <input
                  v-model="adminData.downloads.linux"
                  type="url"
                  class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white mb-2"
                  >Versión</label
                >
                <input
                  v-model="adminData.downloads.version"
                  type="text"
                  class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                  placeholder="v0.11.1 Alpha ~250 MB"
                />
              </div>

              <button
                @click="saveDownloads"
                :disabled="loading"
                class="btn-primary"
              >
                <span v-if="loading">Guardando...</span>
                <span v-else>Guardar Enlaces</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'blog'" class="max-w-6xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h2 class="font-display font-bold text-2xl text-white">
              Blog & Noticias
            </h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              class="bg-gradient-to-br from-panel/40 to-ink2/40 border border-white/5 rounded-2xl p-6"
            >
              <h3 class="font-display font-bold text-xl text-white mb-6">
                Crear Nuevo Post
              </h3>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-white mb-2"
                    >Título</label
                  >
                  <input
                    v-model="newPost.title"
                    type="text"
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Título del post"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2"
                    >Excerpt (Opcional)</label
                  >
                  <input
                    v-model="newPost.excerpt"
                    type="text"
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="Resumen breve del post"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2"
                    >Contenido (Markdown)</label
                  >
                  <textarea
                    v-model="newPost.content"
                    rows="8"
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                    placeholder="# Título del post

Tu contenido aquí en formato Markdown...

## Subsección

- Lista
- De items

**Texto en negrita** y *cursiva*"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-white mb-2"
                    >Tags (separados por comas)</label
                  >
                  <input
                    v-model="newPost.tags"
                    type="text"
                    class="w-full px-4 py-3 bg-ink/50 border border-white/10 rounded-lg text-white placeholder-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                    placeholder="alpha, noticias, actualizacion"
                  />
                </div>

                <div class="flex items-center gap-3">
                  <input
                    id="featured"
                    v-model="newPost.featured"
                    type="checkbox"
                    class="w-4 h-4 text-gold bg-ink/50 border-white/10 rounded focus:ring-gold/20 focus:ring-2"
                  />
                  <label for="featured" class="text-sm text-white"
                    >Post destacado</label
                  >
                </div>

                <button
                  @click="createPost"
                  :disabled="loading"
                  class="btn-primary w-full"
                >
                  <span v-if="loading">Creando...</span>
                  <span v-else>Crear Post</span>
                </button>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-panel/40 to-ink2/40 border border-white/5 rounded-2xl p-6"
            >
              <h3 class="font-display font-bold text-xl text-white mb-6">
                Posts Publicados
              </h3>

              <div class="space-y-4">
                <div
                  v-for="post in blogPosts"
                  :key="post.id"
                  class="bg-ink/30 border border-white/5 rounded-lg p-4"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <h4 class="font-medium text-white">{{ post.title }}</h4>
                        <span
                          v-if="post.featured"
                          class="bg-gold/20 text-gold text-xs px-2 py-1 rounded-full"
                          >Destacado</span
                        >
                      </div>
                      <p class="text-muted text-sm mb-2">{{ post.excerpt }}</p>
                      <div class="flex items-center gap-4 text-xs text-muted">
                        <span>{{
                          post.publishedAt.toLocaleDateString("es-ES")
                        }}</span>
                        <span>Por {{ post.author }}</span>
                      </div>
                      <div v-if="post.tags.length" class="flex gap-1 mt-2">
                        <span
                          v-for="tag in post.tags"
                          :key="tag"
                          class="bg-violet2/20 text-violet2 text-xs px-2 py-1 rounded"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                    <button
                      @click="deletePost(post.id)"
                      class="text-scarlet hover:text-scarlet/80 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div v-if="blogPosts.length === 0" class="text-center py-8">
                  <p class="text-muted">No hay posts publicados aún</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
