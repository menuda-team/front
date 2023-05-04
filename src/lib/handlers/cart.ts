import { addToCart, getCart, setCartItemCount, removeItemsFromCart } from '$lib/resources/api';
import {
	getCartItemByProductId,
	removeFromCart as removeFromCartStore,
	setCartItem,
	updateCartIfChanged
} from '$lib/stores/cart';
import type { Cart } from '$lib/types';

export const handleFetchCart = async (userId: number) => {
	try {
		const cart = (await getCart(userId)) as Cart;
		updateCartIfChanged(cart);
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleAddToCart = async (productId: string, cartId: string, count = 1) => {
	try {
		const cartItem = await addToCart(productId, cartId, count);
		setCartItem(cartItem);
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleSetCartItemCount = async (cartId: string, productId: string, count = 1) => {
	try {
		const currentCartItem = getCartItemByProductId(productId);
		if (currentCartItem?.count !== count) {
			const cartItem = await setCartItemCount(cartId, productId, count);
			if (cartItem) {
				setCartItem(cartItem);
			} else {
				removeFromCartStore(productId);
			}
		}
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleRemoveFromCart = async (productId: string, cartId: string, count = 1) => {
	try {
		const cartItem = await removeItemsFromCart(productId, cartId, count);
		if (cartItem) {
			setCartItem(cartItem);
		} else {
			removeFromCartStore(productId);
		}
	} catch (err) {
		console.error((err as Error).message);
	}
};
