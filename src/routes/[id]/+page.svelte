<script lang="ts">
  import { onMount } from 'svelte'
  import { isTypeGamme, isTypeText } from '$lib/clients/content_types'
  
  import Text from '$lib/components/Text.svelte'
  import Page from '../+page.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  onMount(() => {
  })
</script>


<Page {data} />



<style lang="scss">
</style>