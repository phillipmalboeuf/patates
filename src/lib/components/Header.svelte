<script lang="ts">
  import type { TypeGammeSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import { page } from '$app/stores'
  import { fly } from 'svelte/transition'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Media from './Media.svelte'
  import Locales from './Locales.svelte'
  import Parallax from './Parallax.svelte'
  import { languageTag } from '$lib/paraglide/runtime';
  import Pastille from './Pastille.svelte';
  import Scrollin from './Scrollin.svelte';
  
  // import NoScroll from './NoScroll.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(false)
  let scrollY = $state<number>(0)
  let innerWidth = $state<number>(0)

  let scrolled = $derived($page.data.page?.fields.media ? scrollY > innerWidth * 0.2 : true)
</script>

<svelte:window bind:scrollY bind:innerWidth />

<!-- {#if visible}
<NoScroll />
{/if} -->

<header class="padded" style:--background={{ 'Dark': '#723555', 'Light': '#E6B5B9' }[$page.data.item?.fields.couleur] || '#DD3A6C'}>
  <a href="/" class="logo" class:visible class:scrolled onclick={() => visible = false} style:--scrolled={Math.max(0, ((innerWidth * 0.2) - scrollY) / (innerWidth * 0.2))}>
    <Logo />
  </a>
  <!-- <button class:visible class="button--none h1 col col--4of12" onclick={() => visible = true}>Menu</button> -->
  <nav class:visible class:scrolled class="main-nav flex flex--center">
    {#each navigation.fields.liens as link}
    <Link {link} className={`${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}

    <span class="locales">
      <Locales />
    </span>

    <button class="button--none" onclick={() => visible = !visible}>{visible ? 'Fermer' : 'Menu'}</button>
  </nav>

  {#if visible}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <nav class="padded sub-nav flex flex--column flex--gapped" onclick={() => visible = false} transition:fly={{ y: '-100%', duration: 666, opacity: 1 }}>
      <h6>{#if languageTag() === 'fr'}Nos produits{/if}{#if languageTag() === 'en'}Our products{/if}</h6>
      {#each navigation.fields.liens as link}
      {#if link.fields.destination.startsWith('/gammes/')}
      {@const gamme = $page.data.gammes[link.fields.destination.split('/')[2]] as Entry<TypeGammeSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">}
      <Pastille {gamme} />
      {:else}
      <Link {link} className={`h3 ${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
      {/if}
      {/each}

      <span class="locales">
        <Locales />
      </span>
    </nav>
  {/if}

  {#if $page.data.page?.fields.media}
  <a class="big-logo" href="/">
    <Logo />
  </a>

  <figure>
    {#if $page.data.page?.fields.media}
    <Parallax media={$page.data.page?.fields.media} />
    {/if}

    <figcaption class="flex flex--gapped flex--spaced">
      <h6><Scrollin>{@html $page.data.page?.fields.media.fields.title?.replace('\\n', '<br />')}</Scrollin></h6>
      {#if $page.data.page?.fields.media.fields.description}
      <h6><Scrollin delay={250}>{@html $page.data.page?.fields.media.fields.description?.replace('\\n', '<br />')}</Scrollin></h6>
      {/if}
    </figcaption>
  </figure>
  {/if}
</header>

<style lang="scss">
  header {
    color: $light;
    background-color: var(--background, $accent);
    // min-height: 50lvh;

    padding: $s1;

    @media (max-width: $mobile) {
      padding: $s-1;
    }

    .logo {
      width: calc((100% * var(--scrolled)) + ($s1 * 5));
      max-width: calc(100% - ($s1 * 2));
      min-width: calc($s1 * 10);
      position: fixed;
      top: $s0;
      left: calc(($s0 * (1 - var(--scrolled))) + $s1);
      z-index: 19;
      // transform: translateX(-120%);
      transition: color 666ms;
      // will-change: transform;
      
      padding: $s-1;
      border-radius: calc($radius * 2);

      @media (max-width: $mobile) {
        // width: calc((100% * var(--scrolled)) + ($s1 * 5));
        // max-width: calc(100% - ($s1 * 2));
        // min-width: calc($s1 * 10);
        left: calc(($s-1 * (1 - var(--scrolled))) + $s-1);
      }
      
      &.scrolled,
      &.visible {
        width: calc($s1 * 10);
        left: calc($s0 + $s1);
        // transform: translateX(0%);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        background: linear-gradient(0deg, rgba(230, 181, 185, 0.2), rgba(230, 181, 185, 0.2)), rgba(255, 255, 255, 0.7);
        color: $accent;

        @media (max-width: $mobile) {
          left: calc($s-1 + $s-1);
        }
      }
    }

    .big-logo {
      visibility: hidden;
    }
    // > button {
    //   justify-content: flex-start;
    //   transition: opacity 666ms;

    //   &.visible {
    //     opacity: 0;
    //   }
    // }

    .main-nav {
      position: absolute;
      z-index: 20;
      top: 20vw;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      margin-top: $s0;
      text-transform: uppercase;
      background-color: $light;
      border-radius: $s1;
      overflow: hidden;
      flex-wrap: nowrap;
      // transition: background-color 333ms;

      // height: 100lvh;
      // width: 33vw;
      
      // transition: transform 666ms;
      // transform: translateX(100%);
      // will-change: transform;

      // > button {
      //   position: absolute;
      //   top: $s0;
      //   right: $s0;
      // }

      @media (min-width: $mobile) {
        text-align: center;
      }

      @media (max-width: $mobile) {
        position: fixed;
        top: 0;
        left: auto;
        right: $s-1;
        transform: none;
        border-radius: $s3;

        transform: translateY(-150%);
        transition: transform 333ms;
        will-change: transform;
        // opacity: 0;
        // transition: opacity 666ms;

        &.scrolled,
        &.visible {
          transform: translateX(0%);
          // opacity: 1;
        }
      }

      :global(> a),
      span,
      button {
        color: $accent;
        border: none;
        
        padding: $s-1 $s0;
        letter-spacing: 0.05em;

        // &:first-child {
        //   border-top-left-radius: $s1;
        //   border-bottom-left-radius: $s1;
        // }

        // &:last-child {
        //   border-top-right-radius: $s1;
        //   border-bottom-right-radius: $s1;
        // }
      }

      button {
        @media (min-width: $mobile) {
          display: none;
        }
      }

      :global(> a),
      span {
        // transition: background-color 333ms;
        @media (max-width: $mobile) {
          display: none;
        }
      }
      

      :global(.active) {
        background-color: $light !important;
      }

      :global(a:hover),
      :global(span:hover) {
        background-color: rgba($light, 0.8) !important;
      }

      &:global(:has(.active)),
      &:global(:has(a:hover)) {
        @media (min-width: $mobile) {
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          background: linear-gradient(0deg, rgba(230, 181, 185, 0.2), rgba(230, 181, 185, 0.2)), rgba(255, 255, 255, 0.7);

          :global(a),
          span {
            border-radius: $s1;
          }
        }
      }

      // &.visible {
      //   transform: translateX(0);
      // }

      &.scrolled {
        position: fixed;
        top: 0;
      }
    }

    .sub-nav {
      position: fixed;
      z-index: 18;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: $light;
      background-color: $accent;

      padding-top: calc($s1 * 8);
      padding-bottom: $s2;

      .locales {
        margin-top: auto;
      }

      h6 {
        font-size: $s0;
      }

      :global(.pastille) {
        max-width: 100%;
        margin: 0;
        margin-bottom: $s3;
      }

      :global(.pastille + .pastille) {
        margin-top: calc($s3 * -1);
      }

      :global(.pastille.Normal) {
        background-color: $accent-dark;
      }
    }

    figure {
      position: relative;
      margin-top: $s1;
      border-radius: $radius;
      overflow: hidden;

      :global(img),
      :global(video) {
        max-height: 80lvh;
        object-fit: cover;

        @media (max-width: $mobile) {
          min-height: 80lvh;
        }
      }

      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: $s1;

        h6 {
          font-size: $s1;
          
          @media (min-width: $mobile) {
            &:last-child {
              text-align: right;
            }
          }
        }

        @media (max-width: $mobile) {
          h6 {
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }
</style>