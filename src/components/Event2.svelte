<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Game from '@classes/Event2';
	import TextPopup from './TextPopup.svelte';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	let gameElement: HTMLElement;

	let game: Game;
	let text: Writable<string>;

	let ug: () => void;

	onMount(() => {
		game = new Game(gameElement);
		text = game.player.text;
		ug = game.gameOver.subscribe((g) => {
			if (g) {
				dispatch('click', {
					screen: 'play',
				});
			}
		});
	});

	onDestroy(() => {
		try {
			ug();
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
