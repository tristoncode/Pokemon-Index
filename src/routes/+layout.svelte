<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  let { children, data } = $props();

  onMount(async () => {
    pkStore.group_mainGallery.handle_getPokemonList = await data.handle_getMainPokemonList;
    pkStore.group_mainGallery.handle_loadPokemonList = await data.handle_loadMainPokemonList;
    pkStore.group_searchbarGallery.handle_getSearchedPokemonResults = await data.handle_getSearchedPokemonResults;
    pkStore.group_alphabeticalSearch.handle_getAToZPokemonResults = await data.handle_getAToZPokemonResults;
  });
</script>

<svelte:head>
  <link href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css" rel="stylesheet" />
</svelte:head>

<main class="bg-stone-700 w-[100vw] h-[100vh] flex gap-1 overflow-hidden *:font-semibold" style="padding: 4px;">
  {@render children()}
</main>
