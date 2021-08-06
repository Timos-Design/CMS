<template>
  <div class="view-home">
    <h1>CMS. <span>Manage projects of Timo's Design</span></h1>
    <br />
    <vm-grid width="180px">
      <vm-card v-for="p in projects" :key="p.name" :routeName="p.route">
        <vm-flow flow="column">
          <img :src="p.website + '/pwa/splash/manifest-icon-512.png'" alt="" />
          <br />
          <vm-title :title="p.name" />
          <vm-spacer />
          <vm-link :href="p.website">Go to Website</vm-link>
        </vm-flow>
      </vm-card>
    </vm-grid>

    <br />
    <h1>Misc. <span>General services for every project</span></h1>
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
export default class Home extends Vue {
  public projects = [
    {
      name: 'Portfolio',
      website: 'https://timos.design',
      route: 'portfolio',
    },
    {
      name: 'Newsroom',
      website: 'https://newsroom.timos.design',
      route: 'newsroom',
    },
    {
      name: 'Vuement',
      website: 'https://vuement.com',
      route: 'vuement',
    },
    {
      name: 'Icons',
      website: 'https://icons.timos.design',
      route: 'icons',
    },
    {
      name: 'Translator',
      website: 'https://translator.timos.design',
      route: 'translator',
    },
  ];
}
</script>

<style lang="scss" scoped>
.view-home {
  img {
    $scale: 60px;
    height: $scale;
    border-radius: #{$scale / 4};
  }
}
</style>
