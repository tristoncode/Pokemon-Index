<script lang="ts">
  import LoadedPokemonCont from "./LoadedPokemonCont.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  let pokemonListObjs: object[] = $state([]);

  async function handle_getAToZPokemonResults(event: object = {}) {
    let selectedYellow = "oklch(79.5% 0.184 86.047)";

    let { letterToSearchBy, handle_getAToZPokemonResults } = pkStore.group_alphabeticalSearch;
    letterToSearchBy = (event as any)?.currentTarget.textContent || "a";
    pokemonListObjs = await handle_getAToZPokemonResults(letterToSearchBy);

    const searchLetters = document.querySelectorAll(".searchLetters");
    searchLetters.forEach((letter) => {
      if (letter.textContent === letterToSearchBy) {
        (letter as any).style.backgroundColor = selectedYellow;
      } else (letter as any).style.backgroundColor = "transparent";
    });
  }

  $effect(() => {
    setTimeout(async () => {
      let selectedYellow = "oklch(79.5% 0.184 86.047)";

      let { letterToSearchBy, handle_getAToZPokemonResults } = pkStore.group_alphabeticalSearch;
      letterToSearchBy = "a";
      pokemonListObjs = await handle_getAToZPokemonResults(letterToSearchBy);

      const searchLetters = document.querySelectorAll(".searchLetters");
      searchLetters.forEach((letter) => {
        if (letter.textContent === letterToSearchBy) {
          (letter as any).style.backgroundColor = selectedYellow;
        } else (letter as any).style.backgroundColor = "transparent";
      });
    }, 1);
  });
</script>

<div class="flex-1 flex overflow-hidden">
  <LoadedPokemonCont>
    <div class="h-[100%] overflow-auto">
      <ul class="h-0 flex flex-col gap-1">
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        {#each pokemonListObjs as object[] as obj ((obj as any).name)}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <li
            class="h-[48px] flex gap-2 bg-blue-900 border-2 border-blue-800 rounded-[2px]"
            style="padding: 0px 4px;"
            class:selectedPokemon={(pkStore.selectedPokemon as any).name === (obj as any).name}
            onclick={() => {
              pkStore.selectedPokemon = obj;
            }}
          >
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img
              src={(obj as any).sprites.other["official-artwork"].front_default}
              alt="pikemon image's"
              class="h-[100%] aspect-square"
            />
            <p class="capitalize flex" style="color: #fafaf9; display: flex; align-items: center;">
              {(obj as any).name.replaceAll("-", " ")}
            </p>
          </li>
        {/each}
      </ul>
    </div>
  </LoadedPokemonCont>

  <section class="bg-blue-200 rounded-[2px] flex flex-col justify-around" style="padding: 0 2px;">
    {#each "abcdefghijklmnopqrstuvwxyz".split("") as letter, index (index)}
      <button
        class="searchLetters capitalize hover:bg-blue-400 rounded-[2px] cursor-default text-[0.99em]"
        style="padding: 0 2px;"
        onclick={(event) => handle_getAToZPokemonResults(event)}
      >
        {letter}
      </button>
    {/each}
  </section>
</div>

<style lang="scss">
  .selectedLetter {
    background: oklch(79.5% 0.184 86.047) !important;
    color: whitesmoke;
  }
  .selectedPokemon {
    background: linear-gradient(45deg, hsl(280, 100%, 35%), hsl(280, 100%, 75%), hsl(280, 100%, 35%)) !important;
    border: solid 2px oklch(70.7% 0.165 254.624);
  }
</style>
