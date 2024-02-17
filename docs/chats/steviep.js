/*
TODO
  - figure out general dynamic
  - maybe incorporate stake/unstake challenge here
*/





import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const StevieProfile = {
  name: 'steviep',
  age: 34,
  distance: 0,
  gender: 'Male',
  display: 'm',
  maxPhotos: 4,
  description: ``,
  testimonials: [
    {
      name: '0x',
      review: `Stevie P is my favorite artist of all time. I'm so glad that I have the opportunity to be a patron of his brilliant artwork!`,
    },
    {
      name: '0x1',
      review: `I was SO happy when steviep launched a findom project. He is, without a doubt, the HOTTEST artist in the NFT space. I couldn't wait to give him my money!`,
    },
    {
      name: '0x2',
      review: `I'll do anything stevie p says, and buy anything stevie p makes. I'll even pay him money in exchange for less money. `,
    },
    {
      name: '0x3',
      review: `I've been writing erotica about stevie for years. I'm thrilled that I can finally act out on those fantasies where he takes all of my money`
    },
    {
      name: '0x4',
      review: `What a hunk 😍`,
    },
    {
      name: '0x5',
      review: `I've always gottens uch a rush from clicking the mint button on his drops. I'm jsut glad that now I can get that same rush from sending him money whenever I want!`,
    },
    {
      name: '0x6',
      review: `I don't know how he does it, but every time I send my orgasm is so powerful it disrupts my entire visual field! `,
    },

    // I give to steviep to participate in his art. I do it for its own sake.
  ]
}




async function sendEvent1(ctx, contract, provider) {
  const addr = await provider.isConnected()

  ctx.state.rounds = ctx.state.rounds || 0

  if (contract && addr) {
    const t = bnToN(await contract.tributes(addr))

    if (t > 0 && t / 2 > ctx.state.rounds) return { messageCode: '', waitMs: 3000 }
  }

}


const StevieMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    return await provider.domContract('steviep')

  },

  __precheck(userResponse, ctx, contract, provider, isFollowup) {
    // TODO: if includes word 'error'
      // oof, i dunno. maybe let's troubleshoot that error on discord or twitter instead. anyhow, where were we?
    if (userResponse && isMean(userResponse)) {
      return {
        messageText: ``,
        responseHandler: (ur, ctx) => ctx.lastDomCodeSent
      }
    }
  },

  hello: {
    messageText: `hey, what's up?`,
    // followUp: { messageCode: 'hello2', waitMs: 2000 },
  },



  // what do you think of the website?
  // yeah, it's pretty great, isn't it?
    // some of my best work, if i do say so myself
    // you know, i built this whole thing from scratch
    // no frameworks or libraries. just raw html, css, and javascript
    // well, i used ethers.js to interface with the blockchain, but that's the one exception
    // totally worth it
    // all the engineering, the writing, the meticulous UI design
    // choosing colors, adjusting spacing, tweaking animation speeds
    // a lot of work went into this
    // all so you could have a good <em>experience</em>
    // don't get me wrong, it's my life's passion
    // but there's an opportunity cost to spending my life doing these projects
    // making stupid NFTs and websites for your amusement
    // i could be






  // so how about you fucking pay me?
    // you're really just short changing yourself if you don't
    // I don't think it's possible to get the full experience of this website without sending me money
    //
    // one of the main themes of this website is that spending money can be an aesthetic experience
    // so don't you want to have an aesthetic experience, ${getUserData('name')}?



  // I'll tell you what
    // send me 0.01 ETH and I'll tell you a secret
}

/*


That's right, you're in the palm of my hand
I'm controlling your entire aesthetic experience
Give me your unconditional support
If you really appreciated my art you'd fucking pay me
Isn't experiencing my art good enough?
Why should i subject my art to being a casino chip that you can gamble on?


I feel like there are two ways to make a living as an artist on the internet. You can either be a dom or a sub. A lot of artists are subs. they're like cam girls who are dancing for the amusement of the viewer. They're just looking for sugar daddies. In a lot of ways they're also like strippers, dancing and trying to collect as much monetary ejaculation as they can.




where their monetary ejaculate is thrown my way. strip clubs are funny because people will show how they're feeling by throwing a wad of money at someone. people express themselves with money. and it's funny how throwing that wad of money constitutes a taxable event. that's a transaction.



hey, look
i'm just trying to create the sexiest possible experience here




[try to capture the simultaneous self-agrandizement and utter disdain for those who like my work]

general threat that i won't be your friend if you don't pay me money
guilt user into paying me money
parasocial relationship

"What do you think?........ I don't actually care what you think." (disregards statement and keeps going)



Hey there, how do you like the website so far?


Glad to hear it. it is pretty great, isn't it?


(if not much eth has been given)
  you know, you should really send some (more) ETH to the doms
(if sent a lot of eth)
  I'm glad to see that you're sending to the doms

after all, websites like this take a lot of time to build
you'd probably be surprised with how much time and effort goes into something like this
and not just anyone can do this sort of thing effectively
in fact, i'd say most people -- most artists, even -- don't have the ability to create an immersive web/crypto experience that's so far outside the box

these are the sorts of legacy-defining projects that differentiate internationally famous artists, such as myself, from the schlubus
and likewise, this is what separates patrons like you -- who clearly have taste -- from the cultureless swine on crypto twitter


I know what you're thinking though: you resonate with the piece, but you're hesitant to put some moeny down because there's nothing in it for you?
you think there's not much for you to buy and easily speculate on.
and yeah, that's true. but you're also smart enough to realize that there's more to life than making money
what do you plan to _do_ with all the money? you ultimately want to spend it on enriching your life, right? defining a legacy for yourself?


you understand that in 100 years, when the all aspects of culture and commerce are mediated by the blockchain, scholars will look back on this period

and you know what they'll see, right? that <ens/address> interacted with this era-defining project and contributed to it financially
they'll see that you -- someone who otherwise would never have the creative ability to produce such work themselves -- _enabled_ the work to exist by contributing financially
and, of course, they'll also infer that we hung out on the internet. they'll see that you, in some small way, influenced the art.
they'll see that we were friend... and maybe even something more, if you know what i mean 😉




That's great because I put a lot of work into it.



Oh, you want a VIP membership? I don't think so. Those are reserved for

I could give you an NFT, but I dunno. These NFTs are reserved for _real_ collectors of my work.

Okay, I'll tell you what. If you send me







Here's what we're gonna do


I have a contract deployed at 0x...., where you're going to stake 1 ETH.
You can unstake this whenever
But here's the catch: This contract will let me drain its balance whenever i want.
If you leave it staked for at least 1 hour, I'll give you an NFT. But if you're a little bitch and unstake it before the hour's up, you get nothing.

Oh yeah, also I can also sell this drainer role to whoever i want.







"I dunno, I'll be honest with you. I'm a bit conflicted about sending you an NFT. "
"it kind of feels like it goes against the spirit of this project, you know what i mean?"
"finsubs get off on sending their doms money"
"collectors get off on supporting artists"
"and hell, patreon's entire business model is based around unconditionally giving money to content creators"
"why should i give you some fucking token that you can use as a speculative vehicle?"
"isn't just giving me the money enough?"
"I've sold people negative amounts of money, sold 10 ETH for 11.1111 ETh, and sold $0.00 for $213"
"I truly can't explain all of that other than by saying that NFT collectors are pay pigs"
"they have to get some satisfaction out of paying me money. "
"either because it's supporting me, or because it lets them participate in the spectacle of the project -- they understand that they're part of the art, and the more money they throw downt he drain the better the art is."
"they can't possibly think that this is a wise investment."
"well, i'm sure some idiots do. who knows."
"anyhow, my point is: why not just take the meaningless token out fo the equation?"

"you know what? i don't think i'm going to send you an NFT"
"supporting my art practice should be enough for you"
"what right do you have to turn my work into a casino chip?"
"I dont care if you don't make your money back"
"If you can't afford to give me your money with no strings attached, then you shouldn't even be playing around with NFTs. go spend your money on something else"
"I'm under no obligation to give you a goddamn thing."
"no, I won't give you an NFT."
"that is, not unless you beg for one..."

"say 'please'"

"'please stevie, give me an NFT to help fill the void of my meaningless existence'"

"yeah, you like begging, don't you?"



if ask for SSN
  lol, i'm not giving you my ssn.





making art is too much of a fucking pain in the ass. it's way easier to conStevie idiots like you to just give me money.

why bother grinding out these stupid generative art projects?
busting my ass to make sure that every output looks great
who fucking cares?




I'll tell you what.
I'm too lazy to build this into the UI, so you'll have to do this all directly from etherscan




I'll let you on on a little secret
Don't tell anyone though
Top secret info
But first, you gotta pay up.
You don't think I'd tell you for free, did you?



Okay
Here's the secret:
The sexy doms on this website...
None of them are actually horny for you.
But don't take it personally.
None of them actually have the capacity of horniness.
The doms you've been talking to are really the result of cutting edge, highly sophisticated artificial intelligence.
Not just Dr Andy. <em>All</em> of them.
You must feel pretty fucking stupid
The wool has been pulled over your eyes this entire time.
You've been living in a den of lies
You've been walking through a hall of mirrors

But I'll tell you another secret:
I've been watching you this entire time, sending money to my creations
And it's abolutely thrilling.
You can't imagine the rush I feel.
Not just from creating an experience so immersive that you've completely lost sight of reality
And not just from taking your money
But from doing both simulteneously.


But don't worry about it. It's no big deal.
It's not like this is the only time the wool's been pulled over your eyes.
Who cares if the doms aren't real?
Think of all the parasocial relationships you have with "real" people
celebrities, podcasters, social media influencers
those aren't real relationships. They're all parasocial.
From where you're standing they might as well not be real.








Do you really think that hot, sexy humans would want to talk to you?
Fuck no.
You're a goddamn loser.
Do you know how hard it would be to get an attractive (man/woman) to talk to you?
I know you're sexless loser

I have you wrapped around my finger.





In fact, none of them have the capacity for horniness
They're just putting on a show for your benefit
Trying to extract as much money out of you as possible





CHALLENGE:
  - some cheap NFT to mint with arbitrary stupid features
  - you need to collect a "full set" of findom tribute tokens to get some other stupid shit
  - riff on $GOO, or some stupid staking/erc20 metchanism





*/
export const StevieChat = new MessageHandler(StevieProfile.name, StevieMessages)



