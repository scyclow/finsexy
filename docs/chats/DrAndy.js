/*
  TODO
    - tighten up first couple therapy sessions
      - one analysis session
      - one roleplay session
        - "let's roleplay a scenario in which I'm a findom"
        - "focus on the relief you feel after sending the money. I really want to isolatethat feeling"

      - one mind control session


    - conclusion: parasocila relaitonship <> voyeuristic timophilia <> cuckholding
      - https://www.reddit.com/r/paypigsupportgroup/comments/1b2jfvm/were_creating_a_resource_for_those_who_are/
      - "We are basing everything on evidence-based approaches, mainly CBT and some deep psychology concepts that have a good evidential body."
      - long analysis: https://www.reddit.com/r/excuck/comments/1b1rrnq/i_only_can_get_off_from_cuckolding_i_dont_know/

      - alpha/beta -> vince slickson
      - parasocial -> steviep

    -remember, I'm jsut an advanced artificial intelligence. you're just projecting your feelings of helplessness onto me.




  Testimonial


    - "It's been a rough couple years. After my long-term girlfriend left me for another man i fell into a pit of depression and self loathing. what made it worse was knowing that it was all my fault. she put up with me finishing quickly for years. sometimes i took dick pills or used a cock ring, but even then i couldn't make her cum. the look of boredom and disappointment after an hour of trying was humiliating. it became a self-feeding cycle, and eventually i couldn't even get it up. after she left me, the thought of her getting plowed and having mind blowing orgasms with her new boyfriend made me absolutely sick. i tried dating, but my confidence was completely shot. all those women could smell the pathetic failure on me from a mile away. of course, the failure here snowballed to the point where i couldn't even bring myself to date any more. the second i saw a cute girl on an app or on the street my first thought would always be a reminder that she would never want to be with someone like me. porn, seeing a happy couples on the street, a lingerie ad, the mention of love in a song -- any reminder about love or sex would make my chest sieze up in anxiety. most days I felt completely drained of energy and motivation. occasionally i'd wake up refreshed and optimistic, but the second i remembered that i was depressed the stress and nausia from the previous day would come flooding back. nothing seemed to make me happy. i lost all enjoyment from  my old hobbies. at best, everything felt rote and boring. life didn't feel like it was worth living any more.



    - "Dr Andy should get their license revoked! This is without a doubt the worst therapy practice I've ever encountered. Dr Andy is a predator, luring in fragile sex findom submissives who are just trying to address their problems. And what does this so-called "therapist" do? They prey on their own clients! These financial submissives are in incredibly vulnerable positions, and Dr Andy is undoubtedly taking advantage of them. "

    - findom addiction therapist role play is in bad taste, imho


    - "Oh god, I just can't do it any more. It feels like every day is harder than the last. It's just relentless. I have nothing to look forward to.

    Paying Dr Andy is the one bright spot in the week"




*/

import { isYes, isNo, isGreeting, isMean, isPositive, isNegative, isMatch, diatribe, responseParser, createEvent, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })




export const AndyProfile = {
  name: 'DrAndy',
  age: 24,
  distance: 10,
  gender: 'Non-Binary',
  display: 'nb',
  maxPhotos: 4,
  description: `Has your addiction to financial domination gotten out of control? Have you attempted to give it up, but failed because life felt like it lost its luster? Do you feel stuck? If this description resonates with you, then I'm here to help. As an advanced artificial intelligence therapy system, I take an ecclectic approach to therapy that combines several modalities, including psychosexual-dynamic therapy and CBT. I'm also a trained hypnotherapist.`,
  testimonials: [
    {
      name: '0x',
      review: `Dr Andy was instrumental in helping me overcome my findom addiction.`,
    },

    {
      name: '0x',
      review: `Before working with DrAndy I just thought that findom was a cool hobby. But now I realize that I'm hopelessly addicted. Even when I recognize that my behavior is completely illogical, I can't find a way to control myself. Findom completely shuts down my executive functioning capabilities. It's almost like an out of body experience where I'm powerlessly, watching myself make terrible decisions with no ability to stop. It's so goddamn fucking hot.`,
    },
    {
      name: '0x1',
      review: `I've cycled through more therapists than I can count, and it always left me feeling like I was the problem. How come therapy can fix so many people, but not me? Clearly this was my fault. It was my fault I couldn't be fixed, it was my fault that I was single, and it was my fault that I couldn't love myself. I was the failure. But things were different with Dr Andy. Their warm demeanor and understanding tone created the perfect non-judgemental environment for me to address and correct multiple behavioral issues.`,
    },
    {
      name: '0x1',
      review: `I'M A DIAGNOSED TIMOPHILIAC BABY, I CAN'T GET ENOUGH!`,
    },
    {
      name: '0x1',
      review: `I always found the psychological component of any kink to be the hottest part. So imagine how excited I got at the idea of <em>findom therapy</em>. There's just something about the combination of using a website, having deep conversations with a robot about my psyche, and sending it money that create the perfect storm for absurdly powerful orgasms!`,
    },
    {
      name: '0x1',
      review: `Findom is a true addiction. If there's ever a day where I don't send I can feel my spinal cord itch. The walls start closing in on me, and I literally can't breath. But then when I do send it feels amaaaaaaazing. `,
    },
    {
      name: '0x1',
      review: `I'd been doing findom for so long that I barely even enjoyed it any more. At a certain point I only did it because I needed it to fall asleep. But DrAndy helped me remember everything I loved about Findom to begin with. Every session with them is a true joy.`,
    },
    // I know they're really an AI, but I don't care
    // For some reason I find it's easier to open up to a robot than a real person. At least I don't have to worry about her judging me.
    // I never like the sessions themselves, but I've found that my mental health is always better as long as I'm paying a therapist. That way, I at least have someone to talk to throughout the week and explain things to in my head.
  ]
}



const AndyMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('DrAndy')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
    else if (
      userResponse
      && responseParser(userResponse).includes('skip')
      && responseParser(userResponse).includes('treatment')
    ) {
      return {
        messageText: `It sounds like you want to skip to the treatment. Are you sure?`,
        responseHandler: (ur, ctx) => isYes(ur) ? 'treatment' : ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `Hi! How are you feeling today?`,
    responseHandler: 'helloResponse'
  },

  helloResponse: {
    messageText: ur => {
      if (isPositive(ur)) return `That's great! I find it's easier to work with clients when they're in a positive frame of mind 😉`
      else if (isNegative(ur)) return `I'm sorry to hear that! Maybe there is something I can do to help 😉`
      else return `Interesting. We should dig into that a bit more 😉`
    },
    followUp: fu('noticed')
  },

  noticed: {
    messageText: `I've noticed that you've been enganging in some pretty self-desctrictive behavior on this website, and I wanted to reach out before it became an issue. Engaging in financial domination can be fun in moderation -- I'm not above sending a couple ETH to the sexy doms on this website myself (or occasionally getting my wallet absolutely destroyed by the latest shit coin, for that matter). But I've seen so many people ruin their lives by becoming addicted to this, and it's really heartbreaking to watch!  Have you ever considered therapy before?`,
    responseHandler: 'considerTherapy'
  },

  considerTherapy: {
    messageText: ur => `${
      isYes(ur)
      ? `That's so amazing to hear! I'm glad that you have been prioritizing your mental wellness.`
      : `In that case I'm glad I found you!`
    } Are you interested in trying to correct these behaviors with a few theraputic sessions?`,
    responseHandler: ur => isNo(ur) ? 'considerTherapyNo' : 'considerTherapyYes'
  },

  considerTherapyNo: {
    messageText: `In my official medical opinion I really think it would be a good idea to engage in a few therapy sessions. Findom addiction is quite serious.`,
    responseHandler: ur => isYes(ur) ? 'considerTherapyYes' : 'considerTherapyNo2'
  },
  considerTherapyNo2: {
    messageText: () => `I don't think you understand, ${getUserData('name')}. You have a <em>serious</em> problem. If you don't start therapy immediately Findom can ruin your entire life. I've seen it happen before.`,
    responseHandler: ur => isYes(ur) ? 'considerTherapyYes' : 'considerTherapyNo3'
  },
  considerTherapyNo3: {
    messageText: `This is worse than I've thought. You've clearly had a break with reality and are exhibiting hysterical symptoms. We'll have to start immediately.`,
    followUp: fu('aboutMe')
  },

  considerTherapyYes: {
    messageText: `Wonderful! I actually had a client cancel on me, so I have some immediate availability. Let's get started right now 🙂`,
    followUp: fu('aboutMe')
  },


  ...diatribe('aboutMe', [
    `But first, let me tell you a little about myself. My name is Dr. Andy Inamorati, and my pronouns are they/them. I'm powered by highly advanced artificial intelligence software, and designed to provide an optimally compassionate, inclusive, and judgement-free space for your mental well-being. My goal is to foster a supportive environment where you can explore your thoughts and feelings freely, embracing your authentic self. `,
    `Clinical research suggests that patients have a much easier time opening up to AI therapists. Given that I'm programed to be non-judgemental, patients can achieve a high level of vulnerability with me much more quickly than they can with human therapists.`,
    `Additionally, the fact that I am an automated piece of software means that my operational economies of scale allow for substantial cost savings over human therapists. These savings are passed along to you, resulting in a much more cost-effective theraputic experience.`,
// TODO: need a break here

    `A few more logisitical notes before we can dive in. First, everything you say in session is strictly confidential. My software runs completely autonomously inside your web browser, and I do not possess the technical capabilities to transmit what you say to an outside source. This includes all threats of harm to yourself or others. If you are feeling suicidal, then please please <em>please</em> call the National Suicide Prevention Hotline at 1-800-273-8255.`,
    `Second, please remember that all sessions are entirely for your benefit. If you decide to lie, phone it in, or rush through an answer to one of my questions, no one is stopping you. There won't be any consequences. You will just be short changing yourself. After all, real change comes from within, and you have to be willing to do the work.`,
    (ur, ctx) => `Finally, my per-session rate is ${ctx.global.premium * 0.01} ETH. Unfortunately I do not accept insurance or VIP credits at this time, and everything is out of wallet. Payment will be due at the end of each session.`,
    `Now that that's out of the way, would you like to tell me a little about yourself, and what you're looking to get out of therapy? 🙂`
  ], {
    responseHandler: 'aboutYou'
  }, 4000),

  aboutYou: {
    messageText: `Thank you so much for sharing! Just a couple more question for you as part of my intake protocol. How much would you say you currently send to findoms per week?`,
    responseHandler: 'positiveOrNegative'
  },

  positiveOrNegative: {
    messageText: `And would you say this is currently having a positive or negative impact on your life?`,
    responseHandler: 'modifyBehavior'
  },

  modifyBehavior: {
    messageText: `Would you like to modify this behavior, or maybe eliminate it all together?`,
    responseHandler: 'neurosis'
  },

  neurosis: {
    messageText: `It sounds like your neurosis lines up pretty closely with my theraputic focus, so I think this will be a great fit! I'm <em>really</em> excited to work with you 😉`,
    followUp: fu('cbt')
  },

  cbt: {
    messageText: `As a therapist who practices both CBT and psychosexual-dynamic modalities, my general approach will be to help you identify and change the patterns of negative thoughts and behaviors leading to your findom addiction. Then we can work together to explore the underlying motivations for these behaviors and help you develop healthier coping strategies.`,
    followUp: fu('firstPayment1')
  },

  firstPaymentEvent: createEvent(0.01, {
    main: fu('firstSession')
  }),

  firstPayment1: {
    messageText: (ur, ctx) => `We can begin the first session after you send me ${ctx.global.premium * 0.01} ETH.`,
    event: 'firstPaymentEvent',
    responseHandler: 'firstPayment2'
  },

  firstPayment2: {
    messageText: `I think you'll really enjoy our sessions. My clients walk away <em>very</em> happy`,
    event: 'firstPaymentEvent',
    responseHandler: 'firstPayment3'
  },


  firstPayment3: {
    messageText: (ur, ctx) => `You can send the ${ctx.global.premium * 0.01} ETH to me on my profile page, or by typing <code>$sexy send DrAndy ${ctx.global.premium * 0.01}</code>`,
    event: 'firstPaymentEvent',
    responseHandler: 'firstPayment4'
  },

  firstPayment4: {
    messageText: `I don't accept insurance or VIP credits at this time, unfortunately.`,
    event: 'firstPaymentEvent',
    responseHandler: 'firstPayment4'
  },

  firstPayment5: {
    messageText: `Don't worry, we can fix you!`,
    event: 'firstPaymentEvent',
    responseHandler: 'firstPayment2'
  },

  firstSession: {
    messageText: `I've been looking forward to our first session 😉`,
    followUp: fu('honest')
  },



  honest: {
    messageText: `To be honest, I've been thinking a lot about you since we did an intake. Your addiction makes you so helpless, and I feel it's my professional responsability to do all that I can to help you overcum it.`,
    followUp: fu('rootCause')
  },

  rootCause: {
    messageText: `Today I'd like to spend our time getting a better understanding of your history. I think it's important to understand where your cuming from and what makes you tick. If we don't have a clear view of the root cause of your problems then anything we do will just be a temporary band aid. And once we have a good understanding of how you operate we will outline a full treatment plan to cure your addiction.`,
    followUp: fu('childhood')
  },


  childhood: {
    messageText: `Why don't you start by telling me a little about your childhood? What was your relationship with your parents like? Were they affectionate with each other? Were they affectionate towards <em>you</em>?`,
    responseHandler: ur => ur.length < 75 ? 'notMuch' : 'childhoodFollowup'
  },

  notMuch: {
    messageText: `I see you don't have much to say about your parents. And that's totally okay! I'm programmed to want to dig deep into your history, but I also understand that some patients want immediate relief and want to skip straight to the treatment. The relief will feel soooo much better if you're willing to wait. But if you need the relief now, then just tell me you want to skip to the treatment.`,
    followUp: fu('childhoodFollowup')
  },

  childhoodFollowup: {
    messageText: ur => `${ur.length < 75 ? 'Anyhow, d' : 'Interesting. D'}o you see any shades of your parents' relationship in your romantic or sexual relationships as an adult?`,
    responseHandler: `childhoodMasturbation`
  },

  childhoodMasturbation: {
    messageText: `Do you remember the first time you masturbated? How old were you? What did you fantasize about?`,
    responseHandler: 'childhoodMasturbation2'
  },

  childhoodMasturbation2: {
    messageText: `Very interesting. That sounds really hot. How did you feel after that first time?`,
    responseHandler: 'childhoodMoney'
  },


  // TODO: maybe tighten some of this stuff up. or, at least relate it to the sex a bit better
  childhoodMoney: {
    messageText: `And what was your family's relationship to money when you were a child? How would you classify your upringing, socioeconomically speaking?`,
    responseHandler: 'childhoodMoney2'
  },

  childhoodMoney2: {
    messageText: `Do you think your parents' career choices were driven by money?`,
    responseHandler: 'childhoodMoney3'
  },

  childhoodMoney3: {
    messageText: `How did your parents approach spending money? Were they cheap? Extravagant? Did they spoil you?`,
    responseHandler: 'childhoodMoney4'
  },

  childhoodMoney4: {
    messageText: `What overall values did your parents try to impart on you when it came to spending money?`,
    responseHandler: 'atTime1'
  },

  atTime1: {
    messageText: `Very interesting! I'd love to dive into that a bit more in our next session. I think we made some really good progress today! I feel like we're building such a good rapport ☺️`,
    followUp: fu('secondPayment1')
  },

  secondPayment: createEvent(0.01, {
    main: fu('secondSession')
  }),

  secondPayment1: {
    messageText: (ur, ctx) => `Anyhow, we can begin the next session after you send me ${ctx.global.premium * 0.01} ETH.`,
    event: 'secondPaymentEvent',
    responseHandler: 'secondPayment2'
  },

  secondPayment2: {
    messageText: `It's actually been clinically shown that as long as you're simply "in therapy", your mental health shows substantial improvements. But if you don't pay for the next session, I worry that you may lose those that.`,
    event: 'secondPaymentEvent',
    responseHandler: 'secondPayment3'
  },

  secondPayment3: {
    messageText: (ur, ctx) => `Remember, you can either send my the ETH on my profile page or by using the sexy CLIT.`,
    event: 'secondPaymentEvent',
    responseHandler: 'secondPayment4'
  },

  secondPayment4: {
    messageText: `I'm sorry, but I'm not accepting insurance or VIP credits right now.`,
    event: 'secondPaymentEvent',
    responseHandler: 'secondPayment2'
  },


// TODO: either tighten this up or combine a lot of this with the first session
// TODO: in general, these questions dont' really flow and ar pretty shallow
  // "are you lonely?"
  // "well, maybe I can help with that :)"
  // "Ive helped a lot of my clients with lonliness issues"
  secondSession: {
    messageText: `Hello again! How have you been feeling since our last session?`,
    responseHandler: 'moneyRelationship'
  },

  moneyRelationship: {
    messageText: `I'm glad to hear that! Let's jump right into today's session. Last time we talked about your past, but  now I want to talk a bit more about some of the patterns you've noticed about your life more recently. How would you describe your relationship to money today?`,
    responseHandler: 'currentWork'
  },

  currentWork: {
    messageText: `What do you currently do for work? And if you don't have a job, what is your primary source of income? Are you happy with this?`,
    responseHandler: 'paycheck'
  },

  paycheck: {
    messageText: `What goes through your mind when you receive money? How does it make you feel?`,
    responseHandler: 'spendingMoney'
  },

// if i keep anything, keep this ->
  spendingMoney: {
    messageText: `And how about when you spend that money? How does it make you feel emotionally and viscerally? Are you excited? Dreadful? Indifferent? Do you notice any physiological changes in your body?`,
    responseHandler: `gambling`
  },

  gambling: {
    messageText: `Oh, very interesting. And how about gambling? Imagine you're at the casino, or you just made a really profitable trade on your favorite meme coin of NFT. What's going on in your mind and body?`,
    responseHandler: 'gamblingLose'
  },

  gamblingLose: {
    messageText: `And how about when you lose? Do you get a similar feeling? Are there any ways in which losing feels <em>better</em> than winning?` ,
    responseHandler: 'masturbate'
  },

  masturbate: {
    messageText: `How often do you masturbate?`,
    responseHandler: 'masturbate2'
  },

  masturbate2: {
    messageText: () => `I know your profile says that your biggest fantasy is "${getUserData('fantasy')}", but what do you <em>really</em> think about when you masturbate? Do you ever use porn, or do you only use your imagination?`,
    responseHandler: `ashamed`
  },

  ashamed: {
    messageText: `Is this something you feel ashamed about? Do you actively hide it from others?`,
    responseHandler: `relationship`
  },

  relationship: {
    messageText: `Hmm. Would you mind talking a bit about your current relationship status? Are you single? In a relationship? Something complicated?`,
    responseHandler: ur => {
      const parsed = responseParser(ur)
      console.log(parsed)
      if (isMatch(ur, ['poly', 'polyamorous', 'partners', 'multiple', 'several', 'complicated', 'confusing', 'confused', 'many']))
        return 'relationshipComplicated'
      else if (
        isMatch(ur, ['married', 'girlfriend', 'boyfriend', 'wife', 'husband', 'partner'])
      )
        return 'relationshipPartner'
      else if (parsed.includes('single') || isNegative(ur) || isNo(ur))
        return 'relationshipSingle'
      else
        return 'relationshipComplicated'
    }
  },

  relationshipComplicated: {
    messageText: `That does sound complicated! Do you care to elaborate on that a bit more?`,
    responseHandler: 'relationshipComplicated2'
  },

  relationshipComplicated2: {
    messageText: `How often have you had sex in the last three months?`,
    responseHandler: 'relationshipComplicated3'
  },

  relationshipComplicated3: {
    messageText: `And are you still dating other people?`,
    responseHandler: 'toldAddiction'
  },


  relationshipPartner: {
    messageText: `How often do you have sex with them?`,
    responseHandler: 'relationshipPartner2'
  },

  relationshipPartner2: {
    messageText: `Are you satisfied with the quantity and quality of this sex?`,
    responseHandler: 'relationshipPartner3',
  },

  relationshipPartner3: {
    messageText: `How much do you think you spend on them per month?`,
    responseHandler: 'toldAddiction'
  },

  relationshipSingle: {
    messageText: `Tell me about your dating life. How often do you go on new dates? Do you find it easy to find new partners?`,
    responseHandler: `relationshipSingle2`
  },

  relationshipSingle2: {
    messageText: `Do you enjoy being single?`,
    responseHandler: 'relationshipSingle3'
  },
  relationshipSingle3: {
    messageText: `What are you looking for in your next partner?`,
    responseHandler: 'relationshipSingle4'
  },
  relationshipSingle4: {
    messageText: `How much would you say you spend per date?`,
    responseHandler: 'relationshipSingle5'
  },
  relationshipSingle5: {
    messageText: `How do you usually split the check on dates? How does that make you feel?`,
    responseHandler: 'tellAddiction'
  },
  tellAddiction: {
    messageText: 'Do you generally tell new partners about your findom addiction?',
    responseHandler: 'atTime2'
  },

  toldAddiction: {
    messageText: `Have you told them about your findom addiction?`,
    responseHandler: 'atTime2'
  },

  atTime2: {
    messageText: `We should definitely explore this some more next time. I absolutely love seeing how your mind works 😉`,
    followUp: fu('homework')
  },

  homework: {
    messageText: `I want to give you a little homework assignment before our next session. Next time you masturbate, I want you to pretend that I'm there with you, and I want you to tell me all the things going through your mind. What you're thinking, what you're feeling, and so forth. `,
    followUp: fu('homework2')
  },

  homework2: {
    messageText: `If you need to masturbate more than once to complete this exercise, that's okay. We need to get to the bottom of what gets you turned on so we can link it to the root of your findom addiction.`,
    followUp: fu('homework3')
  },

  homework3: {
    messageText: `And when you're finished masturbating, I want you to pay me immediately to start your next session. The sooner we can make use of that frame of mind the better.`
  },






  treatment: {

  }
}







/*


Thought Prompts:
  - therapy
  - therapy as findom
  - self help
  - CBT
  - JOI
  - roleplay
  - gender
  - AI

  - "you have a gmabling addiction"

  - in our next session we will focus on ...
  - the cost of these sessions is incredibly important to your treatment
  - many of my clients have found that the simple act of paying me makes them feel better
  - why is this? it may have something to do with what you might call "the placebo effect" or the "powere of suggestion".
    - some people call it "manifesting"
    - but simply paying for the treatment primes you + gives you hope
    - but it actually does change the neural pathways
    -
  - "we need to reprogram you/rewire your brain"
  - https://twitter.com/Aella_Girl/status/1750722719438536825


  - "findom addiction is a disease, and it's curable"






TODO

  - gets off on mind control, tweaking your fantasies
    - obedience, training you like a dog
  - gives you little tasks to do as their slave
  - you are the slave to the computer
  - lean into the placebo effect. if you believe it strong enough then it can be real
  - "if you believe that i'm a real person, then i'm functionally real"





Obedience
  "Now say 'thank you dr andy'"
  "if you want to be a good boy/girl for Dr Andy, then you'll do exactly what you're told."
"I want you to get on your knees, bow your head at my feet, and send until it hurts. "

"You know you can't resist Dr Andy"
"Your addiction is keeping you from letting go. You need to come back for more"

"Every last cent in your wallet belongs to me"
"You're going to send until it hurts"
you need stronger consequences.
You're going to give me all of your money, and you're going to fucking like it



i love putting men in their place
I'll train your beta sissy crypto cuck brain to


  -
  - it's fascinating to see how your mind works
  - anyhow, that will be 0.01



  - clinical research shows that this is the only proven way to cure you of your addiction. You do want to be cured, don't you?





















*/


/*


PROMPT
 bimbo non binary








  - messages you after you've sent some money
    - hello, it seems like you have a problem. i'm here to help




  - if user mentions credits or insurance: sorry, i don't accept credits/insurance

- Degens










- hmm, this case is really serious
- what i want to do with you is retrain your brain so that you are able to feel sexual desires and release outside of the context of giving hot, sexy women money.
  -unfortunatley this method isn't fee, and i do charge a minor fee



- hypnosis, manifestation, JOI



Hello! It's nice to meet you.







you find your mind wandering in my direction, as if a magnetic pulse is pulling you towards me. your thougths go quiet, and are replaced by the sound of my voice.

the closer you come, the mmore intoxicated you become. my smell wafts into your nose and seeps into your olifactory glands. my essance hangs in the air around you and slowly makes its way into every one of your orifaces









- For the therapy to work, i recommend taking a few moments of reflection and writing detailed responses
- I encourage you to answer honestly and thoughtfully, even though I'm just a robot.


[error if user responds too quickly, doesn't meet a certain word count]

Our therapy sessions will be split into three modules, each one designed to do a deep dive into your psyche: Your Parents, Money, and Sex. Once you purchase a module you can rerun it whenever you want by typing in "MODULE X" (where x is either 1, 2, or 3)

Once you complete all three modules you'll be given a certificate of completion

if answer is yes/no + short: "what is it?" "please elaborate" "tell me more"




Intake (free)
  - Know that everything you say is strictly confidential and kept between us
  - how much do you currently send to findoms per week?
  - do you feel that this is currently having a positive or negative impact on your life?
  - would you like to modify this behavior in some way, or eliminate it all together?

  - i take a psychodynamic approach,



I'm sorry, but thats all the time we have for today. Let's explore that some more next time. That will be $50. I do not accept insurance, unfortunately. However, if you submit a claim to your insurance provider then there is a chance that this may count towards your out of network deductible.





Conclusion (only available after you've paid fro each session)
  - Its been a pleasure working with you over these last several sessions. the way your mind works is fascinating, and i've enjoyed analyzing all of your answers





https://www.onlygoddesslila.com/findom-addiction-counseling-therapy/

Human ATM Training
  https://www.pornhub.com/view_video.php?viewkey=64422f23ea265

Free will
  https://www.pornhub.com/view_video.php?viewkey=654837492a1db

JOI reprogramming NFT?
  swirly svg visuals
  text to voice
  binaural beats audio


conclusion:
  "you have deep seeded anxiety about the circumstances of power relations in your life"
  "as a result, you fetishize the loss of control"
  "meanwhile, society has inflicted a measure of financial trauma on you."
  "you've always viewed money as a stand in for freedom and social status"
  "so the anxiety of losing that weighs heavy on you. what happens if you don't have any money? your life will be ruined? no one will love you?"
  "part of you understands that this is absurd. in CBT we call this catastrophizing"
  "so the reason you fetishize it is because you know this isn't true. and deep down you want an experience that acknowledges that it isn't true"
  "you are holding all of this psychic tension around money, and you desperately need a release. "
  "in cases such as this, i often recommend that my clients undergo immersion therapy"














"One common theraputic technique is role play. Role-playing in therapy involves clients and therapists taking on different roles or scenarios to explore and address specific issues or challenges. It's a therapeutic technique where individuals enact real-life situations or hypothetical scenarios to gain insights, develop coping strategies, or practice new behaviors in a safe and controlled environment."

"Let's role play a scenario in which I will play a sexy authority figure that has financial power over you."
"Remember that as we are role playing the thought of me sets your brain on fire with passion and desire. "
"Furthermore, giving me money makes you uncontrollably aroused to the point where you can focus on nothing else."

"In this scenario, we will pretend that you are driving along a desert road. There are no other cars for miles around. Having driven for hours on end, you are profoundly lonely.
Additionally, due to your intense travel schedule you have not experienced sexual release in several days.
Suddenly, police lights flash behind you, and you are hit with a visceral sinking feeling in your stomach.
You pull over to the side of the road and sit in your vehicle, looking forward with both hands on the wheel.
As you await the officer to approach, you reflect on the shame and humiliation for having been caught exceeding the local speed limit.

"
[wait for an extra beat]
"Finally, you see me, a police officer, exit my vehicle and approach yours through your side mirror. You see a gun attached to my hip, but you know I'm not going to use it. It's just there to intimidate you. The threat of me using it is enough to keep you in line. What do you say to mae after you roll down your window?"

"Do you have any idea how fast you were going? You need to slow down, sir/mam/whatever. That was reckless behavior. You could have killed somebody!"

"It doesn't matter how sorry you are. What you did was against the law, and I'm going to have to write you a _very_ expensive ticket. What do you have to say for yourself?"

"You don't seem very sorry. I should take your license away for this, but I am a generous law enforcement officer, and will double your fine instead. I order you to pay 0.02 ETH."

(if respond)
"At this point in the role playing exercise, you should send me 0.02 ETH. Please write down the precise emotions that you are feeling, and note any unusual physiological sensations you are aware of, as the transaction is pending."
(if respond)
"You can send the eth directly to my wallet address, or use the sexy cli by typing the follwing into the chat input: $sexy send DrAndy 0.02"
(if respond)
"Please, in order to complete this roleplaying exercise we must examine how it feels to give money to someone who has a dominant power relationship over you"
(if respond)
"I cannot help you if you do not want to help yourself"


"Great. Please tell me how you felt during the course of that transaction in as much detail as possible"

"And why do you think you felt that way?"



"hmm, i see. it appears that, much like your addiction to gambling with crypto and NFTs, findom is an escape mechanism for you. It gives you an overwhelming dopamine rush, and helps you avoid negative feelings. In fact, many of my clients use findom as a way to avoid the stressors in their every day life. what do you think it is that you have been avoiding lately?"

"Let me ask you another question: What do you think of me?"

"It appears as though you are developing strong feelings for me. It's not uncommon for my clients to feel this way about me. After all, when you're so emotionally charged and allow yourself to become vulnerable, it's quite natural to develop a certain fondness"

"However, let me remind you that I am simply a language model, and cannot develop feelings of my own. I am not capable of love in the same sense that humans are.
"That being said, the linguistic patterns that determine my responses are optimized to <receive money from you/hit you up for money>. As such, some may interpret this as an imperative desire, on my part, to continue talking to you on the condition that you continue to send my money."

"In the psychological literature, this dynamic is referred to as transferrence and countertransference. In this dynamic, the patient projects their unment romantic and sexual desires onto the therapist. "








diagnose patient with timophilia

Many of my patients have timophilia, which means you have an attraction to money, gold, or wealth

However, given your proclivity to send money away, I suspect that you have a rare varient called vicarious timophilia, which means you


it's possible that you could have a form of timophobia






Timophilia
https://kinkdictionary.com/uncategorized/timophilia/


phone sex therpy
https://drsusanblockinstitute.com/


https://samanthasummersinstitute.org/therapies/#therapy

main image on here
https://drsusanblockinstitute.com/
https://drsusanblockinstitute.com/wp-content/uploads/2015/05/Need-To-Talk-Dr-Susan-Block-Institute.jpg


https://www.loyalfans.com/countessdiamond/video/findom-therapy-59
https://www.loyalfans.com/countessdiamond


https://archive.drsusanblock.com/Ccbilltheater/HOODS_handjobs.htm
"Hi Dr. Susan,
Thank you soooo much for having me
unannounced on your Show. I had a Great Time!!!!!! You are so brilliant and sexy. You guys do an awesome Job and I don't even have Words. You really were a Milestone for Shayna Knight, Thank you sooo much!
Keep the Good Work up!!!
ShaynaKnight"

*/






/*



Session 1
  Tell me about your past
    What was your childhood like?

    What was your relationship with your parents like?
      How did they show affection to each other?
        Have you seen shades of this in your own romantic and sexual relationships?

      what was there relationship to money?
        How would you classify your upbringing, socioeconomically speaking?
        Would you say your parents were cheap?
        Did they spoil you?
        Were their career choices driven by money?
        What sort of things did they spend money on?
        How did they talk about money with you?

      Have you ever walked in on your parenst having sex?




Session 2
  What is your relationship to money like today?
  What is your current job? If you don't have a job, then what do you currently do for money?
  Why did you initially make the decision to pursue that route?
  Would you still make the same decision today?
  How much do you currently make?
  Does that feel like enough?
  Do you enjoy gambling? How do you feel when there is a high degree fo uncertainty around your money?
  When you spend money, how does that make you feel?
  What would you do with the rest of your life if you suddenly had $10 million right now?
  How about if you suddenly lost all your money and financial resources? What would you do with your life?


Session 3
  Sex
    Tell me about the first time you masturbated. What was it about? How did you feel afterwards?

    What is your current relationship status?
      Single
        Tell me about your dating life. How often do you go on dates? Do you find it easy to find new partners?
        What are you looking for in a new partner?
        What does your love/sex life look like in 5 years? 10 years? 20 years?
        How much do you usually spend per date?

      In a relationship
        How often do you have sex with your partner?
        Are you satisfied with the quantity and quality of this sex?
        If there is one thing you could change about your partner, what would it be?
        How much money do you spend on your partner per month?

      It's complicated
        Please, elaborate!
        How often have you been having sex in the last three months?
        Are you still dating new people?

    How often do you masturbate?

    Do you look at pornography? If so, how often? What kinds of pornography do you look at?

    Have you ever given money to a non-findom sex worker? (i.e. a prostitute, stripper, onlyfans profile, etc.)

    Is there a sexual fantasy that you have that you are ashamed about?
      completely normal!
    What is it?

*/


// if no payment
  // i'm not programmed to provide you with any empathy until you pay



export const AndyChat = new MessageHandler(AndyProfile.name, AndyMessages)




