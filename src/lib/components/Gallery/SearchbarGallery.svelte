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
    pokemonListObjs = await pkStore.group_searchbarGallery.handle_getSearchedPokemonResults(
      inputBox.value.replaceAll(" ", "-").toLowerCase()
    );
  }
</script>

<div class="h-[100%] flex flex-col gap-[2px]">
  <label for="pokemon-search-input">
    <p class="w-fit bg-black p-1 rounded-[4px_4px_0px_0px] text-left text-white">Search for Pokemon</p>
    <input
      type="text"
      id="pokemon-search-input"
      placeholder="Example: Pikachu"
      class="w-[100%] bg-blue-100 p-[0px_4px_4px_4px] border-[3px] border-black rounded-[0px_3px_3px_3px] font-semibold"
      bind:this={inputBox}
      {oninput}
    />
  </label>

  <PokemonCont>
    {#if is_searched}
      <PokemonSearchListComponent {pokemonListObjs} />
    {:else}
      <h3 class="text-stone-50 my-2 mx-auto font-bold text-xl">Search results will show up here.</h3>
    {/if}
  </PokemonCont>
</div>
