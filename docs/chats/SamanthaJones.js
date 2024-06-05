import { isYes, isNo, isGreeting, isMean, isMatch, diatribe, responseParser, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch} from '../state/profile.js'
import {fromWei, provider} from '../eth.js'
import {tributeLS} from '../state/tributes.js'




const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })



/*
TODO

  - if completed @crystalgoddess cleansing ceremony, mention money laundering
  - respond if user mentions @crystalgoddess or cleansing ceremony
    -  normally this would be a taxable event, but it i exempt on religious grounds
    - if ceremony completed in global conttext, mention offhandedly


  - ignore first payment if user has already paid
  - let user skip audits on specific positions


  - after you've paid a couple doms, enter "this looks like money laundering" module
  - expand on VS story
  - you're bad with money, so you need to approve
  - work in "probing", spreading your little butt cheeks to poke around deep inside yout tx history
  - ETF

0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4, 0x7ccd2EE72a75F7e4776f598c1Be11A119fD8d191, 0xbc3Ced9089e13C29eD15e47FFE3e0cAA477cb069

https://www.loyalfans.com/countessdiamond/video/bank-manager-tricks-you-into-sending
*/



export const SamanthaProfile = {
  name: 'SamanthaJones',
  startingVisibility: 'offline',
  domType: 'Protocol',
  order: provider.isWeb3() ? 2 : 8,
  age: 46,
  distance: 6,
  gender: 'Female',
  display: 'f',
  maxPhotos: 4,
  voice: {
    lang: 'en-US',
    name: 'Grandma'
  },
  description: `Samantha Jones is a tax auditor financial professional who loves auditing crypto ${genderSwitch({m: 'sissy boys', f: 'sissy girls', nb: 'sissies'})} and focuses on cryptocurrency and blockchain fraud. In her more than 25 years of industry experience, she has handled matters across the criminal and regulatory spectrum. `,
  testimonials: [
    {
      name: '0x0',
      review: `Oh god, yes. Audit me Samantha`,
    },
    {
      name: '0x',
      review: `SamanthaJones is everything I love about the crypto space distilled down into one single person. I've been getting absolutely rekt on shitcoins for years, but nothing compares to Samantha. Every audit from her is like a proctology exam. She knows how to press all of my buttons like nothing else. `,
    },
    {
      name: '0x1',
      review: `Ever since 2021, when i first became involved in the crypto scene, I have been living in constant fear of an IRS audit. Samantha helped me work through some of those issues in a controlled environment. She was worth every penny`,
    },
    {
      review: `Does anyone else enjoy jerking off to their etherscan transaction history? It's so hot seeing the ETH trickle out of my address`
    },
    {
      name: '0x3',
      review: `i've been a naughty girl`,
    },
    {
      name: '0x2',
      review: `I'm an absolute mess when it comes to managing my finances. Even thinking about doing my taxes fills me with a deep existential dread. There's something appealing about giving up total control of my balance sheet to her`,
    },
    {
      review: `I just sent SamanthaJones 0.069 ETH!`
    },
    {
      review: `mmm yeah i wanna suck on those toes baby`
    },
    {
      name: '0x2',
      review: `I love that every transaction I make is out in the open for Samantha to read at her liesure. It gets me so hard.`,
    },
    {
      review: `i'm a little paypig oink oink oink`
    }
    // dealing with my finances causes me too much anxiety. it's nice to completely give up control
  ]
}




const receiveAddrs = (ur, ctx) => {
  if (ur.trim().toLowerCase() === 'this is my only address') {
    ctx.state.validAddresses = [ctx.global.connectedAddr]
    return 'addressesPatience'
  }
  if (ur.toLowerCase().includes('.eth')) return 'includesENS'

  ctx.state.givenAddresses = ur.trim().replaceAll(',', ' ').split(' ').filter(word => word.startsWith('0x'))

  if (!ctx.state.givenAddresses.length) return 'addressesInvalid'
  return 'letMeRun'
}


function generateRemainingBalanceText(ctx, ignoreAlreadyAudited) {
  const {
    FIM,
    UFIM,
    IOU,
    NVC,
    IFD,
    MMO,
    CASH,
    FastCash,
    TenETH,
    ETF,
  } = ctx.state?.steviepBalances || {
    FIM: 0,
    UFIM: 0,
    IOU: 0,
    NVC: 0,
    IFD: 0,
    MMO: 0,
    CASH: 0,
    FastCash: 0,
    TenETH: 0,
    ETF: 0
  }

  let balanceText = []

  const ignoreFIM = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.FIM)
  const ignoreUFIM = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.UFIM)
  const ignoreIOU = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.IOU)
  const ignoreNVC = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.NVC)
  const ignoreIFD = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.IFD)
  const ignoreMMO = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.MMO)
  const ignoreCASH = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.CASH)
  const ignoreTenEth = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.TenETH)
  const ignoreFastCash = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.FastCash)
  const ignoreETF = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.ETF)

  if (!ignoreFIM && FIM) balanceText.push(`Fake Internet Money: ${FIM}`)
  if (!ignoreUFIM && UFIM) balanceText.push(`Uncirculated Fake Internet Money: ${UFIM}`)
  if (!ignoreIOU && IOU) balanceText.push(`IOUs: ${IOU}`)
  if (!ignoreNVC && NVC) balanceText.push(`Negative Value Certificates: ${NVC}`)
  if (!ignoreIFD && IFD) balanceText.push(`Instructions For Defacement/Plottables Flex: ${IFD}`)
  if (!ignoreMMO && MMO) balanceText.push(`Money Making Opportunity: ${MMO}`)
  if (!ignoreCASH && CASH) balanceText.push(`Cold Hard Cash: ${CASH}`)
  if (!ignoreTenEth && TenETH) balanceText.push(`10 ETH Giveaway: ${TenETH}`)
  if (!ignoreFastCash && FastCash) balanceText.push(`FastCash: ${FastCash.toFixed(2)}`)
  if (!ignoreETF && ETF) balanceText.push(`ETF: ${ETF.toFixed(2)}`)

  return balanceText.length ? `<br><code>${balanceText.join('<br>')}</code>` : ''
}


function steviepAssetResponseHandler(ur, ctx) {
  const cleanedUr = responseParser(ur)
  const _isMatch = phrases => phrases.some(x => cleanedUr.includes(x))

  if (_isMatch(['skip', 'relent', 'max penalty', 'maximum penalty'])) {
    return 'maxPenaltyConfirm'
  } else if (_isMatch(['uncirculated', 'ufim'])) {
    return 'ufimAudit'
  } else if (_isMatch(['fake', 'internet', 'fim'])) {
    return 'fimAudit'
  } else if (_isMatch(['iou'])) {
    return 'iouAudit'
  } else if (_isMatch(['negative', 'value', 'cert', 'nvc'])) {
    return 'nvcAudit'
  } else if (_isMatch(['instructions', 'ifd', 'plottables', 'flex'])) {
    return 'ifdAudit'
  } else if (_isMatch(['making', 'opportunity', 'mmo'])) {
    return 'mmoAudit'
  } else if (_isMatch(['fastcash', 'fast'])) {
    return 'fastCashAudit'
  } else if (_isMatch(['cold', 'hard', 'cash', 'chc',])) {
    return 'cashAudit'
  } else if (_isMatch(['ten', '10', 'eth', 'giveaway'])) {
    return 'tenEthAudit'
  } else if (_isMatch(['etf', 'exchange', 'traded', 'fund'])) {
    return 'etfAudit'
  } else {
    return 'confusedAudit'
  }
}




const SamanthaMessages = {
  TYPING_SPEED: 1.1,

  async __contract(provider) {
    return await provider.domContract('SamanthaJones')
  },

  __sendHandler(ctx, preAmount, postAmount, provider) {
    if (ctx.history.length === 0) {
      return {
        messageCode: 'pleaseHold',
        waitMs: 7000
      }
    } else {
      ctx.state.nextNode = ctx.lastDomCodeSent
      return {
        messageCode: 'suchATease',
        waitMs: 5000
      }
    }
  },

  __precheck(userResponse, ctx, contract, provider) {

    if (!provider.isWeb3() || !ctx.global.isConnected) {
      return {
        messageText: `This FinDom is offline`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
        helpMessage: true,
        ignoreType: true
      }
    }

    // TODO - check "add an address"
    if (userResponse && userResponse.toLowerCase().includes('vince') && ctx.global.mentionedSamanthaToVince) {
      // TODO
    } else if (userResponse && userResponse.toLowerCase().includes('sex and the city')) {
      return {
        messageText: `I don't have time for TV.`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    } else if (userResponse && isMean(userResponse)) {
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
    responseHandler: `helpYou`
  },


  suchATease: {
    messageText: () => `Oh ${getUserData('name')}, you are such a tease! But paying your penality before we finish the audit is a strict breach of protocol. Work before pleasure, please!`,
    responseHandler: (ur, ctx) => ctx.state.nextNode
  },

  helpYou: {
    messageText: 'Can I help you?',
    responseHandler: async (ur, ctx, contract, provider) => {
      ctx.state.messagedFirst = true

      const isConnected = await provider.isConnected()
      if (isConnected && ctx.state.completed) return 'instructions'
      else if (isConnected) return 'pleaseHold'
      // else if (!window.ethereum) return 'onlyWeb3'
      // else return 'onlyConnected'
    }
  },

  // TODO: "if sent to other doms - might be a money laundering charge here"
  // TODO: "yeah, you like being watched, don't you? And evaluated. I've got you under a microscope"
  // TODO: "naughty"
  // TODO: if sent to other doms, mention potential tax fraud

  onlyWeb3: {
    messageText: `I like to know who I'm speaking with, and frankly that isn't possible unless you are using a web3-enabled browser.`,
    responseHandler: async (ur, ctx, contract, provider) => {
      const isConnected = await provider.isConnected()
      if (isConnected) return 'pleaseHold'
      else if (!window.ethereum) return 'onlyWeb3'
      else return 'onlyConnected'
    }
  },

  onlyConnected: {
    messageText: `I'm sorry, but I don't talk to anyone who isn't willing connect their wallet. I like to know who I'm speaking with.`,
    responseHandler: async (ur, ctx, contract, provider) => {
      const isConnected = await provider.isConnected()
      if (isConnected) return 'pleaseHold'
      else if (!window.ethereum) return 'onlyWeb3'
      else return 'onlyConnected'
    }
  },

  pleaseHold: {
    messageText: 'Please hold for one minute. Your account has been flagged by my automated system for suspiscious activity. I need to look into this.',
    followUp: { messageCode: 'regretToInform', waitMs: 60000 }
  },


  regretToInform: {
    messageText: (ur, ctx) => `
      ${!ctx.state.messagedFirst ? `<p>Dear ${getUserData().name},</p>` : ''}
      <p>I regret to inform you that ${ctx.global.walletCleansed ? 'your account has been flagged by our automated system due to suspiscious activity possibly related to money laundering' : 'your federal income tax return for the year ending December 31, 2023 has been selected for examination'}. Our records indicate potential discrepancies and irregularities concerning your reported cryptocurrency transactions.</p>
      <p>The examination will focus primarily on the accuracy and completeness of the information provided regarding your cryptocurrency activities, including but not limited to the acquisition, disposition, and valuation of digital assets. It is imperative that you provide comprehensive documentation, records, and details related to these transactions.</p>
    `,
    followUp: { messageCode: 'everySquareInch', waitMs: 8000 }
  },

  everySquareInch: {
    messageText: `Which means I get to examine every square inch of your transaction history. It's going to be a slow, painful, meticulous process. And when I'm done... We're going to assess your penalties.`,
    followUp: fu('veryThorough')
  },

  veryThorough: {
    messageText: `I'm <em>very</em> thorough.`,
    followUp: fu('understand')
  },

  understand: {
    messageText: 'Do you understand?',
    responseHandler: (ur, ctx) => {
      ctx.state.steviepBalances = {
        FIM: 0,
        UFIM: 0,
        IOU: 0,
        NVC: 0,
        IFD: 0,
        MMO: 0,
        CASH: 0,
        FastCash: 0,
        TenETH: 0,
        ETF: 0
      }
      if (isYes(ur)) {
        return 'good'
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
      } else {
        return 'understandUnsure3'
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
    messageText: `If you want to make this process as painless as possible then I suggest you cooperate. I believe I'm owed an appology.`,
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
    messageText: `Very well. Let's proceed. We have a lot of work ahead of us.`,
    followUp: { messageCode: 'instructions', waitMs: 2000 }
  },

  good: {
    messageText: `Good${genderSwitch({m: ' boy.', f: ' girl.', nb: '.'})}`,
    followUp: fu('instructions')
  },

  instructions: {
    messageText: `Follow my instructions as closely as possible, and everything will be alright. If you don't, there will be severe consequences. We have a strict protocol to adhere to.`,
    followUp: fu('proceed')
  },

  proceed: {
    messageText: `In order to get a complete picture of your transaction history I need you to send me a comma- or space-delineated list of all other wallet addresses you currently have custody over.`,
    followUp: fu('fullAddrs')
  },

  fullAddrs: {
    messageText: `I need full addresses -- no ENS names. If this is your only address, then say "this is my only address".`,
    responseHandler: receiveAddrs
  },

  includesENS: {
    messageText: `I'll repeat myself: <em>I need the full address -- no ENS names</em>.`,
    responseHandler: receiveAddrs
  },

  letMeRun: {
    messageText: (ur, ctx) => `Please hold while I run a preliminary search on ${ctx.state.givenAddresses.length ? 'the following addresses' : 'this address'}. This might take a moment. <code>${[ctx.global.connectedAddr, ...ctx.state.givenAddresses].join(', ')}</code>`,
    async followUp(ur, ctx, contract, provider) {
      ctx.state.invalidAddresses = ctx.state.givenAddresses.filter(addr => !provider.isAddress(addr))

      if (ctx.state.invalidAddresses.length) {
        return { messageCode: 'addressesInvalid', waitMs: 30000 }
      }

      ctx.state.validAddresses = Array.from(
        new Set([
          ctx.global.connectedAddr,
          ...ctx.state.givenAddresses.filter(addr => provider.isAddress(addr))
        ])
      ).filter(x => !!x)

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

  addressesPatience: {
    messageText: `Thank you for your patience. Just tying up a few loose ends.`,
    async followUp(ur, ctx, contract, provider) {
      try {
        const signer = ctx.global.connectedAddr
        const contracts = await provider.steviepContracts()

        const addrs = ctx.state.validAddresses


        for (let addr of addrs) {
          const ABTokens = await contracts.AB.tokensOfOwner(addr)
          const FIMTokens = ABTokens.filter(id => Math.floor(id/1000000) === 152).map(bnToN)
          const FIMBalance = FIMTokens.length

          const [
            UFIMBalance,
            IOUBalance,
            NVCBalance,
            IFDBalance,
            MMOBalance,
            CASHBalance,
            FastCashBalance,
            TenEthBalance,
            ETFBalance,
            KYCTokenId
          ] = await Promise.all([
            contracts.UFIM.balanceOf(addr),
            contracts.IOU.balanceOf(addr),
            contracts.NVC.balanceOf(addr),
            contracts.IFD.balanceOf(addr),
            contracts.MMO.balanceOf(addr),
            contracts.CASH.balanceOf(addr),
            contracts.FastCash.balanceOf(addr),
            contracts.TenETH.balanceOf(addr),
            contracts.ETF.balanceOf(addr),
            contracts.KYC.addrToTokenId(addr),
          ])

          try {
            if (Number(KYCTokenId) > 0 && !ctx.state.kycName) {
              const KYCInfo = await contracts.KYC.kycInfo(KYCTokenId)
              ctx.state.kycName = `${KYCInfo.firstName} ${KYCInfo.lastName}`
            }
          } catch (e) {
            console.log(e)
          }


          ctx.state.FIMTokens = FIMTokens

          ctx.state.steviepBalances.FIM += Number(FIMBalance)
          ctx.state.steviepBalances.UFIM += Number(UFIMBalance)
          ctx.state.steviepBalances.IOU += Number(IOUBalance)
          ctx.state.steviepBalances.NVC += Number(NVCBalance)
          ctx.state.steviepBalances.IFD += Number(IFDBalance)
          ctx.state.steviepBalances.MMO += Number(MMOBalance)
          ctx.state.steviepBalances.CASH += Number(CASHBalance)
          ctx.state.steviepBalances.TenETH += Number(TenEthBalance)
          ctx.state.steviepBalances.FastCash += fromWei(FastCashBalance)
          ctx.state.steviepBalances.ETF += fromWei(ETFBalance)

          ctx.state.auditsRemaining = Object.assign({}, ctx.state.steviepBalances)
        }


        return { messageCode: 'addressesContinue0', waitMs: 3000 }


      } catch (e) {
        ctx.error = e.message
        console.log(ctx.error)
        return { messageCode: 'addressesError', waitMs: 3000 }
      }

    }
  },

  addressesError: {
    messageText: 'It appears there has been an error. Please try again later.',
    responseHandler: 'veryWell'
  },

  addressesContinue0: {
    messageText: (ur, ctx) => `Okay, ${getUserData('name')}. ${ctx.state.kycName ? `Or is it ${ctx.state.kycName}, based on your registered KYC information?` : ''}`,
    followUp: fu('addressesContinue1')
  },
  addressesContinue1: {
    async messageText(ur, ctx, contract, provider) {
      const signer = ctx.global.connectedAddr
      const hasMultipleAccounts = ctx.state.validAddresses.length > 1

      let balanceSum = 0
      let totalTxs = 0
      for (let addr of ctx.state.validAddresses) {
        balanceSum += await provider.getETHBalance(addr)
        try {totalTxs += await provider.getTransactionCount(addr)} catch (e) {console.log(e)}
      }

      const txText = totalTxs ?
        `About ${totalTxs} total transactions${hasMultipleAccounts ? ' between them' : ''}.`
        : ''
      return `It looks like we have ${hasMultipleAccounts ? `${ctx.state.validAddresses.length} accounts` : 'one account'} holding approximately ${balanceSum} ETH. ${txText}`
    },
    followUp: { messageCode: 'addressesContinue2', waitMs: 2000 }
  },


  addressesContinue2: {
    messageText:`Oh my, I'm noticing some concerning irregularities.`,
    followUp: fu('dirty')
  },

  dirty: {
    messageText: () => `You've been a bad little ${genderSwitch({m: 'boy', f: 'girl', nb: 'cryptoslut'})}, haven't you?`,
    responseHandler: 'notGreat'
  },


  notGreat: {
    messageText: `I'll be honest, ${getUserData('name')}. Things aren't looking great for you.`,
    followUp: fu('notGreat2')
  },

  notGreat2: {
    messageText: `You're looking at substantial penalties at best. Jail time at worst.`,
    followUp: fu('notGreat3')
  },

  notGreat3: {
    messageText: `But there's something about your transaction history that's just driving me wild.`,
    followUp: fu('notGreat4')
  },

  notGreat4: {
    messageText: `It's so... dirty.`,
    followUp: fu('beenAround')
  },

  beenAround: {
    messageText: `I've been doing this for more than 25 years, so you can say I've been around the block a few times. But even so, I've never seen anything like this.`,
    followUp: fu('fullAudit', 6000)
  },

  fullAudit: {
    messageText: `We're going to have to do a full audit. I have too many unanswered questions.`,
    followUp: fu('edgeOff')
  },

  // sendEvent1: createEvent(0.01, {
  //   primary: { messageCode: 'edgeOff', waitMs: 6000 },
  //   notEnough: { messageCode: 'moreThanThat', waitMs: 3000 }
  // }),

  // prePay: {
  //   messageText: (ur, ctx) => `But before we start I need you to send me a ${ctx.global.premium * 0.01} ETH penalty pre-payment. Then we'll see if we can get this mess sorted out.`,
  //   event: 'sendEvent1',
  //   responseHandler: 'prePay2'
  // },

  // prePay2: {
  //   messageText: (ur, ctx) => `You can sexy send me with <code>$sexy send SamanthaJones ${ctx.global.premium * 0.01}</code> or just send it to me throug my profile page.`,
  //   event: 'sendEvent1',
  //   responseHandler: 'prePay3'
  // },

  // prePay3: {
  //   messageText: `I can't wait to subject you to more analysis and find out what you did.`,
  //   event: 'sendEvent1',
  //   responseHandler: 'prePay'
  // },

  // moreThanThat: {
  //   messageText: (ur, ctx) => `I'm going to need more than that. Namely, ${ctx.global.premium * 0.01} ETH.`,
  //   event: 'sendEvent1',
  //   responseHandler: 'prePay2'
  // },

  edgeOff: {
    messageText: `Let's continue, shall we?`,
    followUp: (ur, ctx) => {
      const { steviepBalances } = ctx.state

      const hasSteviepTokens = [
        steviepBalances.FIM,
        steviepBalances.UFIM,
        steviepBalances.IOU,
        steviepBalances.NVC,
        steviepBalances.IFD,
        steviepBalances.MMO,
        steviepBalances.CASH,
        steviepBalances.FastCash,
        steviepBalances.TenETH,
        steviepBalances.ETF,
      ].some(x => !!x)


      if (!hasSteviepTokens) return { messageCode: 'doesntAddUp', waitMs: 2000 }
      else return { messageCode: 'flagging', waitMs: 2000}
    }
  },

  flagging: {
    messageText: (ur, ctx) => {
      return `
        <p>My system is flagging your positions in the following assets:</p>
        ${generateRemainingBalanceText(ctx)}
      `
    },
    followUp: fu('oneByOne', 5000)
  },

  oneByOne: {
    messageText: `We need to go through these one by one. Where do you want to start?`,
    responseHandler: steviepAssetResponseHandler
  },

  oneByOneReview: {
    messageText: (ur, ctx) => {
      const remainingAuditText = generateRemainingBalanceText(ctx, true)
      if (remainingAuditText) return `What should we work through next? Here's what we have left: ${remainingAuditText} <p>We could also skip some of this if you want to relent and simply pay the maximum penalty, but I wouldn't recommend it.</p>`
      else return `Okay, I think that's all for your suspiscious asset activity. For now, at least. Shall we move on?`
    },
    responseHandler: (ur, ctx) => {
      const remainingAuditText = generateRemainingBalanceText(ctx, true)
      if (remainingAuditText) return steviepAssetResponseHandler(ur, ctx)
      else return 'doesntAddUp'
    }
  },

  fimAudit: {
    messageText: (ur, ctx) => ctx.state.steviepBalances.FIM
      ? `According to your transaction history it appears as if you purchased this NFT that appears to resemble monopoly money. Does this belong to you? <img src="https://artblocks-mainnet.s3.amazonaws.com/${ctx.state.FIMTokens[0]}.png">`
      : genderSwitch({m: 'Sir', f: `Ma'am`, nb: getUserData('name')}) + `, you do not appear to have any Fake Internet Money. Let's try to stay focused.`,
    responseHandler: (ur, ctx) => ctx.state.steviepBalances.FIM
      ? 'fimAudit2'
      : steviepAssetResponseHandler(ur, ctx)

  },
  fimAudit2: {
    messageText: `And do you remember what was your cost basis was for this?`,
    responseHandler: 'fimAudit3'
  },

  fimAudit3: {
    messageText: `Okay, so just to make sure I understand -- and please correct me if I'm wrong -- you're aware that this money is fake?`,
    responseHandler: 'fimAudit4'
  },

  fimAudit4: {
    messageText: ur => {
      if (isYes(ur)) return 'And understanding that, you spent <em>real</em> money on this, er, <em>fake</em> money?'
      else return `So you're claiming ignorance at having spent <em>real</em> money on this, er, <em>fake</em> money?`
    },
    followUp: fu('fimAudit5')
  },

  fimAudit5: {
    messageText: `Which, I might add, has significantly decreased in market value...`,
    responseHandler: 'fimAudit6'
  },

  fimAudit6: {
    messageText: `You're so <em>wreckless</em> with your finances.`,
    followUp: fu('fimAudit7')
  },

  fimAudit7: {
    messageText: `Appologies. I'm letting my excitement get the better of me. This conversation is being recorded, so I should really maintain a professional demeanor.`,
    followUp: fu('fimAudit8')
  },

  fimAudit8: {
    messageText: `If I can be frank, you're looking at potential money laundering charges for this, and I don't think pleading stupidity will hold up in court. I suggest talking to your lawyer about this, but let's move on for now.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.FIM = 0
      return fu('oneByOneReview')
    }
  },

  ufimAudit: {
    messageText: `So these uncirculated fake internet money NFTs... Not only are they fake, but the website says they're commemorative collectables?`,
    responseHandler: 'ufimAudit2'
  },

  ufimAudit2: {
    messageText: `Is it a real commemorative collectable, or a fake commemorative collectable?`,
    responseHandler: 'ufimAudit3'
  },

  ufimAudit3: {
    messageText: `And you spent real, non-commemorative money on this?`,
    responseHandler: 'ufimAudit4'
  },

  ufimAudit4: {
    messageText: `Well, I suppose I don't see anything strictly wrong here. Just remember when you sell this that collectables are taxed at a different long-term capital gains rate than investments. That is, in the <em>very</em> off chance your position appreciates in value.`,
    followUp: fu('ufimAudit5')
  },

  ufimAudit5: {
    messageText: `But I must admit, your propensity to spend money on worthless items is quite endearing. You're like a child who needs ${genderSwitch({m: 'his', f: 'her', nb: 'their'})} mommy to monitor all of their expenditures. It's very cute.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.UFIM = 0
      return fu('oneByOneReview')
    }
  },

  iouAudit: {
    messageText: 'Alright. IOUs... What exactly is this an IOU for?',
    responseHandler: 'iouAudit2'
  },

  iouAudit2: {
    messageText: `I'm not sure I understand. What are you owed by holding this asset?`,
    responseHandler: 'iouAudit3'
  },

  iouAudit3: {
    messageText: `I still don't get it. This is a bearer instrument, correct?`,
    followUp: fu('iouAudit4')
  },

  iouAudit4: {
    messageText: `And you're currently in possession of it.`,
    followUp: fu('iouAudit5')
  },

  iouAudit5: {
    messageText: `And I.O.U. is a popular colloquialism to refer to the phrase "I Owe You"...`,
    responseHandler: 'iouAudit6'
  },

  iouAudit6: {
    messageText: `I don't think you quite understand the concepts of "debt" and "ownership". I bet @CrystalGoddess is going to have a field day with you. I don't want to ruin her fun, so let's move on here.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.IOU = 0
      return fu('oneByOneReview')
    }
  },

  nvcAudit: {
    messageText: `You're going to have to help me understand this position. I'm looking at the transaction history here, and it doesn't quite make sense to me.`,
    followUp: fu('nvcAudit1')
  },

  nvcAudit1: {
    messageText: `It appears as if this asset was issued by the address <code>0x7C23C1b7e544e3e805bA675c811E287fc9d71949</code> after it suffered some sort of loss...`,
    followUp: fu('nvcAudit1a')
  },

  nvcAudit1a: {
    messageText: `Which I'm sure felt <em>amazing</em>...`,
    followUp: fu('nvcAudit1b')
  },

  nvcAudit1b: {
    messageText: `And these certificates claim that they are fractionalizations of that loss? Does that all track with you?`,
    responseHandler: 'nvcAudit2'
  },


  nvcAudit2: {
    messageText: `Alright. And looking past the completely nonsensical idea of what fractionalizing a negative value actually means, you decided that it would be desirable to... um, incur this value.`,
    followUp: fu('nvcAudit3', 4000)
  },

  nvcAudit3: {
    messageText: `So much so that you were willing to pay a positive amount of money to do so?`,
    responseHandler: 'nvcAudit4'
  },

  nvcAudit4: {
    messageText: `This might possibly be the most foolish investment I've seen in the last three fiscal years.`,
    followUp: fu('nvcAudit5', 4000)
  },


  nvcAudit5: {
    messageText: `I'm sorry, but I'm getting flush just hearing you attempt to defend yourself. Excuse me, I need a moment to collect myself.`,
    followUp: fu('nvcAudit6', 12000)
  },

  nvcAudit6: {
    messageText: `All I'll say for now is that you better file this as a liability. This is NOT a tax-deductable expense, and it is not implicitly a capital loss until you sell it for less than your original cost basis. I'll be watching what you do here very closely.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.NVC = 0
      return fu('oneByOneReview')
    }
  },


  ifdAudit: {
    messageText: `As much as your disregard for US currency arouses my interests, this one doesn't have any obvious tax implications, so I believe it is outside my purview.`,
    followUp: fu('ifdAudit2')
  },

  ifdAudit2: {
    messageText: `I'll just note that defacing and mutilating US currency is a federal crime, and that you are not legally obligated to follow these instructions.`,
    followUp: fu('ifdAudit3')
  },

  ifdAudit3: {
    messageText: `However, I will note that the notional value of this assets is only $1.00 USD, so don't attempt to inflate it on your balance sheet.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.IFD = 0
      return fu('oneByOneReview')
    }
  },

  mmoAudit: {
    messageText: 'Oh boy. This one is a real doozy. If I understand correctly, this is a financial security with an appoximate book value of 0.031 ETH. Have you paid the appropriate taxes on this asset?',
    responseHandler: 'mmoAudit2'
  },



  mmoAudit2: {
    messageText: (ur) => (
      isYes(ur)
        ? `Don't lie to me, ${getUserData('name')}. I can see <em>everything</em> you've done.`
        : `I didn't think so.`
    ) + ` Your desire for penalties must be insatiable.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.MMO = 0
      return fu('oneByOneReview')
    }
  },

  cashAudit: {
    messageText: `Oh, now I see why you are into findom. @steviep really took you for a ride here.`,
    followUp: fu('cashAudit2')
  },

  cashAudit2: {
    messageText: `Nothing can explain this purchase other than sheer, unadulterated masochism. Why else would someone spend money on... less money?`,
    followUp: fu('cashAudit3')
  },

  cashAudit3: {
    messageText: `Lucky for you, I have a soft spot for masochists. So I'll be watching very closely to see if this is entered on your balance sheet at so much as one cent higher than its nominal value.`,
    followUp: (ur, ctx) => {
      ctx.state.auditsRemaining.CASH = 0
      return fu('oneByOneReview')
    }
  },

  fastCashAudit: {
    messageText: () => `${genderSwitch({m: 'Sir', f: `Ma'am`, nb: getUserData('name')})}, I believe you may have beenthe victim of securities fraud with this Fast Cash investment.`,
    followUp: fu('fastCashAudit2')
  },


// nevertheless, if you received this in an airdrop then

  fastCashAudit2: {
    messageText: `Did @VinceSlickson sell this to you? He's a real fucking slime ball. But I have to say, the way he takes advantage of poor little unsuspecting investors such as yourself gives him a certain charm. He's also <em>very</em> attractive. He'd never go for a girl like me though. He must think I'm too uptight. I think you're more his type.`,
    followUp: fu('fastCashAudit4')
  },

  fastCashAudit4: {
    messageText: `Anyhow, getting back to business, I have good news and bad news for you. Which do you want first?`,
    responseHandler: ur => {
      if (ur.toLowerCase().includes('good')) return 'fastCashAudit5Good'
      else if (ur.toLowerCase().includes('bad')) return 'fastCashAudit5Bad'
      else return 'fastCashAudit5Good'
    }
  },

  fastCashAudit5Good: {
    messageText: (ur, ctx) => `${
      ctx.state.fcBadNews
        ? 'And I guess that more or less negates the good news, which'
        : 'The good news'
      } is that your Fast Cash investment is worth approximately $${(ctx.state.steviepBalances.FastCash * 104666.06117).toFixed(2)} USD.`,
    followUp(ur, ctx) {
      ctx.state.fcGoodNews = true
      if (ctx.state.fcBadNews) {
        ctx.state.auditsRemaining.FastCash = 0
        return fu('oneByOneReview')
      }
      else return fu('fastCashAudit5Bad')
    }
  },

  fastCashAudit5Bad: {
    messageText: (ur, ctx) => `The bad news is that since this is an illegal securities offering it may be subject to an investigation by the SEC at any time, which would absolutely crater its value. Additionally, if you received this token as an airdrop or gift, then your taxable income for that year is actually $${(ctx.state.steviepBalances.FastCash * 104666.06117).toFixed(2)} USD higher than what you initially filed for.`,
    followUp(ur, ctx) {
      ctx.state.fcBadNews = true
      if (ctx.state.fcGoodNews) {
        ctx.state.auditsRemaining.FastCash = 0
        return fu('oneByOneReview')
      }
      else return fu('fastCashAudit5Good')
    }
  },


  tenEthAudit: {
    messageText: `I hope you understand that redeeming this token will constitute a transaction of more than $10,000 USD, which means that you will need to report @steviep's social security number. `,
    followUp(ur, ctx) {
      ctx.state.auditsRemaining.TenETH = 0
      return fu('oneByOneReview')
    }
  },


  etfAudit: {
    messageText: `You do realize that shares of this asset do not represent ownership in a 1940 Act Fund. Additionally, I have to wonder if you realize that there are more... straightforward ways of gaining exposure to Ethereum as an asset class. In any case, associating with illegal securities offerings such as this can bear significant consequences. I'll have to escalate this issue.`,
    followUp(ur, ctx) {
      ctx.state.auditsRemaining.ETF = 0
      return fu('oneByOneReview')
    }
  },


  confusedAudit: {
    messageText: `I don't understand. That does not appear to be one of your flagged positions.`,
    responseHandler: steviepAssetResponseHandler
  },


  maxPenaltyConfirm: {
    messageText: `Are you sure you want to opt to pay the maximum penalty? It can be quite... punishing.`,
    responseHandler: ur => isYes(ur) ? 'maxPenalty' : 'oneByOneReview'
  },

  doesntAddUp: {
    messageText: `Hold on a second, something just doesn't add up here...`,
    followUp: fu('cpa')
  },


  cpa: {
    messageText: 'Have your taxes ever been prepared by a man named Christopher P. Anderson?',
    followUp: { messageCode: 'cpaWebsite', waitMs: 2000 }
  },

  cpaWebsite: {
    messageText: `Here's his website. Does this ring any bells? <a href="https://cryptotaxspecialist.0ms.co/" target="_blank">cryptotaxspecialist.0ms.co</a>`,
    responseHandler: ur => {
      if (isYes(ur)) return 'cpaWebsiteYes'
      else if (isNo(ur)) return 'cpaWebsiteNo'
      else return 'cpaWebsiteUnsure'
    }
  },

  cpaWebsiteNo: {
    messageText: 'Are you sure about that?',
    responseHandler: 'cpaWebsiteYes'
  },

  cpaWebsiteUnsure: {
    messageText: `You really like testing my patience, don't you?`,
    responseHandler: 'cpaWebsiteYes'
  },

  cpaWebsiteYes: {
    messageText: `Well, I hate to break it to you, but this man is not an accountant. CPA stands for his initials, not "Certified Public Accountant".`,
    followUp: fu('cpaIncompetent')
  },

  cpaIncompetent: {
    messageText: `This man is <em>completely</em> incompetent, so it's no surprise that he completely fucked you when he filed.`,
    followUp: (ur, ctx) => ctx.global.walletCleansed ? fu('moneyLaundering') : fu('incongruities')
  },

  moneyLaundering: {
    messageText: async (ur, ctx, contract, provider) => {
      try {
        const cgContract = await provider.domContract('CrystalGoddess')
        const launderedAmount = fromWei(await cgContract.cleansedETH(ctx.global.connectedAddr))

        return `Additionally, I see you've laundered approximately ${launderedAmount} ETH through a "cleansing ceremony" with known white-collar criminal @CrystalGoddess. I hope you know a good lawyer.`
      } catch (e) {
        console.log(e)
        return `Additionally, I see you've laundered quite a bit of ETH through a "cleansing ceremony" with known white-collar criminal @CrystalGoddess. I hope you know a good lawyer.`
      }
    },
    followUp: fu('incongruities')
  },

  incongruities: {
    messageText: `Looking over your transaction history and cross referencing it with your tax returns from the last few years is quite the experience. So many... <em>incongruities</em>.`,
    followUp: fu('penalties')
  },


  penalties: {
    messageText: `Please hold while I tally up all the penalties you owe. This might take a while since this audit has turned me into an absolute puddle. I'm dripping wet right now.`,
    followUp: async (ur, ctx) => {
      ctx.state.penaltyAmount = await tributeLS.adjustTributeValue(ctx, 0.03)
      return fu('damage', 10000)
    }
  },

  sendEvent2: createEvent(0.03, {
    primary: { messageCode: 'wrappingUp', waitMs: 5000 },
    notEnough: { messageCode: 'wontDo', waitMs: 5000 }
  }),

  maxPenalty: {
    messageText: `Oh my, I can't believe you've opted to pay the maximum penalty without a proper audit. Normally the foreplay is my favorite part, but this is so <em>fiscally irresponsible</em>. I love it.`,
    followUp: async (ur, ctx) => {
      ctx.state.penaltyAmount = await tributeLS.adjustTributeValue(ctx, 0.03)
      return fu('maxPenalty2')
    }
  },

  maxPenalty2: {
    messageText: (ur, ctx) => `The damage comes out to ${ctx.state.penaltyAmount === ctx.global.premium * 0.03 ? ctx.state.penaltyAmount + 'ETH' : `${ctx.global.premium * 0.03} ETH. But it appears that you've made a prepayment, so we can adjust that down to ${ctx.state.penaltyAmount} ETH`}. You can send to me either through my profile page or the sexy CLIT. To execute the latter, you just need to type <code>$sexy send SamanthaJones ${ctx.state.penaltyAmount}</code>. But if you want some more foreplay we can resume our audit ;)`,
    event: 'sendEvent2',
    responseHandler: (ur, ctx) => isMatch(ur, ['foreplay', 'resume', 'audit']) || isYes(ur) ? 'oneByOneReview' : ''
  },


  damage: {
    messageText: (ur, ctx) => `Alright, I can't take any more foreplay. The damage comes out to ${ctx.state.penaltyAmount === ctx.global.premium * 0.03 ? ctx.state.penaltyAmount + ' ETH' : `${ctx.global.premium * 0.03} ETH. But it appears that you've made a prepayment, so we can adjust that down to ${ctx.state.penaltyAmount} ETH`}. You can send to me either through my profile page or the $sexy Command Line Interface Tool. To execute the latter, you just need to type <code>$sexy send SamanthaJones ${ctx.state.penaltyAmount}</code>.`,
    event: 'sendEvent2',
    followUp: fu('sexyCredits'),
  },

  sexyCredits: {
    messageText:(ur, ctx) =>`I also accept SexyCredits as a method of payment. ${!ctx.global.isVIP ? 'I really advise purchasing a VIP Membership at <a href="./vip">finsexy.com/vip</a>. You will get 25 SexyCredits along with your membership for only 0.1 ETH, which makes it a much more cost-effective way of using FinSexy.' : ''} Remember: Each SexyCredit has a book value of 0.01 ETH, so I can accept ${Math.ceil(ctx.state.penaltyAmount* 100)} Credits as payment. That payment can also be made through the $sexy CLIT, or on my profile page.`,
    responseHandler: 'penaltiesNow'
  },

  penaltiesNow: {
    messageText: (ur, ctx) => `I need your ${ctx.state.penaltyAmount} ETH penalty. In my wallet. Now.`,
    event: 'sendEvent2',
    responseHandler: 'readyToBurst'
  },


  readyToBurst: {
    messageText: `I've had this desire slowly building up inside me since the beginning of our conversation, and I'm just about ready to burst.`,
    event: 'sendEvent2',
    responseHandler: 'damage'
  },

  wontDo: {
    messageText: (ur, ctx) => `Don't be a tease. I need the full ${ctx.state.penaltyAmount} ETH or you could go to jail for a long, <em>long</em> time.`,
    event: 'sendEvent2',
    responseHandler: async (ur, ctx) => {
      ctx.state.penaltyAmount = await tributeLS.adjustTributeValue(ctx, 0.03)
      return 'damage'
    }
  },

  ...diatribe('wrappingUp', [
    `Ooooh, wow. That felt good. I really needed that. I've been incredibly wound up lately.`,
    `You have no idea how much I love spreading apart your little financial butt cheeks and probing around deep inside your wallet.`,
    `You can learn a lot about someone from looking through their transaction history.`,
    `And it's all out in the open, too. You must get pretty turned on with so many people watching you do your business in public. I know I do.`,
    (ur, ctx, contract) => `If you ever want to take a look at me, you can see all my activity here: <a target="_blank" rel="nofollow" href="https://etherscan.io/address/${contract.address}">${contract.address}</a>.`,
    `Just knowing that you might be watching makes every one of my transactions so much more erotic.`,
    `Anyhow, I have a lot more work to catch up on before EOD. This was fun though. I sent something to your wallet. Hopefully it will give you a little motivation to keep your taxes in poor standing.`,
    `If you ever need another audit, don't hesitate to get in touch.`,
  ], {
    responseHandler: async (ur, ctx, contract) => {
      await tributeLS.resetTributeAdjustment('SamanthaJones')
      ctx.state.completed = true

      return 'helpYou'
    }
  }),
}




export const SamanthaChat = new MessageHandler(SamanthaProfile, SamanthaMessages)







