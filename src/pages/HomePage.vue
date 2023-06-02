<script setup lang="ts">
// import { ref, watch, /* computed, */ onMounted, onUnmounted } from 'vue'
// import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
// import { navigateToUrl } from 'single-spa'

import HeaderContent from 'components/HeaderContent.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const { tc } = i18n.global
// const store = useStore()

</script>

<template>
  <div class="HomePage gradient-background">

    <HeaderContent/>

    <div class="col column justify-center" style="height: calc(100vh - 100px);">

      <div class="col row justify-center items-center full-height text-h2 text-weight-bold brand-text-gradient">
        一体化智能运维AIOps平台
      </div>

      <div class="row full-width justify-center items-center bg-grey-2" style="height: 30px;">
        <div>{{ tc('home.copyright') }}</div>
        <div>京ICP备09112257号-94</div>
      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
.HomePage {
}

.brand-text-gradient {
  background: -webkit-linear-gradient(45deg, rgba(0, 43, 84, 1) 0%, rgba(0, 112, 218, 1) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-background {
  background-color: #5997BE; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #5997BE, #FFFFFF); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #5997BE, #FFFFFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.animation-mask {
  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), color-stop(0.8, rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}
</style>
