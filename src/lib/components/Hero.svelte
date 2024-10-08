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

<section class="{item.fields.couleur}" id={item.fields.id}>
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
    // margin: calc($s3 * -1) calc($s1 * -1) 0;
    // padding: ($s1);

    &.Dark {
      color: $light;
      background-color: $accent-dark;
    }

    &.Normal {
      color: $light;
      background-color: $accent;
    }

    &.Light {
      color: $accent;
      background-color: $accent-light;
    }

    figure {
      position: relative;
      overflow: hidden;
      border-radius: $radius;

      :global(img),
      :global(video) {
        max-height: 80lvh;
        object-fit: cover;
      }

      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: $s3;

        color: $light;

        h2 {
          max-width: 66.6%;
        }

        &:has(h2 + *) :global(*) {
          max-width: 33.3%;
        }

        :global(p:empty) {
          display: none;
        }

        :global(td),
	      :global(th) {
          border-top: none;
          padding: 0;
          text-transform: uppercase;

          &:last-child {
            text-align: right;
          }

          &:not(:last-child):not(:first-child) {
            text-align: center;
          }
        }
        
        :global(th) {
          font-size: $s6;
          font-family: $heading_font;
          line-height: 0.8;
        }

        h6 {
          margin: 0 auto auto;
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