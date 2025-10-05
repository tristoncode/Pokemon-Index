<script lang="ts">
  import pkStore from "$lib/stores/pkStore.svelte";
  import _ from "lodash";

  const { pokemon } = $props();

  const moves = $derived(_.shuffle(pokemon.moves.map((move: object) => (move as any)?.move)).slice(0, 4));

  const pokemonTypes: any = {
    Normal: "#A8A878",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Grass: "#78C850",
    Ice: "#98D8D8",
    Fighting: "#C03028",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Flying: "#A890F0",
    Psychic: "#F85888",
    Bug: "#A8B820",
    Rock: "#B8A038",
    Ghost: "#705898",
    Dragon: "#7038F8",
    Dark: "#705848",
    Steel: "#B8B8D0",
    Fairy: "#EE99AC",
  };
</script>

<section class="min-w-[350px] w-[100%] flex-[0.9] flex flex-col gap-2" style="padding: 8px 0;">
  {#snippet Stats(stat: string)}
    {#if stat === "types"}
      <div>
        <h3>{stat}</h3>
        <ul>
          {#each pokemon.types as { type: { name } } (name)}
            <li style="background-color: {pokemonTypes[name.charAt(0).toUpperCase() + name.slice(1)]};">{name}</li>
          {/each}
        </ul>
      </div>
    {:else if stat === "abilities"}
      <div>
        <h3>{stat}</h3>
        <ul>
          {#each pokemon.abilities as { ability }, index (index)}
            <li>{ability.name.replaceAll("-", " ")}</li>
          {/each}
        </ul>
      </div>
    {:else if stat === "moves"}
      <div>
        <h3>Four {stat} (random)</h3>
        <ul>
          {#each moves as move}
            <li>{(move as any)?.name.replaceAll("-", " ")}</li>
          {/each}
        </ul>
      </div>
    {:else if stat === "height"}
      <div>
        <h3>{stat}</h3>
        <ul>
          <li>{pokemon.height / 10} meters</li>
        </ul>
      </div>
    {:else if stat === "weight"}
      <div>
        <h3>{stat}</h3>
        <ul>
          <li>{(pokemon.weight / 10).toFixed(2)} kiligrams</li>
          <li>{((pokemon.weight / 10) * 2.20462).toFixed(2)} pounds</li>
        </ul>
      </div>
    {:else if stat === "base_experience"}
      <div>
        <h3>{stat.replace("_", " ")}</h3>
        <ul>
          <li>{pokemon.base_experience}</li>
        </ul>
      </div>
    {/if}
  {/snippet}

  {@render Stats("types")}
  {@render Stats("abilities")}
  {@render Stats("moves")}
  {@render Stats("weight")}
  {@render Stats("height")}
  {@render Stats("base_experience")}
</section>

<style lang="scss">
  div {
    width: fit-content;
    background-color: #d6d3d1;
    padding: 4px 8px;
    border-radius: 2px;
    text-transform: capitalize;
  }
  h3 {
    margin-bottom: 4px;
    font-weight: 700;
  }
  ul {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  li {
    background-color: hsl(190, 100%, 20%);
    color: #fafaf9;
    padding: 4px;
    border-radius: 2px;
  }
</style>
