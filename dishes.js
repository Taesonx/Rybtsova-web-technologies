const MEAL_API = 'https://www.themealdb.com/api/json/v1/1';
const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1';


let dishes = [];

async function fetchList(url, field) {
    const response = await fetch(url);          
    if (!response.ok) {
        throw new Error('Ошибка загрузки: ' + url);
    }
    const data = await response.json();         
    return data[field] || [];                  
}
function detectKind(category, name) {
    const fishWords = /fish|salmon|tuna|prawn|shrimp|cod|crab|squid/i;
    if (category === 'Seafood' || fishWords.test(name)) return 'fish';
    if (['Beef', 'Chicken', 'Lamb', 'Pork', 'Goat'].includes(category)) return 'meat';
    return 'veg';
}
function makeDish(prefix, id, name, image, category, kind, price, count) {
    return {
        keyword: prefix + '-' + id,
        name: name,
        price: price,
        category: category,
        kind: kind,
        count: count,
        image: image
    };
}
async function loadDishes() {
    const results = await Promise.all([
        fetchList(MEAL_API + '/search.php?s=soup', 'meals'),
        fetchList(MEAL_API + '/search.php?s=salad', 'meals'),
        fetchList(MEAL_API + '/filter.php?c=Seafood', 'meals'),
        fetchList(MEAL_API + '/filter.php?c=Chicken', 'meals'),
        fetchList(MEAL_API + '/filter.php?c=Vegetarian', 'meals'),
        fetchList(DRINK_API + '/filter.php?a=Non_Alcoholic', 'drinks'),
        fetchList(MEAL_API + '/filter.php?c=Dessert', 'meals')
    ]);
    const soups = results[0];
    const salads = results[1];
    const fish = results[2];
    const meat = results[3];
    const veg = results[4];
    const drinks = results[5];
    const desserts = results[6];
    const soupList = soups.slice(0, 6).map(function (m) {
        const id = Number(m.idMeal);
        return makeDish('soup', id, m.strMeal, m.strMealThumb, 'soup',
            detectKind(m.strCategory, m.strMeal),
            150 + (id % 25) * 10,
            (250 + (id % 5) * 25) + ' г');
    });
    const mainFish = fish.slice(0, 2).map(function (m) {
        const id = Number(m.idMeal);
        return makeDish('main', id, m.strMeal, m.strMealThumb, 'main', 'fish',
            250 + (id % 20) * 10,
            (280 + (id % 5) * 20) + ' г');
    });
    const mainMeat = meat.slice(0, 2).map(function (m) {
        const id = Number(m.idMeal);
        return makeDish('main', id, m.strMeal, m.strMealThumb, 'main', 'meat',
            250 + (id % 20) * 10,
            (280 + (id % 5) * 20) + ' г');
    });
    const mainVeg = veg.slice(0, 2).map(function (m) {
        const id = Number(m.idMeal);
        return makeDish('main', id, m.strMeal, m.strMealThumb, 'main', 'veg',
            250 + (id % 20) * 10,
            (280 + (id % 5) * 20) + ' г');
    });
    const saladList = salads.slice(0, 6).map(function (m) {
        const id = Number(m.idMeal);
        return makeDish('salad', id, m.strMeal, m.strMealThumb, 'salad',
            detectKind(m.strCategory, m.strMeal),
            150 + (id % 25) * 10,
            (250 + (id % 5) * 25) + ' г');
    });
    const hotWords = /tea|coffee|chocolate|cocoa|hot|mulled|toddy|chai/i;
    const hotDrinks = drinks.filter(function (d) { return hotWords.test(d.strDrink); }).slice(0, 3);
    const coldDrinks = drinks.filter(function (d) { return !hotWords.test(d.strDrink); }).slice(0, 3);

    const drinkList = hotDrinks.concat(coldDrinks).map(function (d) {
        const id = Number(d.idDrink);
        const kind = hotWords.test(d.strDrink) ? 'hot' : 'cold';
        return makeDish('drink', id, d.strDrink, d.strDrinkThumb, 'drink', kind,
            120 + (id % 15) * 10,
            (250 + (id % 3) * 50) + ' мл');
    });
    const sizes = [
        { kind: 'small', count: '100 г', price: 150 },
        { kind: 'medium', count: '200 г', price: 250 },
        { kind: 'large', count: '400 г', price: 400 }
    ];
    const dessertList = desserts.slice(0, 6).map(function (m, i) {
        const size = sizes[i % 3];
        const id = Number(m.idMeal);
        return makeDish('dessert', id, m.strMeal, m.strMealThumb, 'dessert',
            size.kind, size.price + (id % 5) * 10, size.count);
    });
    dishes = [].concat(soupList, mainFish, mainMeat, mainVeg, saladList, drinkList, dessertList);
    return dishes;
}
