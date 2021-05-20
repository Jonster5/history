<script lang=ts>
    import { onDestroy } from 'svelte';

    export const count = writable(0);

    const i = setInterval(() => $count++, 10);

    onDestroy(() => {
        clearInterval(i);
    })
</script>

<h2>{Math.floor(($count / 100) / 60)}:{Math.floor($count / 100) % 60}:{$count % 100}</h2>

<style lang=scss>
    h2 {
        display: block;
        position: fixed;
        color: white;

        top: 1vh;
        left: 1vw;
    }
</style>