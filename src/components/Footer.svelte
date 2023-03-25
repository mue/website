<script>
	import { changeLanguage } from "i18next";
	import { localizePath } from "astro-i18next";
</script>

<nav>
	<span class="font-bold text-xl">I'm going to footer you</span>
	<br />
	<a href={localizePath("/support")}>support</a>
	<br />
	theme
</nav>
