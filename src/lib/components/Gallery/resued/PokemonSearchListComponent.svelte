<script lang="ts">
  import ExclamationMark from "$lib/assets/exclamation_mark.svg";
  import pkStore from "$lib/stores/pkStore.svelte";

  const { pokemonListObjs } = $props();
</script>

<div class="h-[100%] overflow-auto">
  <ul class="h-0 flex flex-col">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    {#each pokemonListObjs as object[] as obj ((obj as any).name)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li
        class="min-h-[48px] flex gap-2 bg-blue-900 border-[1px] border-blue-700"
        style="padding: 0px 4px;"
        class:selectedPokemon={(pkStore.selectedPokemon as any).name === (obj as any).name}
        onclick={() => (pkStore.selectedPokemon = obj)}
      >
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
          src={(obj as any).sprites.other["official-artwork"].front_default || ExclamationMark}
          alt="pikemon image's"
          loading="lazy"
          class="h-[100%] aspect-square"
        />
        <p class="capitalize flex" style="color: #fafaf9; align-items: center; text-align: left;">
          {(obj as any).name.replaceAll("-", " ")}
        </p>
      </li>
    {/each}
  </ul>
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
