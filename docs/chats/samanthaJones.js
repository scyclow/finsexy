import { isYes, isNo, isGreeting, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'


export const SamanthaProfile = {
    age: 38,
    distance: 6,
    maxPhotos: 4,
    description: `
    Samantha Jones is a tax auditor financial professional who loves auditing crypto sissy ${''}s

    with a focus on cryptocurrency and blockchain fraud. In her more than 17 years of industry experience, she has handled matters across the criminal and regulatory spectrum. `
  }


const SamanthaMessages = {
  // __contract() {},
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




Okay. Oof. I see a few problems right off the bat. Has this man (link to CPA) ever prepared your taxes?
  No: are you sure?
  Yes: that figures.

I see you have some fastcash
I'll be quite honest, name. Things aren't looking good for you. At best you're looking at substantial penalties, and at worst you're looking at quite a bit of jail time.
That being said, browsing your transactions gets me so hot. So many... incongruities.
I can make this all go away for you. For a small fee, of course
I just need the private key to your wallet to run something through our system.
Don't be such a prude. It's not like I haven't seen a private key before. Are you afraid I'll think it's too small? Lol





*/