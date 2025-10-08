<script lang="ts">
  import _ from "lodash";
  import pokemon_type_colors from "$lib/JSON/pokemon_type_colors.json";
  import pokemon_type_weakness from "$lib/JSON/pokemon_type_weakness.json";
  import effective_damage_to from "$lib/JSON/effective_damage_to.json";

  const { pokemon } = $props();

  const moves = $derived(_.shuffle(pokemon.moves.map((move: object) => (move as any)?.move)).slice(0, 4));

  let selectedPokemonTypes = $derived.by(() => {
    if (pokemon.types.length < 2) {
      return Object.keys(pokemon_type_weakness).find((key) => key === `${pokemon.types[0].type.name}`);
    } else {
      let result: string | any = "";

      result = Object.keys(pokemon_type_weakness).find(
        (key) => key === `${pokemon.types[0].type.name}/${pokemon.types[1].type.name}`
      );
      if (result === undefined) {
        result = Object.keys(pokemon_type_weakness).find(
          (key) => key === `${pokemon.types[1].type.name}/${pokemon.types[0].type.name}`
        );
      }

      return result;
    }
  });
</script>

<section class="min-w-[350px] w-[100%] py-2 flex-[0.9] flex flex-col gap-2">
  {#snippet Stats(stat: string)}
    {#if stat === "types"}
      <div>
        <h3>{stat}</h3>
        <ul>
          {#each pokemon.types as { type } (type.name)}
            <li style="background-color: {(pokemon_type_colors as any)[type.name]};">{type.name}</li>
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
        <h3>{stat.replaceAll("_", " ")}</h3>
        <ul>
          <li>{pokemon.base_experience}</li>
        </ul>
      </div>
    {:else if stat === "weak_against"}
      <div class="!bg-yellow-700">
        <h3>{stat.replaceAll("_", " ")}</h3>
        <ul>
          {#each (pokemon_type_weakness as any)[selectedPokemonTypes] as type (type)}
            <li style="background-color:{(pokemon_type_colors as any)[type]}">{type}</li>
          {/each}
        </ul>
      </div>
    {:else if stat === "effective_damage_to"}
      <div class="!bg-green-700">
        <h3>{stat.replaceAll("_", " ")}</h3>
        <ul>
          {#if (effective_damage_to as any)[selectedPokemonTypes].length === 0}
            <li>No Pokemon specified</li>
          {:else}
            {#each (effective_damage_to as any)[selectedPokemonTypes] as type (type)}
              <li style="background-color:{(pokemon_type_colors as any)[type]}">{type}</li>
            {/each}
          {/if}
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
  {@render Stats("effective_damage_to")}
  {@render Stats("weak_against")}
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
