<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer"
  import type { Snippet } from "svelte"

  let element: HTMLElement = $state()
  let intersecting: boolean = $state(false)

  let { delay = undefined, children }: {
    delay?: number,
    children: Snippet
  } = $props()
</script>

<IntersectionObserver {element} bind:intersecting>
  <span bind:this={element} class:intersecting style:--delay={delay}>
    <span>{@render children()}</span>
  </span>
</IntersectionObserver>

<style lang="scss">
  span {
    display: inline-block;
    // overflow: hidden;

    > span {
      opacity: 0;
      transform: translateY(33px);
      transition: transform 666ms ease-in-out, opacity 666ms ease-in-out;
    }

    &.intersecting {
      > span {
        opacity: 1;
        transform: translateY(0);
        transition: transform 666ms ease-in-out calc(var(--delay, 0) * 1ms), opacity 666ms ease-in-out calc(var(--delay, 0) * 1ms);
      }
    }
  }
</style>