<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeGamme, isTypeHero, isTypeProduit, isTypeText } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Gamme from '$lib/components/Gamme.svelte'
  import Produit from '$lib/components/Produit.svelte'
  import Hero from '$lib/components/Hero.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  onMount(() => {
  })
</script>


{#if data.page.fields.contenu}
{#each data.page.fields.contenu as item, i}
<section>
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeGamme(item)}
  <Gamme {item} />
  {:else if isTypeProduit(item)}
  <Produit {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    :global(> section) {
      padding: $s1;
    }
  }
</style>