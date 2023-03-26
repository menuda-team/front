<script lang="ts">
	import cart from '$lib/stores/cart';
	import { getUserId } from '$lib/stores/user';
	import { handleAddToCart, handleRemoveFromCart } from '$lib/handlers/cart';
	import type { Cart } from '$lib/types';
	import Button from './Button.svelte';

	export let productId;
	export let counterOnly = false;

	let loading = false;

	const onAddToCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const userId = getUserId();
		if (userId) {
			loading = true;
			await handleAddToCart(productId, userId);
			loading = false;
		}
	};
	const onRemoveFromCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const userId = getUserId();
		if (userId) {
			loading = true;
			await handleRemoveFromCart(productId, userId);
			loading = false;
		}
	};

	let isAdded = false;
	let count;
	$: {
		isAdded = ($cart as Cart).items.some((item) => item.product._id === productId);
		if (isAdded) {
			count = ($cart as Cart).items.find((item) => item.product._id === productId).count;
		}
	}
</script>

{#if isAdded || counterOnly}
	<div class={`flex flex-row items-center justify-between w-full h-[35px] dark:text-white`}>
		<button class="text-center rounded w-33 flex-1" disabled={loading} on:click={onRemoveFromCart}> - </button>
		<div class="flex-1 text-center">
			{count}
		</div>
		<button disabled={loading} class="flex-1" on:click={onAddToCart}> + </button>
	</div>
{:else}
	<Button onClick={onAddToCart} size="s" type={loading ? 'disabled' : 'default'} classes="dark:bg-white">
		<span class="py-2 text-xs block">Добавить</span>
	</Button>
{/if}
