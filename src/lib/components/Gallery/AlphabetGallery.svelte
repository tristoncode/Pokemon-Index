<script lang="ts">
  import PokemonCont from "./resued/PokemonCont.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";
  import PokemonSearchListComponent from "./resued/PokemonSearchListComponent.svelte";

  let pokemonListObjs: object[] = $state([]);

  async function handle_getAToZPokemonResults(event: object = {}) {
    let { letterToSearchBy, handle_getAToZPokemonResults } = pkStore.group_alphabeticalSearch;
    letterToSearchBy = (event as any)?.currentTarget.textContent || "a";
    pokemonListObjs = await handle_getAToZPokemonResults(letterToSearchBy);

    const searchLetters = document.querySelectorAll(".searchLetters");
    searchLetters.forEach((letter) => {
      if (letter.textContent === letterToSearchBy) {
        (letter as HTMLButtonElement).classList.add("sortedAlphabetLetter");
      } else (letter as any).classList.remove("sortedAlphabetLetter");
    });
  }

  $effect(() => {
    setTimeout(async () => {
      let { letterToSearchBy, handle_getAToZPokemonResults } = pkStore.group_alphabeticalSearch;
      letterToSearchBy = "a";
      pokemonListObjs = await handle_getAToZPokemonResults(letterToSearchBy);

      const searchLetters = document.querySelectorAll(".searchLetters");
      searchLetters.forEach((letter) => {
        if (letter.textContent === letterToSearchBy) {
          (letter as HTMLButtonElement).classList.add("sortedAlphabetLetter");
        } else (letter as any).classList.remove("sortedAlphabetLetter");
      });
    }, 1);
  });
</script>

<div class="flex-1 flex overflow-hidden">
  <PokemonCont>
    <PokemonSearchListComponent {pokemonListObjs} />
  </PokemonCont>

  <section class="bg-blue-200 px-0.5 rounded-[2px] flex flex-col justify-around">
    {#each "abcdefghijklmnopqrstuvwxyz".split("") as letter, index (index)}
      <button
        class="searchLetters capitalize hover:bg-blue-400 px-0.5 rounded-[2px] cursor-default text-[0.99em]"
        onclick={(event) => handle_getAToZPokemonResults(event)}
      >
        {letter}
      </button>
    {/each}
  </section>
</div>
