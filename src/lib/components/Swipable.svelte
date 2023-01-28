<script lang='ts'>
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let classes;
	export let onClose = () => null;

	let touchstartY = 0;
	let touchendY = 0;
	let diff = 0;
	let swipableItem: HTMLElement = null;
	let threshold;

	onMount(() => {
		threshold = window.innerHeight / 4;
	});

	const onTouchStart = (e: TouchEvent) => {
		touchstartY = e.changedTouches[0].pageY;
		swipableItem.style.transition = 'transform 0s';
	};

	const onTouchMove = (e: TouchEvent) => {
		diff = e.changedTouches[0].pageY - touchstartY;
		const isDownSwipe = diff > 0;
		if (isDownSwipe) {
			swipableItem.style.transform = `translateY(${diff}px)`;
		}
	};

	const onTouchEnd = (e: TouchEvent) => {
		touchendY = e.changedTouches[0].pageY;
		handleSwipeDown();
	};

	function handleSwipeDown() {
		const isDownSwipe = touchendY > touchstartY;
		const isStrongSwipe = diff > threshold;

		if (isStrongSwipe && isDownSwipe) {
			onClose();
		} else {
			swipableItem.style.transition = 'transform 0.2s';
			swipableItem.style.transform = `translateY(0px)`;
		}
	}
</script>

<div
	bind:this={swipableItem}
	class={`${classes}`}
	in:slide
	on:touchend={onTouchEnd}
	on:touchmove={onTouchMove}
	on:touchstart={onTouchStart}
	out:slide>
	<slot></slot>
</div>

