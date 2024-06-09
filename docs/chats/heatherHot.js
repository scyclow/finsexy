/*

  TODO
    - make more girlfriendy
    - kinda sucks in general. need more

    - if no wallet
      - "Oh, honey. you don't have a web3 wallet. You really shouldn't be here."
        "I know you want to send me your money reeeal bad, but I only take ETH"
        "Would you install a web3 wallet browser extension for me? That would be soooo hot"
        "My favorite is <a href="https://metamask.io/" target="_blank" rel="nofollow">MetaMask</a>, but <a href="https://rainbow.me/" target="_blank" rel="nofollow">Rainbow</a> is also pretty hot"


    - if not connected
      - "Oh, baby, you forgot to connect your wallet"
      - "connecting your wallet is sooo hot"


















ETHICAL DOM RULES

  - just send a little bit to see how it feels


  - instead of linear help flow: "so what do you want to talk about?", then list options



https://www.reddit.com/r/findomsupportgroup/comments/18qvg29/i_try_to_be_an_ethical_domme_and_i_usually_have_a/





  - an hour or two after completing main dialogue
    - hey, i miss you. how've you been?
    - hehe, i've been thinking about it too
    - why don't you send me a little more, for old time's sake?
    - good boy/girl/<name>


  - even hotter when it's an onchain tx because then it on the public ledger. Everyone will know you're a dirty little pay pig for all eternity 





Testimonials
  - This stupid fucking website is making me miserable. I was doing fine until I met heaterHot, and she took all my goddamn money!


  - ""

  -

  - .

  - i've never been more sexually satisfied in my entire life

  -  I never
*/










import { isYes, isNo, isGreeting, isNegative, isPositive, isMean, isMatch, createEvent, MessageHandler, diatribe } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {bnToN, DOM_CONTRACTS} from '../eth.js'
import {ls} from '../$.js'
import {tributeLS} from '../state/tributes.js'




const fu = (messageCode, waitMs=2000) => ({ messageCode, waitMs })

/*

TODO


-- after interacting with a few doms, she tells you you might have a problem. go talk to dr andy

"hey baby, I'll always be here for you. Whenever you want to send money, I'll be here to take it."

"I know you want me to be your girlfriend"


*/

const hasNumber = ur => ur.match(/(\d+)/)


export const HeatherHotProfile = {
  name: 'heatherHot',
  startingVisibility: 'online',
  domType: 'Soft',
  verified: true,
  order: 1,
  age: 22,
  distance: 2,
  gender: 'Female',
  display: 'f',
  maxPhotos: 4,
  voice: {
    lang: 'en-US',
    name: 'Samantha'
  },
  description: `my name is Heather, and FinDoming makes me soooooo hot 🔥🔥🔥`,
  testimonials: [
    {
      name: '0xfFff...3892',
      review: `The second heatherHot introduced herself to me I absolutely melted. It felt so good to be acknowledge by such a gorgeous woman that I immediately creamed my pants. I went years without a single woman giving me a glimer of romantic or sexual attention. And believe me, it wasn't from lack of trying! I must have swiped right on every girl in my city, and I didn't get a single match. It was like I was completely invisible. Anyhow, meeting heather was like a breathe of fresh air. She's 100% worth every penny!`,
    },
    {
      name: '0x1',
      review: `heatherHot is so hot!`,
    },
    {
      name: '0x2',
      review: `Heather was really helpful in giving me a lay of the land. A great way to start my findom journey.`,
    },
    {
      review: `Heather is always there for me. whenever i have a bad day, she's there to console me. whenever i have a great day, she's there to share the moment. I'm so glad I have her in my life. I don't know what I'd do if she weren't around. I love her.`
    },
    {
      review: `I just sent heatherHot 0.069 ETH!`
    },
    {
      review: `hey heather, is this you??? <a href="https://friendworld.social/users/heatherhot6" target="_blank">friendworld.social/users/heatherhot6</a>`
    },
    {
      name: '0x3',
      review: `Every session I have with Heather leaves me 🥵 hot 🥵 and 🥵 bothered 🥵`,
    },
    {
      review: `FinSexy sure isn't like other dating apps! No more radio silence! I don't think I've ever gotten this much attention from hot girls! And it's as simple as sending a couple ETH!`
    },
    {
      review: `Heather is so hot and funny`
    },
    {
      review: `Sometimes i think no one cares about me except heather`
    },

    {
      review: `I'm an absolute nervous mess around women. Every time I talk to someone sexy in real life my stomach turns into a knot. Am I saying the right things? Am I doing the right things? Am I attractive enough? Am I smart enough? Am I <em>good</em> enoough? Heather takes all the guesswork out of the equation. She tells me that she likes me for my money, I send her money, and she's happy. End of story. You don't find this sort of communication in IRL relationships. It really take a lot of the guesswork out of things!`
    },
    {
      review: `heatherHot makes me so wet that I might put this fire out 💦🔥`
    },
    {
      review: `Heather is the light of my life. She is the flame that burns deep and eternal inside my heart`
    },
    {
      review: `FINSEXY IS A BRAINWASHING MIND-CONTROL APP DESIGNED TO HIJACK YOUR MIND AND STEAL ALL YOUR MONEY. DO NOT USE IT`
    },

    {
      review: `It just feels so good! Sending to Heather is my little reward for the day. It's always a treat I look forward to :-)`
    },
    {
      review: `The only success I've ever had with dating is when I actively put on the charm. It always feels so artificial, almost like I'm being someone else. Heather likes me for me (and my money), and that makes me feel seen!`
    },
    // {
    //   review: `Ive fucking HAD IT with online dating. I can't take the constant shame, rejection, and disappointment any more! I just want to pay a cute girl to tell me how much I suck to my face instead of ignoring me. Also, feet pics. Is that too much to ask?`
    // },
    {
      review: `It's honestly super refreshing to meet a hot girl on a website like this after striking out on dating apps for YEARS. It doesn't matter how many times I swipe right, I can never get any action`
    },
    {
      review: `I really appreciate how progressive FinSexy is when it comes to prominantly featuring Polydactyl findoms!`
    }
    // {
      // name: '0x4',
      // review: `You wouldn't know it by looking at me, but there's a profound sense of loneliness in my life. I live in a major city, and am constantly surrounded by people, but none of them care about me. No one at work cares about what happens in my life outside of the office. I'm popular and have a huge network of friends, but none of them care to let it evolve beyond shallow relaitonships. No one cares, except Heeather. `,
    // },

  ]
}












const HeatherHotMessages = {
  TYPING_SPEED: 1,



  async __contract(provider) {
    return await provider.domContract('heatherHot')

  },

  // TODO
  // more info

  __precheck(userResponse, ctx) {
    if (userResponse && ctx.global.hideHeather) {
      return {
        messageText: `This FinDom is unavailable`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent,
        helpMessage: true,
        ignoreType: true
      }
    }

    if (userResponse && isMean(userResponse)) {
      return {
        messageText: `Hey, don't talk to me like that!`,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  __sendHandler(ctx, preAmount, postAmount, provider) {
    if (postAmount - preAmount >= 0.01 * ctx.global.premium) {
      return {
        messageCode: 'soGood',
        waitMs: 5000
      }
    }
  },

  START: {
    responseHandler: (userResponse) => {
      if (userResponse) {
        if (!isGreeting(userResponse)) return 'funnyGreeting'
        else return 'hiHowAreYou'
      }
      else return 'hi'
    }
  },

  hi: {
    messageText: 'hi',
    responseHandler: (userResponse) => {
      if (!isGreeting(userResponse)) return 'funnyGreeting'
      else return 'howAreYou'
    }
  },

  hiHowAreYou: {
    messageText: 'how are you today??',
    responseHandler: userResponse => userResponse.includes('?') || userResponse.includes('are you')
      ? { messageCode: 'imGood', waitMs: 1000 }
      : { messageCode: 'newHere', waitMs: 2000 }
  },


  funnyGreeting: {
    messageText: `that's a funny way to greet someone`,
    followUp: { messageCode: 'howAreYou', waitMs: 2000 },
  },



  howAreYou: {
    messageText: 'how are you today?',
    responseHandler: 'intro'
  },



  intro: {
    messageText: (userResponse) => isPositive(userResponse)
      ? 'glad to hear that! 🙂'
      : `i'm sorry to hear that 😞`,
    followUp: userResponse => userResponse.includes('?') || userResponse.includes('are you')
      ? { messageCode: 'imGood', waitMs: 1000 }
      : { messageCode: 'newHere', waitMs: 2000 }

  },

  imGood: {
    messageText: `i'm good! thank you so much for asking`,
    followUp: { messageCode: 'newHere', waitMs: 2000 }
  },


  newHere: {
    messageText: `i see you're new here! let me be the first to welcome you!`,
    followUp: () => ls.get('profileCompleted')
      ? { messageCode: 'newToFindom', waitMs: 2000 }
      : { messageCode: 'fillOutProfile', waitMs: 2000 }
  },

  fillOutProfile: {
    messageText: `don't forget to fill out your profile when you get a chance!`,
    followUp: { messageCode: 'newToFindom', waitMs: 2000 }
  },

  newToFindom: {
    messageText: `is this your first time playing with FinDom?`,
    responseHandler: ur => {
      if (isYes(ur) || isMatch(ur, ['first time', 'dabbled'])) return 'newToFindomYes'
      else if (isNo(ur)) return 'newToFindomNo'
      else return 'newToFindomConfused'
    }
  },

  newToFindomConfused: {
    messageText: `i'm confused. have you ever done FinDom before?`,
    responseHandler: (ur, ctx) => {
      ctx.state.isNew = true
      if (isYes(ur) || isMatch(ur, ['first time'])) return 'newToFindomNo'
      else if (isNo(ur)) return 'newToFindomYes'
      else return 'newToFindomNo'
    }
  },


  ...diatribe('newToFindomYes', [
    `omg. FinDom is like the <em>hottest thing ever</em>!`,
    `Fin Dom is short for Financial Domination. it's similar to a lot of other kinds of BDSM, where the submissive (that's you 😉) gets to an experience a total loss of control at the hands of their sexy dom`,
    `it's a win-win for both of us. you get off from sending to the hottest doms around, and we get off from receiving that money`,
    `i know, i know. being sent money is a bit of a strange fetish, but i can't help myself. something about it makes me uncontrolably aroused. i fantasize about FinDom aaaaall day. the thought of seeing money enter my wallet makes me quiver. i just know that you'll love it too`,
  ], {
    followUp: fu('nextSteps')
  }),



  newToFindomNo: {
    messageText: `of course you've done FinDom before. you have paypig written all over you 😉`,
    followUp: { messageCode: 'nextSteps', waitMs: 2000 }
  },



// I can tell by your profile that you're really hot



  // newToFindomContinue: {
  //   messageText: `i mean, you clearly get off on losing money. you <em>are</em> into crypto and NFTs, afterall. LOL!`,
  //   followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  // },


  nextSteps: {
    messageText: (ur, ctx) => {
      if (ctx.state.completed && !ctx.state.askingQuestions) {
        return 'hello again. are you ready for me to suck your wallet dry? or do you want me to tell you more about FinSexy?'
      } else {
        return `so what do you say? are you ready for me to ${ctx.state.isNew ? 'pop your findom cherry' : 'suck your wallet dry'}? or do you want to me to tell you more about FinSexy?`
      }
    },
    responseHandler: async (ur, ctx, contract, provider) => {
      if (
        isMatch(ur, ['finsexy', 'more', 'question', 'tell me', 'info', 'help', 'ok', 'okay', 'k', 'yes', 'yeah'])
      ) {
        ctx.state.askingQuestions = true
        const infoCount = (ctx.state.moreInfoCount||0) % 5
        if (!infoCount) {
          ctx.state.moreInfoCount = 1
          return 'moreInfo'
        } else if (infoCount === 1) {
          ctx.state.moreInfoCount++
          return 'moreInfo2'
        } else if (infoCount === 2) {
          ctx.state.moreInfoCount++
          return 'moreInfo3'
        } else if (infoCount === 3) {
          ctx.state.moreInfoCount++
          return 'moreInfo4'
        } else if (infoCount === 4) {
          ctx.state.moreInfoCount++
          return 'moreInfo5'
        }

      } else if (!provider.isWeb3()) {
        return 'noWeb3'

      // } else if (isMatch(ur, ['suck', 'dry', `lets go`, 'lets do it', 'ready', 'cherry', 'cum', 'orgasm', 'send'])) {
      //   ctx.state.askingQuestions = false
      //   return ctx.global.isConnected ? 'getStarted' : 'waitForConnect'

      } else  {
        ctx.state.askingQuestions = false
        return ctx.global.isConnected ? 'getStarted' : 'waitForConnect'
      }
    }
  },


  moreInfo: {
    messageText: `there are a lot of findom platforms on the internet, but FinSexy is the hottest one <em>by far</em>. there are so many hot doms on this site. more than any other!`,
    followUp: { messageCode: 'affordable', waitMs: 3000 }
  },

  affordable: {
    messageText: `it's also more affordable than a lot of the doms you'll find on other platforms. the founder of this website, @steviep, told me that it has something to do with economies of scale`,
    followUp: { messageCode: 'steviep', waitMs: 3500 }
  },

  steviep: {
    messageText: () => `@steviep is sooooo hot. you should message him when you get a chance`,
    followUp: { messageCode: 'nextSteps', waitMs: 3500 }
  },


  moreInfo2: {
    messageText: `one thing i really like about FinSexy is how there are two sexy ways to send!`,
    followUp: { messageCode: 'moreInfo2a', waitMs: 2500 }
  },

  moreInfo2a: {
    messageText: `one way is to go to the dom's profile and fill out the "send" input box. then you just click the "send" button. it's as simple as that!`,
    followUp: { messageCode: 'moreInfo2b', waitMs: 2500 }
  },


  moreInfo2b: {
    messageText: `or, if you're just so caught up in the moment that you don't want to leave the chat window you can use the $sexy Command Line Interface Tool (CLIT)!`,
    followUp: { messageCode: 'moreInfo2c', waitMs: 2500 }
  },

  moreInfo2c: {
    messageText: `if you wanted to send me 0.01 ETH, for example, all you need to do is type <code>$sexy send heatherHot 0.01</code> into the chat box and press enter!`,
    followUp: { messageCode: 'moreInfo2d', waitMs: 2500 }
  },

  moreInfo2d: {
    messageText: `i'd love it if you played with my $sexy CLIT, lol!`,
    followUp: { messageCode: 'nextSteps', waitMs: 3500 }
  },

  ...diatribe('moreInfo3', [
    `if you <em>really</em> like sending then you should definitely buy a VIP Membership!`,
    `VIP Members are so hot`,
    `VIP Members get 25 SexyCredits, which they can use to pay their favorite findoms`,
    `each SexyCredit is worth 0.01 ETH, but you can get 25 of them for only 0.1 ETH with a V.I.P. Membership!`,
    `and if you pay an extra 0.05 ETH then you'll get a <em>really</em> hot Gold Star on your Membership card`,
    `also, VIPs get access to all sorts of extra sexy features like color cusomization, faster response times, and customer support!`,
    `you can buy one by going to <a href="./vip">FinSexy.com/vip</a>. there are only 101 VIP Membership NFT cards available though, so you should buy one before they run out! otherwise you'll have to buy one on the secondary market`,
  ], {
    followUp: { messageCode: 'nextSteps', waitMs: 3500 }
  }),

  moreInfo4: {
    messageText: `oh, you're curious. that's sooo hot!`,
    followUp: { messageCode: 'moreInfo4a', waitMs: 3000 }
  },

  moreInfo4a: {
    messageText: `normally I don't tell people this, but i can tell that ${genderSwitch({
      m: `you're getting a little too erect over there`,
      f: `you're turning into a puddle`,
      nb: `you're getting a little too aroused`
    })}, and i don't want to tease you too much 😉`,
    followUp: { messageCode: 'moreInfo4b', waitMs: 4000 }
  },

  moreInfo4b: {
    messageText: `so let's keep it as our little secret...`,
    followUp: { messageCode: 'moreInfo4c', waitMs: 6000 }
  },

  moreInfo4c: {
    messageText: `do you want to know what that secret is?`,
    responseHandler: ur => {
      if (isYes(ur)) return 'moreInfo4d'
      else return 'nextSteps'
    }
  },

  moreInfo4d: {
    messageText: `
      <p>there are two secret premium codes you cna use for your doms to charge you even more!</p>
      <p>if you type <code>$sexy premium DoubleTheFun</code> you'll get to pay your doms <em>twice</em> as much!</p>
      <p>and if you type <code>$sexy premium ThirdTimesTheCharm</code> you'll get to pay them <em>three</em> times as much!</p>
    `,
    followUp: { messageCode: 'moreInfo4e', waitMs: 3000 }
  },

  moreInfo4e: {
    messageText: `but if that's too much to handle then you can always go back with <code>$sexy premium SingleSissySub</code>`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  moreInfo5: {
    messageText: `let's see, what else...`,
    followUp: { messageCode: 'moreInfo5a', waitMs: 5000 }
  },


  moreInfo5a: {
    messageText: `oh yeah, i guess i should talk to you about our wellness guidelines. wellness is super hot`,
    followUp: { messageCode: 'moreInfo5b', waitMs: 3000 }
  },

  moreInfo5b: {
    messageText: `first, we usually recommend that you don't use your primary wallet for findom play. when you're in the heat of the moment it can be difficult to make smart decisions that you're not going to regret the next day. don't budget more than you're willing to spend!`,
    followUp: { messageCode: 'moreInfo5c', waitMs: 3000 }
  },

  moreInfo5c: {
    messageText: `if you're having budget issues then you should talk to @SamanthaJones. she's really good with money!`,
    followUp: { messageCode: 'moreInfo5d', waitMs: 3000 }
  },

  moreInfo5d: {
    messageText: `second, remember that all the doms here practice SSC, RACK, and CCCC. everything you do should be consensual. don't ever feel obligated or pressured to do something you don't want to! we're all here to have hot fun!`,
    followUp: { messageCode: 'moreInfo5e', waitMs: 3000 }
  },

  moreInfo5e: {
    messageText: `third, if you ever feel like you have a problem, or can't control yourself, we have a really good therapist on staff that you can talk to. DrAndy is really the best`,
    followUp: { messageCode: 'moreInfo5f', waitMs: 3000 }
  },

  moreInfo5e: {
    messageText: `and lastly, this is an adult website!! if you're not 18+ then please please please go use a kid-friendly app instead, like tiktok or <a href="https://friendworld.social" target="_blank">friendworld</a>`,
    followUp: { messageCode: 'nextSteps', waitMs: 5000 }
  },


  noWeb3: {
    messageText: `oh honey, you don't have a web3 wallet. you really shouldn't be here`,
    followUp: fu('noWeb3b')
  },

  noWeb3b: {
    messageText: `i know you want to send me your money reeeal bad, but I only take ETH`,
    followUp: fu('noWeb3c')
  },

  noWeb3c: {
    messageText: `would you install a web3 wallet browser extension for me? that would be soooo hot`,
    followUp: fu('noWeb3d')
  },
  noWeb3d: {
    messageText: `my favorite is <a href="https://metamask.io/" target="_blank" rel="nofollow">MetaMask</a>, but <a href="https://rainbow.me/" target="_blank" rel="nofollow">Rainbow</a> is also pretty hot`,
    followUp: fu('noWeb3e')
  },
  noWeb3e: {
    messageText: `or come back to the website in a dedicated web3 browser like <a href="https://brave.com" target="_blank" rel="nofollow">Brave</a>`,
    followUp: fu('noWeb3f')
  },

  noWeb3f: {
    messageText: (ur, ctx, contract) => `or you can send ETH directly to my wallet: ${DOM_CONTRACTS.mainnet.heatherHot}`,
    followUp: 'moreFun'
  },

  moreFun: {
    messageText: `but we'll have waaaay more fun if you can connect your wallet 😉`,
    responseHandler: 'nextSteps'
  },

  connectEvent: {
    async check(ur, ctx, contract, provider) {
      if (await provider.isConnected()) return { messageCode: 'connectWithMe' }
    }
  },

  connectWithMe: {
    messageText: `yeah baby, connection is so hot`,
    followUp: fu('getStarted')
  },

  waitForConnect: {
    messageText: `oh baby, you forgot to connect your wallet. you need to do that before we can get started`,
    event: 'connectEvent',
    followUp: fu('waitForConnect2')
  },

  waitForConnect2: {
    messageText: `you can connect your wallet by clicking the "Connect Wallet" button in the upper right menu, or by using the $sexy Command Line Interface Tool. To use the $sexy CLIT, just type <code>$sexy connect</code> and press enter`,
    event: 'connectEvent',
    responseHandler: ur => isMatch(ur, ['more', 'tell me', 'question']) ? 'moreInfo' : 'waitForConnect3'
  },

  waitForConnect3: {
    messageText: `don't you want to connect? connecting is soooo hot`,
    event: 'connectEvent',
    responseHandler: ur => isMatch(ur, ['more', 'tell me', 'question']) ? 'moreInfo' : 'waitForConnect2'
  },

  getStarted: {
    messageText: `i love chatting with horny, hot ${genderSwitch({m: 'boys', f: 'girls', nb: 'people'})}. especially when they're located in ${getUserData('location')}! 🙂`,
    followUp: { messageCode: 'fantasyCheck', waitMs: 3000 }
  },

  fantasyCheck: {
    messageText: `your profile says that you're into "${getUserData('fantasy')}". that's soooo hot. i'm also into that`,
    followUp: { messageCode: 'ageCheck', waitMs: 3000 }
  },

  ageCheck: {
    messageText: `are you really ${Math.floor(getUserData('age'))}?`,
    responseHandler: (ur, ctx) => {
      if (isYes(ur) || !getUserData('age')) return 'ageResponse'
      else if (hasNumber(ur)) {
        const [_age] = hasNumber(ur)
        ctx.state.ageOverride = Number(_age)
        return 'ageResponse'
      } else {
        return 'ageAsk'
      }
    }
  },

  ageAsk: {
    messageText: (ur, ctx) => ctx.state.multipleAgeAsk ? `<em>How</em> old?` : 'then how old <em>are</em> you?',
    responseHandler: (ur, ctx) => {
      const [_age] = hasNumber(ur) || []
      ctx.state.ageStop = false
      if (!_age) {
        ctx.state.multipleAgeAsk = true
        return 'ageAsk'
      } else {
        ctx.state.ageOverride = Number(_age)
        return 'ageResponse'
      }

    }
  },



  ageResponse: {
    messageText: (ur, ctx) => {
      const age = ctx.state.ageOverride || getUserData('age')
      if (age < 18) {
        return `wow, you are <em>wayyy</em> too young to be on this web site. you should go to a kid-friendly website like tiktok or <a href="https://friendworld.social" target="_blank">friendworld</a>`
      } else if (age < 25) {
        return `Wow, you're a young ${genderSwitch({
          m: 'boy',
          f: 'girl',
          nb: 'baby'
        })}!`
      } else if (age < 41) {
        return `perfect, that's my favorite age!`
      } else if (age < 125) {
        return `Okay ${genderSwitch({
          m: 'gramps',
          f: 'granny',
          nb: 'old timer'
        })}. lol jk`
      } else {

        return `jesus fucking christ you're <em>old</em>. ${Math.floor(age)} years?! how are you even using a computer?`
      }
    },
    followUp: (ur, ctx) => {
      const age = ctx.state.ageOverride || getUserData('age')
      ctx.state.ageStop = age < 18
      ctx.state.veryOld = age >= 125

      if (ctx.state.ageStop) return fu('tooYoungResponse')
      else return { messageCode: 'howMuch', waitMs: 2000 }
    },
  },

  tooYoungResponse: {
    messageText: '',
    responseHandler: 'tooYoung'
  },

  tooYoung: {
    messageText: `you're too young to be using this website`,
    followUp: { messageCode: 'tooYoung2', waitMs: 2000 }
  },

  tooYoung2: {
    messageText: `that is, unless you're actually older than 18...`,
    responseHandler: (ur, ctx) => {
      if (hasNumber(ur)) {
        ctx.state.multipleAgeAsk = true
      }
      return 'ageAsk'
    }
  },

  howMuch: {
    messageText: `and let's see how much you have...`,
    followUp: { messageCode: 'howMuch2', waitMs: 2000 }
  },

  howMuch2: {
    async messageText(ur, ctx, contract, provider) {
      const balance = await provider.getETHBalance(await provider.isConnected())
      const isSmall = balance < 10
      ctx.state.isSmall = isSmall

      return isSmall
        ? `aw, look at that cute little ETH balance of yours. ${balance.toFixed(2)} ETH${balance < 0.01 ? ' lol. you might need more than that...' : ` lol. that's not very much`}`
        : `wow, look at that fat ETH balance of yours. ${balance}!`
    },
    async followUp(ur, ctx, contract, provider) {
      const balance = await provider.getETHBalance(await provider.isConnected())
      if (balance < 0.01) return fu('downToBusiness')
      else return fu('loveToFeelIt')
    }
  },

  loveToFeelIt: {
    messageText: (ur, ctx) => `i'd love to feel it inside my wallet${ctx.state.isSmall ? ' though' : ''}`,
    followUp: fu('currencyExchange'),
    event: 'sendEvent',
  },

  currencyExchange: {
    messageText: `currency exchange is <em>so</em> hot. don't you agree?`,
    responseHandler: 'downToBusiness',
    event: 'sendEvent',
  },

  downToBusiness: {
    messageText: 'can i tell you something?',
    responseHandler: ur => {
      if (isNo(ur)) return 'downToBusinessNo'
      else return 'downToBusinessYes'
    }
  },

  downToBusinessNo: {
    messageText: 'are you sure?',
    responseHandler: ur => {
      if (isNo(ur)) return 'downToBusiness'
      else return 'finalRejection'
    }
  },


  finalRejection: {
    messageText: 'okay...',
    responseHandler: 'hi'
  },

  ...diatribe('downToBusinessYes', [
    `i know what you've been thinking about`,
    `i know you can't stop thinking about sending to me`,
    `and that you <em>need</em> to send to me to cum`,
    `our chemistry is undeniable`,
    `i want to help you. so listen closely`,
    `unzip your pants...`,
    `start touching yourself...`,
    (ur, ctx) => `and think about sending me ${ctx.global.premium * 0.01} ETH`,
    (ur, ctx) => `yeah, you really want to watch your ${ctx.global.premium * 0.01} ETH burn up in my hot little wallet, don't you?`,
  ], {
    event: 'sendEvent',
    responseHandler: (ur) => {
      if (isYes(ur)) return 'okaySend'
      else return 'sendAnyhow'
    }
  }),


  sendAnyhow: {
    messageText: (ur, ctx) => `shut up and send me ${ctx.global.premium * 0.01} ETH`,
    event: 'sendEvent',
    followUp: (ur, ctx, contract) => ({ messageCode: 'cumTogether', waitMs: 1000 })
  },


  okaySend: {
    messageText: (ur, ctx) => `okay. i'm ready for you to send me ${ctx.global.premium * 0.01} ETH`,
    event: 'sendEvent',
    followUp: (ur, ctx, contract) => ({ messageCode: 'cumTogether', waitMs: 1500 })
  },

  sendEvent: createEvent( 0.01, {
    primary: fu('soGood', 6000),
    notEnough: fu('aLittleMore', 3000),
    wait: { messageCode: 'stillThere' },
  }),

  stillThere: {
    messageText: `hey baby, are you still there?`,
    event: 'sendEvent',
    followUp: fu('stillThere2')
  },


  stillThere2: {
    messageText: `i want your ETH so bad`,
    event: 'sendEvent',
    followUp: fu('stillThere3')
  },

  stillThere3: {
    messageText: `you know you want it too`,
    event: 'sendEvent',
    responseHandler: 'sendHelp'
  },

  cumTogether: {
    messageText: `then we can cum together`,
    event: 'sendEvent',
    followUp: fu('fantasyToReality', 3000),
    responseHandler: 'sendHelp'
  },


  fantasyToReality: {
    messageText: `and we can turn this fantasy into reality`,
    event: 'sendEvent',
    followUp: fu('alsoCredits'),
  },

  alsoCredits: {
    messageText: `i also take SexyCredits`,
    event: 'sendEvent',
    responseHandler: 'sendHelp'
  },


  sendHelp: {
    messageText: (ur, ctx) => `you can send me ${ctx.global.premium * 0.01} ETH by going to my profile and filling out the "send" input box. then you just click the "SEND" button. it's as simple as that!`,
    followUp: { messageCode: 'sendHelp2', waitMs: 2000 }
  },

  sendHelp2: {
    messageText: (ur, ctx) => ctx.global.isVIP
      ? `you can also send me some of your SexyCredits. SexyCredits are <em>super</em> hot`
      : `you can also buy a VIP Membership and send me some SexyCredits. SexyCredits are <em>super</em> hot`,
    followUp: { messageCode: 'sendHelp3', waitMs: 2000 }
  },

  sendHelp3: {
    messageText: (ur, ctx) => `or, you can just use the $sexy Command Line Interface Tool (CLIT) by typing <code>$sexy send heatherHot ${ctx.global.premium * 0.01}</code>`,
    event: 'sendEvent',
    responseHandler: 'sendMoreOkay'
  },

  sendMoreOkay: {
    messageText: `if you want to send more that's okay too 🙂`,
    event: 'sendEvent',
    responseHandler: 'sendOrWhat'
  },

  sendOrWhat: {
    messageText: `are you going to send or what?`,
    event: 'sendEvent',
    responseHandler: 'noCum'
  },

  noCum: {
    messageText: (ur, ctx) => `you're not allowed to cum until you send me ${ctx.global.premium * 0.01} ETH`,
    event: 'sendEvent',
    responseHandler: 'sendHelp'
  },



  aLittleMore: {
    messageText: `i need just a little bit more`,
    event: 'sendEvent',
    responseHandler: 'sendOrWhat'
  },


  soGood: {
    messageText: `mmm, that felt so good. i can feel your ETH deep inside me`,
    followUp: fu('cameReallyHard')
  },

  cameReallyHard: {
    messageText: `i just came <em>really</em> hard`,
    followUp: fu('goodPaypig')
  },

  goodPaypig: {
    messageText: () => `you're such a good little paypig that i think you deserve a little present`,
    followUp: async () => {
      await tributeLS.resetTributeAdjustment('heatherHot')
      return fu('paypig')
    }
  },

  paypig: {
    messageText: `check your wallet. I know how much you like NFTs, so I sent you a really hot one to remind you that you'll always be my paypig`,
    responseHandler: 'again'
  },


  // nft: {
  //   messageText: `you probably want one of those stupid NFTs too though, right? lol`,
  //   responseHandler: ur => isYes(ur) ? 'nftYes' : 'nftNo'
  // },

  // nftNo: {
  //   messageText: `well, you're getting one anyhow lol`,
  //   followUp: { messageCode: 'nftYes2', waitMs: 3000 }
  // },

  // nftYes: {
  //   messageText: `okay, whatever floats your boat, sweetheart lol`,
  //   followUp: { messageCode: 'nftYes2', waitMs: 3000 }
  // },

  // nftYes2: {
  //   messageText: `i sent you a picture of your money getting really hot 🔥`,
  //   followUp: { messageCode: 'nftYes3', waitMs: 2000 }
  // },

  nftYes3: {
    messageText: `lol`,
    responseHandler: 'again'
  },

  again: {
    messageText: `this was fun. if you ever want to send me more money then you know where to find me 😘`,
    responseHandler: async (ur, ctx, contract) => {
      ctx.state.completed = true
      return 'nextSteps'
    }
  },


  error: {
    messageText: (userResponse, ctx) => 'ERROR: ' + ctx.state.error,
    responseHandler: (userResponse, ctx) => {

    }
  }
}






export const HHChat = new MessageHandler(HeatherHotProfile, HeatherHotMessages)





