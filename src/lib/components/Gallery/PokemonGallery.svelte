<script lang="ts">
  import MainGallery from "./MainGallery.svelte";
  import SearchbarGallery from "./SearchbarGallery.svelte";
  import AlphabetGallery from "./AlphabetGallery.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  $effect(() => {
    const galleryButtons = document.querySelectorAll("[data-gallerySectionNavButton]");
    galleryButtons.forEach((btn) => {
      if (btn.ariaLabel === pkStore.gallerySection) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  });
</script>

<section
  class="w-[300px] h-[100%] bg-stone-50 text-center rounded-[2px] grid grid-cols-1 grid-rows-[auto_auto_1fr] overflow-hidden"
  style="padding: 4px;"
>
  <h2 class="text-3xl font-bold" style="padding: 4px;">Gallery</h2>

  <nav>
    <button aria-label="mainGallery" data-gallerySectionNavButton onclick={() => (pkStore.gallerySection = "mainGallery")}>
      <i class="bxr bx-images"></i>
    </button>
    <button
      aria-label="searchbarGallery"
      data-gallerySectionNavButton
      onclick={() => (pkStore.gallerySection = "searchbarGallery")}
    >
      <i class="bxr bx-search-big"></i>
    </button>
    <button
      aria-label="alphabetGallery"
      data-gallerySectionNavButton
      onclick={() => (pkStore.gallerySection = "alphabetGallery")}
    >
      A-Z
    </button>
  </nav>

  {#if pkStore.gallerySection == "mainGallery"}
    <MainGallery />
  {:else if pkStore.gallerySection === "searchbarGallery"}
    <SearchbarGallery />
  {:else if pkStore.gallerySection === "alphabetGallery"}
    <AlphabetGallery />
  {/if}
</section>

<style lang="scss">
  nav {
    display: flex;
    gap: 4px;
    margin: 8px auto;

    & > button {
      width: 53px;
      padding: 4px;
      background-color: black;
      color: whitesmoke;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: grey;
      }

      i {
        color: whitesmoke;
      }
    }
  }
</style>
