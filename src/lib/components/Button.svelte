<script lang='ts'>
	export let onClick = null;
	export let type: 'action' | 'default' | 'danger' | 'disabled' = 'default';
	export let size: 's' | 'm' = 's';
	export let classes: string;

	let backgroundCssClass = '';
	$: switch (type) {
		case 'action':
			backgroundCssClass = 'bg-yellow';
			break;
		case 'default':
			backgroundCssClass = 'bg-bg-gray';
			break;
		case 'disabled':
			backgroundCssClass = 'bg-bg-gray text-black3';
			break;
		case 'danger':
			backgroundCssClass = 'bg-red';
			break;
	}

	let heightCssClass = '';
	$: switch (size) {
		case 's':
			heightCssClass = 'h-[35px]';
			break;
		case 'm':
			heightCssClass = 'h-[49px]';
			break;
	}
</script>

<button class={`
				rounded w-full
				${classes}
				${backgroundCssClass}
				${heightCssClass}`
				}
				disabled={type === 'disabled'}
				on:click={onClick}
>
	<slot />
</button>