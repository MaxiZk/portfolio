document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.case-study');
  if (!filterBar) return;

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;

    const tag = button.dataset.tag;

    filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
    });

    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(' ');
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('is-hidden', !show);
    });
  });
});
