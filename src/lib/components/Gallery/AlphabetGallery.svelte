<script>
  import LoadedPokemonCont from "./LoadedPokemonCont.svelte";
</script>

<div class="flex-1 flex overflow-hidden">
  <LoadedPokemonCont></LoadedPokemonCont>

  <section class="bg-blue-200 rounded-[2px] flex flex-col justify-around" style="padding: 0 2px;">
    {#each "abcdefghijklmnopqrstuvwxyz".split("") as letter, index (index)}
      <button
        class="capitalize hover:bg-blue-400 rounded-[2px] cursor-default text-[0.99em]"
        style="padding: 0 2px;"
      >
        {letter}
      </button>
    {/each}
  </section>
</div>
