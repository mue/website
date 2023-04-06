<script>
	export let articles;
	export let index;
	export let strings;

	import lunr from "lunr";

	const idx = lunr.Index.load(index);
	let results = [];

	import { createCombobox } from "svelte-headlessui";
	import Transition from "svelte-transition";
	import MagnifyingGlass from "./heroicons/outline/MagnifyingGlass.svelte";

	const combobox = createCombobox({ label: "Search", selected: null });
</script>

<div class="relative w-full">
	<div
		class="relative w-full hover:opacity-80 transition duration-300 ease-in-out sm:text-sm"
	>
		<span
			class="text-black/50 dark:text-white/50 flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
		>
			<MagnifyingGlass />
		</span>
		<input
			use:combobox.input
			class="block p-2 pl-10 w-full rounded-lg border-2 border-neutral-400 dark:border-neutral-500 text-sm leading-5 text-black placeholder:text-black/50 dark:text-white dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-neutral-50 dark:bg-neutral-700"
			placeholder={strings.placeholder}
			type="search"
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
			class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg text-left bg-neutal-200/20 dark:bg-neutral-700/20 text-black dark:text-white border border-neutral-400 dark:border-neutral-500 backdrop-blur-lg backdrop-saturate-200 focus:outline-none text-sm"
		>
			{#each results as result}
				{@const article = articles.find(
					(article) => article.id === result.ref
				)}
				{@const position = Object.values(result.matchData.metadata)[0]
					?.text?.position[0]}
				<li
					class="relative cursor-default select-none py-2 px-6 hover:bg-black/10 dark:hover:bg-white/10 transition duration-300 ease-in-out"
				>
					<a
						href={`./kb/${article.id.split("/")[1]}/${
							article.slug
						}`}
					>
						<span class="block truncate font-normal"
							>{article.data.title}</span
						>
						<p
							class="line-clamp-3 text-xs text-black/50 dark:text-white/50"
						>
							<!-- {#if position}
							{article.text.substring(position[0] - 75, Math.min(position[1] + 75, article.text.length))}
							...
						{:else}
							{article.text.substring(0, 150)}
							...
						{/if} -->
							{article.text}
						</p>
					</a>
				</li>
			{:else}
				<li
					class="relative cursor-default select-none py-2 px-6 text-center"
				>
					<span
						class="block truncate font-normal text-black/75 dark:text-white/75"
						>{strings.no_results}
					</span>
				</li>
			{/each}
		</ul>
	</Transition>
</div>
