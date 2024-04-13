<script lang="ts">
	import type { PageData } from './$types';
	import SelectDown from '$lib/SelectDown.svelte';
	import Article from '$lib/Article.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data: PageData;

	onMount(() => {
		console.log(data)
	})
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
	let selectedCountry = '';

	function handleSelectedCountry(event: any) {
		selectedCountry = event.target.value;
	}
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
</script>

<svelte:head>
	<title>news for {data.props.country}</title>
</svelte:head>
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
			<div class="flex items-center gap-4">
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
		<div class="grid-container mx-7">
			{#each data.props.news as art}
				<Article {art} />
			{/each}
		</div>
	{:else}
		No results for this query
	{/if}
</div>