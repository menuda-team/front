import { error } from '@sveltejs/kit';
import { handleFetchCart } from '$lib/handlers/cart';
import { getUserId } from '$lib/stores/user';

export async function load() {
	try {
		const userId = getUserId();
		if (userId) {
			await handleFetchCart(userId);
		}
		return {
			status: 200
		};
	} catch (err) {
		throw error(500);
	}
}
