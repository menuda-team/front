import axios from 'axios';
import type { Cart, Category, Product, CartItem, LabeledPrice, Order } from '$lib/types';
import envVars from '../envVars.js';

export const api = axios.create({
	baseURL: envVars.apiBaseUrl,
	timeout: 10000
});
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

export const getProductsByCategory = (categoryId: string): Promise<Product[]> =>
	api
		.get(`/bots/${categoryId}/products`)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_ARRAY;
		});

type GetCategoriesResult = Category[];
export const getCategories = async () =>
	api
		.get<GetCategoriesResult>('/bots/categories/list')
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const addToCart = (productId: string, userId: number, count?: number): Promise<CartItem> =>
	api
		.patch(`/users/${userId}/cart/add`, { productId, count })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const setCartItemCount = async (userId: number, productId: string, count: number): Promise<CartItem> =>
	api
		.patch(`/users/${userId}/cart/set`, { productId, count })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const removeOneItemFromCart = (productId: string, userId: number) =>
	api
		.patch(`/users/${userId}/cart/remove`, { productId })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const getCart = (userId: number) =>
	api
		.get<Cart>(`/users/${userId}/cart`)
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});

export const createInvoiceLink = (prices: LabeledPrice[]) =>
	api
		.post<{ link: string }>(`/bot/createInvoiceLink`, { prices })
		.then((res) => res.data)
		.catch((err) => {
			console.error(err);
			return EMPTY_OBJECT;
		});
