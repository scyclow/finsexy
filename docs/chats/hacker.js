

import { isYes, isNo, isGreeting, isMean, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

const fu = (messageCode, waitMs=3000) => ({ messageCode, waitMs })

export const HackerProfile = {
  name: '0x0',
  age: 0,
  distance: 0,
  maxPhotos: 0,
  description: ``,
  gender: '',
  testimonials: [
    {
      name: '0x72f...daF',
      review: `I don't like this dom at all. `
    }
  ]
}


export async function hackerContractInfo(provider) {
  const networkName = (await provider.getNetwork()).name
  const contractAddr = {
    local: '0x9DBb24B10502aD166c198Dbeb5AB54d2d13AfcFd'
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


const HackerMessages = {
  TYPING_SPEED: 1,

  START: {
    responseHandler: `hello`,
    ignoreSend: true,
    ignoreType: true
  },

  async __contract(provider) {
    const [contractAddr, abi] = await hackerContractInfo(provider)

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
    async messageText(ur, ctx, contract, provider) {
      return `
        Send 0.1 in eth to the underneath address (remove***from it):

        ${hackerContractInfo(provider)[0].slice(0, 4)}***${hackerContractInfo(provider)[0].slice(4)}

        You may be thinking why the heck would you do that? Well, prepare yourself simply because I am going to move your world right now. I had a dangerous malware infect your laptop or computer and also record video of YOU (using your cam) when you looked at 'adult' web sites.

        Here's one of your password ${getUserData('password')}

        Still don't believe me? Reply 7 and I will be randomly share your video with 7 people you recognize (Yes, I've access to your address book also).

        Now, what can I want to get this to entire thing go away? Very well, I have already pointed out the particular offer in beginning of the message. Should you not fulfill it within Twenty-four hrs, I'm going to create your life horrible by mailing that video to Everyone you know. Your time frame begins now.
      `
    },
    // followUp: { messageCode: 'hello2', waitMs: 2000 },
  },
}



export const HackerChat = new MessageHandler(HackerProfile.name, HackerMessages)