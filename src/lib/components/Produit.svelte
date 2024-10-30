<script lang="ts">
  import type { TypeGammeSkeleton, TypeProduitSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  // import Star from './Star.svelte'

  let { item }: {
    item: Entry<TypeProduitSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--center flex--gapped" id={item.fields.id}>
  <div class="col col--6of12 col--mobile--12of12 flex flex--column flex--gapped">
    <h6>{item.fields.sousTitre}</h6>
    {#if item.fields.titre}
    <h2 class="h1">{item.fields.titre}</h2>
    {/if}

    {#if item.fields.illustration}
    <figure>
      <Media media={item.fields.illustration} />
    </figure>
    {/if}

    {#if item.fields.description}
    <main class="flex flex--column flex--gapped">
    <Rich body={item.fields.description} />
    </main>
    {/if}

    <aside class="flex flex--gapped flex--spaced">
      <h6>
        {item.fields.gauche}
      </h6>

      <h6>
        {item.fields.droite}
      </h6>
    </aside>

    <!-- <nav class="flex flex--gapped">
      <a href={`/gammes/${item.fields.id}`} class="button">Découvrir la gamme</a>
    </nav> -->
  </div>

  {#if item.fields.media}
  <figure class="col col--6of12 col--mobile--12of12">
    {#if item.fields.background}
    <Media media={item.fields.background} ar={5/4} />
    {/if}
    <Media media={item.fields.media} rounded={!item.fields.background} />
  </figure>
  {/if}
</section>

<style lang="scss">
  section {
    min-height: 50lvh;
    align-items: stretch;
    padding: $s1;
    color: $accent;
    background-color: $light;
    border-radius: $s1;
    overflow: hidden;
    
    > div {
      align-items: center;
      text-align: center;
      padding: $s2 0 $s0;

      @media (max-width: $mobile) {
        padding-bottom: 0;
      }

      h2 {
        text-transform: uppercase;
      }

      main {
        margin: 0 auto;
        max-width: 64ch;
      }

      figure {
        margin: auto 0;

        @media (max-width: $mobile) {
          margin: $s2 0;
        }
      }

      aside {
        margin-top: $s2;

        h6 {
          &:first-child {
            text-align: left;
          }

          &:last-child {
            text-align: right;
          }
        }
      }

      @media (max-width: $mobile) {
        order: 99;
      }
    }

    > figure {
      position: relative;

      @media (min-width: $mobile) {
        margin: calc($s1 * -1) calc($s1 * -2) calc($s1 * -1) calc($s1 * 1);
      }

      @media (max-width: $mobile) {
        &.col.col--mobile--12of12 {
          margin: calc($s1 * -1) calc($s1 * -2) 0;
          width: calc(100% + $s1 * 2) !important;
        }
      }

      :global(> * + *) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        transform: translate(-50%, -50%);
        // height: 100%;
      }
    }
  }
</style>