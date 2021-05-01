<script lang="ts">
	import Titlescreen from '@components/Titlescreen.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Event1 from './Event1.svelte';
	import Event2 from './Event2.svelte';
	import Event3 from './Event3.svelte';
	import Event4 from './Event4.svelte';
	import Event5 from './Event5.svelte';
	import Event6 from './Event6.svelte';
	import Event7 from './Event7.svelte';

	let screen = 'title';

	const click = ({ detail }) => {
		screen = detail.screen;
	};
</script>

{#if screen === 'title'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: 100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: 100 }}
	>
		<Titlescreen on:click={click} />
	</div>
{:else if screen === 'play'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event2 on:click={click} />
	</div>
{:else}
	<Titlescreen on:click={click} />
{/if}

<style lang="scss">
	@import '../styles/vars';

	div {
		width: 100%;
		height: 100%;
	}
</style>
