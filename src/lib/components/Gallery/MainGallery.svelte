<script lang="ts">
  import PokemonCont from "./resued/PokemonCont.svelte";
  import { onMount } from "svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  let loadMorePokemonDiv: HTMLDivElement | null;

  async function handle_loadMorePokemon() {
    pkStore.group_mainGallery.all_pokemon = [
      ...pkStore.group_mainGallery.all_pokemon,
      await pkStore.group_mainGallery.handle_getPokemonList(),
    ];
    pkStore.nextList = (pkStore.group_mainGallery.all_pokemon.at(-1) as any)?.next;
    pkStore.group_mainGallery.all_loadedPokemonLists = [
      ...pkStore.group_mainGallery.all_loadedPokemonLists,
      await pkStore.group_mainGallery.handle_loadPokemonList(),
    ];
  }

  onMount(async () => {
    setTimeout(async () => {
      handle_loadMorePokemon();
    }, 1);
  });

  function onscroll() {
    loadMorePokemonDiv = document.querySelector(".loadMorePokemon");
    const rect = loadMorePokemonDiv?.getBoundingClientRect();
    const is_visibleOnYAxis = (rect as any)?.top <= window.innerHeight;
    if (is_visibleOnYAxis) {
      loadMorePokemonDiv?.remove();
      handle_loadMorePokemon();
    }
  }
</script>

<PokemonCont>
  <section class="overflow-x-hidden overflow-auto" {onscroll}>
    {#snippet List(pokemonList: any)}
      <ul class="grid grid-cols-3 row-auto gap-1" style="margin-bottom: 4px;">
        {#each pokemonList as pokemon ((pokemon as any)?.id)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <li class="w-auto aspect-square bg-stone-50 rounded-[2px] flex" style="justify-content: center; align-items: center;">
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img
              src={(pokemon as any)?.sprites.other["official-artwork"].front_default}
              alt="Pokemon's image"
              class="profile-img"
              loading="lazy"
              class:selectedPokemon={(pkStore.selectedPokemon as any).name === pokemon.name}
              onclick={() => {
                pkStore.selectedPokemon = pokemon;
              }}
            />
          </li>
        {/each}
      </ul>
      <div class="loadMorePokemon"></div>
    {/snippet}

    {#each pkStore.group_mainGallery.all_loadedPokemonLists as pokemonList, index (index)}
      {@render List(pokemonList)}
    {/each}
  </section>
</PokemonCont>

<style lang="scss">
  .profile-img {
    transition: all 0.1s ease;

    &:hover {
      background: linear-gradient(45deg, hsl(0, 0%, 35%), hsl(0, 0%, 75%), hsl(0, 0%, 35%));
      transform: scale(1.05);
    }
  }
  .selectedPokemon {
    background: linear-gradient(45deg, hsl(280, 100%, 35%), hsl(280, 100%, 75%), hsl(280, 100%, 35%)) !important;
    border: solid 2px oklch(70.7% 0.165 254.624);
  }
</style>
