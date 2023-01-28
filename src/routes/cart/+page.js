import { error } from '@sveltejs/kit';
import { handleFetchCart } from '$lib/handlers/cart';

export async function load() {
	try {
		await handleFetchCart();
		return {
			status: 200
		};
	} catch (err) {
		throw error(500);
	}
}
