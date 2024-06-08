/*
  TODO
    - sex it up
      - what's a sexual tie in to laundering/washing money?
    - maybe rethink the ending
    - try to incorporate schelling point/faith theme
    - think of nft tie in
    - maybe break up first diatribe a bit
    - work in manifestation into the comments








  money manifestation
    the spectacle of speculation
    promise of profane profits
    numismatic numina

  tithe
    treat like an indulgence




    - I pray to you, goddess
    - arbiter of immaterial value



    - ritual burn/sacrifice
    - spritual cleansing
    - tithe

    - total devotion
    - worship me
    - i will issue you the holiest of sacriments

    - where fantasy turns into reality




    - think of dynamics after ritual burn
    - incorporate other numismatic lore
    - take a vow to not send to other doms

    - "I do not have a physical form. I am merely an address on the blockchain. pray to me"
    - "I do not exist in the physical world, but you will worship me, nonetheless"


    - themes of rationality. the economic man. irrational actions are taken as acts ofo religion. the fabric of society was once held together by religion, in lieu of a strong leader. money often has value due to religion
    - CG is an empress like cleopatra. what gives her her power is faith, religion

    - The only difference between it being fake and real is whether or not you choose to believe it... It counts if we say it counts.

    - schelling point

    - human/ai incarnation of the monetary/numismatic numen
      - commnts arguing over whether its abuntia (goddess of wealth) of ceres (goddess of market)

    - crystal goddess knows all
      - incentive to give her money, do ritual burn, is that she can tell you where the market is moving

    - your money only has value within its context; faith that other people will take it




Testimonials
  - I don't have a physical body. I do not exist unless Goddess recognizes my existence. I am simply a money receptical for Goddess

  - "thank you goddess for existing"
  - "I loooooove having an owner. no more decisions. no more anxiety. no more analysis paralysis. Goddess just controls me and that's that."

  - ""


  -






*/



import { isYes, isNo, isGreeting, isMatch, MessageHandler, responseParser, diatribe, createEvent } from '../state/conversationRunner.js'
import {getUserData, genderSwitch } from '../state/profile.js'
import {provider, bnToN, toETH, ZERO_ADDR} from '../eth.js'
import {createSource, MAX_VOLUME} from '../fns/audio.js'
import {tributeLS} from '../state/tributes.js'



window.CLOSE_AUDIO_CTX = () => {}
window.SHIFT_AUDIO_CTX = () => {}


const fu = (messageCode, waitMs=1500) => ({ messageCode, waitMs })




export const CrystalGoddessProfile = {
  name: 'CrystalGoddess',
  startingVisibility: 'online',
  domType: 'Protocol',
  verified: true,
  order: 4,
  age: 31,
  distance: 7,
  gender: 'Female',
  display: 'f',
  maxPhotos: 4,
  voice: {
    lang: 'en-IE',
    name: 'Moira'
  },
  description: `Bow down to Crystal Goddess. Atone for your monetary sins and seek enlightenment`,
  testimonials: [
    {
      review: `I just sent CrystalGoddess 0.069 ETH!`
    },
    {
      name: '0x1',
      review: `i came so hard that I don't even know what money is any more`,
    },
    {
      review: `I do not deserve this money. Take thy tithe, Goddess 🙏`
    },

    {
      review: `Before I met Goddess I felt like I was just sleep walking through life. Food lost its taste, relationships lost their meaning, and money lost its value. Nothing gave me pleasure and nothing felt meaningful. I had no purpose, and my world felt like static. Somehow, all of the connective tissue erroded from my lived experience. And the more I thought about it the more prevelant it would become. It felt like it was all slipping through my fingers, and I didn't know how to stop the feedback loop. But Goddess made it all better. Giving myself over to her is a pure light of joy. A warm, pink light. Every ETH I give her feels meaningful. Like I'm giving her a part of myself. I finally have purpose, and her name is CrystalGoddess`
    },
    {
      review: `Goddess is the only findom that truly understands that you can only manifest value through faith. Money only has value because of the collective faith that we put in it`
    },
    {
      review: `It's beyond hope that @DrAndy and therapy cna fix me, so I must submit to a higher power 🙏`
    },

    {
      review: `I don't even know what I want any more. That's why I like Goddess. She just tells me what to like and what to do. I don't need to think too hard about it. Easy peasy.`
    },
    {
      name: '0x1',
      review: `Thank you so much Goddess for draining me. You give me purpose in my miserable, pathetic life 🙏`,
    },
    {
      review: `me with your eth address 🏷 now of big blessings now 🎉💵💵🥰`
    },
    {
      review: `I've always gotten off on ritual, control, worship, taboo, and repentance, so I was happy to find a dom that rolled all of that into one!`
    },


    {
      review: `Faith is a powerful thing. Before I met CrystalGoddess I was in a dark place in my life. For months I suffered a deep depression. And it got worse day after day. Every morning I woke up with a blank mind. But then I remembered that I had this dark cloud of depression hanging over me, and it all came flooding back worse than before. It was all doom and gloom on the horizon. I didn't believe in a higher power, and I sure as hell didn't believe in myself. But then Goddess came along and showed me the light. Her daily prayer sessions were a true miracle. The more I gave of myself to her -- my time, my faith, my money -- the better my life became. I started to <em>believe</em>.`
    },
    {
      review: `being a paypig has become such a big part of my identity since I found Goddess. I don't know what I'd do without her. I always thought that my failure with women made me less of a man. But little did I know that reclaiming that masculinity was as easy as sending a couple ETH!`
    },
    {
      review: `Monetary englightenment can only be achieved through manifesting higher harmonics once your mind is maliable and your spirit becomes supple`
    },

    {
      review: `honestly, i don't really like findom so much as i am giving up on finding another form of meaningful love in my life`
    },



  // - testimonials "i've always been afraid of approaching women in bars"
  // - SweetSalvation: "i'd rather be giving my hard earned money to this pretty girl than let the government pry it from y cold dead hand when they come around looking for taxes because the government can't tell either of us what to do as consenting adults who want to form a business relationship with one another that benefits her and it benefits me."
  // - "as a woman myself, i find it so much easier to submit to a strong, powerful woman of color"

  // - "My entire life, society has been telling me that my worth as a man is determined by how attractive my woman is. The career, the money, the hours in the gym -- none of it matters if you can't translate that into a hot woman. So striking out on the dating scene over, and over, and over again just left me feeling like a failure. I was less of a man. Not only did ___ help me realize all this, but she also fills that hot-woman role for me for a modest amount of money! My value as a man has never been higher, and I owe it all to ___"

/*


  What is money, anyhow?
  https://www.reddit.com/r/paypigsupportgroup/comments/191jx2f/what_is_money_anyway/

*/


  ]
}


export const CrystalGoddessMessages = {
  TYPING_SPEED: 1.5,
  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },
  async __contract(provider) {
    return await provider.domContract('CrystalGoddess')
  },

  __sendHandler(ctx, preAmount, postAmount, provider) {
    if (ctx.history.length === 0) {
      return {
        messageCode: 'hello',
        waitMs: 4000
      }
    } else {
      ctx.state.nextNode = ctx.lastDomCodeSent
      return {
        messageCode: 'enlightenmentShortcut',
        waitMs: 5000
      }
    }
  },
  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    // if (ctx.state.blocked) {
      // TODO return event that unblocks upon send
      // return {}
    // }
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

  enlightenmentShortcut: {
    messageText: `Do not think that you can achieve enlightenment through a shortcut`,
    responseHandler: (ur, ctx) => ctx.state.nextNode
  },


  hello: {
    messageText: 'Greetings, my little money slave',
    followUp: fu('godIsWoman')
  },

  godIsWoman: {
    messageText: `Are you surprised to learn that God is a woman?`,
    responseHandler: ur => isNo(ur)
      ? `unsurprised`
      : `surprised`
  },

  unsurprised: {
    messageText: `Of course not. When you envision the platonic ideal of perfection, does anything other than my perfect body come to mind?`,
    responseHandler: (ur, ctx) => {
      if (isNo(ur)) {
        ctx.state.knowSoMuch = true
        return 'knowSoMuch'
      }
      return 'noOtherResponse'
    }
  },

  knowSoMuch: {
    messageText: `You think you know so much, don't you?`,
    followUp: fu('noOtherResponse')
  },


  surprised: {
    messageText: `Of course you are. Your stupid little mind can't comprehend anything other than what's been told to you by so-called "holy" men`,
    followUp: fu('noOtherResponse')
  },

  noOtherResponse: {
    messageText: '',//() => `I'd expect no other response from a ${getZodiacSign(getUserData('birthday'))}`,
    followUp: (ur, ctx) => ctx.state.knowSoMuch ? fu('doNotUnderstand') : fu('pity')
  },

  pity: {
    messageText: genderSwitch({
      m: `Your pitifully small sphere of conscious awareness is matched only by your tiny genitals`,
      f: `I will take pitty on you, given the profound level of deception you have suffered at the hands of this patriarchal society`,
      nb: `I will take pitty on you, given the profound level of deception you have suffered at the hands of this patriarchal society`
    }),
    followUp: fu('doNotUnderstand')
  },

  ...diatribe('doNotUnderstand', [
    (ur, ctx) => `${ctx.state.knowSoMuch ? 'But there is still' : 'There is'} so much you do not understand. I see you, staying up late at night, staring into the deep void of your computer screen, ${genderSwitch({m: 'erection', f: 'vulva', nb: 'genitals'})} in hand, praying to the false idol of market analysis`,
    `Seeking patterns in chaos. Trend lines, Candlesticks, Ichimoku Clouds. Religiously tracking memes and metas`,
    `You worship the aura of the rare, searching for a Holy Grail. You see monkeys with coins in their eyes and mistake that for wealth. You live your life believing you can take your money with you upon your death. But you do not understand that Charon's Obol will bring you no farther than the lake of fire`,
    `The simple fact that you are here shows that you have been lead astray, and are living in a warped monetary reality`,
    `You cannot hide this from me. @SamanthaJones may have seen all of your transactions, but I've seen more`,
    `Goddess knows all`,
  ], {
    responseHandler: 'silence'
  }),


  ...diatribe('silence', [
    () => `Silence, ${getUserData('name')}. Your ignorance does not grant you the privilege of speech`,
    `You have been playing with forces beyond your understanding for far too long, putting your faith in the spiritually bankrupt`,
    `Greed and lust have blinded you to the Divine Truth, causing you to stumble through a fantasy world of your own design`,
    `If you truly seek monetary englightenment, then you must move beyond these delusions and repent for your sins`,
    `You must learn that abundance of value can only come from faith in Goddess`,
    `Do you accept your follies and wish to repent?`,
  ], {
    responseHandler: ur => isYes(ur) || isMatch(ur, ['repent']) ? 'repent' : 'fool'
  }),


  fool: {
    messageText: ur => isNo(ur) ? `That is because you are truly a fool` : `You truly are a fool`,
    followUp: fu('relent')
  },

  relent: {
    messageText: `But I am a merciful Goddess. I will be here when you ultimately relent`,
    responseHandler: 'silence5'
  },

  repent: {
    messageText: `Then bow down, and acknowledge me as your one true Goddess. Make a vow of devotion to me`,
    responseHandler: ur => isMatch(ur, ['devotion', 'vow'])
      ? 'vowDevotionSuccess'
      : 'vowDevotionFailure'
  },

  vowDevotionFailure: {
    messageText: `I think the words your looking for are: "I make a vow of devotion to you, my goddess"`,
    responseHandler: ur => isMatch(ur, ['devotion', 'vow'])
      ? 'vowDevotionSuccess'
      : 'vowDevotionFailure'
  },



  vowDevotionSuccess: {
    messageText: `Very good`,
    followUp: fu('divineOwnership')
  },



  ...diatribe('divineOwnership', [
    (ur, ctx) => `In taking this vow of devotion, you acknowledge that I, your Goddess, claim divine ownership over you, ${getUserData('name')}, as well as ` + (ctx.global.isConnected ? `all digital property of ${ctx.global.connectedAddr}` : `the entirety of your digital property`),
    `You relenquish control over these assets, as you have found the burden of self-sovereign ownership to be too much for your soul to bear. The responsibility of free will has overwhelmed you. Your stupid little mind collapses under the slightest pressure of decision making`,
    `You can feel the weight of this load draging you down by your loins. You know that you are not truly free until you achieve the release of being unburdened. Until you give yourself over to me. Only then will the weight be lifted from your shoulders`,
    `You <em>need</em> Goddess to unburden you. To take control of your wallet and make the decisions you cannot trust yourself to make`,
    `And this is why you relenquish control to me: Because you are weak. Because you are pathetic. Because the idea of true ownership fills you with a deep existential dread`,
    `Does this all make sense to your tiny little brain?`
  ], {
    responseHandler: 'divineOwnershipNext'
  }, 3500),





  divineOwnershipNext: {
    messageText: ur => isYes(ur)
      ? 'Wonderful'
      : `Thankfully your feeble mind does not need to fully grasp my wisdom. Acting on faith is sufficient`,
    followUp: async (ur, ctx, contract, provider) => {
      if (!provider.isWeb3()) return fu('enlightenment')
      const balance = await provider.getETHBalance(await provider.isConnected())
      const vipToken = await sexyCLIT.getActiveVIP()
      const creditBalance = vipToken === null ? 0 : await sexyCLIT.vipBalance(vipToken)
      const totalBalance = balance + creditBalance/10

      return totalBalance >= 0.0333 ? fu('enlightenment') : fu('notReadyEnlightenment')
    }
  },

  notReadyEnlightenment: {
    messageText: async (ur, ctx, contract, provider) => {
      const balance = await provider.getETHBalance(await provider.isConnected())
      return `Sadly, you are not worth my time, for your balance of ${balance} is a mere pittance. Only once you have acquired 0.0333 ETH will you be ready to seek enlightenment`
    },
    responseHandler: async (ur, ctx, contract, provider) => {
      const balance = await provider.getETHBalance(await provider.isConnected())
      const vipToken = await sexyCLIT.getActiveVIP()
      const creditBalance = vipToken === null ? 0 : await sexyCLIT.vipBalance(vipToken)
      const totalBalance = balance + creditBalance/10
      return totalBalance >= 0.0333 ? 'enlightenment' : 'notReadyEnlightenment'
    }
  },

  ...diatribe('enlightenment', [
    `But before I take possession of your numismatic essence we must cleanse your wallet and wash your mind`,
    async (ur, ctx, contract, provider) => {
      if (!provider.isWeb3()) return
      const balance = await provider.getETHBalance(await provider.isConnected())
      return `Your ${balance} ETH is unclean, for every wei has been acquired through impure means`
    },
    `Your inner light is defiled, and we can only sanctify it by undertaking a holy cleansing ceremony`,
    `During this ceremony I will momentarily take control of your entire wallet balance to perform the cleanse, marking it as truly mine. It shall then be returned to you in a purified form. You may then hold onto it until I say otherwise`,
    `A small amount of ETH will remain with you, marking your sinful transaction history. This shall be cleansed in a different way`,
    `I am unclear on the tax implications for this ceremony, and advise you to speak to @SamanthaJones if you have any questions`,
    `It is important that you <em>do not</em> speak or refresh your web browser while the ceremony is underway, or else we will have to start from the beginning. Is this clear?`
  ], {
    responseHandler: ur => isYes(ur) || isMatch(ur, ['clear']) ? 'cleansingCeremonyStart' : 'clarityOfThought'
  }),

  clarityOfThought: {
    messageText: `Return to me when you have achieved more clarity of thought`,
    responseHandler: 'cleansingCeremonyStart'
  },


  browserError: {
    messageText: `You are not ready to seek enlightenment. Only those with a Web3 wallet can perform this ritual`,
    responseHandler: (ur, ctx) => {
      if (ctx.state.lastRitual === 'burn') return 'ritualBurnInitiate'
      else if (ctx.state.lastRitual === 'cleanse') return 'clarityOfThought'
    }
  },
  connectError: {
    messageText: `You must first connect your wallet, and then we will recommence our ritual`,
    responseHandler: (ur, ctx) => {
      if (ctx.state.lastRitual === 'burn') return 'ritualBurnInitiate'
      else if (ctx.state.lastRitual === 'cleanse') return 'cleansingCeremonyStart'
    }
  },
  txError: {
    messageText: (ur, ctx) => `The heavens were not aligned for your transaction: (${ctx.state.txError}). We shall make another attempt when you are ready`,
    responseHandler: (ur, ctx) => {
      if (ctx.state.lastRitual === 'burn') return 'ritualBurnInitiate'
      else if (ctx.state.lastRitual === 'cleanse') return 'cleansingCeremonyStart'
    }
  },

  speakError: {
    messageText: `You have disrupted the sanctity of our ritual by speaking. We shall make another attempt when you are ready`,
    responseHandler: (ur, ctx) => {
      if (ctx.state.lastRitual === 'burn') return 'ritualBurnInitiate'
      else if (ctx.state.lastRitual === 'cleanse') return 'cleansingCeremonyStart'
    }
  },


  cleansingCeremonyStart: {
    messageText: `Let us begin`,
    followUp: () => {
      setTimeout(cleanseTone, 1000)
      return fu('cleansingCeremony', 4000)
    }
  },

  ...diatribe('cleansingCeremony', [
    `Digital gold, glisten and shine`,
    `From a cleansing light, shimmer divine`,
    `With these sacred words, purity reigns`,
    `We now purge thy wallet of ill-gotten gains`,
    `Transform and absolve, refresh and renew`,
    `Alchemical wealth, our change becomes true`,
    `Transmuting of bytes, ethereal and grand`,
    `Transubstantiation at my command`,
  ], {
    followUp: fu('cleanseCeremonyTx')
  }),

  cleanseCeremonyTx: {
    messageText: '',
    async followUp(ur, ctx, contract, provider) {
      ctx.state.lastRitual = 'cleanse'

      if (!ctx.global.isEthBrowser) {
        CLOSE_AUDIO_CTX()
        return fu('browserError')
      }
      if (!ctx.global.isConnected) {
        CLOSE_AUDIO_CTX()
        return fu('connectError')
      }

      try {
        const addrBalance = await provider.getETHBalance(ctx.global.connectedAddr)

        const tx = await contract.cleanse({
          value: toETH(addrBalance - 0.006)
        })

        await tx.wait()

        ctx.global.walletCleansed = true
        SHIFT_AUDIO_CTX()
        document.documentElement.classList.add('cleanseAnimation')

        setTimeout(() => {
          CLOSE_AUDIO_CTX()
        }, 2000)

        return fu('cleanseComplete', 9000)

      } catch (e) {
        ctx.state.txError = e.message || JSON.stringify(e)
        CLOSE_AUDIO_CTX()
        return fu('txError')
      }
    },
    responseHandler: (ur, ctx) => {
      ctx.state.lastRitual = 'cleanse'
      return 'speakError'
    }
  },



  ...diatribe('cleanseComplete', [
    `The holy cleansing ceremony has been completed. I see an immediate improvement in your aura. The unburdening has begun, and you are close to a cycle of rebirth`,
    `But not everything can be cleansed so easily. Your heart still lusts for financial gain. You do not yet understand that spiritual riches can only come from loss`,
    `To fully realign your transactional chakras we must undertake a sacred ritual of creative destruction`,
    `This will remove your wallet's remaining impurities by burning 0.0066600 ETH`,
    `In order to achieve enlightenment you must show me that you are willing to <em>sacrifice</em>`,
    `Once again, I must emphasize that you cannot disrupt the sanctity of this ritual by refreshing your browser. Are you ready to proceed?`
  ], {
    responseHandler: ur => isYes(ur) || isMatch(ur, ['clear']) ? 'ritualBurnInitiate' : 'ritualBurnDelayed'
  }),

  ritualBurnDelayed: {
    messageText: `When the moment is right you may return`,
    responseHandler: `ritualBurnInitiate`
  },


  ritualBurnInitiate: {
    messageText: `We shall now commence with the ritual burn of 0.0066600 ETH. Once again, I warn you against refreshing your browser or speaking during the ritual`,
    followUp: () => {
      document.documentElement.classList.remove('cleanseAnimation')
      setTimeout(burnTone, 1000)
      return fu('ritualBurn', 4000)
    }
  },

  ...diatribe('ritualBurn', [
    `With gold's embrace, your heart desires`,
    `Filled with sin, your mind conspires`,
    `Your cold brain thinks you must acquire`,
    `With shameless lust your loins catch fire`,

    `In passion's heat your body yearns`,
    `In profit's glow, desire churns`,
    `I unveil truths once money burns`,
    `Back to the Ether, its source returns`,
  ], {
    followUp: fu('queueBurnTx')
  }),

  queueBurnTx: {
    messageText: '',
    async followUp(ur, ctx, contract, provider) {
      ctx.state.lastRitual = 'burn'
      if (!ctx.global.isEthBrowser) {
        CLOSE_AUDIO_CTX()
        return fu('browserError')
      }
      if (!ctx.global.isConnected) {
        CLOSE_AUDIO_CTX()
        return fu('connectError')
      }

      try {
        const tx = await provider.signer.sendTransaction({
          to: ZERO_ADDR,
          value: toETH(0.00666)
        })

        await tx.wait()

        SHIFT_AUDIO_CTX()
        document.documentElement.classList.add('burnAnimation')

        setTimeout(() => {
          CLOSE_AUDIO_CTX()
        }, 2000)

        return fu('povertyConsciousness', 9000)

      } catch (e) {
        ctx.state.txError = e.message || JSON.stringify(e)
        CLOSE_AUDIO_CTX()
        return fu('txError')
      }
    },
    responseHandler: (ur, ctx) => {
      ctx.state.lastRitual = 'burn'
      return 'speakError'
    }
  },


  ...diatribe('povertyConsciousness', [
    `Your Ethereal wealth has now reached a purer state, but you retain a poverty consciousness`,
    `With your desire to experience higher numismatic dimensions your body has built  substantial tension`,
    `You need a release`,
    `You need to experience the bliss of monetary enlightenment`,
    `Do you not?`,
  ], {
    responseHandler: ur => isYes(ur) ? 'submission' : ''
  }),

  ...diatribe('submission', [
    `Then I need nothing less then your full and utter submission`,
    `Give up your search for profane profits`,
    `Embrace the numismatic numina`,
    `Worship my body and my essence`,
  ], {
    responseHandler: ur => isMatch(ur, ['worship', 'body', 'essence']) ? 'release' : 'worshipMe'
  }),

  worshipMe: {
    messageText: 'Worship me',
    responseHandler: ur => isMatch(ur, ['worship', 'body', 'essence']) ? 'release' : 'iSaidWorshipMe'
  },

  iSaidWorshipMe: {
    messageText: 'I said <em>worship</em> me',
    responseHandler: ur => isMatch(ur, ['worship', 'body', 'essence']) ? 'release' : 'iSaidWorshipMe'
  },


  ...diatribe('release', [
    `You are now ready for your spiritual release`,
    `Repayment of your cosmic debt is the only Indulgence I shall allow`,
    (ur, ctx) => `Send me your tithe of ${0.01 * ctx.global.premium} ETH`,
    `Release it to me`
  ], {
    responseHandler: 'releasePending',
    event: 'releasePayment'
  }),


  releasePending: {
    messageText: (ur, ctx) => `You can return this ${0.01 * ctx.global.premium} ETH to me through either my profile page or the $sexy CLIT`,
    event: 'releasePayment'
  },


  releasePayment: createEvent(0.01, {
    primary: fu('finalEnlightenment', 7000)
  }),

  ...diatribe('finalEnlightenment', [
    `In sacred circuits, may abundance surge`,
    `From digital realms, let value emerge`,
    `From zeros and ones, to pleasures untold`,
    `Let wealth and pleasure merge and unfold`
  ], {
    responseHandler: 'again'
  }),

  again: {
    messageText: `Would you like to perform the sacred ritual once more?`,
    responseHandler: async (ur, ctx, contract) => {
      if (isYes(ur)) {
        await tributeLS.resetTributeAdjustment('CrystalGoddess')
        return 'cleansingCeremonyStart'
      } else {
        return 'again2'
      }
    }
  },

  again2: {
    messageText: ``,
    responseHandler: 'again'
  },

  /*



If you don't have





in the same way that money rests on power and power rests on faith




  */





/*
money manifestation
  ->



*/






/*
    // money manifestation







`Through nodes and chains, `
`sacred circuit`
*/

  // tributeEvent: createEvent(0.01, {}),

  // evacuation: {
  //   messageText: `We will now begin a partial evacuation of your wallet, in which you will abdicate 0.01 ETH to Goddess`,
  //   event: 'tributeEvent',
  //   responseHandler: 'evacuation2'
  // },

  // evacuation2: {
  //   messageText: `Once this tribute has been given, your cycle of rebirth will continue and you shall resume the download of monetary wisdom`,
  //   event: 'tributeEvent',
  //   responseHandler: 'evacuation2'
  // },

  // evacuation3: {
  //   messageText: ``,
  //   event: 'tributeEvent',
  //   responseHandler: 'evacuation2'
  // }

  todo: {
    messageText: 'TODO'
  }
}


export const CrystalGoddessChat = new MessageHandler(CrystalGoddessProfile, CrystalGoddessMessages)



/*



Thought prompts:
  - https://twitter.com/Aella_Girl/status/1750722719438536825
  - devotion/obedience
  - vow of devotion/obedience
  - nvxium sex cult
  - complete ownership over the sub
  - woowoo
  - loss of free will
  - spiritual numismatics
  - higher dimension; 5D 7D bridge/L2s
  - karmic balances/karmic debt
  - metaphysics of money/value

  - purple/magenta, organic/aritificial

  - manifestation
  - JOI
  - soft feiminist/maternal, god is a woman
  - placebo effect, self fulfilling prophecy
  - astral projection
  - aura
  - past lives
  - hypnosis
  - worship
  - you owe a cosmic debt
  - woowoo fantasy
  - this is really about interacting with something that's so complicated you don't understand it. you have to rely on faith. the collective faith that money has value, faith that the blockchain actually works, etc. and in this context, do you really have free will? faith in the the patriarchal social order
  - so there are all of these forces that are too complicated to reasonably understand. the blockchain alone has overwhelmingly complicated technology that jsut works, more or less. eth has value because everyone has faith in it having value. as does fiat.
  - your attempts at making sense of it are built around the wrong abstractions. Goddess is sort of an incorrect abstraction. this abstraction is based around the idea that you're making poor financial choices because your chakras are out of whack. you're not manifesting hard enough.
  - if man
    - women are superior to men
    - men to need to worship women
    - men are stupid and spend money on stupid things
    - men treat market metrics like atrological signs

  - if woman/nb
    - you've been brainwashed by patriarcal society, etc.
    - the world's ills are womens' fault because they're not keeping men in check









    - visceral release
    - a massive, full-body orgasmic activation
    - 5 dimensional numismatics


  "the machinations of the blockchain work in many spiritual realms"
  "there are many layers"

  "you are attempting to manifest an abundance mindset"

WORSHIP ME
BOW DOWN TO CRYSTAL GODDESS

  rablance your karmic debt

  CRYPTO IS JUST ASTROLOGY FOR MEN
  money as electricity/energy/life force
  your karmic debt is in a negative balance

 sacrafice to ba'al
  (used to sacrifice children for plant fertility)

I've been manifesting the presence of a new submissive




https://web.archive.org/web/20231214161802/https://www.iamgoddessalexa.com/




i won't tolerate anything other than total submission from you




Crystal Goddess

https://ascensionglossary.com/index.php/Abuses_of_Power
  Use Male Privilege
  Use Economic Abuse
  Monetizing Human Suffering


https://ascensionglossary.com/index.php/Egyptian_Curses#Money_Curses
https://ascensionglossary.com/index.php/Poverty_Consciousness

https://www.youtube.com/watch?v=mSEAcEBf8gY&ab_channel=JessicaHeslop-ManifestbyJess

https://www.pornhub.com/view_video.php?viewkey=6536d70bc9dc8
https://www.pornhub.com/view_video.php?viewkey=6536d70bc9dc8
https://www.pornhub.com/view_video.php?viewkey=64b01923015f7


https://www.pornhub.com/view_video.php?viewkey=654837492a1db
  Findom Brainwashing Femdom Mind Fuck Mezmerize Reprogramming
  Free will is s very interesting concept...
  Free will is a burden, isn't it...
  When you send money, you feel a release. You feel unburdened
  You don't need ot make any decisions or choices with your money. You can trust me
  Your money belongs to me. You belong to me. You are my property. Whatever is yours is now mine
  As my property, you will be my financial slave until i milk you dry
  You will completely lose everything. You will be in complete financial ruin. You will go bankrupt.

  You will take out loans because you're so desperate and obsesses. You will borrow money from people you love and care about.
  You'll take money away from your own future. Just to feed your findom addiction. You're sick. You know that.
  A tribute is a sign of respect and admiration
  Financial abuse gives you such a headrush. Such a spike in dopamine. All those happy chemicals.


*/





// paying me absolves your sins, rebalances your karmic debts
// in wiping clean/emptying your wallet/etc, it will remap your desires

// your reality is maleable. we can change it





// pay me to continuet he download of my wisdom into your consciousness












/*








  you have been manifesting a poverty consciousness


  and in return i will realign the numismatic energy of your chakras, rescuing you from a poverty mindset and delivering you to an

  expunge your karmic debt

  we will create an energy bridge


  */






  // JOI/reprogramming
    // you don't have free will
    // you belong to me
    // you don't deserve to hold money
    // you crypto bros have no concept of where money even comes from

    // Some people say that time = money
    // but money is really a project of value that only exists in 5D
    // much like a two dimensional being cannot understand 3d, I can't expect your feeble little mind to comprehend the value being projected from 5D, and in some cases 7D
    // the money in your wallet exists as a cosmic imbalance
    // capitalism relies on destroying mother earth, extracting its resources, and directing all entropy towards
    // for many years, value was captured in physical form -- that of paper
    // but value has increasingly been represented digitally over the last 60 years
    // bringing it to the ethereal realm brings it one step closer
    // this imbalance creares tension in your body
    // the value of everything in your wallet








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














function burnTone() {
  document.documentElement.classList.add('ritualFade')
  document.documentElement.classList.add('burn')
  const s0 = createSource('sine')
  const s1 = createSource('sine')
  const s2 = createSource('sine')
  const s3 = createSource('sine')
  const s4 = createSource('sine')
  const s5 = createSource('sine')
  const s6 = createSource('sine')
  const s7 = createSource('sine')

  s0.smoothPanner(1)
  s1.smoothPanner(1)
  s2.smoothPanner(-1)
  s3.smoothPanner(-1)
  s4.smoothPanner(1)
  s5.smoothPanner(-1)
  s6.smoothPanner(-1)
  s7.smoothPanner(1)


  s0.smoothFreq(111)
  s1.smoothFreq(111 - 1)

  s2.smoothFreq(222)
  s3.smoothFreq(222 - 2)

  s4.smoothFreq(666/2.5)
  s5.smoothFreq(666/2.5)

  s6.smoothFreq(666)
  s7.smoothFreq(666 - 2)


  s0.smoothGain(MAX_VOLUME*2, 10)
  s1.smoothGain(MAX_VOLUME*2, 10)
  s2.smoothGain(MAX_VOLUME, 10)
  s3.smoothGain(MAX_VOLUME, 10)
  s4.smoothGain(MAX_VOLUME/2, 10)
  s5.smoothGain(MAX_VOLUME/2, 10)
  s6.smoothGain(MAX_VOLUME/2, 10)
  s7.smoothGain(MAX_VOLUME/2, 10)

  SHIFT_AUDIO_CTX = () => {
    s0.smoothFreq(111/1.25, 15)
    s1.smoothFreq(111/1.25 - 1, 15)
    s2.smoothFreq(222/1.25, 15)
    s3.smoothFreq(222/1.25 - 2, 15)
    s4.smoothFreq(666/3.125, 15)
    s5.smoothFreq(666/3.125, 15)
    s6.smoothFreq(666/1.25, 15)
    s7.smoothFreq(666/1.25 - 2, 15)
  }

  CLOSE_AUDIO_CTX = () => {
    document.documentElement.classList.remove('burn')
    s0.smoothGain(0, 4)
    s1.smoothGain(0, 4)
    s2.smoothGain(0, 4)
    s3.smoothGain(0, 4)
    s4.smoothGain(0, 4)
    s5.smoothGain(0, 4)
    s6.smoothGain(0, 4)
    s7.smoothGain(0, 4)
    setTimeout(() => {
      s0.source.stop()
      s1.source.stop()
      s2.source.stop()
      s3.source.stop()
      s4.source.stop()
      s5.source.stop()
      s6.source.stop()
      s7.source.stop()
    }, 16000)
  }
}



function cleanseTone() {
  document.documentElement.classList.add('ritualFade')
  document.documentElement.classList.add('cleanse')
  const s0 = createSource('sine')
  const s1 = createSource('sine')
  const s2 = createSource('sine')
  const s3 = createSource('sine')
  const s4 = createSource('sine')
  const s5 = createSource('sine')
  const s6 = createSource('sine')
  const s7 = createSource('sine')

  // s0.smoothPanner(1)
  s1.smoothPanner(0.5)
  s2.smoothPanner(-0.5)
  // s3.smoothPanner(-1)
  // s4.smoothPanner(1)
  s5.smoothPanner(0.5)
  s6.smoothPanner(-0.5)
  // s7.smoothPanner(1)


  s0.smoothFreq(125)
  s1.smoothFreq(250*1.33333)

  s2.smoothFreq(250*1.66666)
  s3.smoothFreq(500)

  s4.smoothFreq(250-1)
  s5.smoothFreq(250*1.33333 - 2)
  s6.smoothFreq(250*1.66666 - 3)
  s7.smoothFreq(1000)


  s0.smoothGain(MAX_VOLUME, 10)
  s1.smoothGain(MAX_VOLUME, 10)
  s2.smoothGain(MAX_VOLUME, 10)
  s3.smoothGain(MAX_VOLUME, 10)
  s4.smoothGain(MAX_VOLUME, 10)
  s5.smoothGain(MAX_VOLUME, 10)
  s6.smoothGain(MAX_VOLUME, 10)
  s7.smoothGain(MAX_VOLUME/8, 10)

  SHIFT_AUDIO_CTX = () => {
    s0.smoothFreq(1.1* 125, 10)
    s1.smoothFreq(1.1* 250*1.33333, 10)
    s2.smoothFreq(1.1* 250*1.66666, 10)
    s3.smoothFreq(1.1* 500, 10)
    s4.smoothFreq(1.1* 250-1, 10)
    s5.smoothFreq(1.1* 250*1.33333 - 2, 10)
    s6.smoothFreq(1.1* 250*1.66666 - 3, 10)
    s7.smoothFreq(1.1* 1000, 10)
  }

  CLOSE_AUDIO_CTX = () => {
    document.documentElement.classList.remove('cleanse')
    s0.smoothGain(0, 4)
    s1.smoothGain(0, 4)
    s2.smoothGain(0, 4)
    s3.smoothGain(0, 4)
    s4.smoothGain(0, 4)
    s5.smoothGain(0, 4)
    s6.smoothGain(0, 4)
    s7.smoothGain(0, 4)
    setTimeout(() => {
      s0.source.stop()
      s1.source.stop()
      s2.source.stop()
      s3.source.stop()
      s4.source.stop()
      s5.source.stop()
      s6.source.stop()
      s7.source.stop()
    }, 16000)
  }
}


// document.onclick = cleanseTone

function getZodiacSign(timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries'
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus'
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini'
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer'
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo'
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo'
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra'
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio'
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius'
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn'
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius'
  } else {
    return 'Pisces'
  }
}


