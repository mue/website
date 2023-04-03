<script>
	export let browsers;

	import { onMount } from "svelte";
	import { UAParser } from "ua-parser-js";
	import ArrowRightIcon from "./heroicons/mini/ArrowRight.svelte";

	 // "default" (GitHub) would make more sense, but the layout shifts too much
	let browser = "chrome";

	onMount(() => {
		const ua = new UAParser(navigator.userAgent);
		browser =
			ua.getDevice().type === "mobile" || ua.getDevice().type === "tablet"
				? "unsupported"
				: ua.getBrowser().name.toLowerCase();
	});
</script>

<a href={browsers[browser].url} target="_blank">
	<button class="mue-button shadow-lg">
		<span class="flex items-center gap-2">
			{browsers[browser].text}
			<ArrowRightIcon />
		</span>
	</button>
</a>
