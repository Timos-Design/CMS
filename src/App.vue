<template>
  <div id="app">
    <CMSNavbar />
    <CMSRouter />
    <CMSUpdateAvailable v-model="updateAvailable" @refresh="refresh" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CMSRouter from '@/components/CMSRouter.vue';
import {
  registerMediaQueries,
  unregisterMediaQueries,
} from '@/utils/mediaQueries';
import CMSUpdateAvailable from '@/components/CMSUpdateAvailable.vue';
import CMSNavbar from './components/CMSNavbar.vue';

@Component({
  components: {
    CMSRouter,
    CMSNavbar,
    CMSUpdateAvailable,
  },
})
export default class App extends Vue {
  public registration: ServiceWorkerRegistration | null = null;
  public updateAvailable = false;
  public refreshing = false;

  created(): void {
    document.addEventListener(
      'serviceWorkerUpdateEvent',
      (e) => {
        const reg = e as CustomEvent<ServiceWorkerRegistration>;
        this.registration = reg.detail;
        this.updateAvailable = true;
      },
      { once: true }
    );

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }

  mounted(): void {
    registerMediaQueries();
  }

  beforeDestroy(): void {
    unregisterMediaQueries();
  }

  public refresh(): void {
    this.updateAvailable = false;
    if (this.registration) {
      this.registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
  margin: 0;
}

h1 span {
  color: rgba(var(--vm-color-secondary), 1);
}

[content] {
  padding: 0 5vw;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  padding-top: calc(70px + env(safe-area-inset-top));

  max-width: $max-width;
  margin: 0 auto;
}

[cursor] {
  cursor: pointer;
}

[center] {
  text-align: center;
}

[class$='-interim'] {
  max-width: unset;
  margin: 0;
  & > [class^='view-'] {
    max-width: $max-width;
    margin: 0 auto;
    padding-top: 20px;
  }
}
</style>
