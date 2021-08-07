<template>
  <div class="view-portfolio-interim">
    <CMSHeader project="portfolio" />
    <router-view />
  </div>
</template>

<script lang="ts">
import CMSHeader from '@/components/CMSHeader.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    CMSHeader,
  },
})
export default class PortfolioInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-portfolio-interim {
}
</style>
