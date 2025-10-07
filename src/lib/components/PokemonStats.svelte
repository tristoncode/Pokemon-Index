<script lang="ts">
  import _ from "lodash";
  import { onMount } from "svelte";

  const { pokemon } = $props();

  const moves = $derived(_.shuffle(pokemon.moves.map((move: object) => (move as any)?.move)).slice(0, 4));

  const pokemonTypes: any = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
</script>

<section class="min-w-[350px] w-[100%] flex-[0.9] flex flex-col gap-2" style="padding: 8px 0;">
  {#snippet Stats(stat: string)}
    {#if stat === "types"}
      <div>
        <h3>{stat}</h3>
        <ul>
          {#each pokemon.types as { type } (type.name)}
            <li style="background-color: {pokemonTypes[type.name]};">{type.name}</li>
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
        {#if moves.length === 0}
          <h3>Moves</h3>
          <ul>
            <li>No Moves</li>
          </ul>
        {:else if moves.length === 1}
          <h3>Move</h3>
          <ul>
            {#each moves as move}
              <li>{(move as any)?.name.replaceAll("-", " ")}</li>
            {/each}
          </ul>
        {:else if moves.length < 4}
          <h3>{moves.length} {stat}</h3>
          <ul>
            {#each moves as move}
              <li>{(move as any)?.name.replaceAll("-", " ")}</li>
            {/each}
          </ul>
        {:else}
          <h3>Four {stat} (random)</h3>
          <ul>
            {#each moves as move}
              <li>{(move as any)?.name.replaceAll("-", " ")}</li>
            {/each}
          </ul>
        {/if}
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
          <li>{(pokemon.weight / 10).toFixed(2)} kilograms</li>
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
