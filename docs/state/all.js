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
import {SamanthaProfile} from '../chats/SamanthaJones.js'
import {VinceProfile} from '../chats/VinceSlickson.js'
import {KatProfile, KatChat} from '../chats/katFischer.js'
import {CrystalGoddessProfile} from '../chats/CrystalGoddess.js'
import {AndyProfile} from '../chats/DrAndy.js'
import {MistressProfile} from '../chats/DungeonMistress.js'
import {HackerProfile, HackerChat} from '../chats/hacker.js'
import {QueenProfile} from '../chats/QueenJessica.js'
import {StevieProfile} from '../chats/steviep.js'
import {HedonitronicaProfile} from '../chats/Hedonitronica.js'
import {DianeProfile} from '../chats/SpecialAgentDiane.js'
// export * from '../chats/cagla.js'

import {ls} from '../$.js'

import {getUserData } from '../state/profile.js'
import {analyticsLS} from './analytics.js'


if (!ls.get('__enteredSite')) {
  // TODO ad referer ? param + redirect there
  window.location.replace('./enter')
}


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
}

setRunInterval(() => {
  const pastProfile = ls.get('profileDeferred') || ls.get('profileCompleted')

  // TODO can optimize this to not run once a second once events are queued

  if (ls.get('__enteredSite') && pastProfile) {
    if (!KatChat.ctx.history.length && !KatChat.ctx.eventQueue.length) {
      KatChat.queueEvent('steviep', 300000)
    }
    if (!HHChat.ctx.history.length && !HHChat.ctx.eventQueue.length) {
      HHChat.queueEvent('hi', 5000)
    }

    const pw = getUserData('password')
    const timeElapsed = Date.now() - analyticsLS.get('firstEntry')
    if (!HackerChat.ctx.history.length &&  !HackerChat.ctx.eventQueue.length && pw && timeElapsed >= 1200000) {
      HackerChat.queueEvent('hello', 1)
      MessageHandler.visibilityCtx['0x000000000000000000000000000000000'] = 'offline'
    }
  }


  // ls.set('returnVisit', true)
}, 1000)



if (!ls.get('BETA_PASS') && window.location.href.includes('finsexy.com')) {
  let pw
  while (pw !== 'steveissexy') {
    pw = prompt('password')
  }

  ls.set('BETA_PASS', true)
}





const wordCount = M => Object.keys(M).reduce((a, c) => {
  const messageText = M[c]
  if (messageText) {
    a += messageText.toString().split(' ').length
    return a
  }
  else return a
}, 0)


const commentCount = P => P.testimonials.reduce((a, c) => {
  return a + c.review.split(' ').length
}, 0)

console.log(Object.keys(MessageHandler.chats).reduce((a, c) => {
  console.log(c, wordCount(MessageHandler.chats[c].messages))
  console.log(c, commentCount(ProfileStats[c]))


  return a + wordCount(MessageHandler.chats[c].messages) + commentCount(ProfileStats[c])
}, 0))





