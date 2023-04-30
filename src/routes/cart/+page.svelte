<script lang="ts">
	import { slide } from 'svelte/transition';
	import cart from '$lib/stores/cart';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import CartItem from '$lib/components/CartItem.svelte';
	import CartButton from '$lib/components/CartButton.svelte';
	import type { Cart, InvoiceStatusType } from '$lib/types';
	import { createInvoiceLink } from '$lib/resources/api';
	import { INVOICE_STATUS_TYPES } from '$lib/constants';
	import { getUserId } from '$lib/stores/user';

	$: if (($cart as Cart).items.length === 0 && browser) {
		goto('/menu');
	}

	let comment = '';

	const onCartButtonClick = async () => {
		const userId = getUserId();
		if (userId) {
			const {link} = await createInvoiceLink({
				items: ($cart as Cart).items,
			});

			Telegram.WebApp.openInvoice(link, async (status: InvoiceStatusType) => {
				console.log('!!!status:', status);
				switch (status) {
					case INVOICE_STATUS_TYPES.PENDING:
					case INVOICE_STATUS_TYPES.PAID:
						Telegram.WebApp.close();
						// await createOrder({
						// 	items: ($cart as Cart).items,
						// 	totalAmount: ($cart as Cart).totalAmount,
						// 	user: userId,
						// })
						break;
					case INVOICE_STATUS_TYPES.FAILED:
						console.error('Payment has been failed');
						break;
					default:
						console.warn('Payment has been canceled');
				}
			})
		}
	};
</script>

<svelte:head>
	<title>Корзина</title>
</svelte:head>

{#if $cart.items.length > 0}
	<div class="px-4" out:slide>
		<div class="flex pt-[22px] pb-[42px] items-center">
			<a href="/menu" class="dark:invert mr-4 w-[30px] h-[30px] flex items-center justify-center" sveltekit:noscroll>
				<img src="arrow.svg" alt="Назад" class="w-[25px] h-[25px]" />
			</a>
			<h1 class="text-xxl font-semibold dark:text-white">Ваш заказ</h1>
		</div>
		<div class="grid grid-cols-1 gap-5 mb-7">
			{#each $cart.items as item}
				<CartItem {item} />
			{/each}
		</div>
		<h1 class="text-xxl font-semibold mb-5 dark:text-white">Комментарий к заказу</h1>
		<textarea
			name=""
			rows="5"
			placeholder="Погорячее и побольше салфеток"
			class="rounded bg-bg-gray dark:bg-dark-black2 w-full py-4 px-5
										text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray
										focus:outline-none mb-10 resize-none dark:text-white"
			bind:value={comment}></textarea>
		<div class="fixed bottom-0 left-0 right-0">
			<CartButton actionText="Оформить заказ" totalAmount={$cart.totalAmount} action={onCartButtonClick} />
		</div>
	</div>
{/if}
