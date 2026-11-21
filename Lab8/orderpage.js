function updateOrderSummary() {
    const totalEl = document.getElementById('total-cost');
    let total = 0;
    orderCategories.forEach(function (cat) {
        const el = document.getElementById('selected-' + cat);
        if (!el) return;

        if (selected[cat] && selected[cat].name) {
            el.textContent = selected[cat].name + ' ' + selected[cat].price + '₽';
            total += Number(selected[cat].price) || 0;
        } else {
            el.textContent = emptyMessages[cat];
        }
    });

    if (totalEl) totalEl.textContent = total + '₽';
}
function renderOrderPage() {
    loadSelectedFromStorage();
    const container = document.getElementById('order-dishes');
    const emptyMsg = document.getElementById('empty-order-message');
    if (!container) return;
    container.innerHTML = '';
    let hasAny = false;
    orderCategories.forEach(function (cat) {
        const dish = selected[cat];
        if (!dish || !dish.keyword)
            return;
        hasAny = true;
        const card = createDishCard(dish);
        const btn = card.querySelector('button');
        btn.textContent = 'Удалить';
        btn.addEventListener('click', function () {
            selected[cat] = null;
            saveSelectedToStorage();
            renderOrderPage(); 
        });
        container.appendChild(card);
    });
    if (emptyMsg) {
        emptyMsg.style.display = hasAny ? 'none' : 'block';
    }
    updateOrderSummary();
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        renderOrderPage();
    }, 100);
    const form = document.getElementById('order-form');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const error = getErrorMessage();
        if (error) {
            showNotification(error);
            return;
        }
        const formData = new FormData(form);
        const body = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            delivery_address: formData.get('delivery_address'),
            delivery_type: formData.get('delivery_type'),
            subscribe: formData.get('subscribe') ? 1 : 0,
            comment: formData.get('comment') || '',
            soup_id: selected.soup ? selected.soup.keyword : null,
            main_course_id: selected.main ? selected.main.keyword : null,
            salad_id: selected.salad ? selected.salad.keyword : null,
            drink_id: selected.drink ? selected.drink.keyword : null,
            dessert_id: selected.dessert ? selected.dessert.keyword : null
        };
        if (body.delivery_type === 'by_time') {
            body.delivery_time = formData.get('delivery_time');
        }
        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }
            localStorage.removeItem('selectedDishes');
            alert('Заказ успешно оформлен!');
            window.location.href = 'lunch.html';
        } catch (err) {
            console.error(err);
            alert('Не удалось оформить заказ. Данные сохранены.');
        }
    });
});
