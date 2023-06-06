// 二级路由（app）登记表：修改对应二级路由的title
const titleTable = {
  default: {
    zh: '一体化智能运维',
    en: 'AIOps'
  },
  my: {
    zh: '',
    en: ''
  },
  rca: {
    zh: '根因定位-',
    en: 'Root Cause Analysis-'
  },
  monitor: {
    zh: '监控-',
    en: 'Monitor-'
  },
  log: {
    zh: '日志-',
    en: 'Log-'
  },
  alert: {
    zh: '告警-',
    en: 'Alert-'
  },
  trend: {
    zh: '态势-',
    en: 'Trend-'
  },
  data: {
    zh: '开放数据-',
    en: 'Open Data-'
  },
  algo: {
    zh: '算法论文-',
    en: 'Algorithm Paper-'
  },
  tool: {
    zh: '工具-',
    en: 'Tool-'
  }
} as Record<string, Record<'zh' | 'en', string>>

export default function () {
  return (locale: string, appName: string) => {
    if (titleTable[appName]) {
      // 能从table取到则合法, 修改对应title
      document.title = locale === 'zh'
        ? titleTable[appName].zh + titleTable.default.zh
        : titleTable[appName].en + titleTable.default.en
    } else {
      // 取不到就只写基本信息
      document.title = locale === 'zh'
        ? titleTable.default.zh
        : titleTable.default.en
    }
  }
}
