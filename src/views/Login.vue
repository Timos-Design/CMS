<template>
  <div class="view-login">
    <span></span>
    <div class="container">
      <img src="pwa/logo.png" height="80" alt="" />
      <h1>Login. <span>Choose a provider</span></h1>
      <vm-flow>
        <vm-button
          background="#fff"
          color="#111"
          icon="ti-google"
          title="Google"
          size="medium"
          @click="signIn('google')"
        />
        <vm-button
          background="#1da1f2"
          color="#fff"
          icon="ti-twitter"
          title="Twitter"
          size="medium"
          @click="signIn('twitter')"
        />
        <vm-button
          background="#161b22"
          color="#fff"
          icon="ti-github"
          title="GitHub"
          size="medium"
          @click="signIn('github')"
        />
      </vm-flow>
    </div>

    <div class="legal">
      <vm-link href="https://timos.design/legal/terms"> Terms of Use </vm-link>
      <vm-link href="https://timos.design/legal/privacy">
        Privacy Policy
      </vm-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public signIn(provider = 'google'): void {
    Auth.signIn(provider);
  }
}
</script>

<style lang="scss" scoped>
.view-login {
  display: grid;
  grid-template-rows: 20px 1fr 20px;
  padding-top: calc(20px + env(safe-area-inset-top));
  min-height: calc(
    100vh - 40px - env(safe-area-inset-top) - env(safe-area-inset-bottom)
  );

  .container {
    display: grid;
    place-content: center;
    h1 {
      text-align: center;
    }
    i {
      margin-left: 5px;
    }
    img {
      margin: 0 auto;
    }
    .vm-button {
      box-shadow: inset 0 0 0 1px rgba(var(--vm-button-color), 0.3);
    }
  }

  .legal {
    display: flex;
    justify-content: space-between;
    a {
      color: rgba(var(--vm-color-secondary), 1);
    }
  }
}
</style>
