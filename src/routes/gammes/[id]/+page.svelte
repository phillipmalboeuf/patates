<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeGamme, isTypeProduit, isTypeSeparateur, isTypeText } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Gamme from '$lib/components/Gamme.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'
  import Produit from '$lib/components/Produit.svelte'
  import Badge from '$lib/components/Badge.svelte'
  import Separateur from '$lib/components/Separateur.svelte'
  
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  onMount(() => {
  })
</script>


<section class="flex flex--center flex--middle flex--gapped {data.item.fields.couleur}" id={data.item.fields.id}>
  {#if data.item.fields.titre}
  <h1 class="col col--12of12">Gamme {data.item.fields.titre.toLowerCase()}s</h1>
  {/if}

  {#if data.item.fields.sousTitre}
  <Badge titre={data.item.fields.sousTitre} />
  {/if}

  <div class="col col--4of12 col--mobile--12of12 flex flex--column flex--gapped">
    {#if data.item.fields.description}
    <Rich body={data.item.fields.description} />
    {/if}
  </div>

  {#if data.item.fields.media}
  <figure class="col col--6of12 col--mobile--12of12">
    <Media media={data.item.fields.media} rounded />
  </figure>
  {/if}

  <ol class="list--nostyle flex flex--column flex--gapped">
    {#each data.item.fields.produits as item}
    <li>
      {#if isTypeProduit(item)}
        <Produit {item} />
      {:else if isTypeSeparateur(item)}
        <Separateur {item} />
      {:else if isTypeText(item)}
        <Text {item} />
      {/if}
    </li>
    {/each}
  </ol>
</section>




<style lang="scss">
  section {
    position: relative;
    padding: $s3 $s1;
    color: $light;
    background-color: $accent;

    @media (max-width: $mobile) {
      :global(.badge) {
        display: none;
      }
    }

    &.Dark {
      background-color: $accent-dark;
    }

    &.Light {
      color: $accent;
      background-color: $accent-light;
    }

    ol {
      li {
        width: 100%;
      }
    }

    h1,
    div {
      text-align: center;
    }

    h1 {
      margin-top: $s3;
    }

    div {
      margin-bottom: $s3;
    }
  }
</style>