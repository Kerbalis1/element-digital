const art = document.querySelector('.arc-hero-art');

if (art && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  art.querySelector('img').decode().then(
    () => art.classList.add('is-lit'),
    () => {} // Keep the static presentation if the hero image cannot be decoded.
  );
}
