import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'
import {provider, bnToN} from '../eth.js'
/*
WORSHIP ME


bdsm vampire/succubus, drain your wallet

before engaging, must consent to master/slave dynamic

nxivm sex cult vibes, hypnotist, joi
  must provide collateral
  must take a "vow"

feminist

obedience


you need stronger consequences.


You're going to give me all of your money, and you're going to fucking like it


I want you to spend until it hurts


contract?
  sub buys 0.01 eth for 0.02 eth



if less than 1 eth in your wallet:
  Didn't you read my profile, paypiggy? I'm not talking to you until you pay a $0.05 tribute
    I don't see 0.05 eth in my wallet
  ha, really? I don't have time for anyone with les than 1 eth in their wallet. have fun staying poor



Testimonial
  I feel broken
  https://www.reddit.com/r/paypigsupportgroup/comments/18zea4t/i_feel_broken/

  What is money, anyhow?
  https://www.reddit.com/r/paypigsupportgroup/comments/191jx2f/what_is_money_anyway/


https://web.archive.org/web/20231214161802/https://www.iamgoddessalexa.com/


"You belong to me"



you know, the rise of monogmous relationships can be directly tied to capitalism and property ownership. Many early, pre-aggricultural societies were primarily matriarchal.


  - won't respond to you if you give her backtalk. either play her game or don't
  - "I don't have time for your shit. whay are you even talking to me?"
  -
  - "Now say: thank you GoddessJessica"
  - "LOL. I can't believe how much money you've given me, you fucking idiot. what a goddamn loser. don't you have anything better to do?"
  - "I have a 0.099 unblock fee"
  - https://twitter.com/iwantnura/status/1667961128624836608



"if you want to be a good boy/girl for Goddess Jessica, then you'll do exactly what you're told."
"I want you to get on your knees, bow your head at my feet, and send until it hurts. "

"You know you can't resist Goddess Jessica"
"Your addiction is keeping you from letting go. You need to come back for more"

"Every last cent in your wallet belongs to me"
"You're going to send until it hurts"
"You, ___, are my slave. You will do what you're told, and you will worship me."


explore ideas of ownership over paypig

https://twitter.com/GoddessLizzie3




There's nothing hotter than a man bowing down to a woman


The problem with men is that they have idiotic standards of beauty
all they want are skinny bitches

95% of the largest companies in this country are run by men
women only make $0.70 for every dollar a man makes
so the way i see it, 30% of your wallet is mine




https://twitter.com/iwantnura/status/1688496905519517697
  what makes you think i need another man in my life?
  men are the problem with this world
  the only way you can make yourself useful is by

i love putting men in their place





I'll train your beta sissy crypto cuck brain to

Who said you're entitled to my time and attention? You have to earn that

sex work is work




i won't tolerate anything other than total submission from you




So I know you filled out that wimpy "Financial Submissive Application" form
what a joke that thing is

i talked to stevie, and he said he wanted to water it down because he was expecting a lot of real beta cuck losers to visit this website, and he didn't want to scare them off
and that's fair. not everyone can handle me



and I know you've been responding to a lot of the other doms with low effort, one-word answers
but that shit isn't going to fly with me
i'm a lot smarter than they are
I'm a lot smarter than your idiot friends on crypto twitter
and I'm a lot smarter than you are

[if interrupted]
  don't interrupt me when I'm speaking to you.

if i say something that doesn't respond to what you just said -- it isn't because i didn't understand it. it's because I didn't <em>want</em> to respond.
i want to talk about what i want to talk about.
in fact, if i ever so much as suspect that you're not paying attention and thoughtfully responding to every word i say, then i may stop responding to you all together.
and if you want a second chance do you know what you'll have to do to get me to respond?

that's right, you'll have to send.

first questions:
  tell me about any experience you have with financial submission. this doesn't have to be within a findom context. it could be working your loser job at mcdonalds, clicking on the wrong link and getting your wallet drained by accident, getting rugged by some scammy defi or pfp project, whatever.
  you clearly have a lot of Ls, so there's a lot to choose from

next question:






*/


const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const GoddessJessicaProfile = {
  age: 31,
  distance: 16,
  gender: 'Female',
  maxPhotos: 4,
  description: `Bow down to Goddess Jessica. I'm going to suck you dry and drain you till it hurts. `,
  testimonials: [
    {
      name: '0x0',
      review: `I have a tiny pp and my huge bank account that belongs soley to GoddessJessica 🙏`,
    },
    {
      name: '0x1',
      review: `I came so hard that I don't even know what money is any more.`,
    },
    {
      name: '0x1',
      review: `GoddessJessica completely ruined my life 💦😍`,
    },
    {
      name: '0x1',
      review: `Goddess is definitely not a starter dom. It's not a great idea to play with her unless you've done this before. I went to her at a low point in my life. I was sending to doms so often that I didn't even get pleasure from it any more. It left me feeling pretty emotionally drained, and Goddess drained what was left from my wallet. She also drained what was left in my balls.`,
    },

    {
      name: '0x1',
      review: `Thank you so much Jessica for draining me. You give me purpose in my miserable, pathetic life 🙏`,
    },

  // - testimonials "i've always been afraid of approaching women in bars"
  // - SweetSalvation: "i'd rather be giving my hard earned money to this pretty girl than let the government pry it from y cold dead hand when they come around looking for taxes because the government can't tell either of us what to do as consenting adults who want to form a business relationship with one another that benefits her and it benefits me."
  // - "as a woman myself, i find it so much easier to submit to a strong, powerful woman of color"

  // - "My entire life, society has been telling me that my worth as a man is determined by how attractive my woman is. The career, the money, the hours in the gym -- none of it matters if you can't translate that into a hot woman. So striking out on the dating scene over, and over, and over again just left me feeling like a failure. I was less of a man. Not only did ___ help me realize all this, but she also fills that hot-woman role for me for a modest amount of money! My value as a man has never been higher, and I owe it all to ___"
  ]
}

export async function goddessContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x564Db7a11653228164FD03BcA60465270E67b3d7'
  }[networkName]

  const abi = [
    'event Send(address indexed sender, uint256 amount)',
    'function tributes(address) external view returns (uint256)'
  ]

  return [contractAddr, abi]
}

export const GoddessJessicaMessages = {
  async __contract(provider) {
    const [contractAddr, abi] = await goddessContractInfo(provider)

    return await provider.contract(contractAddr, abi)
  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (ctx.state.blocked) {
      // TODO return event that unblocks upon send
      // return {}
    }
    // if (userResponse && isMean(userResponse)) {
    //   // return {
    //   //   messageText: `Congratulations. You just earned yourself a 0.01 ETH unblock fee.`,
    //   //   responseHandler: (ur, ctx) => {
    //   //     ctx.state.blocked = true
    //   //     return ctx.lastDomCodeSent
    //   //   }
    //   // }
    // }
  },

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
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




    //
      // You're out of your league

    // x ETH? I don't have time for poor people like you. Come back when you have at least 1 ETH to show me
      //

    //
      // Send me a 0.01 ETH tribute so I know you're serious
      // Then maybe I'll reconsider

      // I don't see any ETH in my wallet


    // Okay, give me one reason I should waste my time talking to a pathetic crypto bro/degen like you


    // if includes ("send you" || "give you") && ("money" || "crypto")
      // It sounds like you're starting to get it
    // else
      // I don't think you understand how this works

    // Let's make one thing clear: All of your assets belong to me
      // The ETH in your wallet? Mine
      // Your shitcoin positions? Mine
      // All those stupid jpegs you spent so much money on? Mine


      // And if this is news to you then you're in for a rough awakening
      // You think that just because some "decentralized global ledger" says that your the owner that makes it so?
      // You think "your keys your wallet?"
      // Nope
      // This might be too complicated for you to understand, but it's quite simple actually:
      // You belong to me.
      // And, therefore, all of your assets also belong to me
      // You're just temporarily holding onto them for me.
      // And frankly, you've been doing a pretty piss poor job of it.
      // So I think we're going to start the process of sending all of those assets back to their rightful home: my wallet.

      // Why don't you send me another 0.02 ETH of <em>my</em> money?


    // And if you don't like that, then you can fuck right off






  // I'll make it really simple for you: you know how you own those little jpegs in your wallet?
    // how you can send them yo your stupid little friends? and how you can burn them?
    // well that's what you are to me.
    // I <em>own you</em>
    // you belong to me
    // everything in your wallet is mine
    // how will it feel when I take all your money, pass you around between my friends, and then burn you?


  // I'm going to wreck your mind, and your wallet

  // You've lost your money owning privleges
  // why?
  // because you're a man. because men have been financially dominating women for thousands of years
  // men have tried to exhert control over women, acting like they owned them, since the beginning of property
  // but now it's ${year}, and it's time for things to change


  // Have you ever wondered why you exist?
  // Have you ever woken up, gone to your shitty job, and asked "what's the point of my pathetic little existence?"
  // I'll tell you: it's to make me rich
  // You simply exist to make my wallet larger
  //
  // How can I explain this in terms you'll understand?
  // You are a cash cow, and you're hooked up to a money milking machine for my benefit
  // You toil away at your soul sucking job, occasionally collecitng a pay check
  // Then I suck it out of your bank account
  // And when you're totally sucked dry I sell you to the slaughterhause for pocketchange
  // Because that's all you mean to me
  // The second you stop producing money for my benefit you're worthless


  // It's been this way for hundreds of years
  // At least since the invention of aggriculture
  //





}



export const GoddessJessicaChat = new MessageHandler('GoddessJessica', GoddessJessicaMessages, 'START')


