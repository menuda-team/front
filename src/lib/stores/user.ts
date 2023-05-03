import type { User } from '$lib/types';
import { get, writable } from 'svelte/store';

const user = writable<User>({
	id: undefined
});

export const setUserId = (userId: number) => {
	user.set({
		id: userId
	});
};

export const getUserId = () => get(user).id;

export default user;
