import {ls} from '../$.js'

const tabId = Date.now()

const TABS_ID = '__TAB_ACTIVITY'

const lsGet = () => ls.get(TABS_ID) || {}

export const tabs = {
  tabId,
  isActive: () => lsGet()[tabId]?.isActive,
  isLastActive: () => lsGet()[tabId]?.isLastActive,
  lastActiveTS: () => lsGet()[tabId]?.lastActiveTS,
  onChange: cb => document.addEventListener('visibilitychange', e => {
    cb(document.hidden, e)
  })
}


const updateTabState = () => {

  let tabMap = lsGet()

  tabMap[tabId] = {
    isActive: !document.hidden,
    hidden: document.hidden,
    isLastActive: !document.hidden,
    lastActiveTS: Date.now()
  }


  ls.set(TABS_ID, JSON.stringify(tabMap))

  setTimeout(() => {
    const tabMap = lsGet()
    const anyNewTabs = Object.keys(tabMap).some(id => tabMap[id].isActive)
    if (!anyNewTabs) {
      tabMap[tabId].isLastActive = true
      ls.set(TABS_ID, JSON.stringify(tabMap))
    }
  }, 50)
}


tabs.onChange(updateTabState)
updateTabState()
