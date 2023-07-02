<script setup lang="ts">
import { ref, watch, /* computed, */ onMounted, onUnmounted } from 'vue'
// import { useStore } from 'stores/store'
import { i18n } from 'boot/i18n'
// import { navigateToUrl } from 'single-spa'

import * as THREE from 'three'
import VANTA from 'vanta/dist/vanta.net.min'

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

const videoDom = ref() // 容纳动画的dom对象
const animation = ref() // 动画对象

const startAnimation = () => {
  animation.value = VANTA({
    el: videoDom.value,
    THREE,
    // 如果需要改变样式，要写在这里
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    points: 10.00,
    maxDistance: 20.00,
    color: 0xbdff,
    backgroundColor: 0x050505 /* 0x31c */
  })
}
const stopAnimation = () => {
  animation.value.destroy()
}

// 单一开关控制动画
const isAnimationPlaying = ref(true)
watch(isAnimationPlaying, () => {
  if (isAnimationPlaying.value) {
    // mount the animation
    startAnimation()
  } else {
    stopAnimation()
  }
})

/* FPS测量 */
const avgFps = ref(60) // 认为初始帧率为满值
const countFps = () => {
  let fps = 0
  let before = Date.now()
  let now = Date.now()
  requestAnimationFrame(
    function loop () {
      now = Date.now()
      fps = Math.round(1000 / (now - before))
      before = now
      requestAnimationFrame(loop)
    }
  )
  setInterval(() => {
    avgFps.value = (avgFps.value + fps) / 2
  }, 1000)
}
/* FPS测量 */

/* 过低FPS保护, 过低帧率则停止动画 */
const guardFps = () => {
  const MIN_FPS = 18 // 最低帧率
  const timer = setInterval(() => {
    if (avgFps.value < MIN_FPS) {
      isAnimationPlaying.value = false
      clearInterval(timer)
    }
  }, 100)
}
/* 过低FPS侦测 */

onMounted(() => {
  // start animation
  startAnimation()
  // start FPS counting
  countFps()
  // monitor FPS
  guardFps()
})

onUnmounted(() => {
  stopAnimation()
})

</script>

<template>
  <div class="HomePage gradient-background">

    <div ref="videoDom"
         class="col column justify-center"
         style="height: 100vh">

      <HeaderContent/>

      <q-page-sticky position="top-right" :offset="[5, 5]">
        <div class="row items-center">
          <div class="text-grey-5">FPS {{ avgFps.toFixed(2) }}</div>
          <q-toggle
            v-model="isAnimationPlaying"
            dense
            dark
            keep-color
            color="blue-grey"
          />
        </div>
        <!--        <div class="text-white cursor-pointer" @click="isAnimationPlaying = true">开启动画</div>-->
        <!--        <div class="text-white cursor-pointer" @click="isAnimationPlaying = false">关闭动画</div>-->
      </q-page-sticky>

      <div class="col column justify-center items-center full-height ">

        <div class="col-auto row items-center justify-center full-width"
             style="height: 300px; background-color: rgb(255, 255, 255, 0.1); backdrop-filter: blur(3px);">

          <div class="col-8">

            <div class="row justify-center text-h2 text-weight-bold text-white brand-text-gradient">
              AI 3.0 主动运维新范式
            </div>
            <div class="row justify-center text-h5 text-grey-3 q-pt-lg">
              有趣、有用和有预见的智能运维
            </div>

          </div>
        </div>

      </div>

      <div class="column justify-center items-center text-grey">
        <div class="col">{{ tc('home.copyright') }}</div>
        <div class="col">京ICP备09112257号-94</div>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
.HomePage {
}

.brand-text-gradient {
  //background: -webkit-linear-gradient(45deg, rgba(0, 43, 84, 1) 0%, rgba(0, 112, 218, 1) 90%);
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-background {
  background-color: #2c3e50; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2c3e50, #2980b9); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #2c3e50, #2980b9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  //background-color: #5997BE; /* fallback for old browsers */
  //background: -webkit-linear-gradient(to bottom, #5997BE, #FFFFFF); /* Chrome 10-25, Safari 5.1-6 */
  //background: linear-gradient(to bottom, #5997BE, #FFFFFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  //background-image: linear-gradient(to right top, #051937, #004770, #007884, #00a762, #8fcc00);
}

//.animation-mask {
//  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), color-stop(0.8, rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
//}
</style>
