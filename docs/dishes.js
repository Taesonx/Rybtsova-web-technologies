const dishes = [
    {
        keyword: 'tom-yam',
        name: 'Том Ям с морепродуктами',
        price: 700,
        category: 'soup',
        kind: 'fish',
        count: '350 г',
        image: 'TomYam3.webp'
    },
    {
        keyword: 'miso-salmon',
        name: 'Мисо-суп с лососем',
        price: 450,
        category: 'soup',
        kind: 'fish',
        count: '300 г',
        image: 'MisoSalmon.jpg'
    },
    {
        keyword: 'ramen',
        name: 'Рамен с кимчи и курицей',
        price: 600,
        category: 'soup',
        kind: 'meat',
        count: '400 г',
        image: 'Ramen.jpg'
    },
    {
        keyword: 'pho-bo',
        name: 'Пхо Бо с говядиной',
        price: 550,
        category: 'soup',
        kind: 'meat',
        count: '450 г',
        image: 'PhoBo.webp'
    },
    {
        keyword: 'kuksy',
        name: 'Кукси',
        price: 500,
        category: 'soup',
        kind: 'meat',
        count: '300 г',
        image: 'Kuksy.png'
    },
    {
        keyword: 'sundubu',
        name: 'Сундубу-тиге с тофу и овощами',
        price: 420,
        category: 'soup',
        kind: 'veg',
        count: '400 г',
        image: 'Sundubu.png'
    },
    {
        keyword: 'kimbap',
        name: 'Кимпаб со спайси лососем',
        price: 385,
        category: 'main',
        kind: 'fish',
        count: '280 г',
        image: 'Kimpab.jpg'
    },
    {
        keyword: 'onigiri',
        name: 'Онигири с тунцом',
        price: 270,
        category: 'main',
        kind: 'fish',
        count: '180 г',
        image: 'Onigiry.webp'
    },
    {
        keyword: 'pipimpab',
        name: 'Пипимпаб с королевской креветкой',
        price: 225,
        category: 'main',
        kind: 'fish',
        count: '250 г',
        image: 'Pipimpab.webp'
    },
    {
        keyword: 'teriyaki-chicken',
        name: 'Курица терияки с рисом',
        price: 340,
        category: 'main',
        kind: 'meat',
        count: '300 г',
        image: 'TeriyakiChicken.jpg'
    },
    {
        keyword: 'yakisoba-veg',
        name: 'Якисоба с овощами',
        price: 290,
        category: 'main',
        kind: 'veg',
        count: '300 г',
        image: 'YakisobaVeg.webp'
    },
    {
        keyword: 'pad-thai-tofu',
        name: 'Пад тай с тофу',
        price: 310,
        category: 'main',
        kind: 'veg',
        count: '320 г',
        image: 'PadThaiTofu.jpg'
    },
    {
        keyword: 'tuna-wakame',
        name: 'Салат с тунцом и вакамэ',
        price: 380,
        category: 'salad',
        kind: 'fish',
        count: '200 г',
        image: 'TunaWakame.jpg'
    },
    {
        keyword: 'beef-salad',
        name: 'Тайский салат с говядиной',
        price: 390,
        category: 'salad',
        kind: 'meat',
        count: '230 г',
        image: 'BeefSalad.jpg'
    },
    {
        keyword: 'edamame',
        name: 'Эдамаме с морской солью',
        price: 190,
        category: 'salad',
        kind: 'veg',
        count: '150 г',
        image: 'Edamame.png'
    },
    {
        keyword: 'oi-muchim',
        name: 'Корейский салат из огурцов',
        price: 170,
        category: 'salad',
        kind: 'veg',
        count: '180 г',
        image: 'OiMuchim.webp'
    },
    {
        keyword: 'spring-rolls',
        name: 'Овощные спринг-роллы',
        price: 240,
        category: 'salad',
        kind: 'veg',
        count: '200 г',
        image: 'SpringRolls.webp'
    },
    {
        keyword: 'chuka',
        name: 'Салат чука с кунжутом',
        price: 220,
        category: 'salad',
        kind: 'veg',
        count: '150 г',
        image: 'Chuka.webp'
    },
    {
        keyword: 'milkis-classic',
        name: 'Милкис классический',
        price: 240,
        category: 'drink',
        kind: 'cold',
        count: '250 мл',
        image: 'MilkisClassic.webp'
    },
    {
        keyword: 'milkis-strawberry',
        name: 'Милкис с клубникой',
        price: 240,
        category: 'drink',
        kind: 'cold',
        count: '250 мл',
        image: 'MilkisStrawberry.jpeg'
    },
    {
        keyword: 'cola',
        name: 'Добрый кола',
        price: 250,
        category: 'drink',
        kind: 'cold',
        count: '300 мл',
        image: 'Cola.webp'
    },
    {
        keyword: 'sencha',
        name: 'Зелёный чай сенча',
        price: 150,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'Sencha.webp'
    },
    {
        keyword: 'matcha-latte',
        name: 'Матча-латте',
        price: 260,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'MatchaLatte.jpg'
    },
    {
        keyword: 'yuja-tea',
        name: 'Юдза-ча (цитрусовый чай)',
        price: 220,
        category: 'drink',
        kind: 'hot',
        count: '300 мл',
        image: 'YujaTea.jpeg'
    },
    {
        keyword: 'mochi-matcha',
        name: 'Моти с матча',
        price: 180,
        category: 'dessert',
        kind: 'small',
        count: '90 г',
        image: 'MochiMatcha.webp'
    },
    {
        keyword: 'dango',
        name: 'Данго',
        price: 160,
        category: 'dessert',
        kind: 'small',
        count: '100 г',
        image: 'Dango.jpg'
    },
    {
        keyword: 'taiyaki',
        name: 'Тайяки с шоколадом',
        price: 230,
        category: 'dessert',
        kind: 'medium',
        count: '180 г',
        image: 'Taiyaki.png'
    },
    {
        keyword: 'mango-sticky-rice',
        name: 'Манго с липким рисом',
        price: 290,
        category: 'dessert',
        kind: 'medium',
        count: '220 г',
        image: 'MangoStickyRice.jpg'
    },
    {
        keyword: 'bingsu',
        name: 'Бинсу с манго',
        price: 420,
        category: 'dessert',
        kind: 'large',
        count: '400 г',
        image: 'Bingsu.jpg'
    },
    {
        keyword: 'mochi-set',
        name: 'Набор моти (6 штук)',
        price: 520,
        category: 'dessert',
        kind: 'large',
        count: '480 г',
        image: 'MochiSet.jpg'
    }
];
