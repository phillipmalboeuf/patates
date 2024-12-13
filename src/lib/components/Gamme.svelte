<script lang="ts">
  import { isTypeProduit, type TypeGammeSkeleton, type TypeProduitSkeleton, type TypeSeparateurSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import { languageTag } from '$lib/paraglide/runtime';
  import Separateur from './Separateur.svelte';
  import { fly, slide } from 'svelte/transition';
  // import Star from './Star.svelte'

  let { item }: {
    item: Entry<TypeGammeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)
  let active = $state(item.fields.produits?.length ? item.fields.produits[0] as Entry<TypeProduitSkeleton,"WITHOUT_UNRESOLVABLE_LINKS"> : undefined)
  let hover: Entry<TypeProduitSkeleton,"WITHOUT_UNRESOLVABLE_LINKS"> = $state(undefined)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="gamme">
  <article class="flex flex--center flex--gapped {item.fields.couleur}" id={item.fields.id}>
    <div class="col col--5of12 col--tablet--6of12 col--mobile--12of12 flex flex--column flex--gapped">
      <h6>{#if languageTag() === 'fr'}Gamme{/if}{#if languageTag() === 'en'}Range{/if}</h6>
      {#if item.fields.titre}
      <h2 class="h1">{item.fields.titre}</h2>
      {/if}

      <nav class="flex flex--gapped produits">
        {#each item.fields.produits.filter(isTypeProduit) as produit}
        <a href={`/gammes/${item.fields.id}#${produit.fields.id}`} class="button" class:active={active?.fields.id === produit.fields.id}
          onmouseenter={() => {
            active = produit
            hover = produit
          }}
          onmouseleave={() => hover = undefined}>{@html produit.fields.titre.replaceAll(' ', '&nbsp;')}</a>
        {/each}
      </nav>

      {#if item.fields.description}
      <Rich body={item.fields.description} />
      {/if}

      <nav class="flex flex--gapped">
        <a href={`/gammes/${item.fields.id}`} class="button button--strong">{languageTag() === 'fr' ? 'Découvrir la gamme' : 'Discover this range'}</a>
      </nav>
    </div>

    {#if active?.fields.media}
    <a href={`/gammes/${item.fields.id}`} class="col col--7of12 col--tablet--6of12 col--mobile--12of12" onpointerenter={() => hover = active} onpointerleave={() => hover = undefined}>
    <figure>
      {#if active?.fields.background}
      <Media media={active?.fields.background} rounded ar={4/5} />
      {/if}
      {#if hover}
      <div class="hover">
        <Separateur fast item={{ fields: { slides: [hover.fields.illustration, hover.fields.illustration, hover.fields.illustration] } } as Entry<TypeSeparateurSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">} />
      </div>
      {/if}
      <Media media={active?.fields.media} rounded={!active?.fields.background} />
    </figure>
    </a>
    {/if}
  </article>
</section>

<style lang="scss">
  article {
    min-height: 50lvh;
    align-items: stretch;
    padding: $s1;
    color: $light;
    background-color: $accent;
    border-radius: $s1;
    max-width: 1666px;
    margin: 0 auto;

    @media (max-width: $mobile) {
      padding: $s0;
    }

    .active {
      background-color: $light;
      color: $accent;
      border: 1px solid transparent;
    }

    &.Dark {
      background-color: $accent-dark;
    }

    &.Light {
      color: $accent;
      background-color: $accent-light;

      .active {
        background-color: $accent;
        color: $light;
      }
    }
    
    > div {
      // align-items: center;
      // margin: 0 auto;

      @media (max-width: $mobile) {
        order: 99;
      }
    }

    > a figure {
      position: relative;
      overflow: hidden;

      :global(> * + *) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
        // height: 100%;
      }

      .hover {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translate(0, -50%);
        // height: 100%;

        :global(.slides) {
          width: 100%;
          margin: 0;
        }

        :global(.embla__slide) {
          flex: 0 0 100%;
          max-width: none;

          :global(img),
          :global(video) {
            height: auto;
            width: 100%;
          }
        }

        :global(.embla__slide:first-child) {
          // opacity: 0.5;
          visibility: hidden;
        }
      }
    }

    nav {
      margin-top: $s-1;
      
      &.produits {
        margin-top: auto;
        
        a {
          text-transform: uppercase;
          font-size: calc($s1);
          letter-spacing: 0.05em;
          margin-bottom: 1px;
        }

        @media (max-width: $mobile) {
          margin: $s-1 0;
          gap: $s-2;
          flex-wrap: nowrap;
          overflow-x: auto;
          // margin-right: calc($s0 * -1);
          width: calc(100% + ($s0 * 1));
        }
      }
    }
  }
</style>