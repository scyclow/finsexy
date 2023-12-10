export * from './cli.js'
export * from './profile.js'
export * from './conversationRunner.js'

export * from '../chats/samanthaJones.js'
export * from '../chats/heatherHot.js'
export * from '../chats/cagla.js'
export * from '../chats/katFischer.js'
export * from '../chats/vinceSlickson.js'

import {ls} from '../$.js'

  if (!ls.get('is18')) {
    window.location.replace('./enter')
  }