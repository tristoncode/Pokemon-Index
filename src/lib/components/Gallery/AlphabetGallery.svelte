<script lang="ts">
  import PokemonCont from "./resued/PokemonCont.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";
  import PokemonSearchListComponent from "./resued/PokemonSearchListComponent.svelte";

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
  <PokemonCont>
    <PokemonSearchListComponent {pokemonListObjs} />
  </PokemonCont>

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
