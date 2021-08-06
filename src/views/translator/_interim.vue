<template>
  <div class="view-translator-interim">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TranslatorInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-translator-interim {
  //
}
</style>
