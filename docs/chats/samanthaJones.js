const SamanthaMessages = {
  START: {
    responseHandler: (userResponse) => `needsTribute`
  },

  needsTribute: {
    messageText: () => `I'm sorry, hun. I need to get a deposit from you before we can start. There are so many scammers out there. You understand.`,
    responseHandler: (userResponse) => `needsTribute`
  }

}

const SamanthaChat = new MessageHandler('samanthaJones', SamanthaMessages, 'START')

const samanthaChatWindow = $.id('samanthaJones-chat')

SamanthaChat.addChatWindow(samanthaChatWindow)

