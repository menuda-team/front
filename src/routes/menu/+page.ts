import { error } from '@sveltejs/kit';
import { getCategories } from "$lib/resources/api.js";
import { handleFetchCart } from "$lib/handlers/cart";
// import uploadProducts from '$lib/scripts/uploadProducts.js'

export async function load() {
  try {
    // await uploadProducts();
    const categories = await getCategories();
    await handleFetchCart();
    return {
      status: 200,
      categories,
    };
  } catch (err) {
    throw error(500);
  }
}
