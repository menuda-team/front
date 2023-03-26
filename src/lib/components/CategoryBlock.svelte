<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { getProductsByCategory } from '$lib/resources/api';
	import { MENU_EVENT_TYPES } from '$lib/constants';
	import CartCounterButton from './CartCounterButton.svelte';
	import ProductsSkeleton from './ProductsSkeleton.svelte';
	import type { Product } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let category: string;
	export let productsCount: number;
	export let categoryId: number;
	export let unobserve = () => null;
	export let openProductCard = () => null;
	export let isVisible: boolean;
	export let shouldLoadData: boolean;
	export let products: Product[] = [];

	$: if (products.length === 0 && shouldLoadData && categoryId) {
		getProductsByCategory(categoryId).then((result) => {
			if (result.length > 0) {
				products = result;
			}
		});
	}

	$: if (isVisible) {
		dispatch(MENU_EVENT_TYPES.CATEGORY_VISIBLE, {
			category
		});
	}

	const imageStub = 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg';

	onDestroy(unobserve);
</script>

<div class="pt-[60px] px-4" id={category}>
	<h1 class="mb-[40px] pl-2 text-xxl font-semibold dark:text-white">
		{category}
	</h1>
	{#if products.length > 0}
		<div class="grid gap-4 grid-cols-2">
			{#each products as product}
				<div
					class="rounded shadow bg-white dark:bg-dark-black2 flex flex-col justify-between"
					on:click={() => openProductCard(product)}
				>
					<div>
						<img
							src={product.imageUrl || imageStub}
							class="rounded mb-3 h-[150px] w-full object-cover"
							alt={product.name}
						/>
						<div class="font-medium mb-1 text-lg pr-4 pl-4 text-black1 dark:text-white">{product.price} ₽</div>
						<div class="mb-1.5 text-sm pr-4 pl-4 text-black2 dark:text-dark-gray">{product.name}</div>
						<div class="text-xs mb-2.5 pr-4 pl-4 text-black3 dark:text-dark-gray">{product.weight} г</div>
					</div>
					<div class="mb-2 w-[calc(100%-30px)] mx-2">
						<CartCounterButton productId={product._id} price={product.price} />
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<ProductsSkeleton count={productsCount} />
	{/if}
</div>
