import {ls} from '../$.js'


/*
TODO
  - make lastActiev king of the hill style; reset single var
  - clean up idle tabs after a while



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
