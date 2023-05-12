<script>
	import Button from './Button.svelte';
	import { slide } from 'svelte/transition';

	export let actionText = '';
	export let action = () => null;
	export let link = '/cart';
	export let totalAmount = 0;
	export let buttonType = 'action';
</script>

<div class="w-full p-4 flex bg-white font-medium text-lg dark:bg-dark-black2" in:slide out:slide>

	{#if actionText.length > 0}
		<a href={link} class="mr-2 basis-7/12" sveltekit:noscroll>
			<Button size="m">{totalAmount} ₽</Button>
		</a>
		<a href={link} class="w-full" sveltekit:noscroll>
			<Button size="m" type={buttonType} onClick={action}>{actionText}</Button>
		</a>
		{:else}
		<a href={link} class="mr-2 w-full" sveltekit:noscroll>
			<Button size="m" >{totalAmount} ₽</Button>
		</a>
	{/if}
</div>
