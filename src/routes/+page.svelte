<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeGamme, isTypeHero, isTypeProduit, isTypeText, isTypeSeparateur } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Gamme from '$lib/components/Gamme.svelte'
  import Produit from '$lib/components/Produit.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import Separateur from '$lib/components/Separateur.svelte'

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
  <Hero {item} first={i === 0} />
  {:else if isTypeGamme(item)}
  <Gamme {item} />
  {:else if isTypeProduit(item)}
  <Produit {item} />
  {:else if isTypeSeparateur(item)}
  <Separateur {item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    :global(> section) {
      padding: $s1;

      @media (max-width: $mobile) {
        padding: $s0;
      }
    }

    :global(> section.gamme) {
      padding: 0 $s1;
      margin: $s1 0;

      @media (max-width: $mobile) {
        padding: 0 $s0;
        margin: $s0 0;
      }
    }
  }
</style>