<script lang="ts">
	import type { Article } from '$lib/index';
	import { onMount } from 'svelte';
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
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show2');
				} else {
					entry.target.classList.remove('show2');
				}
			});
		});

		// Query and observe hidden elements
		hiddenElements = document.querySelectorAll('.hidden2');
		hiddenElements.forEach((el: any) => observer.observe(el));
		return () => {
			observer.disconnect();
		};
	});
	let hiddenElements: any = [];
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

<div class="hidden2 h-full">
		<div class="card card-hover overflow-hidden flex flex-col h-full">
		<header>
			<img
				loading="lazy"
				src={art.urlToImage
					? art.urlToImage
					: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
				class="bg-black/50 w-full aspect-[21/9]"
				alt={art.title}
			/>
		</header>
		<div class="p-4 space-y-4">
			<h6 class="h6" data-toc-ignore>Source: {checkNull(art.source.name)}</h6>
			<h3 class="h3" data-toc-ignore>{art.title}</h3>
			<article>
				<p class="line-clamp-3">
					{art.description}
				</p>
			</article>
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

<style>
	.hidden2 {
		opacity: 0;
		transition: all 0.5s;
		filter: blur(5px);
		transform: translateX(-100%);
		transition-timing-function: ease-in;
	}
	@media (prefers-reduced-motion) {
		.hidden2 {
			transition: none;
		}
	}
</style>
