<template>
  <div class="view-portfolio-interim">
    <h1>I Port</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PortfolioInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-portfolio-interim {
  //
}
</style>
