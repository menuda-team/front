import { addToCart, getCart, removeOneItemFromCart, setCartItemCount } from '$lib/resources/api';
import {
	getCartItemByProductId,
	removeFromCart as removeFromCartStore,
	setCartItem,
	updateCartIfChanged
} from '$lib/stores/cart';
import type { Cart } from '$lib/types';

export const handleFetchCart = async () => {
	try {
		const cart = (await getCart()) as Cart;
		updateCartIfChanged(cart);
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleAddToCart = async (productId: number, userId: number) => {
	try {
		const cartItem = await addToCart(productId, userId);
		setCartItem(cartItem);
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleSetCartItemCount = async (productId: number, count: number) => {
	try {
		const currentCartItem = getCartItemByProductId(productId);
		if (currentCartItem?.count !== count) {
			const cartItem = await setCartItemCount(productId, count);
			if (cartItem) {
				setCartItem(cartItem);
			} else {
				removeFromCartStore(productId)
			}
		}
	} catch (err) {
		console.error((err as Error).message);
	}
};

export const handleRemoveFromCart = async (productId: number) => {
	try {
		const cartItem = await removeOneItemFromCart(productId);
		if (cartItem) {
			setCartItem(cartItem);
		} else {
			removeFromCartStore(productId);
		}
	} catch (err) {
		console.error((err as Error).message);
	}
};