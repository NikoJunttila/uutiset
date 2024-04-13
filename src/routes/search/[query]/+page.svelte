<script lang="ts">
	import type { PageData } from './$types';
	import Article from '$lib/Article.svelte';
	import { DateInput } from 'date-picker-svelte';
    import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    export let data: PageData;
	let dateFrom = new Date();
	let dateTo = new Date();
    let sortVal = ""
    function sendOptions(){
        const isoFromDate = dateFrom.toISOString().split('T')[0];
        const isoToDate = dateTo.toISOString().split('T')[0];
        goto(`/search/${data.params.query}?from=${isoFromDate}&to=${isoToDate}&sortBy=${sortVal}`)
    }
    const popupFeatured: PopupSettings = {
	// Represents the type of event that opens/closed the popup
	event: 'click',
	// Matches the data-popup value on your popup element
	target: 'popupFeatured',
	// Defines which side of your trigger the popup will appear
	placement: 'bottom',
};

    onMount(() => {
        if (currentPage * 100 > data.results){
            currentPage = 1
        }
    })
    let currentPage = +data.params.page;
    let maxPage = Math.ceil(data.results / 100);

    function navigate(page: number) {
    if (page > 5) {
        let userConfirmation = window.confirm("You are navigating to a page number greater than 5. Developer API key doesn't allow querying those. Do you wish to continue?");
        if (!userConfirmation) {
            return; // If user cancels navigation, we return from the function
        }
    }

    currentPage = page;
    // Get the current URL
    let url = new URL(window.location.href);
    // Get the search parameters from the URL
    let params = new URLSearchParams(url.search);
    // Set the 'page' parameter
    params.set('page', currentPage.toString());

    // Update the URL's search parameters
    url.search = params.toString();
    goto(url.toString())
}
</script>

<svelte:head>
	<title>query: {data.params.query}</title>
</svelte:head>
<div class="w-screen flex items-center justify-center pt-4 flex-col">
    <a href="/" class=" btn variant-form-material mb-3">Top news</a>
    <div class="my-1">
        <h1>Total results {data.results} for keyword: {data.params.query}</h1>
		<p class="text-center text-xl ">Showing {data.queriedNews.length}</p>
    </div>

        <button class="btn variant-filled" use:popup={popupFeatured}>Filters</button>
        <div class="card p-4  z-20" data-popup="popupFeatured">
            <form on:submit|preventDefault={sendOptions} class="flex flex-col gap-3">
                <div class="flex gap-3 items-center justify-center">
                    <span>From: </span><DateInput bind:value={dateFrom} placeholder="2000/31/12 23:59:59" format="yyyy-MM-dd" />
                    <span>To: </span><DateInput bind:value={dateTo} format="yyyy-MM-dd" />
                </div>
                <div class="flex items-center gap-2">
                    sort:
                    <select class="select variant-form-material" name="sortBy" bind:value={sortVal} id="sortBy">
                        <option value="" disabled selected hidden>Published At</option>
                        <option value="publishedAt" selected>Published At</option>
                        <option  value="relevancy">Relevancy</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>
                <button class="btn variant-filled" type="submit">Apply</button>
            </form>
            <div class="arrow variant-filled-primary" />
        </div>
        {#if data.queriedNews.length > 0}
        <div class="flex flex-col justify-center items-center gap-1 mt-4">
            <div class="flex gap-3 parent">
                <button class="btn variant-outline-secondary variant-filled div1" on:click={() => navigate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <ul class="flex div3">
                    <li><button class="h-full w-full" on:click={() => navigate(1)}>1</button></li>
                    {#if currentPage > 3}
                    <li class="!pointer-events-none"><button>...</button></li>
                    {/if}
                    {#if currentPage > 2}
                    <li><button on:click={() => navigate(currentPage - 1)}>{currentPage - 1}</button></li>
                    {/if}
                    {#if currentPage > 1 && currentPage < maxPage}
                    <li class="pointer-events-none"><button disabled>{currentPage}</button></li>
                    {/if}
                    {#if currentPage < maxPage - 1}
                    <li><button on:click={() => navigate(currentPage + 1)}>{currentPage + 1}</button></li>
                    {/if}
                    {#if currentPage < maxPage - 2}
                    <li class="!pointer-events-none"><button>...</button></li>
                    {/if}
                    {#if maxPage !== 1}
                    <li><button on:click={() => navigate(maxPage)}>{maxPage}</button></li>
                    {/if}
                </ul>
                <button class="btn variant-outline-secondary variant-filled div2" on:click={() => navigate(currentPage + 1)} disabled={currentPage === maxPage}>Next</button>
            </div>
            <p>Current Page: {currentPage}</p>
        </div>
	
		<div class="grid-container mx-3 md:mx-7">
			{#each data.queriedNews as art}
				<Article {art} />
			{/each}
		</div>
        <div class="flex flex-col justify-center items-center gap-1 mt-4">
            <div class="flex gap-3 ">
                <button class="btn variant-outline-secondary variant-filled " on:click={() => navigate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <ul class="flex">
                    <li><button class="h-full w-full" on:click={() => navigate(1)}>1</button></li>
                    {#if currentPage > 3}
                    <li>...</li>
                    {/if}
                    {#if currentPage > 2}
                    <li><button on:click={() => navigate(currentPage - 1)}>{currentPage - 1}</button></li>
                    {/if}
                    {#if currentPage > 1 && currentPage < maxPage}
                    <li class="pointer-events-none"><button disabled>{currentPage}</button></li>
                    {/if}
                    {#if currentPage < maxPage - 1}
                    <li><button on:click={() => navigate(currentPage + 1)}>{currentPage + 1}</button></li>
                    {/if}
                    {#if currentPage < maxPage - 2}
                    <li><button>...</button></li>
                    {/if}
                    {#if maxPage !== 1}
                    <li><button on:click={() => navigate(maxPage)}>{maxPage}</button></li>
                    {/if}
                </ul>
                <button class="btn variant-outline-secondary variant-filled " on:click={() => navigate(currentPage + 1)} disabled={currentPage === maxPage}>Next</button>
            </div>
            <p>Current Page: {currentPage}</p>
        </div>
	{:else}
		No results for this query
	{/if}
</div>
<style>
@media (max-width: 600px){

    .parent {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 5px;
    }
    
    .div1 { grid-area: 1 / 1 / 2 / 2; }
    .div2 { grid-area: 1 / 2 / 2 / 3; }
    .div3 { grid-area: 2 / 1 / 3 / 3; }
}   
</style>