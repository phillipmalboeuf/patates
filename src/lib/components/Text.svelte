<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import Flower from './Flower.svelte';
  import Badge from './Badge.svelte';
  // import Star from './Star.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
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

<section class="flex flex--center flex--middle flex--gapped {item.fields.couleur}" class:dark={item.fields.dark} class:flip={item.fields.flip} class:badge={item.fields.badge} id={item.fields.id}>
  <div class:col--5of12={!!item.fields.media} class:col--6of12={!item.fields.media} class="col col--mobile--12of12 flex flex--column flex--gapped">
    {#if item.fields.fleure}
    <figure class="fleure">
      <Flower />
    </figure>
    {/if}

    {#if item.fields.sousTitre}
    <h6>{item.fields.sousTitre}</h6>
    {/if}

    {#if item.fields.titre}
    <h2 class:h1={!item.fields.media || item.fields.titre.length < 40}>{item.fields.titre}</h2>
    {/if}

    {#if item.fields.badge}
    <Badge titre={item.fields.badge} />
    {/if}

    {#if item.fields.corps}
    <Rich body={item.fields.corps} />
    {/if}

    {#if item.fields.liens?.length}
    <nav class="flex flex--gapped flex--center">
      {#each item.fields.liens as link}
      <Link {link} className="button button--strong" />
      {/each}
    </nav>
    {/if}
  </div>

  {#if item.fields.media}
  <figure class="col col--6of12 col--mobile--12of12">
    <Media media={item.fields.media} rounded />
  </figure>
  {/if}
</section>

<style lang="scss">
  section {
    position: relative;
    text-align: center;
    // min-height: 50lvh;

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

    &.dark {
      color: $accent-dark;
    }

    &.badge {
      margin-top: $s5;

      @media (max-width: $mobile) {
        margin-top: $s4;
        margin-bottom: $s4;
      }
    }

    &.flip {
      figure {
        order: -1;
      }
    }
    
    div {
      align-items: center;
      margin: $s4 auto;

      h2 {
        margin-bottom: $s-1;
      }
    }

    .fleure {
      width: $s4;
    }
  }
</style>