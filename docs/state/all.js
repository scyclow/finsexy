export * from './clit.js'
export * from './profile.js'
export * from './conversationRunner.js'
export * from './analytics.js'

export * from '../chats/heatherHot.js'
export * from '../chats/SamanthaJones.js'
export * from '../chats/VinceSlickson.js'
export * from '../chats/CrystalGoddess.js'
export * from '../chats/katFischer.js'
export * from '../chats/DrAndy.js'
export * from '../chats/DungeonMistress.js'
export * from '../chats/hacker.js'
export * from '../chats/QueenJessica.js'
export * from '../chats/steviep.js'
export * from '../chats/SpecialAgentDiane.js'

import {HeatherHotProfile, HHChat} from '../chats/heatherHot.js'
import {SamanthaProfile, SamanthaChat} from '../chats/SamanthaJones.js'
import {VinceProfile, VinceChat} from '../chats/VinceSlickson.js'
import {KatProfile, KatChat} from '../chats/katFischer.js'
import {CrystalGoddessProfile} from '../chats/CrystalGoddess.js'
import {AndyProfile, AndyChat} from '../chats/DrAndy.js'
import {MistressProfile} from '../chats/DungeonMistress.js'
import {HackerProfile, HackerChat} from '../chats/hacker.js'
import {QueenProfile} from '../chats/QueenJessica.js'
import {StevieProfile} from '../chats/steviep.js'
import {HedonitronicaProfile} from '../chats/Hedonitronica.js'
import {DianeProfile} from '../chats/SpecialAgentDiane.js'
import {CandyCrushProfile} from '../chats/CandyCrush.js'
import {MindyProfile, MindyChat} from '../chats/MindyRouge.js'
import {XXXProfile} from '../chats/SexyXXXpress.js'
import {CaglaProfile} from '../chats/cagla.js'
import {CustomerSupportProfile, CustomerSupportChat} from '../chats/CustomerSupport247.js'
import {HotlineBabeProfile, HotlineBabeChat} from '../chats/HotlineBabe1900.js'
import {MoneyMommyProfile} from '../chats/MoneyMommy777.js'
import {RonaMerchProfile} from '../chats/RonaMerch.js'
// export * from '../chats/cagla.js'

import {ls} from '../$.js'

import {getUserData } from './profile.js'
import {sexyCLIT, clitLS } from './clit.js'
import {analyticsLS} from './analytics.js'
import {provider} from '../eth.js'
import {tributeLS} from './tributes.js'

console.log(`Hey sexy. Send me a tip or follow me on twitter or discord if you're looking for a good time 😉`)
console.log('TIPS 💸: steviep.eth')
console.log(`https://x.com/steviepxyz`)
console.log(`https://discord.steviep.xyz`)
console.log(`https://steviep.xyz`)


if (ls.get('BETA_PASS')) {
  localStorage.clear()
  window.location.replace(`./enter`)
}

if (!ls.get('__enteredSite') && window.location.pathname !== '/dev') {

  if (window.location.pathname === '/') {
    window.location.replace(`./enter`)
  } else {
    window.location.replace(`./enter?ref=${encodeURI(window.location.pathname + window.location.search + window.location.hash)}`)
  }
}

if (clitLS.get('a11y')) {
  document.body.classList.add('a11ymode')
}



// const $profileModal = $.id('profileModal')
// if (!ls.get('profileCompleted') && $profileModal) {
//   console.log($profileModal)
//   $profileModal.open()
// }


export const ProfileStats = {
  [HeatherHotProfile.name]: HeatherHotProfile,
  [SamanthaProfile.name]: SamanthaProfile,
  [VinceProfile.name]: VinceProfile,
  [CrystalGoddessProfile.name]: CrystalGoddessProfile,
  [StevieProfile.name]: StevieProfile,
  [QueenProfile.name]: QueenProfile,
  [KatProfile.name]: KatProfile,
  [AndyProfile.name]: AndyProfile,
  [MistressProfile.name]: MistressProfile,
  [HackerProfile.name]: HackerProfile,
  [HedonitronicaProfile.name]: HedonitronicaProfile,
  [DianeProfile.name]: DianeProfile,
  [CandyCrushProfile.name]: CandyCrushProfile,
  [MindyProfile.name]: MindyProfile,
  [XXXProfile.name]: XXXProfile,
  [CaglaProfile.name]: CaglaProfile,
  [CustomerSupportProfile.name]: CustomerSupportProfile,
  [HotlineBabeProfile.name]: HotlineBabeProfile,
  [MoneyMommyProfile.name]: MoneyMommyProfile,
  [RonaMerchProfile.name]: RonaMerchProfile,
}


const unmessaged = Chat => !Chat.ctx.history.length && !Chat.ctx.eventQueue.length

setRunInterval(() => {
  const pastProfile = ls.get('profileDeferred') || ls.get('profileCompleted')

  // TODO can optimize this to not run once a second once events are queued

  if (ls.get('__enteredSite') && pastProfile) {
    if (unmessaged(HHChat)) {
      HHChat.queueEvent('hi', 3000)
    }

    const pw = getUserData('password')
    const timeElapsed = Date.now() - analyticsLS.get('firstEntry')

    // 5 min
    if (unmessaged(KatChat) && timeElapsed >= 300000) {
      KatChat.queueEvent('steviep', 1)
      MessageHandler.visibilityCtx.katFischer = 'online'
    }

    // 20 min
    if (unmessaged(HackerChat) && pw && timeElapsed >= 1200000) {
      HackerChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx['0x000000000000000000000000000000000'] = 'offline'
    }

    // 60 min
    if (unmessaged(MindyChat) && timeElapsed >= 3600000) {
      MindyChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx.MindyRouge = 'online'
    }

    // 120 min
    if (unmessaged(HotlineBabeChat) && timeElapsed >= 7200000) {
      HotlineBabeChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx.HotlineBabe1900 = 'online'
    }



  }


  // ls.set('returnVisit', true)
}, 1000)



// if (!ls.get('BETA_PASS') && window.location.href.includes('finsexy.com')) {
//   let pw
//   while (pw !== 'steveissexy') {
//     pw = prompt('password')
//   }

//   ls.set('BETA_PASS', true)
// }









provider.onConnect(async (addr) => {
  MessageHandler.visibilityCtx.DungeonMistress = 'online'
  MessageHandler.visibilityCtx.SamanthaJones = 'online'
  MessageHandler.visibilityCtx.VinceSlickson = 'online'
  MessageHandler.visibilityCtx.CandyCrush = 'online'

  if (MessageHandler.chats.QueenJessica.ctx.lastDomCodeSent !== 'offline') {
    MessageHandler.visibilityCtx.QueenJessica = 'online'
  }

  const samanthaResponded = SamanthaChat.ctx.history.some(m => m.from === 'SamanthaJones' && !m.helpMessage)

  if (!unmessaged(SamanthaChat) && !samanthaResponded) {
    SamanthaChat.queueEvent('regretToInform', 1)
  }


  const timeElapsed = Date.now() - analyticsLS.get('firstEntry')


  const allTributes = await tributeLS.getAdjustedTributesETH()
  const tributeCount = Object.values(allTributes).filter(t => !!t).length


  // FIRST TRIBUTE: vince || samantha || andy || mindy
  if (tributeCount === 1 && !ls.get('TRIBUTE_EVENT_1')) {
    if (unmessaged(VinceChat)) {
      VinceChat.queueEvent('hello', 1)
    } else if (!samanthaResponded) {
      SamanthaChat.queueEvent('regretToInform', 1)
    } else if (unmessaged(AndyChat)) {
      AndyChat.queueEvent('reachingOut', 1)
    } else if (unmessaged(MindyChat)) {
      MindyChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx.MindyRouge = 'online'
    }

    ls.set('TRIBUTE_EVENT_1', true)
  }

  // SECOND DOM TRIBUTE: samantha || andy || mindy
  if (tributeCount === 2 && !ls.get('TRIBUTE_EVENT_2')) {
    if (!samanthaResponded) {
      SamanthaChat.queueEvent('regretToInform', 1)
    } else if (unmessaged(AndyChat)) {
      AndyChat.queueEvent('reachingOut', 1)
    } else if (unmessaged(MindyChat)) {
      MindyChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx.MindyRouge = 'online'
    }
    ls.set('TRIBUTE_EVENT_2', true)
  }

  // THIRD DOM TRIBUTE: andy || mindy
  if (tributeCount === 3 && !ls.get('TRIBUTE_EVENT_3')) {
    if (unmessaged(AndyChat)) {
      AndyChat.queueEvent('reachingOut', 1)
    } else if (unmessaged(MindyChat)) {
      MindyChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx.MindyRouge = 'online'
    }
    ls.set('TRIBUTE_EVENT_3', true)
  }



  // VIP PURCHASE: CustomerSupport
  const activeVIP = await sexyCLIT.getActiveVIP()
  if (activeVIP != null) {
    const { SexyVIP } = await provider.sexyContracts()
    const activeIsGold = await SexyVIP.isGold(activeVIP)

    MessageHandler.globalCtx.isVIP = true
    MessageHandler.globalCtx.isGold = activeIsGold

    if (unmessaged(CustomerSupportChat)) {
      MessageHandler.visibilityCtx.CustomerSupport247 = 'online'
      CustomerSupportChat.queueEvent('hello', 1)
    }
  } else {
    MessageHandler.globalCtx.isVIP = false
    MessageHandler.globalCtx.isGold = false

  }



  // WALLET CLEANSED: Samantha
  if (unmessaged(SamanthaChat)) {
    const interval = setInterval(() => {
      if (unmessaged(SamanthaChat) && MessageHandler.globalCtx.walletCleansed) {
        SamanthaChat.queueEvent('regretToInform', 1)
        clearInterval(interval)

      } else if (unmessaged(SamanthaChat)) {

      }
    }, 10000)
  }
})



      // MessageHandler.visibilityCtx.CustomerSupport247 = 'online'
      // MessageHandler.visibilityCtx['0x000000000000000000000000000000000'] = 'online'
      // MessageHandler.visibilityCtx.SpecialAgentDiane = 'online'
      // MessageHandler.visibilityCtx.Hedonitronica = 'online'
      // MessageHandler.visibilityCtx.katFischer = 'online'
      // MessageHandler.visibilityCtx.MindyRouge = 'online'



// const wordCount = M => Object.keys(M).reduce((a, c) => {
//   const {messageText} = M[c]
//   const mt = String(messageText).replace(' => ', '').replace('(ur, ctx)', '')
//   if (mt) {
//     a += mt.split(' ').length
//     return a
//   }
//   else return a
// }, 0)


// const commentCount = P => P.testimonials.reduce((a, c) => {
//   return a + c.review.split(' ').length
// }, 0)

// console.log(Object.keys(MessageHandler.chats).reduce((a, c) => {
//   console.log(c, wordCount(MessageHandler.chats[c].messages))
//   console.log('%%%%%%%%', c, commentCount(ProfileStats[c]))
//   console.log('===',c, ProfileStats[c].description.split(' ').length)


//   return a + wordCount(MessageHandler.chats[c].messages) + commentCount(ProfileStats[c]) +ProfileStats[c].description.split(' ').length
// }, 2000))





