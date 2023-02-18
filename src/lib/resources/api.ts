import axios from 'axios';
import type { Cart, Category, Product } from '$lib/types';
import envVars from '../envVars.js';

export const api = axios.create({
	baseURL: envVars.apiBaseUrl,
	timeout: 10000
});
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

export const getProductsByCategory = (categoryId: number): Promise<Product[]> =>
	api
		.get(`/products?categoryId=${categoryId}`)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_ARRAY;
		});

type GetCategoriesResult = Category[];
export const getCategories = async () =>
	api
		.get<GetCategoriesResult>('/categories')
		.then((res) => [
			{
				name: 'Бургеры',
				count: 3,
				_id: 23
			},
			{
				name: 'Напитки',
				count: 4,
				_id: 24
			}
		])
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const createUser = (userId: number) =>
	api
		.post('/v1/users/register', { id: userId })
		.then((res) => res.data)
		.catch(console.error);

export const getIsRegistered = (userId: number) =>
	api
		.get(`/v1/users/${userId}`)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return false;
		});

export const addToCart = (productId: number, userId: number) =>
	api
		.post('/v1/cart/add', { user_id: userId, product_id: productId })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const setCartItemCount = async (productId: number, count: number) =>
	api
		.post('/v1/cart/set', { product_id: productId, count })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const removeOneItemFromCart = (productId: number) =>
	api
		.delete(`/v1/cart/product/${productId}`)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const getCart = () =>
	api
		.get<Cart>('/v1/cart/list/')
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});
