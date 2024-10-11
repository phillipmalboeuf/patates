<script lang="ts">
  import type { TypeSeparateurSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeSeparateurSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
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

{#if item.fields.media}
<figure id={item.fields.id} class:no-padding={item.fields.id === "vagues"}>
  <Media media={item.fields.media} />
</figure>
{/if}

<style lang="scss">
  figure {
    width: 100vw;
    padding: $s2 0;
    margin: 0 calc($s1 * -1);

    &.no-padding {
      padding: 0;
      margin: 0 calc($s1 * -1) -1.5px;
    }
  }
</style>