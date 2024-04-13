<script lang="ts">
	import type { Article } from '$lib/index';
	import booleanStore from './store';
	import { fade } from 'svelte/transition';
	let value : boolean;

	// Subscribe to the store
	booleanStore.subscribe((v) => {
		value = v;
	});
	function formatNiceDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	}
	function checkNull(check: string | null) {
		if (check === null || check === '') {
			return 'unknown';
		}
		return check;
	}
	export let art: Article = {
		url: '',
		urlToImage: '',
		source: { name: '', id: '' },
		title: '',
		content: '',
		description: '',
		author: '',
		publishedAt: ''
	};
</script>

{#if value}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
        on:click={() => booleanStore.set(false)}
		class="h-screen w-screen grid place-items-center fixed top-0 z-30 half-black"
	>
		<div
		in:fade={{ duration: 300 }} 
		class="card card-hover flex flex-col w-[95%] max-w-[1200px] pointer-events-auto">
			<header class="z-30">
				<img
					loading="lazy"
					src={art.urlToImage
						? art.urlToImage
						: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
					class="bg-black/50 w-full aspect-[21/9] rounded"
					alt={art.title}
				/>
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6" data-toc-ignore>Source: {checkNull(art.source.name)}</h6>
				<h3 class="h3" data-toc-ignore>{art.title}</h3>
				<article>
					{art.content}
				</article>
				<div class="grid items-center">
					<a class=" btn variant-filled-primary" target="_blank" href={art.url}>Link to article</a>
				</div>
			</div>
			<hr class="opacity-60 mt-auto" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>By {checkNull(art.author)}</h6>
					<small>On {formatNiceDate(art.publishedAt)}</small>
				</div>
			</footer>
		</div>
	</div>
{/if}

<style>
	.half-black {
		background: rgba(0, 0, 0, 0.4);
	}
</style>
