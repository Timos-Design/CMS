<template>
  <div class="view-home">
    <vm-title subtitle="Manage" title="Projects of Timo's Design" />

    <br />
    <vm-grid width="180px">
      <vm-card
        v-for="p in $store.getters.projects"
        :key="p.name"
        :routeName="p.route"
      >
        <vm-flow flow="column">
          <img :src="p.website + '/pwa/splash/manifest-icon-512.png'" alt="" />
          <br />
          <vm-title :title="p.name" />
        </vm-flow>
      </vm-card>
    </vm-grid>

    <br />
    <vm-title subtitle="General" title="Services" />
    <br />
    <vm-grid width="180px">
      <vm-card>
        <vm-flow flow="column">
          <img src="assets/drive.png" alt="" />
          <br />
          <vm-title title="Drive" />
        </vm-flow>
      </vm-card>
    </vm-grid>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.view-home {
  img {
    $scale: 50px;
    height: $scale;
    border-radius: #{$scale / 4};
  }
  .vm-card {
    .vm-title {
      font-size: 0.7rem;
    }
  }
}
</style>
