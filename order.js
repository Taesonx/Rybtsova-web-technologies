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
function saveSelectedToStorage() {
    const data = {};
    orderCategories.forEach(function (cat) {
        if (selected[cat] && typeof selected[cat] === 'object') {
            data[cat] = selected[cat];
        }
    });
    localStorage.setItem('selectedDishes', JSON.stringify(data));
}
function loadSelectedFromStorage() {
    try {
        const raw = localStorage.getItem('selectedDishes');
        if (!raw) return;
        const data = JSON.parse(raw);
        orderCategories.forEach(function (cat) {
            if (data[cat] && typeof data[cat] === 'object' && typeof data[cat].price === 'number') {
                selected[cat] = data[cat];
            } else {
                selected[cat] = null;
            }
        });
    } catch (e) {
        orderCategories.forEach(function (cat) { selected[cat] = null; });
    }
}
function toggleDish(card) {
    const dish = dishes.find(function (d) {
        return d.keyword === card.dataset.dish;
    });
    if (!dish) return;
    const category = dish.category;
    const wasSelected = selected[category] && selected[category].keyword === dish.keyword;
    document
        .querySelectorAll('.dishes[data-category="' + category + '"] .dish')
        .forEach(function (c) { c.classList.remove('selected'); });
    if (wasSelected) {
        selected[category] = null;
    } else {
        selected[category] = Object.assign({}, dish); 
        card.classList.add('selected');
    }
    saveSelectedToStorage(); 
    updateStickyPanel();    
}
function updateStickyPanel() {
    const panel = document.getElementById('order-panel');
    const totalEl = document.getElementById('panel-total');
    const link = document.getElementById('go-to-order');
    if (!panel) return;

    let total = 0;
    let hasAny = false;

    orderCategories.forEach(function (cat) {
        if (selected[cat] && typeof selected[cat].price === 'number') {
            total += selected[cat].price;
            hasAny = true;
        }
    });

    if (!hasAny) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'flex';
    if (totalEl) totalEl.textContent = total + '₽';
    if (link) {
        if (typeof isValidCombo === 'function' && isValidCombo()) {
            link.classList.remove('disabled');
            link.href = 'order.html';
        } else {
            link.classList.add('disabled');
            link.removeAttribute('href');
        }
    }
}
function restoreSelection() {
    orderCategories.forEach(function (cat) {
        if (!selected[cat] || !selected[cat].keyword) return;

        const card = document.querySelector(
            '.dishes[data-category="' + cat + '"] .dish[data-dish="' + selected[cat].keyword + '"]'
        );
        if (card) card.classList.add('selected');
    });
}
document.addEventListener('click', function (e) {
    const card = e.target.closest('.dish');
    if (!card) return;
    const btn = e.target.closest('button');
    if (btn && btn.textContent.indexOf('Удалить') !== -1) return;
    toggleDish(card);
});
