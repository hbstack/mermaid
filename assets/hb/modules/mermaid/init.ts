(() => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>('pre.mermaid'))
  if (!elements) {
    return
  }
  elements.forEach((ele) => {
    ele.setAttribute('data-src', ele.innerHTML);
  })

  const resetElements = (): Promise<void> => {
    return new Promise((resolve) => {
      elements.forEach((ele) => {
        ele.innerHTML = ele.getAttribute('data-src')??'';
        ele.removeAttribute('data-processed')
      })
      resolve()
    })
  }
  const init = (theme: string): void => {
    window.mermaid.initialize({ theme })
    window.mermaid.init({ theme }, elements)
  }

  const theme = localStorage.getItem('hb-theme')
  if (theme === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    init('dark')
  }

  document.addEventListener('hb:theme', (e) => {
    resetElements()
      .then(init(e.detail.theme === 'dark' ? 'dark' : 'default'))
      .catch(console.error)
  })
})()
