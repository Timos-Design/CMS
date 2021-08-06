<template>
  <vm-navbar class="cms-navbar" v-if="$store.getters.user">
    <router-link class="title" :to="{ name: 'home' }" slot="title">
      <img src="pwa/logo.png" height="30" alt="" />
      <span>Home</span>
    </router-link>
    <vm-button slot="static" icon="ti-logout" title="Sign Out" @click="bye" />
  </vm-navbar>
</template>

<script lang="ts">
import { Auth } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CMSNavbar extends Vue {
  public bye(): void {
    Auth.signOut();
  }
}
</script>

<style lang="scss" scoped>
.cms-navbar {
  .title {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover span {
      opacity: 1;
    }

    span {
      transition: 0.2s ease-in-out;
      opacity: 0.75;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}
</style>
