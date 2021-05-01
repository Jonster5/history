<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Game from '@classes/Event2';

	let gameElement: HTMLElement;

	let game: Game;

	onMount(() => {
		game = new Game(gameElement);
	});

	onDestroy(() => {
		try {
			game.kill();
		} catch {}
	});
</script>

<main class="game" bind:this={gameElement} />

<style lang="scss">
	@import '../styles/vars';

	main {
		position: fixed;
		width: 100%;
		height: 100%;
		background: black;
	}
</style>
