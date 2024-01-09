import { isYes, isNo, isGreeting, isMean, responseParser, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch, interestedSwitch} from '../state/profile.js'
import {fromWei} from '../eth.js'




const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })



/*
Testimonial


*/

export const SamanthaProfile = {
  age: 46,
  distance: 6,
  gender: 'Female',
  maxPhotos: 4,
  description: `
  Samantha Jones is a tax auditor financial professional who loves auditing crypto ${genderSwitch({
    m: 'sissy boys',
    f: 'sissy girls',
    nb: 'sissies',
  })} and focuses on cryptocurrency and blockchain fraud. In her more than 25 years of industry experience, she has handled matters across the criminal and regulatory spectrum. `,
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
      name: '0x3',
      review: `I've been a naughty girl`,
    },
    {
      name: '0x2',
      review: `I'm an absolute mess when it comes to managing my finances. Even thinking about doing my taxes fills me with a deep existential dread. So there's definitely something appealing in totally giving up all control of my balance sheet`,
    },
    // dealing with my finances causes me too much anxiety. it's nice to completely give up control
  ]
}





async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 3 > ctx.state.rounds) return { messageCode: 'edgeOff' }
  }

}



const receiveAddrs = (ur, ctx) => {
  if (ur.trim().toLowerCase() === 'this is my only address') {
    ctx.state.validAddresses = [ctx.global.connectedAddr]
    return 'addressesPatience'
  }
  if (ur.toLowerCase().includes('.eth')) return 'includesENS'

  ctx.state.givenAddresses = ur.replaceAll(',', ' ').split(' ').filter(word => word.startsWith('0x'))

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
    TenEth,
  } = ctx.state.steviepBalances

  let balanceText = []

  const ignoreFIM = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.FIM)
  const ignoreUFIM = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.UFIM)
  const ignoreIOU = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.IOU)
  const ignoreNVC = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.NVC)
  const ignoreIFD = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.IFD)
  const ignoreMMO = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.MMO)
  const ignoreCASH = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.CASH)
  const ignoreTenEth = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.TenEth)
  const ignoreFastCash = !!(ignoreAlreadyAudited && !ctx.state.auditsRemaining.FastCash)

  if (!ignoreFIM && FIM) balanceText.push(`Fake Internet Money: ${FIM}`)
  if (!ignoreUFIM && UFIM) balanceText.push(`Uncirculated Fake Internet Money: ${UFIM}`)
  if (!ignoreIOU && IOU) balanceText.push(`IOUs: ${IOU}`)
  if (!ignoreNVC && NVC) balanceText.push(`Negative Value Certificates: ${NVC}`)
  if (!ignoreIFD && IFD) balanceText.push(`Instructions For Defacement/Plottables Flex: ${IFD}`)
  if (!ignoreMMO && MMO) balanceText.push(`Money Making Opportunity: ${MMO}`)
  if (!ignoreCASH && CASH) balanceText.push(`Cold Hard Cash: ${CASH}`)
  if (!ignoreTenEth && TenEth) balanceText.push(`10 ETH Giveaway: ${CASH}`)
  if (!ignoreFastCash && FastCash) balanceText.push(`FastCash: ${FastCash % 1 ? FastCash : FastCash.toFixed(2)}`)

  return balanceText ? `<code>${balanceText.join('<br>')}</code>` : ''
}


function steviepAssetResponseHandler(ur, ctx) {
  const cleanedUr = responseParser(ur)
  const isMatch = phrases => phrases.some(x => cleanedUr.includes(x))

  if (isMatch(['uncirculated', 'ufim'])) {
    return 'ufimAudit'
  } else if (isMatch(['fake', 'internet', 'fim'])) {
    return 'fimAudit'
  } else if (isMatch(['iou'])) {
    return 'iouAudit'
  } else if (isMatch(['negative', 'value', 'cert', 'nvc'])) {
    return 'nvcAudit'
  } else if (isMatch(['instructions', 'ifd', 'plottables', 'flex'])) {
    return 'ifdAudit'
  } else if (isMatch(['making', 'opportunity', 'mmo'])) {
    return 'mmoAudit'
  } else if (isMatch(['fastcash', 'fast'])) {
    return 'fastCashAudit'
  } else if (isMatch(['cold', 'hard', 'cash', 'chc',])) {
    return 'cashAudit'
  } else if (isMatch(['ten', '10', 'eth', 'giveaway'])) {
    return 'tenEthAudit'
  } else if (isMatch(['list', 'again'])) {
    return 'relistAudit'
  } else {
    return 'confusedAudit'
  }
}






export async function samanthaContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x084815D1330eCC3eF94193a19Ec222C0C73dFf2d'
  }[networkName]

  const abi = [
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}



const SamanthaMessages = {
  async __contract(provider) {
    const [contractAddr, abi] = await samanthaContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },



  __precheck(userResponse, ctx) {

    // TODO - check "add an address"
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
    followUp: { messageCode: 'everySquareInch', waitMs: 2000 }
  },

  everySquareInch: {
    messageText: `That means I'm going to examine every square inch of your transaction history. It's going to be a slow, painful, meticulous process. And when I'm done... We're going to assess your penalties.`,
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
    messageText: `I'm going to need a a comma- or space-delineated list of all wallet addresses you currently have custody over, other than the address currently connected to FinSexy. I need full addresses -- no ENS names. If this is your only address, then say "this is my only address"`,
    responseHandler: receiveAddrs
  },

  includesENS: {
    messageText: `I'll repeat myself: <em>I need the full address -- no ENS names</em>.`,
    responseHandler: receiveAddrs
  },

  letMeRun: {
    messageText: (ur, ctx) => `Please hold while I run a preliminary search on ${ctx.state.givenAddresses.length ? 'these addresses' : 'this address'}. This might take a moment`,
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
      ctx.state.steviepBalances = {
        FIM: 0,
        UFIM: 0,
        IOU: 0,
        NVC: 0,
        IFD: 0,
        MMO: 0,
        CASH: 0,
        FastCash: 0,
        TenEth: 0,
      }

      try {
        const signer = ctx.global.connectedAddr
        const contracts = await provider.steviepContracts('mainnet')

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
          ] = await Promise.all([
            contracts.UFIM.balanceOf(addr),
            contracts.IOU.balanceOf(addr),
            contracts.NVC.balanceOf(addr),
            contracts.IFD.balanceOf(addr),
            contracts.MMO.balanceOf(addr),
            contracts.CASH.balanceOf(addr),
            contracts.FastCash.balanceOf(addr),
            contracts.TenEth.balanceOf(addr),
          ])

          ctx.state.FIMTokens = FIMTokens

          ctx.state.steviepBalances.FIM += Number(FIMBalance)
          ctx.state.steviepBalances.UFIM += Number(UFIMBalance)
          ctx.state.steviepBalances.IOU += Number(IOUBalance)
          ctx.state.steviepBalances.NVC += Number(NVCBalance)
          ctx.state.steviepBalances.IFD += Number(IFDBalance)
          ctx.state.steviepBalances.MMO += Number(MMOBalance)
          ctx.state.steviepBalances.CASH += Number(CASHBalance)
          ctx.state.steviepBalances.TenEth += Number(TenEthBalance)
          ctx.state.steviepBalances.FastCash += fromWei(Number(FastCashBalance))

          ctx.state.auditsRemaining = Object.assign({}, ctx.state.steviepBalances)
        }


        return { messageCode: 'addressesContinue1', waitMs: 3000 }


      } catch (e) {
        ctx.error = e.message
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
      const hasMultipleAccounts = ctx.state.validAddresses.length > 1

      let balanceSum = 0
      for (let addr of ctx.state.validAddresses) {
        balanceSum += await provider.getETHBalance(addr)
      }
      return `${hasMultipleAccounts ? `${hasMultipleAccounts + 1} accounts` : 'One account'}, holding approximately ${balanceSum} ETH. `
    },
    followUp: { messageCode: 'addressesContinue2', waitMs: 2000 }

  },
  addressesContinue2: {
    messageText(ur, ctx) {
      const signer = ctx.global.connectedAddr

      const hasMultipleAccounts = ctx.state.validAddresses.length > 1

      const addrText =
        ctx.state.validAddresses.length > 1
          ? `the following addresses:</p> <code>${ctx.state.validAddresses.join(', ')}</code>`
          : `the address</p> <code>${signer}</code>`

      return `
        <p>Oh my, I'm noticing certain... irregularities with the following account${hasMultipleAccounts ? 's' : ''}: ${addrText}
      `
    },
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
    messageText: `At best you're looking at substantial penalties. At worst you're looking at jail time.`,
    followUp: fu('notGreat3')
  },

  notGreat3: {
    messageText: `But there's just something about your transaction history that's driving me wild.`,
    followUp: fu('notGreat4')
  },

  notGreat4: {
    messageText: `It's so... dirty.`,
    followUp: fu('cleanYouUp', 6000)
  },

  cleanYouUp: {
    messageText: `I <em>could</em> help clean things up. But I'm not cheap.`,
    followUp: fu('bestInBiz')
  },

  bestInBiz: {
    messageText: `I've been doing this for more than 25 years, so you can say I've been around the block a few times. And, I'm <em>very</em> thorough.`,
    followUp: fu('prePay', 6000)
  },

  prePay: {
    messageText: (ur, ctx) => `Here's what we'll do: You send me a ${ctx.global.premium * 0.01} ETH penalty pre-payment and we'll see if we can get this mess sorted out.`,
    event: sendEvent1,
    responseHandler: 'prePay2'
  },

  prePay2: {
    messageText: `I can't wait to subject you to more anal-ysis and find out what you did.`,
    event: sendEvent1,
    responseHandler: 'prePay3'
  },

  prePay3: {
    messageText: (ur, ctx) => `You can sexy send me with <code>$sexy send samanthaJones ${ctx.global.premium * 0.01}</code>`,
    event: sendEvent1,
    responseHandler: 'prePay'
  },

  edgeOff: {
    messageText: `Okay, that prepayment really took the edge off. Let's continue, shall we?`,
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
        steviepBalances.TenEth,
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
      if (remainingAuditText) return `What should we work through next? Here's what we have left: ${remainingAuditText}`
      else return `Okay, I think that's all for your suspiscious assets. For now, at least. Shall we move on?`
    },
    responseHandler: (ur, ctx) => {
      const remainingAuditText = generateRemainingBalanceText(ctx, true)
      if (remainingAuditText) return steviepAssetResponseHandler(ur, ctx)
      else return 'doesntAddUp'
    }
  },

  fimAudit: {
    messageText: (ur, ctx) => ctx.state.steviepBalances.FIM
      ? `Okay, would you mind explaining to me what exactly this is? <img src="https://artblocks-mainnet.s3.amazonaws.com/${ctx.state.FIMTokens[0]}.png">`
      : genderSwitch({m: 'Sir', f: `Ma'am`, nb: getUserData('name')}) + `, you do not appear to have any Fake Internet Money. Let's try to stay focused.`,
    responseHandler: (ur, ctx) => ctx.state.steviepBalances.FIM
      ? 'fimAudit2'
      : steviepAssetResponseHandler(ur, ctx)

  },
  fimAudit2: {
    messageText: `And what was your cost basis on this?`,
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
    responseHandler: (ur, ctx) => {
      ctx.state.auditsRemaining.FIM = 0
      return 'fimAudit5'
    }
  },

  fimAudit5: {
    messageText: `I'm not sure that pleading stupidity will hold up against a money laundering charge. I suggest you rectify this, but let's move on for now.`,
    followUp: fu('oneByOneReview')
  },

  ufimAudit: {
    messageText: 'ufimAudit'
  },


  iouAudit: {
    messageText: 'iouAudit'
  },

  nvcAudit: {
    messageText: 'nvcAudit'
  },

  ifdAudit: {
    messageText: 'ifdAudit'
  },

  mmoAudit: {
    messageText: 'mmoAudit'
  },

  fastCashAudit: {
    messageText: 'fastCashAudit'
  },

  cashAudit: {
    messageText: 'cashAudit'
  },

  tenEthAudit: {
    messageText: 'tenEthAudit'
  },

  relistAudit: {
    messageText: 'relistAudit'
  },

  confusedAudit: {
    messageText: 'confusedAudit'
  },



  doesntAddUp: {
    messageText: `Something just doesn't add up here...`,
    followUp: fu('cpa')
  },


  cpa: {
    messageText: 'Have your taxes ever been prepared by a man named Christopher P. Anderson?',
    followUp: { messageCode: 'cpaWebsite', waitMs: 2000 }
  },

  cpaWebsite: {
    messageText: `Here's his website. Is this ringing any bells? <a href="https://cryptotaxspecialist.0ms.co/" target="_blank">cryptotaxspecialist.0ms.co</a>`,
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
    responseHandler: 'END_PLACEHOLDER'
  },


  END_PLACEHOLDER: {
    messageText: 'END_PLACEHOLDER'
  }

}





export const SamanthaChat = new MessageHandler('samanthaJones', SamanthaMessages, 'START')








/*



I'll be quite honest, name. Things aren't looking good for you.
At best you're looking at substantial penalties, and at worst you're looking at quite a bit of jail time.

I can make this all go away for you. For a small fee, of course





throws shade at vince slickson




Okay. Oof. I see a few problems right off the bat. Has this man (link to CPA) ever prepared your taxes?
  No: are you sure?
  Yes: that figures.

I see you have some fastcash
That being said, browsing your transactions gets me so hot. So many... incongruities.
I just need the private key to your wallet to run something through our system.
Don't be such a prude. It's not like I haven't seen a private key before. Are you afraid I'll think it's too small? Lol





*/