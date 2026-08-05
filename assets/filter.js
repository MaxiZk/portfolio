document.addEventListener('DOMContentLoaded', () => {
  const filterBar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('.case-study');
  const emptyState = document.getElementById('empty-state');
  if (!filterBar) return;

  let activeTags = new Set(['all']);

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(' ');
      const show = activeTags.has('all') || tags.some((t) => activeTags.has(t));
      card.classList.toggle('is-hidden', !show);
      if (show) visibleCount++;
    });
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;
    const tag = button.dataset.tag;

    if (tag === 'all') {
      activeTags = new Set(['all']);
    } else {
      activeTags.delete('all');
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
      if (activeTags.size === 0) activeTags.add('all');
    }

    filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
      const btnTag = btn.dataset.tag;
      btn.setAttribute('aria-pressed', activeTags.has(btnTag) ? 'true' : 'false');
    });

    applyFilters();
  });
});
