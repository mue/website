<script>
	import { localizePath } from "astro-i18next";
</script>

<nav class="mt-12">
	<span class="font-bold text-xl">I'm going to footer you</span>
	<br />
	<a href={localizePath("/support")}>support</a>
	<br />
	theme <!-- TODO: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection -->
</nav>
