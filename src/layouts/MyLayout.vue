<script setup lang="ts">
import { /* watch, */ computed/* , ref  */ } from 'vue'
import { useStore } from 'stores/store'
// import { useRoute } from 'vue-router'
import { i18n } from 'boot/i18n'
import { navigateToUrl } from 'single-spa'
// import { useQuasar } from 'quasar'

import I18nSwitch from 'components/I18nSwitch.vue'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const { tc } = i18n.global
const store = useStore()
console.log('@cnic/main store:', store.$state)
// the root layout of @cnic/main, load @cnic/main's  store here

// const quasar = useQuasar()

// const route = useRoute()
// const paths = route.path.split('/')
const currentApp = computed(() => store.items.currentApp) // keep selection when reloading

// const gotoManual = () => {
//   // 中文访问/manual 英文访问/manual/en
//   const url = computed(() => location.origin + (i18n.global.locale === 'zh' ? '/manual' : '/manual/en'))
//   window.open(url.value)
// }

const appVersion = process.env.appVersion
const releaseTime = process.env.releaseTime
</script>

<template>
  <q-layout view="lHh Lpr lFf" style="min-height: 0 !important; min-width: 1350px !important;">

    <q-header elevated class="" style="min-width: 1350px; background-color: rgb(3,58,88);">

      <q-toolbar style="height: 60px">

        <q-toolbar-title class="cursor-pointer" shrink @click="navigateToUrl('/my')">
          <div class="row items-center no-wrap">
            <img src="../assets/cstcloud_logo.png" alt="" style="height: 40px;"/>
            <div class="text-weight-bold text-blue-grey-1">{{ tc('一体化智能运维AIOps平台') }}</div>
          </div>
        </q-toolbar-title>

        <q-icon name="info" color="grey-8" size="xs">
          <q-tooltip class="bg-grey-3">

            <div class="text-grey text-caption text-center">{{ tc('appVersion') }}</div>
            <div class="text-grey text-caption text-center">
              {{ appVersion }}
            </div>

            <div class="text-grey text-caption text-center">{{ tc('releaseTime') }}</div>
            <div class="text-grey text-caption text-center">
              {{ new Date(releaseTime).toLocaleString(i18n.global.locale as string) }}
            </div>

          </q-tooltip>
        </q-icon>

        <q-space/>

        <div class="row full-height items-center q-pr-xs">

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'rca' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/rca')">
            {{ tc('根因定位') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'trend' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/trend')">
            {{ tc('态势') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'monitor' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/monitor')">
            {{ tc('监控') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'log' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/log')">
            {{ tc('日志') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'netflow' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/netflow')">
            {{ tc('网络流') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'alert' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/alert')">
            {{ tc('告警') }}
          </q-btn>

          <q-btn flat no-caps dense :ripple="false"
                 text-color="blue-grey-2"
                 class="full-height q-mx-xs"
                 :class="currentApp === 'algo' ? 'active-btn':'inactive-btn'"
                 @click="navigateToUrl('/my/algo')">
            {{ tc('算法') }}
          </q-btn>

          <q-btn-dropdown
            class="full-height q-mx-xs"
            :class="currentApp === 'tool'? 'active-btn':'inactive-btn'"
            :color="currentApp === 'tool'? 'primary':'black'"
            text-color="blue-grey-2"
            :ripple="false"
            flat
            dense
            no-caps
            :label="tc('更多')"
          >
            <q-list>

              <!--              <q-item clickable v-close-popup @click="navigateToUrl('/my/data')">-->
              <!--                <q-item-section>-->
              <!--                  <q-item-label :class="currentApp === 'data' ? 'text-primary':''">{{ tc('开放数据') }}</q-item-label>-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->

              <q-item clickable v-close-popup @click="navigateToUrl('/my/tool')">
                <q-item-section>
                  <q-item-label :class="currentApp === 'tool' ? 'text-primary':''">{{ tc('工具') }}</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>

        </div>

        <div class="row items-center q-gutter-x-none">

          <div class="q-gutter-md row items-center no-wrap">
            <i18n-switch :is-dark="true"/>
          </div>

          <!--          <q-btn class="text-weight-regular" color="grey-8" :ripple="false" flat dense no-caps no-wrap-->
          <!--                 icon="mdi-book-open-outline" @click="gotoManual">-->
          <!--            {{ tc('使用手册') }}-->
          <!--          </q-btn>-->

          <q-btn-dropdown :ripple="false" flat class="q-py-none q-px-none text-weight-regular" color="white" no-caps>

            <template v-slot:label>
              <q-icon name="las la-user-circle" color="white"/>
              {{ store.items.tokenDecoded.email }}
            </template>

            <div class="row justify-center no-wrap q-pa-md non-selectable"
                 style="min-width: 200px;background-color: #245099;">
              <div class="column items-center">
                <q-icon class="q-pt-lg q-pb-none q-ma-none" name="mdi-account" color="white" size="90px"/>

                <div class="text-subtitle1  text-white no-wrap">{{ store.items.tokenDecoded.name }}</div>
                <div class="text-subtitle1 text-white no-wrap">{{ store.items.tokenDecoded.orgName }}</div>

                <div class="q-pt-sm text-caption text-grey-5">
                  {{ store.items.loginType === 'passport' ? tc('使用科技云通行证登录') : tc('使用科技云AAI登录') }}
                </div>
              </div>
            </div>

            <q-list class="non-selectable" style="text-align: center">
              <!--              <q-item clickable disable>-->
              <!--                <q-item-section>账户设置</q-item-section>-->
              <!--              </q-item>-->

              <q-item v-if="store.items.loginType === 'passport'"
                      clickable
                      tag="a"
                      href="https://passport.escience.cn/user/password.do?act=showChangePassword"
                      target="_blank">
                <q-item-section>{{ tc('修改密码') }}</q-item-section>
              </q-item>

              <q-item clickable @click="store.userLogout" class="bg-grey-2">
                <q-item-section>{{ tc('退出登录') }}</q-item-section>
              </q-item>

            </q-list>

          </q-btn-dropdown>

        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view style="min-width: 1350px;"/>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.MyLayout {
}

.active-btn {
  background-color: rgb(255, 255, 255, 0.1);
  color: white !important;
  border-bottom: 3px solid white;
  border-radius: 0;
}

.inactive-btn {
  color: black;
  border-radius: 0;
}
</style>
