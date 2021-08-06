<template>
  <div class="view-newsroom-interim">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NewsroomInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-newsroom-interim {
  //
}
</style>
