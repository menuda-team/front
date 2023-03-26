<script lang="ts">
	import CartCounterButton from '$lib/components/CartCounterButton.svelte';

	export let item = null;

	const imageStub = 'https://farsh-recept.ru/wp-content/uploads/2020/04/s-bekonom.jpg';
</script>

{#if item}
	<div class="rounded shadow flex w-full min-h-[150px] dark:bg-dark-black2">
		<img class="w-[150px] object-cover rounded mr-6" src={item.product.imageUrl || imageStub} alt={item.product.name} />
		<div class="pt-3.5 pb-2 pr-4 flex flex-col justify-between">
			<div>
				<div class="font-semibold text-lg mb-0.5 dark:text-white">{item.product.price} ₽</div>
				<div class="text-sm text-black2 mb-1.5 dark:text-dark-gray">{item.product.name}</div>
			</div>
			<div>
				<div class="text-xxs text-black3 mb-2.5 dark:text-dark-gray">{item.product.weight} г</div>
				<div class="w-[145px]">
					<CartCounterButton productId={item.product._id} price={item.product.price} counterOnly={true} />
				</div>
			</div>
		</div>
	</div>
{/if}
