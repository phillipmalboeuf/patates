<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section id={item.fields.id}>
  <figure>
    {#if item.fields.media}
    <Media media={item.fields.media} rounded />
    {/if}

    <figcaption class="flex flex--bottom flex--gapped">
      {#if item.fields.sousTitre}
      <h6>{item.fields.sousTitre}</h6>
      {/if}

      {#if item.fields.titre}
      <h2 class="h1">{item.fields.titre}</h2>
      {/if}

      {#if item.fields.corps}
      <Rich body={item.fields.corps} />
      {/if}
    </figcaption>
  </figure>
</section>

<style lang="scss">
  section {
    figure {
      position: relative;
      overflow: hidden;
      border-radius: $radius;

      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: $s3;

        color: $light;

        :global(*) {
          max-width: 33.3%;
        }
      }

      figcaption {
        z-index: 1;
      }

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: linear-gradient(0turn, fade-out($dark, 0.5), transparent, transparent);
      }
    }
  }
</style>