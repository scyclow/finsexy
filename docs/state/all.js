export * from './clit.js'
export * from './profile.js'
export * from './conversationRunner.js'

export * from '../chats/heatherHot.js'
export * from '../chats/samanthaJones.js'
export * from '../chats/VinceSlickson.js'
export * from '../chats/GoddessJessica.js'
export * from '../chats/katFischer.js'
export * from '../chats/DrAndy.js'
export * from '../chats/DungeonMistress.js'
export * from '../chats/hacker.js'
export * from '../chats/QueenOfDiamonds.js'
export * from '../chats/steviep.js'

import {HeatherHotProfile} from '../chats/heatherHot.js'
import {SamanthaProfile} from '../chats/samanthaJones.js'
import {VinceProfile} from '../chats/VinceSlickson.js'
import {KatProfile} from '../chats/katFischer.js'
import {GoddessJessicaProfile} from '../chats/GoddessJessica.js'
import {AndyProfile} from '../chats/DrAndy.js'
import {MistressProfile} from '../chats/DungeonMistress.js'
import {HackerProfile} from '../chats/hacker.js'
import {QueenProfile} from '../chats/QueenOfDiamonds.js'
import {StevieProfile} from '../chats/steviep.js'
// export * from '../chats/cagla.js'

import {ls} from '../$.js'

if (!ls.get('is18')) {
  window.location.replace('./enter')
}


export const ProfileStats = {
  heatherHot: HeatherHotProfile,
  samanthaJones: SamanthaProfile,
  VinceSlickson: VinceProfile,
  katFischer: KatProfile,
  GoddessJessica: GoddessJessicaProfile,
  DrAndy: AndyProfile,
  DungeonMistress: MistressProfile,
  QueenOfDiamonds: QueenProfile,
  steviep: StevieProfile,
  '0x0': HackerProfile,
}