// TODO: настроить prettier
import type { Load } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { api } from '$lib/resources/api.js';
import { browser } from '$app/environment';
import { getUserId as getUserIdFromStore, setUserId as setUserIdInStore } from '$lib/stores/user.js';

export const ssr = false;

export const load: Load = async ({ url }) => {
	let userId = getUserIdFromStore();

	if (!userId) {
		userId = Telegram?.WebApp.initDataUnsafe.user?.id;

		if (!userId) {
			throw await error(401, 'userId is not found');
		}

		setUserIdInStore(userId);
	}

	let botId = url.searchParams.get('botId');

	if (browser) {
		if (!botId) {
			botId = window.sessionStorage.getItem('botId');
		} else {
			window.sessionStorage.setItem('botId', botId);
		}
	}

	api.interceptors.request.use((config) => ({
		...config,
		headers: {
			userId,
			botId
		}
	}));

	return {};
};
