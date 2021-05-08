<script lang="ts">
	export let text: string;
</script>

<article>{@html text}</article>

<style lang="scss">
	article {
		position: absolute;
		width: 50vw;
		height: 40vh;

		left: 50%;
		top: 2%;
		transform: translateX(-50%);

		background: #000000aa;
		border: 1vh solid white;

		color: white;

		font-family: 'Trispace', monospace;
		padding: 1vh;

		box-sizing: border-box;
	}
</style>
