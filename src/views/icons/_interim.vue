<template>
  <div class="view-icons-interim">
    <CMSHeader project="icons" />
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
export default class IconsInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-icons-interim {
  //
}
</style>
