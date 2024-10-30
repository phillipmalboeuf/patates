<script lang="ts">
  let { titre }: {
    titre: string
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()
</script>

<aside class="badge">
  <h5>{titre}</h5>
</aside>

<style lang="scss">
  aside {
    position: absolute;
    top: calc($s2 * -1);
    right: calc($s2 * 1);

    color: $light;
    background-color: $accent-dark;

    padding: 0 $s-1;
    width: calc($s0 * 13);
    height: calc($s0 * 13);

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;

    animation: rotate 3s ease-in-out infinite;

    @media (max-width: $mobile) {
      width: calc($s0 * 10);
      height: calc($s0 * 10);

      top: auto;
      bottom: calc($s2 * -1);
      right: calc($s2 * 1);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(-15deg);
    }
    50% {
      transform: rotate(-10deg); 
    }
    100% {
      transform: rotate(-15deg);
    }
  }
</style>