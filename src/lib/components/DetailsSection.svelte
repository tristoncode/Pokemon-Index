<script lang="ts">
  import pkStore from "$lib/stores/pkStore.svelte";
  import PokemonStats from "./PokemonStats.svelte";
</script>

<section class="min-w-[350px] bg-stone-50 rounded-[2px] flex-1 flex gap-1" style="padding: 2rem .25rem;">
  {#if Object.keys(pkStore.selectedPokemon).length === 0}
    <p class="capitalize font-extrabold text-4xl self-center" style="margin: auto;">Select Pokemon from Gallery 👉</p>
  {:else}
    <section
      class="w-[100%] border-r-8 border-red-300 flex-1 flex flex-col justify-center items-center gap-10"
      style="box-sizing: content-box; padding: 8px;"
    >
      <div id="bg-sphere" class="w-[320px] aspect-square rounded-[50%]">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img
          src={(pkStore.selectedPokemon as any)?.sprites.other["official-artwork"].front_default}
          alt="Pokemon's image"
          class="w-[100%] aspect-square scale-[1.1]"
        />
      </div>
      <p class="font-extrabold text-4xl text-center capitalize">{(pkStore.selectedPokemon as any)?.name.replaceAll("-", " ")}</p>
    </section>

    <PokemonStats pokemon={pkStore.selectedPokemon} />
  {/if}
</section>

<style>
  #bg-sphere {
    background: linear-gradient(45deg, hsl(280, 100%, 35%), hsl(280, 100%, 75%), hsl(280, 100%, 35%));
  }
  img {
    animation-name: animate-img;
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }

  @keyframes animate-img {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
