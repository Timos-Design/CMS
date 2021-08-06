<template>
  <div class="view-vuement-interim">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VuementInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-vuement-interim {
  //
}
</style>
