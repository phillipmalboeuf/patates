<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Parallax from './Parallax.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()
</script>

<section
  class:full={item.fields.full} 
  class:first 
  class="{item.fields.couleur}" 
  id={item.fields.id}
>
  <figure>
    {#if item.fields.media}
    <Parallax media={item.fields.media} full={!item.fields.full} />
    {/if}

    <figcaption class="flex flex--bottom flex--gapped">
      {#if item.fields.sousTitre}
      <h6>{item.fields.sousTitre}</h6>
      {/if}

      {#if item.fields.titre}
      <h2 class="h1">{@html item.fields.titre}</h2>
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

    &.full {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;

      figure {
        border-radius: 0;
      }
    }

    &.first {
      padding-top: $s2;

      @media (max-width: $mobile) {
        padding-top: $s4;
      }
    }

    figure {
      position: relative;
      overflow: hidden;
      border-radius: $radius;

      .media-wrapper {
        transform: scale(1.1);
        will-change: transform;
      }

      :global(img),
      :global(video) {
        max-height: 80lvh;
        object-fit: cover;

        @media (max-width: $mobile) {
          min-height: 80lvh;
        }
      }

      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: $s3;

        color: $light;

        @media (max-width: $mobile) {
          padding: $s1 $s-1;
        }

        h2 {
          max-width: 66.6%;

          @media (max-width: $mobile) {
            max-width: 100%;
          }
        }

        &:has(h2 + *) :global(*) {
          max-width: 33.3%;

          @media (max-width: $mobile) {
            max-width: 100%;
          }
        }

        :global(p:empty) {
          display: none;
        }

        :global(tbody) {
          @media (max-width: $mobile) {
            display: flex;
            gap: $s1;
          }
        }
        
        :global(tr) {
          @media (max-width: $mobile) {
            display: flex;
            // gap: $s0;
            flex-direction: column;
            justify-content: space-between;
          }
        }

        :global(td),
	      :global(th) {
          border-top: none;
          padding: 0;
          text-transform: uppercase;

          @media (min-width: $mobile) {
            &:last-child {
              text-align: right;
            }

            &:not(:last-child):not(:first-child) {
              text-align: center;
            }
          }

          @media (max-width: $mobile) {
            display: flex;
          }
        }
        
        :global(th p) {
          font-size: $s6;
          font-family: $heading_font;
          line-height: 0.8;

          @media (max-width: $mobile) {
            font-size: $s5;
          }
        }

        :global(td) {
          @media (max-width: $mobile) {
            padding: $s0 0;
          }
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

        background: linear-gradient(0turn, rgba($dark, 0.5), transparent, transparent);
      }
    }
  }
</style>