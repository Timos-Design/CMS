<template>
  <vm-navbar class="cms-navbar" v-if="$store.getters.user">
    <router-link class="title" :to="{ name: 'home' }" slot="title">
      <img src="pwa/logo.png" height="30" alt="" />
      <span>CMS</span>
    </router-link>
    <vm-button slot="static" icon="ti-logout" title="Sign Out" @click="bye" />

    <vm-flow slot="action" class="search" v-if="$route.meta.searchBar">
      <vm-input
        placeholder="Search"
        v-model="$store.state[$route.meta.searchBar]"
      />
    </vm-flow>
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

<style lang="scss">
.cms-navbar {
  .search,
  .vm-navbar--container {
    max-width: $max-width;
    margin: 0 auto;
  }
  .search {
    padding-bottom: 10px;
  }
  .title {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;

    span {
      transition: 0.2s ease-in-out;
      opacity: 0.75;
      margin-left: 10px;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
