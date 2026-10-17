function createDishCard(dish) {
    const template = document.getElementById('dish-template');
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.dish = dish.keyword;
    const img = card.querySelector('img');
    img.src = dish.image;
    img.alt = dish.name;
    card.querySelector('.price').textContent = `${dish.price} ₽`;
    card.querySelector('.name').textContent = dish.name;
    card.querySelector('.weight').textContent = dish.count;
    return card;
}
function renderDishes() {
    const categories = ['soup', 'main', 'drink'];
    categories.forEach(cat => {
        const container = document.querySelector(`.dishes[data-category="${cat}"]`);
        if (!container)
             return;
        container.innerHTML = '';
        const items = dishes
            .filter(d => d.category === cat)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        items.forEach(dish => {
            container.appendChild(createDishCard(dish));
        });
    });
}
document.addEventListener('DOMContentLoaded', renderDishes);
