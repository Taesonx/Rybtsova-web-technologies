function applyFilter(category, kind) {
    const cards = document.querySelectorAll(`.dishes[data-category="${category}"] .dish`);

    cards.forEach(card => {
        const visible = !kind || card.dataset.kind === kind;
        card.classList.toggle('hidden', !visible);
    });
}
function handleFilterClick(button) {
    const filters = button.closest('.filters');
    const category = filters.dataset.category;
    const wasActive = button.classList.contains('active');
    filters.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
    if (wasActive) {
        applyFilter(category, null);
    } else {
        button.classList.add('active');
        applyFilter(category, button.dataset.kind);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter').forEach(button => {
        button.addEventListener('click', () => handleFilterClick(button));
    });
});