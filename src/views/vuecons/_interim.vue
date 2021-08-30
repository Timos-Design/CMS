<template>
  <div class="view-vuecons-interim">
    <CMSHeader project="vuecons" />
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
export default class VueconsInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-vuecons-interim {
  //
}
</style>
