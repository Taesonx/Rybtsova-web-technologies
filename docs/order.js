const orderCategories = ['soup', 'main', 'salad', 'drink', 'dessert'];
const selected = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};
const emptyMessages = {
    soup: 'Блюдо не выбрано',
    main: 'Блюдо не выбрано',
    salad: 'Блюдо не выбрано',
    drink: 'Напиток не выбран',
    dessert: 'Блюдо не выбрано'
};
function toggleDish(card) {
    const dish = dishes.find(d => d.keyword === card.dataset.dish);
    const category = dish.category;
    const wasSelected = selected[category] === dish.keyword;
    document.querySelectorAll(`.dishes[data-category="${category}"] .dish`)
        .forEach(c => c.classList.remove('selected'));
    selected[category] = wasSelected ? null : dish.keyword;
    card.classList.toggle('selected', !wasSelected);

    updateOrderSummary();
}
function updateOrderSummary() {
    const nothingEl = document.getElementById('nothing-selected');
    const detailsEl = document.getElementById('order-details');
    const costBlock = document.getElementById('cost-block');
    const totalEl = document.getElementById('total-cost');

    const hasAny = orderCategories.some(cat => selected[cat]);

    if (!hasAny) {
        nothingEl.style.display = 'block';
        detailsEl.style.display = 'none';
        costBlock.style.display = 'none';
        return;
    }

    nothingEl.style.display = 'none';
    detailsEl.style.display = 'block';

    let total = 0;

    orderCategories.forEach(cat => {
        const nameEl = document.getElementById(`selected-${cat}`);
        const hiddenInput = document.getElementById(`${cat}-keyword`);

        if (selected[cat]) {
            const dish = dishes.find(d => d.keyword === selected[cat]);
            nameEl.textContent = `${dish.name} ${dish.price}₽`;
            hiddenInput.value = dish.keyword;
            total += dish.price;
        } else {
            nameEl.textContent = emptyMessages[cat];
            hiddenInput.value = '';
        }
    });

    if (total > 0) {
        costBlock.style.display = 'block';
        totalEl.textContent = `${total}₽`;
    } else {
        costBlock.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dish').forEach(card => {
        card.addEventListener('click', () => toggleDish(card));
    });
    updateOrderSummary();
});
