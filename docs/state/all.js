export * from './clit.js'
export * from './profile.js'
export * from './conversationRunner.js'

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

import {HeatherHotProfile, HHChat} from '../chats/heatherHot.js'
import {SamanthaProfile} from '../chats/SamanthaJones.js'
import {VinceProfile} from '../chats/VinceSlickson.js'
import {KatProfile, KatChat} from '../chats/katFischer.js'
import {CrystalGoddessProfile} from '../chats/CrystalGoddess.js'
import {AndyProfile} from '../chats/DrAndy.js'
import {MistressProfile} from '../chats/DungeonMistress.js'
import {HackerProfile} from '../chats/hacker.js'
import {QueenProfile} from '../chats/QueenJessica.js'
import {StevieProfile} from '../chats/steviep.js'
import {HedonitronicaProfile} from '../chats/Hedonitronica.js'
// export * from '../chats/cagla.js'

import {ls} from '../$.js'

if (!ls.get('is18')) {
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
}

setRunInterval(() => {
  const pastProfile = ls.get('profileDeferred') || ls.get('profileCompleted')

  if (ls.get('is18') && pastProfile) {
    if (!KatChat.ctx.history.length && !KatChat.ctx.eventQueue.length) {
      KatChat.queueEvent('steviep', 120000)
      MessageHandler.visibilityCtx.katFischer = 'online'

    }
    if (!HHChat.ctx.history.length && !HHChat.ctx.eventQueue.length) {
      HHChat.queueEvent('hi', 6000)
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