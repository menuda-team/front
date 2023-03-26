<script lang="ts">
	import { slide } from 'svelte/transition';
	import cart from '$lib/stores/cart';
	import user from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import CartItem from '$lib/components/CartItem.svelte';
	import CartButton from '$lib/components/CartButton.svelte';
	import type { Cart, User } from '$lib/types';

	$: if (($cart as Cart).items.length === 0 && browser) {
		goto('/menu');
	}

	let comment = '';

	const connect = async () =>
		new Promise(function (resolve, reject) {
			const ws = new WebSocket(`wss://socket.disht.ru?u=${($user as User).id}`);
			ws.onopen = function () {
				console.log('[WS] Соединение установленно');
				resolve(ws);
			};
			ws.onerror = function () {
				reject(ws);
			};

			ws.onclose = function (event) {
				if (event.wasClean) {
					console.log('[WS] Соединение закрыто чисто');
				} else {
					console.log('[WS] Соединение закрыто обрывом');
					setTimeout(() => {
						connect();
					}, 1000);
				}
				console.log('[WS] Код события: ' + event.code + ' / ' + event.reason);
			};

			ws.onmessage = function (evt) {
				console.log(evt);
			};
		});

	const onCartButtonClick = async () => {
		// try {
		// 	const ws = await connect();
		// 	await ws.send(
		// 		JSON.stringify({
		// 			event: 'payOrder',
		// 			data: {
		// 				items: ($cart as Cart).items.map(({ product_id, count, product }) => ({
		// 					product_id,
		// 					count,
		// 					price: product.price,
		// 					name: product.name,
		// 					sale_price: product.salePrice
		// 				})),
		// 				totalAmount: ($cart as Cart).totalAmount,
		// 				comment
		// 			},
		// 			userId: ($user as User).id
		// 		})
		// 	);
		// 	Telegram.WebApp.close();
		// } catch (err) {
		// 	console.log('onCartButtonClick error');
		// 	console.log(err.name + ': ' + err.message);
		// }
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
