<script lang="ts">
  import pkStore from "$lib/stores/pkStore.svelte";
  import { onMount } from "svelte";
  import PokemonCont from "./resued/PokemonCont.svelte";
  import PokemonSearchListComponent from "./resued/PokemonSearchListComponent.svelte";

  let inputBox: HTMLInputElement;
  let pokemonListObjs: object[] | undefined = $state();
  let is_searched: true | false = $state(false);

  onMount(() => {
    inputBox.focus();
  });

  async function oninput() {
    is_searched = true;
    pokemonListObjs = await pkStore.group_searchbarGallery.handle_getSearchedPokemonResults(inputBox.value);
  }
</script>

<div class="h-[100%] flex flex-col gap-2" style="margin-bottom: 4px;">
  <input
    type="text"
    placeholder="Search for Pokemon..."
    class="flex-1 bg-blue-100 border-2 border-blue-700 rounded-[2px] font-semibold"
    style="padding: 4px;"
    bind:this={inputBox}
    {oninput}
  />

  <PokemonCont>
    {#if is_searched}
      <PokemonSearchListComponent {pokemonListObjs} />
    {:else}
      <h3 class="font-bold text-xl" style="color: #fafaf9; margin: 2rem auto;">Search results will show up here.</h3>
    {/if}
  </PokemonCont>
</div>
