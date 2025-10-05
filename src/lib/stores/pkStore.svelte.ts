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
    handle_getFilteredPokemonResults: (search: string) => null as any,
  });

  arr = [];
}

export default new pkStore();
