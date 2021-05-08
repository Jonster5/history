<script lang="ts">
	import vsrc from '@assets/videos/enigma.mp4';
	import { onMount } from 'svelte';
	import ContinueButton from './ContinueButton.svelte';

	let show = false;

	onMount(() => {
		setTimeout(() => {
			show = true;
		}, 5000);
	});
</script>

<video width="1600" height="900" autoplay>
	<source src={vsrc} type="video/mp4" />
	<track kind="captions" />
	Your browser does not support the video tag.
</video>

{#if show}
	<ContinueButton target="play" e="e3" on:click />
{/if}

<style lang="scss">
	video {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
		position: absolute;
	}
</style>
