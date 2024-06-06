import {ls} from '../$.js'
import {tabs} from './tabs.js'

const defaultState = {
  referrer: '',
  screenTime: 0,
  sessions: [],
  firstEntry: Date.now()
}


if (!ls.get('__ANALYTICS_STATE')) {
  ls.set('__ANALYTICS_STATE', JSON.stringify(defaultState))
}



export const analyticsLS = {
  get(k) {
    const s = ls.get('__ANALYTICS_STATE')
    return k ? s[k] : s
  },

  set(k, v) {
    const props = this.get()
    props[k] = v
    ls.set('__ANALYTICS_STATE', JSON.stringify(props))
  },
}


window.__analytics = analyticsLS



const newReferrer = !document.referrer.includes(window.location.origin)
if (document.referrer && newReferrer) {
  analyticsLS.set('referrer', document.referrer)
}

if (!document.referrer || newReferrer) {
  const sessions = analyticsLS.get('sessions') || []
  sessions.push(Date.now())
  analyticsLS.set('sessions', sessions)
}





setInterval(() => {
  if (tabs.isActive()) {
    const time = analyticsLS.get('screenTime') + 30
    analyticsLS.set('screenTime', time)
  }
}, 30000)