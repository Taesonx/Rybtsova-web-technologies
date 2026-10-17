const selected = {
    soup: null,
    main: null,
    drink: null
};

const emptyMessages = {
    soup: 'Блюдо не выбрано',
    main: 'Блюдо не выбрано',
    drink: 'Напиток не выбран'
};

function handleAddDish(dish) {
    const category = dish.category;
    if (selected[category]) {
        const prevCard = document.querySelector(`.dish[data-dish="${selected[category]}"]`);
        if (prevCard) {
            prevCard.classList.remove('selected');
        }
    }
    selected[category] = dish.keyword;
    const currentCard = document.querySelector(`.dish[data-dish="${dish.keyword}"]`);
    if (currentCard) {
        currentCard.classList.add('selected');
    }
    updateOrderSummary();
}
function updateOrderSummary() {
    const nothingEl = document.getElementById('nothing-selected');
    const detailsEl = document.getElementById('order-details');
    const costBlock = document.getElementById('cost-block');
    const totalEl = document.getElementById('total-cost');
    const hasAny = selected.soup || selected.main || selected.drink;

    if (!hasAny) {
        nothingEl.style.display = 'block';
        detailsEl.style.display = 'none';
        costBlock.style.display = 'none';
        return;
    }
    nothingEl.style.display = 'none';
    detailsEl.style.display = 'block';
    let total = 0;

    ['soup', 'main', 'drink'].forEach(cat => {
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

document.addEventListener('click', event => {
    const button = event.target.closest('.dish button');
    if (!button) return;

    const card = button.closest('.dish');
    const dish = dishes.find(d => d.keyword === card.dataset.dish);
    if (dish) {
        handleAddDish(dish);
    }
});

document.addEventListener('DOMContentLoaded', updateOrderSummary);