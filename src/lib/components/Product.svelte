<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import cart from '$lib/stores/cart';
	import { handleSetCartItemCount } from '$lib/handlers/cart';
	import type { Cart, Product } from '$lib/types';

	export let product: Product;
	export let closeProductCard = () => null;

	let isAdded = false;
	let count = 1;
	$: {
		isAdded = ($cart as Cart).items.some((item) => item.product_id === product.id);
		if (isAdded) {
			count = ($cart as Cart).items.find((item) => item.product_id === product.id).count;
		}
	}

	const onPlusClick = () => ++count;
	const onMinusClick = () => (count > 0 ? --count : count);

	let loading = false;
	const onActionButtonClick = async () => {
		loading = true;
		await handleSetCartItemCount(product.id, count);
		loading = false;

		closeProductCard();
	};

	let buttonText = 'Добавить';
	$: if (isAdded) {
		if (count > 0) {
			buttonText = 'Сохранить';
		} else {
			buttonText = 'Удалить';
		}
	}

	let buttonType = 'action';
	$: if (loading) {
		buttonType = 'disabled';
	} else if (isAdded && count === 0) {
		buttonType = 'danger';
	}

	let isMinusButtonDisabled = false;
	$: if (isAdded) {
		isMinusButtonDisabled = count === 0;
	} else {
		isMinusButtonDisabled = count === 1;
	}

	const imageStub = 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg';
</script>

{#if !!product}
	<div class="flex flex-col justify-between bg-bg-gray h-full rounded-t overflow-hidden dark:bg-dark-black2">
		<div class="pb-5">
			<img src={product.imageUrl || imageStub} alt={product.name} class="object-cover w-full h-[300px]" />
			<div class="px-4">
				<div class="mt-5 font-semibold text-xl dark:text-white">
					{product.name}
				</div>
				<div class="mt-1 text-m text-black3 dark:text-dark-gray">
					{product.weight}
				</div>
				<div class="mt-5 text-xbase text-black2 dark:text-dark-gray">
					{product.description}
				</div>
			</div>
		</div>
		<div class="px-4 pb-4 pt-5 w-full bg-white dark:bg-dark-black2 dark:border-t dark:border-dark-gray">
			<div class="flex flex-row justify-between mb-5 text-xxxbase text-black2 dark:text-white">
				<div class="mr-6">
					{product.name}
				</div>
				<div class="whitespace-nowrap">
					{product.price} ₽
				</div>
			</div>
			<div class="flex">
				<div
					class="flex items-center justify-between
										h-[49px] basis-7/12 mr-2 bg-bg-gray
										rounded text-black1"
				>
					<button
						class="text-center rounded flex-1 disabled:opacity-20"
						disabled={isMinusButtonDisabled}
						on:click={onMinusClick}
					>
						–
					</button>
					<div class="flex-1 text-center">
						{count}
					</div>
					<button class="flex-1" on:click={onPlusClick}> + </button>
				</div>
				<Button type={buttonType} size="m" classes="font-medium text-lg" onClick={onActionButtonClick}>
					{buttonText}
				</Button>
			</div>
		</div>
	</div>
{/if}
