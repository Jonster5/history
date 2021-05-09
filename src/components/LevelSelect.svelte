<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { SaveData } from '@data/data';
	import Backbutton from './Backbutton.svelte';
	import mSrc from '@assets/music/reflection.mp3';

	const completed: SaveData = JSON.parse(localStorage.getItem('game'));

	const dispatch = createEventDispatcher();

	let music: HTMLAudioElement;

	const click = (screen: string): void => {
		dispatch('click', {
			screen,
		});
	};

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
	<Backbutton target="title" />

	<h1>Select Level</h1>
	<div>
		<button class={completed.e1 ? 'seen' : ''} on:click={() => click('e1')}
			>Formation of the Axis Powers
		</button>
		<button class={completed.e2 ? 'seen' : ''} on:click={() => click('e2')}
			>Blitzkrieg & The Maginot Line</button
		>
		<button class={completed.e4 ? 'seen' : ''} on:click={() => click('e3')}
			>FDR & Pearl Harbor & Japanese Internment</button
		>
		<button class={completed.e3 ? 'seen' : ''} on:click={() => click('e4')}
			>Enigma</button
		>
		<button class={completed.e5 ? 'seen' : ''} on:click={() => click('e5')}
			>Operation Overlord</button
		>
		<button class={completed.e6 ? 'seen' : ''} on:click={() => click('e6')}
			>Battle of Berlin</button
		>
		<button class={completed.e7 ? 'seen' : ''} on:click={() => click('e7')}
			>Oppenheimer & Hiroshima</button
		>
	</div>
</main>

<style lang="scss">
	@import '../styles/vars';

	main {
		background: black;
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			font-family: 'Righteous';
			-moz-user-select: none;
			-webkit-user-select: none;
			color: $title;
			font-size: 6vw;
			margin: 4vh 4vw;
		}

		div {
			display: flex;
			flex-direction: column;
			align-items: center;

			button {
				color: white;
				background: none;
				border: none;
				margin: 2vh;

				&:hover {
					cursor: pointer;
					color: grey;
				}
			}

			.seen {
				color: lime;
			}
		}
	}
</style>
