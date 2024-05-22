
import { isYes, isNo, isGreeting, diatribe, MessageHandler, isMatch } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {sexyCLIT} from '../state/clit.js'


/*

TODO:
- sending tutorials
- lead with telling you info about VIP tokens

- maybe approval challenge
  - "think of how good it will feel to give someone access to your <em>entire</em> SexyCredit balance. "
  - tutorial
  -


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
  description: `VIP Customer Support Associate`,
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
<p>Have a question about your VIP Membership?</p>
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
    followUp: fu('debugging')
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
    responseHandler: (ur, ctx) => {
      if (isYes(ur)) {
        ctx.state.moreInfoCount = (ctx.state.moreInfoCount || 0) % 3
        return 'finsexyInfo' + ctx.state.moreInfoCount
      } else {
        return 'mainMenu'
      }
    }
  },

  infoAnswered: {
    messageText: 'Did that answer your question, or do you want more info?',
    responseHandler: (ur, ctx) => {
      if (isYes(ur)) return 'helpConcluded'
      else {
        ctx.state.moreInfoCount = (ctx.state.moreInfoCount + 1) % 3
        return 'finsexyInfo' + ctx.state.moreInfoCount
      }
    }
  },

  finsexyInfo0: {
    messageText: `FinDom is short for Financial Domination: a fetish lifestyle activity in which a submissive is required to give gifts or money to a dominant. In this fetish lifestyle, in particular a practice of dominance and submission, a submissive (cash piggy, finsub, human ATM, money slave or paypig) gives gifts and money to a financial dominant (findomme/findom, Goddess, money dom/money domme, money master/ money mistress or cashmaster). Participants in financial domination can be of any gender but in practice the dominant person is more likely a woman, and the submissive is almost always a man. Financial domination became more widespread and took on its current form after the introduction of the Internet. The relationship between the two parties (including paying) often takes place solely via online communication.`,
    followUp: fu('infoAnswered')
  },

  finsexyInfo1: {
    messageText: `FinSexy is an adult website launched by American entrepreneur and artist @steviep in 2024. It's the first application of its kind to combine cutting edge Blockchain, Artificial Intelligence, and Web Development technologies to address various market inefficiencies in the FinDom sector. These technologies allow for competative marketplace pricing due to various economies of scale, and enable an overall better product than what consumers are used to. Many paypigs report lessened feelings of lonliness and increased levels of life satisfaction after using FinSexy`,
    followUp: fu('infoAnswered')
  },

  finsexyInfo2: {
    messageText: `Paying findoms on FinSexy is easy. First, you need to visit <a>https://finsexy.com</a> in a web3 enabled browser and connect your wallet. You can do this by clicking the "Connect Wallet" button in the upper righthand corner of your web browser. Then, all you need to do is visit the web page of your favorite findom and locate the "Send Module". This will look like an input box along side a green button. To send ETH, simply click inside the input box, type in the amount of ETH you want to send, click the "SEND" button, and approve the transaction in your web browser. You can also use the $sexy Command Line Interface Tool to send ETH. All you need to do is type <code>$sexy send [recipient name] [amount in ETH]</code> into any chat window and press enter!`,
    followUp: fu('finsexyInfo2b')
  },

  finsexyInfo2b: {
    messageText: `As a Premium member, you have also been granted 25 SexyCredits, which FinSexy findoms generally accept at a rate of 1 SexyCredit per 0.01 ETH. You can send SexyCredits by locating the "Send Credit Module". This should be located directly under the "Send Module". To send a SexyCredit, enter the amount you'd like to send in the input box and click "SEND CREDIT". You can also send credits using the $sexy CLIT by typing <code>$sexy vip spend [findom name] [# of credits]</code> into any chat window and pressing enter!`,
    followUp: fu('infoAnswered')
  },


///

  dontUnderstand: {
    messageText: `<p>I'm sorry, I don't understand. Are you trying to:</p> ${mainMenuText}`,
    responseHandler: supportResponse
  },

  mainMenu: {
    messageText: `<p>What would you like to do? I can help you with any of the following:</p> ${mainMenuText}`,
    responseHandler: supportResponse
  },

  vipQuestion: {
    messageText: `You have a question about your VIP Membership, is that correct?`,
    responseHandler: (ur, ctx) => isYes(ur) ? 'vipMenu' : 'mainMenu'
  },

  vipMenu: {
    messageText: (ur, ctx) => `
      <p>I'd be happy to help you! Which of the following do you need help with?</p>
      <ul>
        <li>SexyCredits</li>
        <li>Special VIP Features</li>
        <li>VIP Membership Perks</li>
        ${ctx.global.isGold ? `<li>VIP Gold Perks</li>` : ''}
        <li>Non-VIP issues</li>
      </ul>
    `,
    responseHandler: vipResponses
  },


  vipFinished: {
    messageText: 'Do you have any more questions about your VIP Membership?',
    responseHandler: ur => isYes(ur) ? 'vipMenu' : 'helpConcluded'
  },

  vipSexyCredits: {
    messageText: `As a Premium member, you have been granted 25 SexyCredits, which FinSexy findoms generally accept at a rate of 1 SexyCredit per 0.01 ETH. You can send SexyCredits by going to your favorite findom's web page and locating the "Send Credit Module". This should be located directly under the "Send Module". To send a SexyCredit, enter the amount you'd like to send in the input box and click "SEND CREDIT". You can also send credits using the $sexy Comman Line Interface Tool by typing <code>$sexy vip spend [findom name] [# of credits]</code> into any chat window and pressing enter! FinSexy does not support sending fractional credits at this time.`,
    followUp: fu('vipSexyCredits2')
  },

  vipSexyCredits2: {
    messageText: `SexyCredits are not ERC20 tokens, but you can still transfer SexyCredits between VIP Membership cards! To do this, navigate to <a href="https://finsexy.com/profile">finsexy.com/profile</a>, scroll down to "V.I.P. Preferences", and find the "Send SexyCredits" module. From there, you can input the Membership ID you'd like to send credits to and the amount of credits you'd like to send. Then all you need to do is click "SEND" and approve the transaction. FinSexy does not support sending fractional credits at this time.`,
    followUp: fu('vipSexyCredits3')
  },

  vipSexyCredits3: {
    messageText: `Additionally, you can approve addresses to send SexyCredits on your behalf! To do this, locate the "Approve SexyCredits" module on <a href="https://finsexy.com/profile">finsexy.com/profile</a>, input the operator address, click "APPROVE", and sign your transaction! Keep in mind that this will allow the operator to spend ALL of your SexyCredits, so be careful who you approve! You can only approve one operator at a time.`,
    followUp: fu('vipFinished')
  },

  vipFeatures: {
    messageText: `TODO`,
    followUp: fu('vipFinished')
  },
  vipPerks: {
    messageText: `TODO`,
    followUp: fu('vipFinished')
  },
  vipGold: {
    messageText: `TODO`,
    followUp: fu('vipFinished')
  },

}

function supportResponse(ur, ctx) {
  if (isMatch(ur, ['bug', 'glitch', 'not working', 'tech support', 'technical support', 'website', 'technical issue', 'tech', 'fix', 'browser', 'metamask'])) {
    return 'bugHelp'
  } else if (isMatch(ur, ['vip', 'member', 'membership', 'very important', 'gold'])) {
    return 'vipQuestion'

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

  // tutorial
  // something sexy
  // financially dominate
    // you'd like for me to financially dominate you. is that correct?
}

function vipResponses(ur, ctx) {
  if (isMatch(ur, ['credits', 'sexycredits', '25'])) {
    return 'vipSexyCredits'
  } else if (isMatch(ur, ['features'])) {
    return 'vipFeatures'
  } else if (isMatch(ur, ['perks'])) {
    return 'vipPerks'
  } else if (isMatch(ur, ['gold'])) {
    return 'vipGold'
  } else {
    return 'helpConcluded'
  }
}



export const CustomerSupportChat = new MessageHandler(CustomerSupportProfile, CustomerSupportMessages)


