import pkStore from "$lib/stores/pkStore.svelte.js";

export async function load({ fetch }) {
  async function handle_getMainPokemonList() {
    const response = await fetch(pkStore.nextList || "https://pokeapi.co/api/v2/pokemon/?offset0&limit=30");
    const responseData = await response.json();
    return responseData;
  }
  async function handle_loadMainPokemonList() {
    let results = (pkStore.group_mainGallery.all_pokemon.at(-1) as any)?.results;
    return Promise.all(
      results.map(async (result: object) => {
        const response = await fetch((result as any)?.url);
        const responseData = response.json();
        return responseData;
      })
    );
  }

  ///////////////////////////////////////////////////////////////////////
  async function handle_getSearchedPokemonResults(search: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset0&limit=${pkStore.count}`);
    const responseResults = await response.json().then((data) => data.results);

    const filteredResults = responseResults.filter((result: object[]) => (result as any).name.includes(search));
    return Promise.all(
      filteredResults.map(async (result: object) => {
        const res = await fetch((result as any).url);
        const data = await res.json();
        return data;
      })
    );
  }
  ///////////////////////////////////////////////////////////////////////
  async function handle_getAToZPokemonResults(letterToSearchBy: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset0&limit=${pkStore.count}`);
    const responseResults = await response
      .json()
      .then((data) => data.results)
      .then((data) => data.sort((a: any, b: any) => a - b));

    let filteredResults = responseResults.filter((result: object) => (result as any).name.startsWith(letterToSearchBy));
    return Promise.all(
      filteredResults.map(async (result: object) => {
        const res = await fetch((result as any).url);
        const data = await res.json();
        return data;
      })
    );
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  return {
    handle_getMainPokemonList,
    handle_loadMainPokemonList,
    handle_getSearchedPokemonResults,
    handle_getAToZPokemonResults,
  };
}
