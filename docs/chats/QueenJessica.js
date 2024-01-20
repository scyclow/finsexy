/*




crypto roulette, deposit money, and it's either gone or user gets it back

let's play a game. you send me money, and i'll manage a shitcoin for you
  coin immediately goes down
  the longer you wait the more you lose
  ""


oooo, yeah, you're a nasty fucking degen, aren't you.


"Do you know wha tI'm going to do with this ETH? I'm going to buy a crypto punk and fucking burn it"







https://twitter.com/GoddessAva22



https://twitter.com/hazelownsyou



https://www.reddit.com/r/findomsupportgroup/comments/19ahz41/unpopular_opinion_post_nut_clarity/
  Why the hell are men running the world if they cannot operate their brains at the same time as their genitals?
  Can you imagine vulva-owners blaming our genitals in the same way?
  I am however, socially encouraged to play babysitter to men-children who get to decide on everything from whether I earn the same amount as them, to whether I can obtain free contraception.


cuckholding: watch me make money





Hello, idiot
Are you ready to serve me today?

Hmm, I dunno. I only see X ETH in that wallet. That's a little on the 🤏 side.
I'm a bit of a size queen.

Great, before we get started I have some questions for you:

Are you married?
  yes
    Husband? Wife?
  no
    Boyfriend? Girlfriend?


  yes
    well, they are about to leave you
    you thought she was mad at you after you lost all your money on NFTs? that was nothing
    I'm going to absolutely <em>ruin</em> you
    and you're going to love it

  no
    Figures that no one would want to date a sissy cuck crypto boy/girl/degen like you
    you don't deserve any love
    that is, not unless you make yourself useful and pay up
    keep that in mind: if you're not sending me money, you don't exist to me


Do you have kids?/And I'm assuming you don't have kids?
  no || correct
    Good, because you won't be able to afford them after I'm done with you
  yes
    We'll hopefully they're looking forward to community college because I'm about to drain your family's bank account
    Oops, no more college fund










Now that that's out of the way do you have any questions for me?

I don't care. I don't need to answer any of your stupid questions

The fact that you're even talking to me shows a complete lack of judgement on your part. So why would I listen to anything you have to say?



Do you know why you love sending to me?
It's because you're too stupid to make money
And deep down you know that you're too much of a degenerate to even hold onto the money you already have
So you think: why not give it to my Queen? At least I can make her rich





I'll be honest, you sound like a complete degenerate loser
you know you're a slave to your crypto addiction
And yet, you're stupid enough to come talk to me
Knowing damn well that I'm about to make it worse





Unless you're sending me money you don't exist to me
Which, I'm sure is an idea you're very familiar with
Unless you've been too stupid to figure out that that's what all of your favorite NFT creators think of you
Not to mention all of your stupid little alpha groups designed for beta cucks like you



I can tell you want to lose it all
If you've ever wanted to be in a porno, then now's your chance
Because you're about to star in some epic loss porn
Are you ready to get absolutely fucking rekt?



wallet ratings - sort of like dick ratings, but based on what's in your wallet



*/




`I'm the reason your wife is going to leave you. I'm trouble. 💸 #findom 👑 #brat 🙇‍♀️🙇🙇‍♂️ #spoilme 🥵💦 #paypig 🐷`



import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const QueenProfile = {
  name: 'QueenJessica',
  age: 29,
  distance: 13,
  gender: 'F',
  maxPhotos: 4,
  description: `I'm the reason your wife is going to leave you.`,
  testimonials: [
    {
      name: '0x',
      review: `QueenJessica completely ruined my life by extracting at least five figures from my wallet over the course of a weekend. When my wife found out she left me and took the kids. It was so hot. I don't think I've ever cum harder in my life`,
    },
    {
      name: '0x0',
      review: `I have a tiny pp and my huge bank account that belongs soley to Queen 🙏`,
    },
    {
      name: '0x1',
      review: `Queen completely ruined my life 💦😍`,
    },

    {
      name: '0x',
      review: `I like putting the pussy on a pedastal.`,
    },
  ]
}


export async function queenContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0xF8b299F87EBb62E0b625eAF440B73Cc6b7717dbd'
  }[networkName]

  const abi = [
    'event Send(address indexed sender, uint256 amount)',
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}



async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: '', waitMs: 3000 }
  }

}


const QueenMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    const [contractAddr, abi] = await queenContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `Hello idiot`,
    // followUp: { messageCode: 'hello2', waitMs: 2000 },
  },

  hello: {
    async messageText(ur, ctx, contract, provider) {
      if (!ctx.global.isConnected) {
        return `Ha, you think you can talk to me without even connecting your wallet? `
      } else if (await provider.getETHBalance(ctx.global.connectedAddr) < 1) {
        return `${await provider.getETHBalance(ctx.global.connectedAddr)} ETH? I don't have time for poor people like you. Come back when you have at least 1 ETH to show me.`
      } else {
        return `You think you deserve to talk to me? I don't think so`
      }
    },
    async followUp(ur, ctx, contract, provider) {
      if (!ctx.global.isConnected) {
        return fu('followUpRejected1')
      } else if (await provider.getETHBalance(ctx.global.connectedAddr) < 1) {
        return fu('followUpRejected2')
      }
    }
  },

  helloRejected1: {
    messageText: `You're out of your league.`,
    responseHandler: 'hello'
  },
  helloRejected2: {
    messageText: `Go talk to VinceSlickson. Maybe he can help you get some cash`,
    responseHandler: 'hello'
  },

}

export const QueenChat = new MessageHandler(QueenProfile.name, QueenMessages)
