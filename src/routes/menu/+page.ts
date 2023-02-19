import { error } from '@sveltejs/kit';
import { getCategories } from '$lib/resources/api.js';
import { handleFetchCart } from '$lib/handlers/cart';
import fillDb from '$lib/scripts/fillDb.js';

export async function load() {
	try {
		// await fillDb();
		const categories = await getCategories();
		// await handleFetchCart();
		return {
			status: 200,
			categories
		};
	} catch (err) {
		throw error(500);
	}
}
