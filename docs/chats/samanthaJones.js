import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, interestedSwitch} from '../state/profile.js'
import {fromWei} from '../eth.js'








/*
Testimonial


*/

export const SamanthaProfile = {
  age: 38,
  distance: 6,
  gender: 'Female',
  maxPhotos: 4,
  description: `
  Samantha Jones is a tax auditor financial professional who loves auditing crypto ${genderSwitch({
    m: 'sissy boys',
    f: 'sissy girls',
    nb: 'sissies',
  })} and focuses on cryptocurrency and blockchain fraud. In her more than 17 years of industry experience, she has handled matters across the criminal and regulatory spectrum. `,
  testimonials: [
    {
      name: '0x0',
      review: `Oh god, yes. Audit me Samantha`,
    },
    {
      name: '0x',
      review: `SamanthaJones is everything I love about the crypto space distilled down into one single person. I'd been getting absolutely rekt on shitcoins for years, but nothing compares to Samantha. Every audit from her is like a proctology exam. She knows how to press all of my buttons like nothing else. `,
    },
    {
      name: '0x1',
      review: `I've been living in constant fear of an IRS audit since I began my involvement in the crypto space in 2021. Samantha helped me work through those fears in a controlled environment. She was worth every penny`,
    },
    {
      name: '0x2',
      review: `I'm an absolute mess when it comes to managing my finances. Even thinking about doing my taxes fills me with a deep existential dread. So there's definitely something appealing in totally giving up all control of my balance sheet`,
    },
    // dealing with my finances causes me too much anxiety. it's nice to completely give up control
  ]
}








export async function samanthaContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x5E5713a0d915701F464DEbb66015adD62B2e6AE9'
  }[networkName]

  const abi = [
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}


const receiveAddrs = (ur, ctx) => {
  if (ur.trim().toLowerCase() === 'this is my only address') {
    ctx.state.validAddresses = []
    return 'addressesPatience'
  }
  if (ur.toLowerCase().includes('.eth')) return 'includesENS'

  ctx.state.givenAddresses = ur.replace(',', ' ').split(' ').filter(word => word.startsWith('0x'))

  if (!ctx.state.givenAddresses.length) return 'addressesInvalid'
  return 'letMeRun'
}



const SamanthaMessages = {
  async __contract(provider) {
    const [contractAddr, abi] = await samanthaContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },



  __precheck(userResponse, ctx) {
    if (userResponse && isMean(userResponse)) {
      ctx.state.meanWarnings = (ctx.state.meanWarnings||0) + 1

      return {
        messageText:
          ctx.state.meanWarnings % 2
            ? ctx.history.length === 1 ? 'Excuse me?' : `${genderSwitch({m: 'Sir', f: `Ma'am`, nb: getUserData('name')})}, this is a serious matter.`
            : `I don't have time for this. Maybe I'll just speak with your tax attorney instead...`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  START: {
    responseHandler: (userResponse) => `helpYou`
  },

  helpYou: {
    messageText: 'Can I help you?',
    responseHandler: (ur, ctx) => {
      ctx.state.messagedFirst = true
      return 'pleaseHold'
    }
  },

  // TODO: I'm sorry, but I don't speak to anyone who doesn't connect their wallet.

  pleaseHold: {
    messageText: 'Please hold for one minute. Your account has been flagged by my automated system for suspiscious activity. I need to look into this.',
    followUp: { messageCode: 'regretToInform', waitMs: 60000 }
  },


  regretToInform: {
    messageText: (ur, ctx) => `
      ${!ctx.state.messagedFirst ? `<p>Dear ${getUserData().name},</p>` : ''}
      <p>I regret to inform you that your federal income tax return for the year ending December 31, 2023 has been selected for examination. Our records indicate potential discrepancies and irregularities concerning your reported cryptocurrency transactions.</p>
      <p>The examination will focus primarily on the accuracy and completeness of the information provided regarding your cryptocurrency activities, including but not limited to the acquisition, disposition, and valuation of digital assets. It is imperative that you provide comprehensive documentation, records, and details related to these transactions.</p>
    `,
    followUp: { messageCode: 'understand', waitMs: 2000 }
  },

  understand: {
    messageText: 'Do you understand?',
    responseHandler: (ur) => {
      if (isYes(ur)) {
        return 'proceed'
      } else if (isNo(ur)) {
        return 'understandUnsure2'
      } else {
        return 'understandUnsure1'
      }
    }
  },

  understandUnsure1: {
    messageText: () => `${genderSwitch({m: 'Sir', f: `Ma'am`, nb: getUserData('name')})}, this is a serious matter. I'll repeat myself: Do you understand?`,
    responseHandler: ur => {
      if (isYes(ur)) {
        return 'proceed'
      } else {
        return 'understandUnsure2'
      }
    }
  },

  understandUnsure2: {
    messageText: `If you do not comply with my request there will be severe consequences. Do you understand?`,
    responseHandler: ur => {
      if (isYes(ur)) {
        return 'proceed'
      } else if (isNo(ur)) {
        return 'understandNo'
      } else {
        return 'understandUnsure2'
      }
    }
  },

  understandUnsure3: {
    messageText: () => `It's difficult for my to overemphasize the gravity of this situation. If you continue to be uncooperative you could be subject to fines, penalties, and legal actions. I'll ask one more time: <em>Do you understand</em>?`,
    responseHandler: ur => {
      if (isYes(ur)) {
        return 'proceed'
      } else {
        return 'understandNo'
      }
    }
  },

  understandNo: {
    messageText: 'I suggest you contact a tax attorney as soon as possible and get back to me.',
    responseHandler: 'imSorry'
  },

  imSorry: {
    messageText: `If you'd like to continue you'll have to cooperate. I believe I'm owed an appology.`,
    responseHandler: ur => {
      if (ur.toLowerCase().includes('sorry') && !isNo(ur)) {
        return 'veryWell'
      } else {
        return 'imSorry2'
      }
    }
  },

  imSorry2: {
    messageText: `That doesn't sound like an appology to me.`,
    responseHandler: ur => {
      if (ur.toLowerCase().includes('sorry') && !isNo(ur)) {
        return 'veryWell'
      } else {
        return 'imSorry2'
      }
    }
  },

  veryWell: {
    messageText: `Very well. Let's proceed. I'm going to run you through a strict audit protocol.`,
    followUp: { messageCode: 'proceed', waitMs: 2000 }
  },

  proceed: {
    messageText: `I'm going to need a a comma- or space-delineated list of all wallet addresses you currently have custody over, other than the address you are currently connected with to FinSexy. I need the full address -- no ENS names. If this is your only address, then say "this is my only address"`,
    responseHandler: receiveAddrs
  },

  includesENS: {
    messageText: `I'll repeat myself: <em>I need the full address -- no ENS names</em>.`,
    responseHandler: receiveAddrs
  },

  letMeRun: {
    messageText: (ur, ctx) => `Please hold while I run ${ctx.state.givenAddresses.length ? 'these addresses' : 'this address'}. This might take a moment`,
    async followUp(ur, ctx, contract, provider) {
      ctx.state.invalidAddresses = ctx.state.givenAddresses.filter(addr => !provider.isAddress(addr))

      if (ctx.state.invalidAddresses.length) {
        return { messageCode: 'addressesInvalid', waitMs: 30000 }
      }

      ctx.state.validAddresses = Array.from(new Set(ctx.state.givenAddresses.filter(addr => provider.isAddress(addr))))

      return { messageCode: 'addressesPatience', waitMs: 30000 }
    }
  },

  addressesInvalid: {
    messageText: (ur, ctx) => {
      if (!ctx.state.givenAddresses.length) return `I don't see any addresses here. Are you paying attention?`
      const initialText = ctx.state.invalidAddresses.length > 1
        ? `Hmm, it appears as if there are issues with the following addresses: ${ctx.state.invalidAddresses.join(', ')}. `
        : `Hmm, it appears as if there is an issue with the following address: ${ctx.state.invalidAddresses[0]}. `
      return initialText + 'Please double check this and give me a new list.'
    },
    responseHandler: receiveAddrs
  },

  // addressesProcessed2: {
  //   messageText: `Okay, I've processed all your addresses...`

  // },

  addressesPatience: {
    messageText: `Thank you for your patience. Just tying up a few loose ends.`,
    async followUp(ur, ctx, contract, provider) {
      ctx.state.steviepBalances = {
        FIMBalance: 0,
        UFIMBalance: 0,
        IOUBalance: 0,
        NVCBalance: 0,
        IFDBalance: 0,
        MMOBalance: 0,
        CASHBalance: 0,
        FastCashBalance: 0,
      }

      try {
        const signer = ctx.global.connectedAddr
        const contracts = await provider.steviepContracts('mainnet')

        const addrs = [signer, ...ctx.state.validAddresses]


        for (let addr of addrs) {
          const ABTokens = await contracts.AB.tokensOfOwner(addr)
          const FIMBalance = ABTokens.reduce((sum, id) => Math.floor(id/1000000) === 152 ? sum + 1 : sum, 0)

          const [
            UFIMBalance,
            IOUBalance,
            NVCBalance,
            IFDBalance,
            MMOBalance,
            CASHBalance,
            FastCashBalance,
          ] = await Promise.all([
            contracts.UFIM.balanceOf(addr),
            contracts.IOU.balanceOf(addr),
            contracts.NVC.balanceOf(addr),
            contracts.IFD.balanceOf(addr),
            contracts.MMO.balanceOf(addr),
            contracts.CASH.balanceOf(addr),
            contracts.FastCash.balanceOf(addr),
          ])


          ctx.state.steviepBalances.FIMBalance += Number(FIMBalance)
          ctx.state.steviepBalances.UFIMBalance += Number(UFIMBalance)
          ctx.state.steviepBalances.IOUBalance += Number(IOUBalance)
          ctx.state.steviepBalances.NVCBalance += Number(NVCBalance)
          ctx.state.steviepBalances.IFDBalance += Number(IFDBalance)
          ctx.state.steviepBalances.MMOBalance += Number(MMOBalance)
          ctx.state.steviepBalances.CASHBalance += Number(CASHBalance)
          ctx.state.steviepBalances.FastCashBalance += fromWei(Number(FastCashBalance))
        }


        return { messageCode: 'addressesContinue1', waitMs: 3000 }


      } catch (e) {
        ctx.error = e
        return { messageCode: 'addressesError', waitMs: 3000 }
      }

    }
  },

  addressesError: {
    messageText: 'It appears there has been an error. Please try again later.',
    responseHandler: 'veryWell'
  },

  addressesContinue1: {
    async messageText(ur, ctx, contract, provider) {
      const signer = ctx.global.connectedAddr
      const hasMultipleAccounts = !!ctx.state.validAddresses.length

      let balanceSum = 0
      for (let addr of [signer, ...ctx.state.validAddresses]) {
        balanceSum += await provider.getETHBalance(addr)
      }
      return `${hasMultipleAccounts ? `${hasMultipleAccounts + 1} accounts` : 'One account'}, holding approximately ${balanceSum} ETH. `
    },
    followUp: { messageCode: 'addressesContinue2', waitMs: 2000 }

  },
  addressesContinue2: {
    messageText(ur, ctx) {
      const signer = ctx.global.connectedAddr
      const { steviepBalances } = ctx.state

      const hasMultipleAccounts = !!ctx.state.validAddresses.length
      const hasIrregularities = [
        steviepBalances.FIMBalance,
        steviepBalances.UFIMBalance,
        steviepBalances.IOUBalance,
        steviepBalances.NVCBalance,
        steviepBalances.IFDBalance,
        steviepBalances.MMOBalance,
        steviepBalances.CASHBalance,
        steviepBalances.FastCashBalance,
      ].some(x => !!x)

      if (!hasIrregularities) return `Okay, everything seems to be in order here. Let's continue.`

      const addrText =
        ctx.state.validAddresses.length
          ? `the following addresses:</p> <code>${[signer, ...ctx.state.validAddresses].join(', ')}</code>`
          : `the address</p> <code>${signer}</code>`

      return `
        <p>Oh my, I'm noticing certain... irregularities with your account${hasMultipleAccounts ? 's' : ''}. For ${addrText}
      `
    },
    followUp: (ur, ctx, contract, provider) => {
      const { steviepBalances } = ctx.state

      const hasIrregularities = [
        steviepBalances.FIMBalance,
        steviepBalances.UFIMBalance,
        steviepBalances.IOUBalance,
        steviepBalances.NVCBalance,
        steviepBalances.IFDBalance,
        steviepBalances.MMOBalance,
        steviepBalances.CASHBalance,
        steviepBalances.FastCashBalance,
      ].some(x => !!x)


      if (!hasIrregularities) return { messageCode: 'continue', waitMs: 2000 }
      else return { messageCode: 'flagging', waitMs: 2000}
    }
  },

  flagging: {
    messageText: (ur, ctx) => {
      const {
        FIMBalance,
        UFIMBalance,
        IOUBalance,
        NVCBalance,
        IFDBalance,
        MMOBalance,
        CASHBalance,
        FastCashBalance,
      } = ctx.state.steviepBalances

      let balanceText = []

      if (FIMBalance) balanceText.push(`Fake Internet Money: ${FIMBalance}`)
      if (UFIMBalance) balanceText.push(`Uncirculated Fake Internet Money: ${UFIMBalance}`)
      if (IOUBalance) balanceText.push(`IOUs: ${IOUBalance}`)
      if (NVCBalance) balanceText.push(`Negative Value Certificates: ${NVCBalance}`)
      if (IFDBalance) balanceText.push(`Instructions For Defacement/Plottables Flex: ${IFDBalance}`)
      if (MMOBalance) balanceText.push(`Money Making Opportunity: ${MMOBalance}`)
      if (CASHBalance) balanceText.push(`Cold Hard Cash: ${CASHBalance}`)
      if (FastCashBalance) balanceText.push(`FastCash: ${FastCashBalance}`)


      return `
        <p>My system is flagging the following assets:</p>
        <code>${balanceText.join('<br>')}</code>
      `

    }
  },

  continue: {
    messageText: 'continue placeholder'
  }

}



// do you have any other wallets?

//// check for fim, NVC, IOU, MMO, IFD, fastcash, cold hard cash, 10eth
// oh boy...

export const SamanthaChat = new MessageHandler('samanthaJones', SamanthaMessages, 'START')

// const samanthaChatWindow = $.id('samanthaJones-chat')

// SamanthaChat.addChatWindow(samanthaChatWindow)







/*





throws shade at vince slickson




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