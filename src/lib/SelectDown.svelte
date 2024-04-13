<script lang="ts">
  import { countriesMap } from "./countries";
  export let countries = countriesMap;
  export let selectedCountry = "";
</script>

<input list="countries" class="select variant-form-material" bind:value={selectedCountry} placeholder="Select Country">
<datalist id="countries">
  {#each countries as [code, name]}
    <option value={code}>{name}</option>
  {/each}
</datalist>
