<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Game from '@classes/Event2';
	import TextPopup from './TextPopup.svelte';
	import type { Writable } from 'svelte/store';

	let gameElement: HTMLElement;

	let game: Game;
	let text: Writable<string>;

	onMount(() => {
		game = new Game(gameElement);
		text = game.player.text;
	});

	onDestroy(() => {
		try {
			game.kill();
		} catch {}
	});
</script>

<main class="game" bind:this={gameElement} />

{#if $text}
	<TextPopup text={$text} />
{/if}

<style lang="scss">
	@import '../styles/vars';

	main {
		position: fixed;
		width: 100%;
		height: 100%;
		background: white;
	}
</style>
