<script lang="ts">
	import type { PageData } from './$types';
	import SelectDown from '$lib/SelectDown.svelte';
	import ArticleComponent from '$lib/ArticleComponent.svelte';
	import type { Article } from '$lib/index';
	import BigArticle from '$lib/BigArticle.svelte';
	import { goto } from '$app/navigation';
	import booleanStore from '$lib/store';
	export let data: PageData;

	let selectedCategory = '';
	const categories = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology'
	];
	//value from selectdown component
	let selectedCountry = '';
	function handleSelectedCountry(event: any) {
		selectedCountry = event.target.value;
	}
	//change options
	function handleSubmit() {
		let url = `?`
		let cateQuery = `category=${selectedCategory}`;
		if (selectedCountry){
			url += `country=${selectedCountry}`
		}
		if (selectedCategory) {
			if (selectedCountry){
				url += "&"
			}
			url += cateQuery 
		}
		goto(url);
	}
	//big article store stuff
	let value;
	booleanStore.subscribe((v) => {
		value = v;
	});
	let activeArt : Article
	function bigSet(a : Article){
		booleanStore.set(true)
		activeArt = a
	}
</script>

<svelte:head>
	<title>news for {data.props.country}</title>
</svelte:head>
<BigArticle art={activeArt} />
<div class="w-screen flex items-center justify-center flex-col">
	<div class="text-2xl py-3 text-center">
		<div>
			Currently showing top {data.props.news.length} 
			{#if data.props.country}
			news at <span class="uppercase">{data.props.country}</span>
			{/if}
			{#if data.props.category !== ''}
				for category:
				<span class="uppercase">{data.props.category}</span>
			{/if}
		</div>
		<form on:submit|preventDefault={handleSubmit} class="pt-2 gap-1 flex flex-col items-center">
			<p class="text-sm">Select atleast one option</p>
			<div class="flex items-center flex-col md:flex-row gap-4">
			country: <SelectDown bind:selectedCountry on:change={handleSelectedCountry} />
				<p>category:</p>
				<select class="select variant-form-material" bind:value={selectedCategory}>
					<option value="" disabled selected>Select category</option>
					{#each categories as category}
					<option value={category}>{category}</option>
					{/each}
				</select>
				<button type="submit" class="btn variant-filled">Search</button>
			</div>
		</form>
	</div>
	{#if data.props.news.length > 0}
		<div class="grid-container mx-3 md:mx-7">
			{#each data.props.news as art}
			<button on:click={() => bigSet(art)}>
				<ArticleComponent {art} />
			</button>
			{/each}
		</div>
	{:else}
		No results for this query
	{/if}
</div>