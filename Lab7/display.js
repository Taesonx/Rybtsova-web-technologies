function createDishCard(dish) {
    const template = document.getElementById('dish-template');
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.dish = dish.keyword;
    card.dataset.kind = dish.kind;
    const img = card.querySelector('img');
    img.src = dish.image;
    img.alt = dish.name;
    card.querySelector('.price').textContent = dish.price + ' ₽';
    card.querySelector('.name').textContent = dish.name;
    card.querySelector('.weight').textContent = dish.count;

    return card;
}
function renderDishes() {
    const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];
    categories.forEach(function (cat) {
        const container = document.querySelector('.dishes[data-category="' + cat + '"]');
        if (!container) 
            return;
        container.innerHTML = '';
        dishes
            .filter(function (d) { return d.category === cat; })
            .sort(function (a, b) { return a.name.localeCompare(b.name, 'ru'); })
            .forEach(function (dish) {
                container.appendChild(createDishCard(dish));
            });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    loadDishes()
        .then(function () {
            renderDishes();
            if (typeof loadSelectedFromStorage === 'function') loadSelectedFromStorage();
            if (typeof restoreSelection === 'function') restoreSelection();
            if (typeof updateStickyPanel === 'function') updateStickyPanel();
        })
        .catch(function (err) {
            console.error(err);
            alert('Не удалось загрузить блюда');
        });
});
