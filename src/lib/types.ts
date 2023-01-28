export type Product = {
	name: string;
	id: number;
	ImageUrl: string;
	weight: number;
	price: number;
	available: boolean;
	description?: string;
	sale_price?: number;
	category?: string;
};

export type CartItem = {
	count: number;
	product: Product;
	product_id: number;
	user_id?: string;
};

export type Cart = {
	items: CartItem[];
	totalAmount: number;
};

export type User = {
	id: number | null;
};

export type Category = {
	id: number;
	count: number;
}
