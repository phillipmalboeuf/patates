<script lang="ts">
  import type { TypeSeparateurSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, fast }: {
    item: Entry<TypeSeparateurSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    fast?: boolean
  } = $props()

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: true,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [Autoplay({
    delay: 0,
    stopOnInteraction: false,
  })]

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

{#if item.fields.slides && item.fields.slides.length > 0}
  <figure class="slides" id={item.fields.id} class:no-padding={item.fields.id === "vagues"}>
    <div use:emblaCarouselSvelte={{ options: { ...options, duration: (fast ? 5 : 10) * item.fields.slides[0].fields.file.details.image.width }, plugins }}>
      <div class="embla__container">
        {#each [...item.fields.slides, ...item.fields.slides] as slide}
          <div class="embla__slide">
            <Media media={slide} />
          </div>
        {/each}
      </div>
    </div>
  </figure>
{:else if item.fields.media}
  <figure id={item.fields.id} class:no-padding={item.fields.id === "vagues"}>
    <Media media={item.fields.media} />
  </figure>
{/if}

<style lang="scss">
  figure {
    width: 100vw;
    padding: $s4 0;
    margin: 0 calc($s1 * -1);
    overflow: hidden;

    &.no-padding {
      padding: 0;
      margin: 0 0 -1.5px;

      :global(img) {
        width: calc(100vw + 2px);
      }
    }

    &.slides {
      .embla__container {
        display: flex;
      }

      .embla__slide {
        flex: 0 0 auto;
        min-width: 0;
        max-width: none;
        padding-left: $s-2;
      }

      :global(picture) {
        width: auto;
      }

      :global(img),
      :global(video) {
        height: $s6;
        width: auto;
      }
    }
  }
</style>