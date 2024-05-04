import {ls} from '../$.js'


/*
TODO
  - aliveness check every 30 seconds or so. cleanup unalive entries every once in a while
  - maybe refactor or use BroadcastChannels https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
  - maybe if leader tab is closed, pick the second in command

*/

const tabId = Date.now()

const TABS_ID = '__TAB_ACTIVITY'

const lsGet = () => ls.get(TABS_ID) || {}

export const tabs = {
  tabId,
  isActive: () => !document.hidden,
  isLastActive: () => lsGet().LAST_ACTIVE === tabId,
  lastActiveTS: () => lsGet()[tabId]?.lastActiveTS,
  onChange: cb => document.addEventListener('visibilitychange', e => {
    cb(document.hidden, e)
  })
}


const updateTabState = () => {

  let tabMap = lsGet()

  if (!document.hidden) tabMap.LAST_ACTIVE = tabId

  tabMap[tabId] = {
    isActive: !document.hidden,
    hidden: document.hidden,
    isLastActive: !document.hidden,
    lastActiveTS: Date.now()
  }


  ls.set(TABS_ID, JSON.stringify(tabMap))

  // setTimeout(() => {
  //   const tabMap = lsGet()
  //   const anyNewTabs = Object.keys(tabMap).some(id => tabMap[id].isActive)
  //   if (!anyNewTabs) {
  //     tabMap[tabId].isLastActive = true
  //     ls.set(TABS_ID, JSON.stringify(tabMap))
  //   }
  // }, 50)
}


tabs.onChange(updateTabState)
updateTabState()
