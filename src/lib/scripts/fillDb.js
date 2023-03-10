import { api } from '../resources/api.ts';

const categories = [
	{
		name: 'Популярные блюда'
	},
	{
		name: 'Закуски'
	},
	{
		name: 'Бургеры'
	},
	{
		name: 'Десерты'
	},
	{
		name: 'Напитки'
	}
];

let categoriesNamesIdsMap = {};

const products = [
	{
		name: 'Штефан Бургер младший',
		price: 565,
		weight: 280,
		description:
			'Бифштекс из мраморной говядины, фирменный копченый соус, сыр гауда, помидоры, красный лук, бекон, соленые огурцы, булка с тыквенными семечками. Топпинг на выбор.\n' +
			'На 100 граммов: К 259, Б 10, Ж 21, У 9',
		available: true,
		imageUrl: 'https://eda.yandex/images/3506707/6b8f1898c92d830f306d8814288010b7-450x300.jpeg',
		categories: ['Популярные блюда', 'Бургеры']
	},
	{
		name: 'Картофель фри',
		price: 205,
		weight: 130,
		description: '',
		available: true,
		imageUrl: 'https://eda.yandex/images/3806466/63618be6522b9213d59f08139409c783-450x300.jpeg',
		categories: ['Популярные блюда', 'Закуски']
	},
	{
		name: 'Картофельные дольки',
		price: 215,
		weight: 130,
		description: '',
		available: true,
		imageUrl: 'https://eda.yandex/images/3798638/898f15f7f696cdb84f5d141eec984114-450x300.jpeg',
		categories: ['Популярные блюда', 'Закуски']
	},
	{
		name: 'Бургер Шальная Эльма',
		price: 435,
		weight: 200,
		description:
			'Куриное филе, салат романо, соус из вяленых томатов, соленые огурцы, булка с тыквенными семечками. Топпинг на выбор.\n' +
			'На 100 граммов: К 195, Б 13, Ж 10, У 13',
		available: true,
		imageUrl: 'https://eda.yandex/images/2415806/9da5dd43f5b14a0ec643492a9f444e51-450x300.jpeg',
		categories: ['Популярные блюда', 'Бургеры']
	},
	{
		name: 'Бургер Грибник Оттo',
		price: 525,
		weight: 260,
		description:
			'Бифштекс из мраморной говядины, грибы шампиньоны в сливочном соусе, грибной соус, булка с тыквенными семечками. Топпинг на выбор.\n' +
			'На 100 граммов: К 231, Б 6, Ж 18, У 11',
		available: true,
		imageUrl: 'https://eda.yandex/images/3439767/eea3ab05187213b2a9d25df7514cfc87-450x300.jpeg',
		categories: ['Популярные блюда', 'Бургеры']
	},
	{
		name: 'Острые куриные ножки',
		price: 180,
		weight: 150,
		description: 'Жареные куриные ножки, острый перец, чеснок, острый томатный соус',
		available: true,
		imageUrl: 'https://eda.yandex/images/2794391/a2e95352c579679eeebab63e92a12baa-450x300.jpeg',
		categories: ['Закуски']
	},
	{
		name: 'Жареный сыр с ягодным соусом',
		price: 450,
		weight: 210,
		description: 'Жареные куриные ножки, острый перец, чеснок, острый томатный соус',
		available: true,
		imageUrl: 'https://eda.yandex/images/3491582/5dbffe01ab21b8718d17538112d5b31e-450x300.jpeg',
		categories: ['Закуски']
	},
	{
		name: 'Кургетсы',
		price: 305,
		weight: 180,
		description: 'Нежнейшие кусочки куриного филе в хрустящем кляре с соусом Вяленые томаты',
		available: true,
		imageUrl: 'https://eda.yandex/images/3541746/98800637f57b149af29fcecdf89614a1-450x300.jpeg',
		categories: ['Закуски']
	},
	{
		name: 'Бременский Рыбак',
		price: 699,
		weight: 280,
		description:
			'Фирменная черная булочка, бекон, креветки в хрустящей панировке, котлета из моцареллы, гуакамоле из авокадо, соус чеддер, помидоры, сушеный лук, ароматный пармезан.\n' +
			'На 100 граммов: К 202, Б 12, Ж 10, У 16',
		available: true,
		imageUrl: 'https://eda.yandex/images/2783965/7917fad4b5254aec984b0bae38f1cfdf-450x300.jpeg',
		categories: ['Бургеры']
	},
	{
		name: 'Биг Штейсти',
		price: 560,
		weight: 250,
		description:
			'Фирменная булочка, котлета из мраморной говядины, плавленый сыр чеддер, соус гриль, хрустящий салат, репчатый лук, помидоры.\n' +
			'На 100 граммов: К 197, Б 9, Ж 13, У 13',
		available: true,
		imageUrl: 'https://eda.yandex/images/3513074/d39f469131db431b8f9a4455d0037c00-450x300.jpeg',
		categories: ['Бургеры']
	},
	{
		name: 'Бургер Шахтер из Гамбурга',
		price: 595,
		weight: 290,
		description:
			'Бифштекс из мраморной говядины, яйцо, сыр гауда, майонез, бекон, соленые огурцы, помидоры, красный лук, черная булка с тыквенными семечками и чернилами каракатицы. Топпинг на выбор.\n' +
			'На 100 граммов: К 236, Б 11, Ж 18, У 8',
		available: true,
		imageUrl: 'https://eda.yandex/images/3790679/7d6c09e5b8ccd235cfb53d68616e1129-450x300.jpeg',
		categories: ['Бургеры']
	},
	{
		name: 'Кокосовый фитнес-пудинг без сахара',
		price: 365,
		weight: 150,
		description: 'Семена чиа, которые настаивались в кокосовом молоке, политые клубничным пюре. Десерт без сахар',
		available: true,
		imageUrl: 'https://eda.yandex/images/3595513/9e9adbd1f175691cc39c387b5554b23c-450x300.jpeg',
		categories: ['Десерты']
	},
	{
		name: 'Десерт Фрау Гретты',
		price: 305,
		weight: 120,
		description: 'Слоеное тесто, пропитанное нежным сливочным кремом и жидким шоколадом',
		available: true,
		imageUrl: 'https://eda.yandex/images/3208959/5df9a362f8ba6ac4f4688a7e8080fa1a-450x300.jpeg',
		categories: ['Десерты']
	},
	{
		name: 'Сливочный чизкейк',
		price: 380,
		weight: 120,
		description: '',
		available: true,
		imageUrl: 'https://eda.yandex/images/2415806/b8a17d511bab5da4dea69e42c61e8d11-450x300.jpeg',
		categories: ['Десерты']
	},
	{
		name: 'Морс домашний',
		price: 265,
		weight: 300,
		description: '',
		available: true,
		imageUrl: 'https://eda.yandex/images/1380157/ab86ea1a2e9f4f7f9038a6191468a209-450x300.jpeg',
		categories: ['Напитки']
	}
];

const uploadCategories = async () => {
	for (let i = 0; i < categories.length; ++i) {
		const { name } = categories[i];
		try {
			await api
				.post('/categories', {
					name
				})
				.then((res) => {
					const { _id } = res.data;
					categoriesNamesIdsMap[name] = _id;
				});
		} catch (err) {
			console.error(err.message);
		}
	}
};

const uploadProducts = async () => {
	for (let j = 0; j < products.length; ++j) {
		const product = products[j];
		try {
			console.log('!!!categoriesNamesIdsMap[name]:', categoriesNamesIdsMap[name]);
			await api.post('/products/create', {
				...product,
				categories: product.categories.map((name) => categoriesNamesIdsMap[name])
			});
		} catch (err) {
			console.error(err.message);
		}
	}
};

const fillDb = async () => {
	await uploadCategories();
	await uploadProducts();
};

export default fillDb;
