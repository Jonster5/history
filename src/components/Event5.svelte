<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Game from '@classes/Event5';
	import TextPopup from './TextPopup.svelte';
	import type { Writable } from 'svelte/store';
	import mSrc from '@assets/music/radiance.mp3';
	import type { SaveData } from '@data/data';

	const dispatch = createEventDispatcher();

	let gameElement: HTMLElement;

	let game: Game;
	let text: Writable<string>;
	let music: HTMLAudioElement;

	let ug: () => void;

	onMount(() => {
		game = new Game(gameElement);
		text = game.player.text;
		music.play();
		music.volume = 0.3;
		ug = game.gameOver.subscribe((g) => {
			const c: SaveData = JSON.parse(localStorage.getItem('game'));
			c.e5 = true;
			localStorage.setItem('game', JSON.stringify(c));

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

<audio bind:this={music} hidden loop>
	<source src={mSrc} type="audio/ogg" />
	Your browser does not support the audio element.
	<track kind="captions" />
</audio>

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
