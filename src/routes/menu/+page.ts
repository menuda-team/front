import { error } from '@sveltejs/kit';
import { getCategories } from '$lib/resources/api.js';
import { handleFetchCart } from '$lib/handlers/cart';
import { getUserId } from '$lib/stores/user';
import cart from '$lib/stores/cart';
import { get } from 'svelte/store';

export async function load() {
	try {
		const userId = getUserId();
		const categories = await getCategories();
		if (userId && get(cart).totalAmount === 0) {
			await handleFetchCart(userId);
		}
		return {
			status: 200,
			categories
		};
	} catch (err) {
		throw error(500);
	}
}
