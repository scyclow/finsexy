export * from './clit.js'
export * from './profile.js'
export * from './conversationRunner.js'

export * from '../chats/heatherHot.js'
export * from '../chats/samanthaJones.js'
export * from '../chats/VinceSlickson.js'
export * from '../chats/GoddessJessica.js'
export * from '../chats/katFischer.js'
export * from '../chats/cagla.js'

import {ls} from '../$.js'

if (!ls.get('is18')) {
  window.location.replace('./enter')
}