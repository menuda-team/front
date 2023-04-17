<script lang="ts">
	import { slide } from 'svelte/transition';
	import cart from '$lib/stores/cart';
	import user from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import CartItem from '$lib/components/CartItem.svelte';
	import CartButton from '$lib/components/CartButton.svelte';
	import type { Cart, User, InvoiceStatusType } from '$lib/types';
	import { createInvoiceLink } from '$lib/resources/api';
	import { INVOICE_STATUS_TYPES } from '$lib/constants';

	$: if (($cart as Cart).items.length === 0 && browser) {
		goto('/menu');
	}

	let comment = '';

	const onCartButtonClick = async () => {
		const {link} = await createInvoiceLink(($cart as Cart).items.map(item => ({
			label: item.product.name,
			amount: item.product.price,
		})));

		Telegram.WebApp.openInvoice(link, (status: InvoiceStatusType) => {
			switch (status) {
				case INVOICE_STATUS_TYPES.PAID:
					Telegram.WebApp.close();
					break;
				case INVOICE_STATUS_TYPES.FAILED:
					Telegram.WebApp.HapticFeedback.notificationOccured('error');
					break;
				default:
					Telegram.WebApp.HapticFeedback.notificationOccured('warning');
			}
		})
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
