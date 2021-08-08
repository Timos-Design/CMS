<template>
  <div class="view-vuement-register-component">
    <h1>Register. <span>New component</span></h1>
    <CMSVuementComponentForm />
  </div>
</template>

<script lang="ts">
import CMSVuementComponentForm from '@/components/vuement/CMSVuementComponentForm.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    CMSVuementComponentForm,
  },
})
export default class VuementRegisterComponent extends Vue {}
</script>

<style lang="scss" scoped>
.view-vuement-register-component {
  //
}
</style>
