<script lang="ts">
	import '../app.postcss';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let qValue: string = '';
	function handleSubmit() {
		window.location.href = `/search/${qValue}`;
	}
	let y: any;
</script>

<div class="min-h-screen">
	<header
		class="{y > 50
			? 'text-base py-2'
			: 'text-lg py-5'} duration-1000 bg-surface-300-600-token z-10 flex justify-center items-center gap-2 md:gap-5 overflow-hidden fixed w-full"
	>
		<a class="hidden sm:block ml-[2%] hover:scale-125 duration-150 " href="/"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="22.927" cy="16.794" r="8.327"/><circle cx="22.927" cy="16.794" r="6.585"/><circle cx="22.927" cy="16.794" r="1.791"/><path d="M22.927 12.677a4.117 4.117 0 1 1-3.176 6.738m13.843 4.013V9.985h4.37c2.52 0 4.536 2.017 4.536 4.537s-2.016 4.537-4.537 4.537h-4.369M5.5 9.985h8.738M9.869 23.428V9.985"/></g><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M7.118 39.533v-9.827l6.511 9.827v-9.827m18.937 0l-2.457 9.827l-2.456-9.827l-2.457 9.827l-2.457-9.827m11.755 8.722c.615.737 1.352 1.105 2.457 1.105h1.474c1.351 0 2.457-1.105 2.457-2.457s-1.106-2.456-2.457-2.456h-1.597c-1.351 0-2.457-1.106-2.457-2.457s1.106-2.457 2.457-2.457h1.474c1.106 0 1.843.246 2.457 1.106M15.844 34.62h3.193m1.72 4.913h-4.913v-9.827h4.913"/></svg></a>
		<form on:submit|preventDefault={handleSubmit} class="mx-auto">
			<div>
				<div class="flex gap-2">
					<label class="ml-2 sm:ml-0 text-sm sm:text-base" for="query"
						>Search news with keywords</label
					>
					<input required class="input" type="text" bind:value={qValue} name="query" placeholder="search" />
					<button type="submit" class="btn variant-filled">Search</button>
				</div>
			</div>
		</form>
		<div class="mr-5">
			<LightSwitch />
		</div>
	</header>
	<main class="pt-24">
		<slot />
	</main>
</div>
<footer class="h-10 mt-2 py-8 bg-surface-300-600-token flex items-center justify-center gap-5">
	<span>Copyright @ Derps</span>
	<a
		class="hover:opacity-80 bg-neutral rounded"
		href="https://github.com/nikojunttila/useranalytics"
		><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 128 128"
			><g fill="#181616"
				><path
					fill-rule="evenodd"
					d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
					clip-rule="evenodd"
				/><path
					d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0"
				/></g
			></svg
		></a
	>
</footer>
<svelte:window bind:scrollY={y} />
