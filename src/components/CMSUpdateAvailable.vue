<template>
  <vm-dialog class="cms-update-available" :value="innerValue" @close="close">
    <vm-flow flow="column">
      <img src="pwa/logo.png" height="60" alt="" />
      <vm-title title="Update Available" />
      <br />
      <span center>
        Lets update the Content Management System to enjoy the latest features.
      </span>
    </vm-flow>

    <template slot="footer">
      <vm-dialog-button color="error" title="Cancel" @click="close" />
      <vm-dialog-button title="Update" @click="$emit('refresh')" />
    </template>
  </vm-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';

@Component
export default class CMSUpdateAvailable extends Vue {
  @Prop() value!: boolean;

  public innerValue = !!this.value;

  @Watch('value')
  valueChanged(): void {
    this.innerValue = !!this.value;
  }

  public close(): void {
    this.innerValue = false;
    this.$emit('input', false);
  }
}
</script>

<style lang="scss">
.cms-update-available .vm-dialog {
  max-width: 370px;
  .vm-dialog__content {
    overflow: visible;
  }
}
</style>

<style lang="scss" scoped>
.cms-update-available {
  img {
    margin-top: -50px;
    margin-bottom: 15px;
  }
}
</style>
