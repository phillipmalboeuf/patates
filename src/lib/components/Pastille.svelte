<script lang="ts">
  import { isTypeProduit, type TypeGammeSkeleton, type TypeProduitSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import { languageTag } from '$lib/paraglide/runtime';
  // import Star from './Star.svelte'

  let { gamme }: {
    gamme: Entry<TypeGammeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)
  // let active = $state(item.fields.produits?.length ? item.fields.produits[0] as Entry<TypeProduitSkeleton,"WITHOUT_UNRESOLVABLE_LINKS"> : undefined)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<a href={`/gammes/${gamme.fields.id}`} class="pastille padded {gamme.fields.couleur}">
  <figure class="flex flex--gapped flex--middle">
    <Media media={gamme.fields.media} />
    <figcaption>
      <h6>{#if languageTag() === 'fr'}Gamme{/if}{#if languageTag() === 'en'}Range{/if}</h6>
      <h3>{gamme.fields.titre}</h3>
    </figcaption>
  </figure>
</a>

<style lang="scss">
  a {
    // min-height: 50lvh;
    // align-items: stretch;
    padding: $s0;
    color: $light;
    background-color: $accent;
    border-radius: $s1;
    text-align: left;
    max-width: 38ch;
    margin: calc($s0 * -0.25) auto;

    @media (max-width: $mobile) {
      padding: $s-1;
      max-width: 34ch;
    }

    // .active {
    //   background-color: $light;
    //   color: $accent;
    //   border: 1px solid transparent;
    // }

    &.Dark {
      background-color: $accent-dark;
    }

    &.Light {
      color: $accent;
      background-color: $accent-light;
    }
    

    > figure {
      :global(picture) {
        width: 20%;
      }

      figcaption {
        flex: 1;

        h6 {
          font-size: $s0;
        }

        h3 {
          text-transform: uppercase;
        }
      }
    }
  }
</style>