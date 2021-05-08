<script lang="ts">
	export let target: string;
	export let e: 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const click = (screen: string): void => {
		const c = JSON.parse(localStorage.getItem('game'));

		c[e] = true;

		localStorage.setItem('game', JSON.stringify(c));

		dispatch('click', {
			screen,
		});
	};
</script>

<div on:click={() => click(target)}>Continue</div>

<style lang="scss">
	@import '../styles/vars';
	div {
		@include Button;
		display: block;
		position: absolute;
		right: 0.6vh;
		top: 0.6vh;
		padding: 0;
		width: 8vw;
		font-size: 1.4vw;
	}
</style>
