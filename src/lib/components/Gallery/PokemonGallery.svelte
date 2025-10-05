<script lang="ts">
  import MainGallery from "./MainGallery.svelte";
  import SearchbarGallery from "./SearchbarGallery.svelte";
  import AlphabetGallery from "./AlphabetGallery.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  $effect(() => {
    const btns = document.querySelectorAll(".gallerySectionNavButton");
    btns.forEach((btn) => {
      if (btn.ariaLabel === pkStore.gallerySection) (btn as any).style.backgroundColor = "oklch(79.5% 0.184 86.047)";
      else (btn as any).style.backgroundColor = "black";
    });
  });
</script>

<section
  class="w-[300px] h-[100%] bg-stone-50 text-center rounded-[2px] grid grid-cols-1 grid-rows-[auto_auto_1fr] overflow-hidden"
  style="padding: 4px;"
>
  <h2 class="text-3xl font-bold" style="padding: 4px;">Gallery</h2>

  <nav>
    <button aria-label="mainGallery" class="gallerySectionNavButton" onclick={() => (pkStore.gallerySection = "mainGallery")}>
      <i class="bxr bx-images"></i>
    </button>
    <button
      aria-label="searchbarGallery"
      class="gallerySectionNavButton"
      onclick={() => (pkStore.gallerySection = "searchbarGallery")}
    >
      <i class="bxr bx-search-big"></i>
    </button>
    <button
      aria-label="alphabetGallery"
      class="gallerySectionNavButton"
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
    min-height: 25px;
    max-height: 32px;
    margin: 8px auto;
    border-radius: 2px;
    overflow: hidden;
    display: flex;

    & > button {
      min-width: 50px;
      background-color: black;
      color: #fafaf9;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s ease;

      &:nth-child(2) {
        border-right: solid 3px oklch(70.7% 0.165 254.624);
        border-left: solid 3px oklch(70.7% 0.165 254.624);
      }

      &:hover {
        background-color: #79716b;
      }

      i {
        color: #fafaf9;
      }
    }
  }
</style>
