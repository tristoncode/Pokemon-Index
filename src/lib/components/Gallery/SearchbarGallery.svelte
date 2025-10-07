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
    pokemonListObjs = await pkStore.group_searchbarGallery.handle_getSearchedPokemonResults(inputBox.value.toLowerCase());
  }
</script>

<div class="h-[100%] flex flex-col gap-[2px]">
  <label class="bg-black rounded-[2px]" for="pokemon-search-input">
    <p class="text-left" style="padding:0px 4px; color: white;">Search for Pokemon</p>
    <input
      type="text"
      id="pokemon-search-input"
      placeholder="Example: Pikachu"
      class="w-[100%] bg-blue-100 border-2 border-black rounded-[0px_2px_2px_2px] font-semibold"
      style="padding: 0 4px 4px 4px;"
      bind:this={inputBox}
      {oninput}
    />
  </label>

  <PokemonCont>
    {#if is_searched}
      <PokemonSearchListComponent {pokemonListObjs} />
    {:else}
      <h3 class="font-bold text-xl" style="color: #fafaf9; margin: 2rem auto;">Search results will show up here.</h3>
    {/if}
  </PokemonCont>
</div>
