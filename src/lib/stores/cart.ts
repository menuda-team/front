import { writable, get } from 'svelte/store';
import type { Cart, CartItem } from '$lib/types';

const cart = writable<Omit<Cart, '_id'> & { _id?: string }>({
	items: [],
	totalAmount: 0,
	_id: undefined
});

export const setCartItem = (cartItem: CartItem) => {
	cart.update((cart) => {
		const existedCartItem = cart.items.find((item) => item.product._id === cartItem.product._id);
		if (existedCartItem) {
			const diffCount = cartItem.count - existedCartItem.count;
			return {
				...cart,
				items: cart.items.map((item) => (item.product._id === cartItem.product._id ? cartItem : item)),
				totalAmount: cart.totalAmount + diffCount * cartItem.product.price
			};
		}
		return {
			...cart,
			items: [...cart.items, cartItem],
			totalAmount: cart.totalAmount + cartItem.count * cartItem.product.price
		};
	});
};

export const removeFromCart = (productId: string) => {
	cart.update((cart) => {
		const existedCartItem = cart.items.find((item) => item.product._id === productId);
		if (existedCartItem) {
			return {
				...cart,
				items: cart.items.filter((item) => item.product._id !== productId),
				totalAmount: cart.totalAmount - existedCartItem.product.price * existedCartItem.count
			};
		}
		return cart;
	});
};

export const updateCartIfChanged = (updatedCart: Cart) => {
	if (get(cart).totalAmount !== updatedCart.totalAmount || get(cart)._id !== updatedCart._id) {
		cart.set(updatedCart);
	}
};

export const getCartItemByProductId = (id: string) => {
	const $cart = get(cart);
	return $cart.items.find((item) => item.product._id === id);
};

export default cart;
