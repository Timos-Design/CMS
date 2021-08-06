<template>
  <div class="view-icons-interim">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class IconsInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-icons-interim {
  //
}
</style>
