class pkStore {
  gallerySection: "mainGallery" | "searchbarGallery" | "alphabetGallery" = $state("mainGallery");

  group_mainGallery = $state({
    handle_getPokemonList: () => null as any,
    all_pokemon: [] as object[],
    handle_loadPokemonList: () => null as any,
    all_loadedPokemonLists: [] as object[],
  });
  //////////////////////////////////////////////////////////
  nextList: string = $state("");
  count: number = 1302;
  selectedPokemon: object = $state({});
  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  group_searchbarGallery = $state({
    handle_getSearchedPokemonResults: (search: string) => null as any,
  });

  group_alphabeticalSearch = $state({
    handle_getAToZPokemonResults: (letterToSearchBy: string) => null as any,
    letterToSearchBy: "a" as string,
  });
}

export default new pkStore();
