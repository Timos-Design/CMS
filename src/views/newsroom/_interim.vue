<template>
  <div class="view-newsroom-interim">
    <CMSHeader project="newsroom" />
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
export default class NewsroomInterim extends Vue {}
</script>

<style lang="scss" scoped>
.view-newsroom-interim {
  //
}
</style>
