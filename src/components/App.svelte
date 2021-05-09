<script lang="ts">
	import Titlescreen from '@components/Titlescreen.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Event1 from './Event1.svelte';
	import Event2 from './Event2.svelte';
	import Event3 from './Event4.svelte';
	import Event4 from './Event3.svelte';
	import Event5 from './Event5.svelte';
	import Event6 from './Event6.svelte';
	import Event7 from './Event7.svelte';
	import LevelSelect from './LevelSelect.svelte';
	import type { SaveData } from '@data/data';
	import Credits from './Credits.svelte';

	if (!localStorage.getItem('game')) {
		localStorage.setItem(
			'game',
			JSON.stringify({
				e1: false,
				e2: false,
				e3: false,
				e4: false,
				e5: false,
				e6: false,
				e7: false,
			} as SaveData)
		);
	}

	let screen:
		| 'title'
		| 'play'
		| 'credits'
		| 'e1'
		| 'e2'
		| 'e3'
		| 'e4'
		| 'e5'
		| 'e6'
		| 'e6' = 'title';

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
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: 100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: 100 }}
	>
		<LevelSelect on:click={click} />
	</div>
{:else if screen === 'credits'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: 100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: 100 }}
	>
		<Credits on:click={click} />
	</div>
{:else if screen === 'e1'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event1 on:click={click} />
	</div>
{:else if screen === 'e2'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event2 on:click={click} />
	</div>
{:else if screen === 'e3'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event3 on:click={click} />
	</div>
{:else if screen === 'e4'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event4 on:click={click} />
	</div>
{:else if screen === 'e5'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event5 on:click={click} />
	</div>
{:else if screen === 'e6'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event6 on:click={click} />
	</div>
{:else if screen === 'e7'}
	<div
		in:fly={{ easing: cubicOut, delay: 250, duration: 250, y: -100 }}
		out:fly={{ easing: cubicOut, duration: 250, y: -100 }}
	>
		<Event7 on:click={click} />
	</div>
{/if}

<style lang="scss">
	@import '../styles/vars';

	div {
		width: 100%;
		height: 100%;
	}
</style>
