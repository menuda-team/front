import type { User } from '$lib/types';
import { get, writable } from 'svelte/store';

const user = writable<User>({
	id: null
});

export const setUserId = (userId: number) => {
	user.set({
		id: userId
	});
};

export const getUserId = () => get(user).id;

export const TEST_USER_ID = 'test';

export default user;
