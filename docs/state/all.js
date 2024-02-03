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

import {HeatherHotProfile} from '../chats/heatherHot.js'
import {SamanthaProfile} from '../chats/SamanthaJones.js'
import {VinceProfile} from '../chats/VinceSlickson.js'
import {KatProfile} from '../chats/katFischer.js'
import {CrystalGoddessProfile} from '../chats/CrystalGoddess.js'
import {AndyProfile} from '../chats/DrAndy.js'
import {MistressProfile} from '../chats/DungeonMistress.js'
import {HackerProfile} from '../chats/hacker.js'
import {QueenProfile} from '../chats/QueenJessica.js'
import {StevieProfile} from '../chats/steviep.js'
// export * from '../chats/cagla.js'

import {ls} from '../$.js'

if (!ls.get('is18')) {
  window.location.replace('./enter')
}


export const ProfileStats = {
  heatherHot: HeatherHotProfile,
  SamanthaJones: SamanthaProfile,
  VinceSlickson: VinceProfile,
  CrystalGoddess: CrystalGoddessProfile,
  steviep: StevieProfile,
  QueenJessica: QueenProfile,
  katFischer: KatProfile,
  DrAndy: AndyProfile,
  DungeonMistress: MistressProfile,
  '0x0': HackerProfile,
}