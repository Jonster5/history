<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import mSrc from '@assets/music/enterhallownest.mp3';

	const dispatch = createEventDispatcher();

	const click = (screen: string): void => {
		dispatch('click', {
			screen,
		});
	};

	let music: HTMLAudioElement;

	onMount(() => {
		music.play();
		music.volume = 0.3;
	});
</script>

<audio bind:this={music} hidden loop>
	<source src={mSrc} type="audio/ogg" />
	Your browser does not support the audio element.
	<track kind="captions" />
</audio>

<main>
	<div class="title">WWII Game</div>
	<div class="version">V0.1</div>
	<div class="button" on:click={() => click('play')}>Play</div>
	<div class="button" on:click={() => click('credits')}>Credits</div>
</main>

<style lang="scss">
	@import '../styles/vars';

	main {
		width: 100%;
		height: 100%;
		background: radial-gradient(#00000000, #000000ff),
			url('/images/titlebg.jpg');
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-family: 'Righteous';
		-moz-user-select: none;
		-webkit-user-select: none;
		color: $title;
		font-size: 10vw;
		margin: 4vh 4vw;
		margin-bottom: 2vh;
	}

	.version {
		font-family: 'Trispace';
		-moz-user-select: none;
		-webkit-user-select: none;
		color: $subtitle;
		background: $UIBoxBG;
		padding: 1vh 1vw;
		font-size: 1vw;
		margin: 2vh;
		margin-top: 0;
	}

	.button {
		@include Button;
		width: 15%;
		margin: 2vh 1vw;
		font-size: 2vw;
	}
</style>
