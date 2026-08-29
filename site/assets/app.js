document.documentElement.classList.add('js');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.game-card, .principle-grid article, .arch-node').forEach((item) => observer.observe(item));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.activeElement?.blur();
});

