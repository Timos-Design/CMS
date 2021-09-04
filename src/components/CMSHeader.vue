<template>
  <div
    class="cms-header"
    v-if="project"
    :class="{ 'search-bar': $route.meta.searchBar }"
  >
    <div class="content">
      <vm-flow>
        <vm-flow @click="goHome" cursor>
          <img :src="p.website + '/pwa/splash/manifest-icon-512.png'" alt="" />
          <vm-title :title="p.name" />
        </vm-flow>
        <div>
          <vm-button
            icon="ti-share"
            background="color"
            :round="true"
            :href="p.website"
          />
        </div>
      </vm-flow>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { CMSProject } from '@/utils/interfaces/cms.interfaces';

@Component
export default class CMSHeader extends Vue {
  @Prop() project!: string;

  get p(): CMSProject {
    return this.$store.getters.projects.filter(
      (x: CMSProject) => x.route === this.project
    )[0];
  }

  public goHome(): void {
    if (this.$route.name !== this.project)
      this.$router.push({ name: this.project });
  }
}
</script>

<style lang="scss" scoped>
.cms-header {
  background: rgba(var(--vm-container), 1);
  margin: -20px -5vw;
  padding: 20px 5vw;

  &.search-bar {
    margin-top: 24.33px;
  }

  .content {
    max-width: $max-width;
    margin: 0 auto;

    img {
      $scale: 50px;
      height: $scale;
      border-radius: #{$scale / 4};
      margin-right: 20px;
    }
  }
}
</style>
