<script lang="ts">
	import "virtual:uno.css";
	import "@fontsource-variable/lexend-deca";
	import { page } from "$app/stores";

	// const url_parts = $page.url.pathname.split("/");
	// url_parts[1] = "en";
	// const canonical = new URL(url_parts.join("/"), $page.url.origin);
	const canonical = new URL("/en/" + $page.url.pathname.split('/').slice(2).join("/"), $page.url.origin);
</script>

<svelte:head>
	<link rel="canonical" href={canonical.toString()} />
</svelte:head>

<div
	id="app"
	class="relative font-sans text-white bg-gradient-to-r from-mue-orange-light dark:from-mue-orange-dark to-mue-pink-light dark:to-mue-pink-dark"
>
	

https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
https://www.thisdot.co/blog/how-to-quickly-build-and-deploy-a-static-markdown-blog-with-sveltekit/
https://joyofcode.xyz/sveltekit-markdown-blog#layout-and-styles
https://dev.to/willkre/render-markdown-from-a-string-in-svelte-mdsvex-sveltekit-1597
https://github.com/lokalise/i18n-ally/wiki/FAQ
https://github.com/lucaong/minisearch
https://github.com/nextapps-de/flexsearch
	<slot />
</div>
