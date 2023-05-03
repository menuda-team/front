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
			throw await error(401, 'user id is not found');
		}

		setUserIdInStore(userId);
	}

	let botId = url.searchParams.get('bot-id');

	if (browser) {
		if (!botId) {
			botId = window.sessionStorage.getItem('bot-id');
		} else {
			window.sessionStorage.setItem('bot-id', botId);
		}
	}

	api.interceptors.request.use((config) => ({
		...config,
		headers: {
			'user-id': userId,
			'bot-id': botId
		}
	}));

	return {};
};
