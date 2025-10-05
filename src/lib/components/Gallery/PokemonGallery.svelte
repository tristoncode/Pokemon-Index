<script lang="ts">
  import MainGallery from "./MainGallery.svelte";
  import SearchbarGallery from "./SearchbarGallery.svelte";
  import AlphabetGallery from "./AlphabetGallery.svelte";
  import pkStore from "$lib/stores/pkStore.svelte";

  $effect(() => {
    let yellow = "oklch(79.5% 0.184 86.047)";
    let defaultColor = "black";

    const btns = document.querySelectorAll(".gallerySectionNavButton");
    btns.forEach((btn) => {
      if (btn.ariaLabel === pkStore.gallerySection) {
        (btn as any).style.backgroundColor = yellow;
      } else {
        (btn as any).style.backgroundColor = defaultColor;
      }
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
    display: flex;
    gap: 4px;

    & > button {
      min-width: 45px;
      background-color: black;
      color: #fafaf9;
      padding: 4px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s ease;

      &:hover {
        transform: scale(1.1);
        background-color: grey !important;
      }

      i {
        color: #fafaf9;
      }
    }
  }
</style>
