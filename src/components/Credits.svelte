<script lang="ts">
	import { onMount } from 'svelte';
	import mSrc from '@assets/music/whitepalace.mp3';
	import Backbutton from './Backbutton.svelte';

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
	<Backbutton target="title" on:click />

	<div>Project assigned by: <em>Mr. Walsh</em></div>
</main>

<style lang="scss">
	main {
		width: 100%;
		height: 100%;
		background: radial-gradient(#222, #00000000);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		div {
			font-family: 'trispace';
			color: white;
			em {
				color: gold;
			}
		}
	}
</style>
