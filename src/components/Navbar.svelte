<script>
	export let onPage;

	import { onMount } from "svelte";
	import { localizePath } from "astro-i18next";
	import LanguageIcon from "./heroicons/outline/Language.svelte";
	import { LanguageSelector } from "astro-i18next/components";
	import i18nConfig from "../../astro-i18next.config.mjs";
	import { t } from "i18next";

	let classes =
		"bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 border-b border-neutral-400 dark:border-neutral-500 backdrop-blur-md backdrop-saturate-50";
	if (onPage) {
		classes += "rounded-b-xl";
	}
	classes = classes.split(" ");
	let navbar;

	onMount(() => {
		console.log('MOUNTED')
		window.onscroll = () => {
			console.log('SCROLLING')
			if (document.documentElement.scrollTop > 50) {
				navbar.classList.add(...classes);
			} else {
				navbar.classList.remove(...classes);
			}
		};
	});
</script>

<nav
	bind:this={navbar}
	class={`z-50 mx-0 p-2 sticky top-0 transition duration-300 ease-in-out ${
		onPage ? "text-black dark:text-white" : "text-white dark:text-white"
	}`}
>
<!-- "py-1 px-5 rounded-full bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 text-black dark:text-white border border-neutral-400 dark:border-neutral-500 backdrop-blur-sm backdrop-saturate-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-rose-300 transition duration-300 ease-in-out cursor-pointer -->
	<button
		id="dropdownDefaultButton"
		data-dropdown-toggle="dropdown"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		type="button"
		>Dropdown button <svg
			class="w-2.5 h-2.5 ml-2.5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 10 6"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m1 1 4 4 4-4"
			/>
		</svg>
	</button>

	<!-- Dropdown menu -->
	<div
		id="dropdown"
		class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
	>
		<ul
			class="py-2 text-sm text-gray-700 dark:text-gray-200"
			aria-labelledby="dropdownDefaultButton"
		>
			<li>
				<a
					href="#"
					class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>Dashboard</a
				>
			</li>
			<li>
				<a
					href="#"
					class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>Settings</a
				>
			</li>
			<li>
				<a
					href="#"
					class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>Earnings</a
				>
			</li>
			<li>
				<a
					href="#"
					class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>Sign out</a
				>
			</li>
		</ul>
	</div>

</nav>
