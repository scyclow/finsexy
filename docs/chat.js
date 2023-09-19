const _CHAT_STATE_ = '_CHAT_STATE_'

class Chat {
  #state
  constructor(_state) {
    this.#state = _state
  }

  dehydrate() {
    ls.set(_CHAT_STATE_, JSON.stringify(this.#state))
  }
}


const rehydrateState = () => ls.get(_CHAT_STATE_) || {}

const __c = new Chat(rehydrateState())


const chatLog = [
  { from: 'cagla', timestamp: 0, content: 'hey there, hot stuff'}
]

class ChatCharacter {
  chatLog = []


}