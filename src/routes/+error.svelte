<script lang="ts">
import { page } from '$app/stores';
</script>

<div class="flex justify-center items-center flex-col gap-5 pt-2">
	<a href="/" class="btn variant-filled-primary max-w-28" >Back</a>
	<h1 class="text-center">error code: {$page.status}: {$page.error?.message}</h1>
</div>
