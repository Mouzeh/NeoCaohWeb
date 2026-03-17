export function useReveal() {
  const activate = () => {
    if (!import.meta.client) return
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('up'), i * 65)
          }
        })
      },
      { threshold: 0.1 },
    )
    els.forEach(el => observer.observe(el))
    return observer
  }

  return { activate }
}