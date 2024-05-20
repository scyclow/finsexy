
import { isYes, isNo, isGreeting, diatribe, MessageHandler, isMatch } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {sexyCLIT} from '../state/clit.js'


/*

      - DMs you after you buy VIP
        - if message without a vip: `This Findom is only available to VIP members`
        - congratulates you on your purchase
        - "ooo, and I see you're gold, too. Very nice 😉"
        - let me know if you have any questions. i'm here for you 24/7
        - "I'm sorry, I don't understand. Are you trying to:
          Send to a findom
          learn more about finsexy
          seek technical support
          speak to a representative
        "


*/


const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

export const CustomerSupportProfile = {
  name: 'CustomerSupport247',
  startingVisibility: 'hidden',
  domType: 'Service',
  order: 18,
  age: 38,
  distance: 1111,
  maxPhotos: 1,
  voice: {
    lang: 'el-GR',
    name: 'Melina'
  },
  description: ``,
  gender: 'Female',
  display: 'f',
  testimonials: [
    {
      review: `I love Customer Support! She's so helpful!`
    }

  ]
}




const mainMenuText = `
<p>Get more information about FinSexy?</p>
<p>Fix a sexy technical issue?</p>
<p>Send ETH to a findom?</p>
<p>File a complaint against a FinSexy employee or independent contractor?</p>
<p>Or something else?</p>
`




const CustomerSupportMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('CustomerSupport247')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (!ctx.global.isVIP) {
      return {
        messageText: `This FinDom is only available to VIP Members`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
        helpMessage: true,
        ignoreType: true
      }
    }

    // if (userResponse && isMean(userResponse)) {
    //   return {
    //     messageText: ``,
    //     responseHandler: (ur, ctx) => ctx.lastDomCodeSent
    //   }
    // }
  },

  ...diatribe('hello', [
    `Hi! I see you just purchased a FinSexy VIP Membership!`,
    (ur, ctx) => ctx.global.isGold ? `Oh, and I see you're Gold, too. Very nice 😉` : '',
    `I just wanted to let you know that I'm here for you, 24/7 if you have any questions!`
  ], {
    responseHandler: supportResponse
  }),

  helpConcluded: {
    messageText: `Great! I'm glad I could help! Please let me know if you need further assistance!`,
    responseHandler: supportResponse
  },

/// BUG HELP
  bugHelp: {
    messageText: `It sounds like you're having a technical issue. Is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'bugDetails' : 'mainMenu'
  },

  bugDetails: {
    messageText: `I'd be glad to help! Please describe the problem to me in as much detail as possible.`,
    responseHandler: 'frustrating',
  },

  frustrating: {
    messageText: `That sounds really frustrating. Let's see if there's something I can do to help you fix that!`,
    followUp: 'debugging'
  },

  debugging: {
    messageText: `Have you tried closing all other FinSexy tabs and hard refreshing the page? You can do this be holding <code>cmd + shift + r</code> on Mac, or <code>ctrl + shift + r</code> on windows.`,
    responseHandler: 'fixedProblem'
  },

  fixedProblem: {
    messageText: `Has that fixed your problem?`,
    responseHandler: ur => isYes(ur) ? 'helpConcluded' : 'stillIssuesMM'
  },


  stillIssuesMM: {
    messageText: `Okay, let's try something else. Are you using MetaMask as your web3 wallet?`,
    responseHandler: ur => isYes(ur) ? 'metaMaskAdvanced' : 'stillIssues'
  },

  metaMaskAdvanced: {
    messageText: `Okay, let's try clearing your activity tab. You can do this by going to Settings > Advanced > Clear activity tab. Has that fixed your problem?`,
    responseHandler: ur => isYes(ur) ? 'helpConcluded' : 'stillIssues'
  },

  stillIssues: {
    messageText: `Okay, let's try something else. Please open up your browser's dev tools and check the console. Is there an error there?`,
    responseHandler: ur => isYes(ur) ? 'isError' : 'noError'
  },

  isError: {
    messageText: 'Okay! Please copy that error and visit the <a href="https://discord.steviep.xyz" target="_blank", rel="nofollow">FinSexy discord server</a> where a Business Associate can further assist you!',
    responseHandler: 'helpConcluded'
  },

  noError: {
    messageText: `Hmm, I'm not sure what the issue is! Please visit the <a href="https://discord.steviep.xyz" target="_blank", rel="nofollow">FinSexy discord server</a> where a Business Associate can further assist you!`,
    responseHandler: 'helpConcluded'
  },


/// FILE COMPLAINT

  fileComplaint: {
    messageText: `You'd like to file a complaint against a FinSexy employee or independent contractor, is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'fileComplaintConfirmed' : 'mainMenu'
  },

  fileComplaintConfirmed: {
    messageText: `Okay! Who would you like to file your complaint against?`,
    responseHandler: 'complaintDetails'
  },

  complaintDetails: {
    messageText: `Please describe your grievance in as much detail as possible.`,
    responseHandler: 'helpConcluded'
  },

///
  sendHelp: {
    messageText: `You'd like some help sending money to a sexy findom. Is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'sendHelpRecipient' : 'mainMenu'
  },

  sendHelpRecipient: {
    messageText: `Which sexy findom would you like to send eth to?`,
    responseHandler: (ur, ctx) => {
      ctx.state.sendRecipient = ur
      return 'sendHelpAmount'
    }
  },

  sendHelpAmount: {
    messageText: `And how much would you like to send them?`,
    responseHandler: (ur, ctx) => {
      ctx.state.sendAmount = ur
      return 'sendHelpCommand'
    }
  },

  sendHelpCommand: {
    messageText: (ur, ctx) => `That's easy! All you have to do is send a $sexy CLIT command in any chat window. To do that, all you have to do is type <code>$sexy send ${ctx.state.sendRecipient} ${ctx.state.sendAmount}</code> and press enter!`,
    responseHandler: 'helpConcluded'
  },

/// Representative

  representative: {
    messageText: `You'd like to speak to a live representative. Is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'representativeContinued' : 'mainMenu'
  },

  representativeContinued: {
    messageText: `Please visit the <a href="https://discord.steviep.xyz" target="_blank", rel="nofollow">FinSexy discord server</a> where a Business Associate can further assist you!`,
    responseHandler: 'helpConcluded'
  },

/// Something else

  somethingElse: {
    messageText: `You'd like help with something else. Is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'somethingElseContinued' : 'mainMenu'
  },

  somethingElseContinued: {
    messageText: `Please describe what you'd like help with in as much detail as possible`,
    responseHandler: 'representativeContinued'
  },


/// More Info

  moreInformation: {
    messageText: `It sounds like you're looking for more information about FinSexy. Is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'moreInfoContinued' : 'mainMenu'
  },

  moreInfoContinued: {
    // TODO
  },

///

  dontUnderstand: {
    messageText: `<p>I'm sorry, I don't understand. Are you trying to:</p> ${mainMenuText}`,
    responseHandler: supportResponse
  },

  mainMenu: {
    messageText: `<p>What would you like to do? I can help you with any of the following:</p> ${mainMenuText}`,
    responseHandler: supportResponse
  }
}

async function supportResponse(ur, ctx) {
  if (isMatch(ur, ['bug', 'glitch', 'not working', 'tech support', 'technical support', 'website', 'technical issue', 'fix', 'browser', 'metamask'])) {
    return 'bugHelp'
  } else if (isMatch(ur, ['info', 'information', 'question'])) {
    return 'moreInformation'

  } else if (isMatch(ur, ['complaint', 'grievance', 'employee', 'contractor'])) {
    return 'fileComplaint'
  } else if (isMatch(ur, ['live', 'person', 'human', 'representative'])) {
    return 'representative'
  } else if (isMatch(ur, ['sending', 'eth', 'money', 'paying'])) {
    return 'sendHelp'
  } else if (isMatch(ur, ['something else'])) {
    return 'somethingElse'
  } else {
    return 'dontUnderstand'
  }

}



export const CustomerSupportChat = new MessageHandler(CustomerSupportProfile, CustomerSupportMessages)


