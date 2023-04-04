<script>
	export let articles;
	export let index;

	import lunr from "lunr";

	const idx = lunr.Index.load(index);
	let results = [];

	import { createCombobox } from "svelte-headlessui";
	import Transition from "svelte-transition";

	const combobox = createCombobox({ label: "Search", selected: null });
</script>

<div class="max-w-sm">
	<div class="relative m-2">
		<div
			class="relative w-full cursor-default overflow-hidden rounded-lg bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 text-black dark:text-white border-1 border-neutral-400 dark:border-neutral-500 backdrop-blur-lg backdrop-saturate-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-rose-300 transition duration-300 ease-in-out sm:text-sm"
		>
			<input
				use:combobox.input
				class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-black placeholder:text-black/50 dark:text-white dark:placeholder:text-white/50 focus:ring-0 bg-transparent"
				placeholder="SEARCH BOX"
				value={$combobox.selected?.title || ""}
				on:input={function () {
					results = idx.search(this.value).slice(0, 15);
				}}
			/>
		</div>

		<Transition
			show={$combobox.expanded}
			enter="transition ease-in-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition ease-in-out duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			on:after-leave={() => combobox.reset()}
		>
			<ul
				use:combobox.items
				class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 text-black dark:text-white border-1 border-neutral-400 dark:border-neutral-500 backdrop-blur-lg backdrop-saturate-200 focus:outline-none sm:text-sm"
			>
				{#each results as result}
					{@const article = articles.find((article) => article.id === result.ref)}
					<li
						class="relative cursor-default select-none py-2 px-6 hover:bg-black/10 dark:hover:bg-white/10 transition duration-300 ease-in-out "
					>
						<span class="block truncate font-normal"
							>{article.data.title}</span
						>
					</li>
				{:else}
					<li
						class="relative cursor-default select-none py-2 px-6 text-center"
					>
						<span class="block truncate font-normal text-black/75 dark:text-white/75"
							><!--TODO: TRANSLATE -->
							No results found
							</span
						>
					</li>
				{/each}
			</ul>
		</Transition>
	</div>
</div>

<!--
<input
	type="text"
	placeholder="translate me"
	on:input={function () {
		results = idx.search(this.value);
	}}
/> -->

{#each results as result}
	<!-- <br />
	{articles.find((article) => article.id === result.ref)?.data.title} -->
{/each}
