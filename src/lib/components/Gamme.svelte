<script lang="ts">
  import { isTypeProduit, type TypeGammeSkeleton, type TypeProduitSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  // import Star from './Star.svelte'

  let { item }: {
    item: Entry<TypeGammeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)
  let active = $state(item.fields.produits?.length ? item.fields.produits[0] as Entry<TypeProduitSkeleton,"WITHOUT_UNRESOLVABLE_LINKS"> : undefined)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="gamme">
  <article class="flex flex--center flex--gapped {item.fields.couleur}" id={item.fields.id}>
    <div class="col col--5of12 col--mobile--12of12 flex flex--column flex--gapped">
      <h6>Gamme</h6>
      {#if item.fields.titre}
      <h2 class="h1">{item.fields.titre}</h2>
      {/if}

      <nav class="flex flex--gapped produits">
        {#each item.fields.produits.filter(isTypeProduit) as produit}
        <a href={`/gammes/${item.fields.id}#${produit.fields.id}`} class="button" class:active={active?.fields.id === produit.fields.id}
          onmouseenter={() => active = produit}>{produit.fields.titre}</a>
        {/each}
      </nav>

      {#if item.fields.description}
      <Rich body={item.fields.description} />
      {/if}

      <nav class="flex flex--gapped">
        <a href={`/gammes/${item.fields.id}`} class="button button--strong">Découvrir la gamme</a>
      </nav>
    </div>

    {#if active?.fields.media}
    <figure class="col col--7of12 col--mobile--12of12">
      {#if active?.fields.background}
      <Media media={active?.fields.background} rounded ar={4/5} />
      {/if}
      <Media media={active?.fields.media} rounded={!active?.fields.background} />
    </figure>
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

    @media (max-width: $mobile) {
      padding: $s-1;
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

    > figure {
      position: relative;

      :global(> * + *) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
        // height: 100%;
      }
    }

    nav {
      margin-top: $s-1;
      &:first-of-type {
        margin-top: auto;
        
        a {
          text-transform: uppercase;
          font-size: calc($s1);
          letter-spacing: 0.05em;
        }
      }
    }
  }
</style>