<script>
	export let strings;

	import { onMount } from "svelte";
	import Typewriter from "svelte-typewriter";

	// only show the first word in server-side rendering so it doesn't look stupid when JS is disabled
	let words = [strings[0]];
	onMount(() => {
		words = strings;
	});
</script>

<Typewriter cursor={false} interval={100} wordInterval={2500} unwriteInterval={50} mode="loop">
	{#each words as word}
		<span>{word}</span>
	{/each}
</Typewriter>
