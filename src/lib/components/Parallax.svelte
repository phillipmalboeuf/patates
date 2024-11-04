<script lang="ts">
  // import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { media, full, children }: {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    full?: boolean
    children?: Snippet
  } = $props()

  // let section = $state<HTMLElement>()
  let mediaWrapper = $state<HTMLElement>()
  let innerHeight = $state(0)

  function onScroll() {
    if (!mediaWrapper) return
    const rect = mediaWrapper.getBoundingClientRect()
    const scrollProgress = rect.top / innerHeight
    mediaWrapper.style.transform = `scale(${1.05}) translateY(${scrollProgress * -150}px)`
  }

  onMount(() => {
    setTimeout(() => {
      onScroll()
    }, 100)
  })
</script>

<svelte:window bind:innerHeight onscroll={onScroll} />

<div bind:this={mediaWrapper} class="media-wrapper">
  <Media {media} rounded={!full} mobileAr={1.5} />
</div>

<style lang="scss">
  .media-wrapper {
    transform: scale(1.05);
    // transition: transform 0.111s ease-in-out;
    will-change: transform;
  }
</style>
