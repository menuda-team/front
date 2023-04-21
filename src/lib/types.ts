import type { INVOICE_STATUS_TYPES } from '$lib/constants';

export type Product = {
	name: string;
	_id: string;
	imageUrl: string;
	weight: number;
	price: number;
	available: boolean;
	description?: string;
	salePrice?: number;
	categories?: string[];
};

export type CartItem = {
	count: number;
	product: Product;
	price: number;
};

export type Cart = {
	items: CartItem[];
	totalAmount: number;
};

export type User = {
	id: number | null;
};

export type Category = {
	_id: string;
	name: string;
	productsCount: number;
};

export type LabeledPrice = {
	label: string;
	amount: number;
};

export type OrderItem = {
	count: number;
	product: Product;
	price: number;
};

export type Order = {
	items: OrderItem[];
	totalAmount: number;
	user: number;
};

export type Values<T> = T[keyof T];

export type InvoiceStatusType = Values<typeof INVOICE_STATUS_TYPES>;
