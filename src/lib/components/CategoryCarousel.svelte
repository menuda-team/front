<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { MENU_EVENT_TYPES } from '$lib/constants';

	export let bubble, scrollBar, carouselItems, categories, carouselXPadding;

	carouselXPadding = 15;

	const dispatch = createEventDispatcher();

	const clickItemHandler = (category) => {
		dispatch(MENU_EVENT_TYPES.CAROUSEL_CLICK, {
			category
		});
	};
</script>

<div class="fixed top-0 bg-white w-full z-10 dark:bg-dark-black1 dark:border-b dark:border-white">
	<nav
		bind:this={scrollBar}
		class="overflow-x-scroll overflow-y-hidden w-full shadow h-[62px] py-3.5 relative"
		id="scrollbox"
	>
		<div
			bind:this={bubble}
			class="absolute bg-bg-gray top-3.5 left-4 h-[34px] rounded transition-transform duration-100 dark:bg-white"
		/>
		<ul class="relative flex flex-row align-center w-full">
			<span class="min-w-[15px] min-h-[1px] fake-padding" />
			{#each categories as category}
				<li
					class="text-xxbase whitespace-nowrap text-black3 dark:text-dark-gray
								px-2.5 py-1.75 align-middle text-center
								flex justify-center align-center cursor-pointer"
					on:click={() => clickItemHandler(category)}
					bind:this={carouselItems[category]}
				>
					{category}
				</li>
			{/each}
			<span class="min-w-[15px] min-h-[1px] fake-padding" />
		</ul>
	</nav>
</div>
