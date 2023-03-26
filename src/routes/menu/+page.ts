import { error } from '@sveltejs/kit';
import { getCategories } from '$lib/resources/api.js';
import { handleFetchCart } from '$lib/handlers/cart';
import fillDb from '$lib/scripts/fillDb.js';
import { getUserId } from '$lib/stores/user';

export async function load() {
	try {
		// await fillDb();
		const userId = getUserId();
		const categories = await getCategories();
		if (userId) {
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
