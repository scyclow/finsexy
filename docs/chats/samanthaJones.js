import { isYes, isNo, isGreeting, MessageHandler } from '../state/conversationRunner.js'
import {getUserData} from '../state/profile.js'


const SamanthaMessages = {
  START: {
    responseHandler: (userResponse) => `regretToInform`
  },

  regretToInform: {
    messageText: () => `
      <p>Dear ${getUserData().name},</p>
      <p>I regret to inform you that your federal income tax return for the year ending December 31, 2023 has been selected for examination. Our records indicate potential discrepancies and irregularities concerning your reported cryptocurrency transactions.</p>
      <p>The examination will focus primarily on the accuracy and completeness of the information provided regarding your cryptocurrency activities, including but not limited to the acquisition, disposition, and valuation of digital assets. It is imperative that you provide comprehensive documentation, records, and details related to these transactions.</p>
    `,
    responseHandler: (userResponse) => `needsTribute`
  }

}

export const SamanthaChat = new MessageHandler('samanthaJones', SamanthaMessages, 'START')

// const samanthaChatWindow = $.id('samanthaJones-chat')

// SamanthaChat.addChatWindow(samanthaChatWindow)







/*

sir/ma'm/..., this is a serious matter
if you do not comply with my request there will be severe consequences

*/