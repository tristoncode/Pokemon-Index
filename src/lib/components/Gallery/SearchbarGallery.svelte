<script lang="ts">
  import LoadedPokemonCont from "./LoadedPokemonCont.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  let inputBox: HTMLInputElement;
  let pokemonListObjs: object[] | undefined = $state();
  let is_searched: true | false = $state(false);

  async function oninput() {
    is_searched = true;
    pokemonListObjs = await pkStore.group_searchbarGallery.handle_getSearchedPokemonResults(inputBox.value);
  }
</script>

<div class="h-[100%] flex flex-col gap-2" style="margin-bottom: 4px;">
  <input
    type="text"
    placeholder="Search for Pokemon..."
    class="flex-1 bg-blue-100 border-2 border-blue-700 rounded-[2px] font-semibold"
    style="padding: 4px;"
    bind:this={inputBox}
    {oninput}
  />

  <LoadedPokemonCont>
    {#if is_searched}
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
    {:else}
      <h3 class="font-bold text-xl" style="color: #fafaf9; margin: auto;">Search results will show up here.</h3>
    {/if}
  </LoadedPokemonCont>
</div>

<style lang="scss">
  li {
    &:hover {
      background: linear-gradient(45deg, hsl(0, 0%, 35%), hsl(0, 0%, 75%), hsl(0, 0%, 35%));
    }
  }

  .selectedPokemon {
    background: linear-gradient(45deg, hsl(280, 100%, 35%), hsl(280, 100%, 75%), hsl(280, 100%, 35%)) !important;
    border: solid 2px oklch(70.7% 0.165 254.624);
  }
</style>
