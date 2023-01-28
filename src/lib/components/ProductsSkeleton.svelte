<script>
	export let count = 2;
	$: skeletons = new Array(count);
</script>

<div class="grid gap-4 grid-cols-2 animate-pulse -z-1">
	{#each skeletons as item}
		<div class="h-[286px] rounded shadow">
			<div class="rounded mb-3 h-[150px] w-full bg-bg-gray dark:bg-dark-gray" />
			<div class="mb-2 h-[15px] bg-bg-gray mx-4 dark:bg-dark-gray" />
			<div class="mb-2 h-[15px] bg-bg-gray mx-4 dark:bg-dark-gray" />
			<div class="mb-2 h-[15px] bg-bg-gray mx-4 dark:bg-dark-gray" />
			<div class="h-[35px] bg-bg-gray rounded mx-4 dark:bg-dark-gray" />
		</div>
	{/each}
</div>
