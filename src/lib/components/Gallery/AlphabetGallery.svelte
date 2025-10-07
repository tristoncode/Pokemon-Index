<script lang="ts">
  import PokemonCont from "./resued/PokemonCont.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";
  import PokemonSearchListComponent from "./resued/PokemonSearchListComponent.svelte";

  let pokemonListObjs: object[] = $state([]);
  let sortingAlphabetLetter: string = $state("a");

  async function handle_getAToZPokemon() {
    let { letterToSearchBy, handle_getAToZPokemonResults } = pkStore.group_alphabeticalSearch;
    letterToSearchBy = sortingAlphabetLetter || "a";
    pokemonListObjs = await handle_getAToZPokemonResults(letterToSearchBy);

    const searchLetters = document.querySelectorAll(".searchLetters");
    searchLetters.forEach((letter) => {
      if (letter.textContent === letterToSearchBy) {
        (letter as HTMLButtonElement).classList.add("sortingAlphabetLetter");
      } else (letter as HTMLButtonElement).classList.remove("sortingAlphabetLetter");
    });
  }

  $effect(() => {
    setTimeout(async () => handle_getAToZPokemon(), 1);
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
        onclick={(event) => {
          sortingAlphabetLetter = event.currentTarget.textContent;
          handle_getAToZPokemon();
        }}
      >
        {letter}
      </button>
    {/each}
  </section>
</div>
