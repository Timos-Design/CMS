<template>
  <div class="view-translator-interim">
    <CMSHeader project="translator" />
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
export default class TranslatorInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-translator-interim {
  //
}
</style>
