import { writable, get } from 'svelte/store';
import type { Cart, CartItem } from '$lib/types';

const cart = writable<Cart>({
	items: [],
	totalAmount: 0
});

export const setCartItem = (cartItem: CartItem) => {
	cart.update((cart) => {
		const existedCartItem = cart.items.find((item) => item.product_id === cartItem.product_id);
		if (existedCartItem) {
			const diffCount = cartItem.count - existedCartItem.count;
			return {
				items: cart.items.map((item) => (item.product_id === cartItem.product_id ? cartItem : item)),
				totalAmount: cart.totalAmount + diffCount * cartItem.product.price
			};
		}
		return {
			items: [...cart.items, cartItem],
			totalAmount: cart.totalAmount + cartItem.count * cartItem.product.price
		};
	});
};

export const removeFromCart = (productId: string) => {
	cart.update((cart) => {
		const existedCartItem = cart.items.find((item) => item.product_id === productId);
		if (existedCartItem) {
			return {
				items: cart.items.filter((item) => item.product_id !== productId),
				totalAmount: cart.totalAmount - existedCartItem.product.price * existedCartItem.count
			};
		}
		return cart;
	});
};

export const updateCartIfChanged = (updatedCart: Cart) => {
	if (get(cart).totalAmount !== updatedCart.totalAmount) {
		cart.set(updatedCart);
	}
};

export const getCartItemByProductId = (id: string) => {
	const $cart = get(cart);
	return $cart.items.find((item) => item.product_id === id);
};

export default cart;
