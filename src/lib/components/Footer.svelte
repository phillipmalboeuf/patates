<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'
  import { languageTag } from '$lib/paraglide/runtime'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Flower from './Flower.svelte'
  import Aliments from './Aliments.svelte';
  import Locales from './Locales.svelte';

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="flex flex--gapped flex--bottom padded">
  <Flower />

  <nav class="flex flex--gapped flex--spaced">
    {#each navigation.fields.liens as link}
    <Link {link} className={`button button--strong${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}

    <span class="button button--strong">
      <Locales />
    </span>
  </nav>

  <form action="" class="col col--5of12 col--mobile--12of12 flex flex--gapped">
    <h4 class="col col--12of12">{languageTag() === 'fr' ? "Vous avez des questions?" : "Do you have any questions?"}</h4>
    <input class="col col--6of12" name="nom" placeholder={languageTag() === 'fr' ? "Votre nom" : "Your name"}>
    <input class="col col--6of12" name="email" type="email" placeholder={languageTag() === 'fr' ? "Votre courriel" : "Your email"}>
    <textarea name="message" id="message" placeholder={languageTag() === 'fr' ? "Votre message" : "Your message"}></textarea>
    
    <button class="button--light" type="submit">{languageTag() === 'fr' ? "Soumettre" : "Submit"}</button>
  </form>
  
  <a href="https://www.alimentsduquebec.com" target="_blank" rel="external" class="aliments">
    <Aliments />
  </a>

  <a href="/" class="logo">
    <Logo />
  </a>
  
  <!-- <nav class:visible class:scrolled={scrollY > innerWidth * 0.2} class="flex flex--center">
    {#each navigation.fields.liens as link}
    <Link {link} className={`padded${$page.url.pathname.includes(link.fields.destination) ? ' active' : ''}`} />
    {/each}
  </nav> -->
</footer>

<style lang="scss">
  footer {
    position: relative;
    color: $light;
    background-color: $accent;
    // min-height: 100lvh;
    overflow: hidden;
    padding: $s1;

    @media (max-width: $mobile) {
      padding: $s0 $s-1;
    }

    .logo,
    .aliments {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
    }

    .aliments {
      width: $s5;
      // margin-top: auto;
      margin-left: auto;

      @media (max-width: $mobile) {
        order: -1;
        margin: 0 auto $s2;
      }
    }

    .logo {
      margin-top: $s2;
    }

    form {
      position: relative;
      z-index: 1;
    }

    nav {
      position: relative;
      z-index: 1;
      padding: $s1 0;

      :global(.button) {
        padding: 0;
        border: none;
        font-size: calc($s1 + 2px);
      }

      @media (max-width: $mobile) {
        order: -2;
        flex-direction: column;
        align-items: center;
      }
    }

    :global(> svg) {
      height: 100lvh;
      width: 100lvh;
      opacity: 0.4;

      position: absolute;
      bottom: -5vw;
      right: -5vw;
      z-index: 0;

      color: $accent-light;

      animation-duration: 20s;
      animation-timing-function: linear;
      animation-name: rotate;
      animation-iteration-count: infinite;
    }
  }
</style>