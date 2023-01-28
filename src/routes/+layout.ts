// TODO: настроить prettier
import { redirect as _redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
// TODO: сделать так, чтобы внутри IDE работали переходы по $lib
import { api, createUser, getIsRegistered } from '$lib/resources/api.js';
import { getUserId as getUserIdFromStore, setUserId as setUserIdInStore } from '$lib/stores/user.js';

export const ssr = false;

/**
 * Redirects in load functions break when running client-side
 * @see https://github.com/sveltejs/kit/issues/5952
 */
const redirect = async (location: string) => {
	if (browser) return await goto(location);
	else throw _redirect(302, location);
};

export const load = async ({ url }) => {
	const userIdFromStore = getUserIdFromStore();
	const isAuth = !!userIdFromStore;

	if (!isAuth) {
		// const userId = url.searchParams.get("user_id");
		// TODO: настроить тайпинги для телеграма
		const userId = Telegram?.WebApp.initDataUnsafe.user.id;
		if (!userId) {
			throw await error(401, 'user_id is not found');
		}
		api.interceptors.request.use((config) => ({
			...config,
			headers: {
				'user-id': userId
			}
		}));
		setUserIdInStore(userId);

		// const isRegistered = await getIsRegistered(userId);
		const isRegistered = true;

		if (!isRegistered) {
			await createUser(userId);
		}
	}

	if (isAuth && !url.searchParams.get('user_id')) {
		url.searchParams.append('user_id', String(userIdFromStore));
		await redirect(url.toString());
	}

	return {};
};
