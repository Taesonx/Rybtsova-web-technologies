const combos = [
    ['soup', 'main', 'salad', 'drink'],
    ['soup', 'main', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main', 'salad', 'drink'],
    ['main', 'drink']
];
const comboCategories = ['soup', 'main', 'salad', 'drink'];
function isValidCombo() {
    const chosen = comboCategories.filter(cat => selected[cat]);
    return combos.some(combo =>
        combo.length === chosen.length &&
        combo.every(cat => chosen.includes(cat))
    );
}
function getErrorMessage() {
    const hasAnything = orderCategories.some(cat => selected[cat]);
    if (!hasAnything) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }
    if (isValidCombo()) {
        return null;
    }
    if (selected.soup && !selected.main && !selected.salad) {
        return 'Выберите главное блюдо/салат/стартер';
    }
    if (selected.salad && !selected.soup && !selected.main) {
        return 'Выберите суп или главное блюдо';
    }
    if (!selected.soup && !selected.main && !selected.salad) {
        return 'Выберите главное блюдо';
    }
    return 'Выберите напиток';
}
function showNotification(text) {
    const old = document.querySelector('.notification');
    if (old) {
        old.remove();
    }
    const notification = document.createElement('div');
    notification.className = 'notification';
    const message = document.createElement('p');
    message.textContent = text;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Окей 👌';
    button.addEventListener('click', () => notification.remove());
    notification.append(message, button);
    document.body.appendChild(notification);
}
document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.querySelector('.order-btn');
    orderButton.addEventListener('click', event => {
        const message = getErrorMessage();
        if (message) {
            event.preventDefault();
            showNotification(message);
        }
    });
});
