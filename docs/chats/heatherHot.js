
import { isYes, isNo, isGreeting, MessageHandler } from '../state/conversationRunner.js'
import {getUserData, genderSwitch , interestedSwitch} from '../state/profile.js'

/*

TODO
  - is confused on asl, only ask for age
  - only ask asl if user hasn't filled out profile; point out how much easier it would be if they fill out the profile
  - ask for sexy chat credits; say that a lot of the doms take them


*/




const HeatherHotMessages = {
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
    messageText: () => 'hi',
    responseHandler: (userResponse) => {
      if (!isGreeting(userResponse)) return 'funnyGreeting'
      else return 'howAreYou'
    }
  },

  hiHowAreYou: {
    messageText: (userResponse, ctx) => 'hi How are you today??',
    responseHandler: (userResponse, ctx) => {
      return 'intro'
    }
  },


  funnyGreeting: {
    messageText: () => `that's a funny way to greet someone`,
    followUp: { messageCode: 'howAreYou', waitMs: 2000 },
    responseHandler: () => {}
  },



  howAreYou: {
    messageText: (userResponse, ctx) => 'How are you today?',
    responseHandler: (userResponse, ctx) => {
      return 'intro'
    }
  },



  intro: {
    messageText: (userResponse, ctx) => `my real name is Amanda, I'm 21/f and pretty bored searching for some1 2 talk too...`,
    followUp: { messageCode: 'intro2', waitMs: 2000 },
    responseHandler: (userResponse, ctx) => {
      // ctx.state.error = 'howareyou error'
      // return 'error'
    }
  },

  intro2: {
    messageText: (userResponse, ctx) => `I love chatting with horny people.. Would you like to have a conversation today?`,
    responseHandler: (userResponse, ctx) => {
      if (isYes(userResponse)) {
        return 'introAccepted'

      } else if (isNo(userResponse)) {
        return 'introRejected'

      } else {
        return 'introConfused'

      }
    }
  },

  introRejected: {
    messageText: (userResponse, ctx) => `are you sure?`,
    responseHandler: (userResponse, ctx) => {
      if (isYes(userResponse)) {
        return 'finalRejection'

      } else {
        return 'introConfused'

      }
    }
  },

  introConfused: {
    messageText: (userResponse, ctx) => `im confused? Do you want to have a conversation or not??`,
    responseHandler: (userResponse, ctx) => {
      if (isYes(userResponse)) {
        return 'introAccepted'

      } else if (isNo(userResponse)) {
        return 'finalRejection'

      } else {
        return 'introConfused'

      }
    }
  },

  finalRejection: {
    messageText: (userResponse, ctx) => `okay...`,
    responseHandler: (userResponse, ctx) => 'hi'
  },

  introAccepted: {
    messageText: (userResponse, ctx) => `a/s/l?`,
    responseHandler: (userResponse, ctx) => {
      const match = userResponse.match(/(\d+)/)

      if (match) {
        const [_age] = match
        const age = Number(_age)
        if (!age) return 'aslConfused'

        if (age < 18) {
          return 'introTooYoung'
        } else if (age < 25) {
          return 'introYoung'

        } else if (age < 41) {
          return 'introJustRight'

        } else {
          return 'introOld'
        }
      } else  {
        return 'aslConfused'
      }
    },
  },

  aslConfused: {
    messageText: (userResponse, ctx) => `i don't understand`,
    responseHandler: (userResponse, ctx) => {
      const match = userResponse.match(/(\d+)/)

      if (match) {
        const [_age] = match
        const age = Number(_age)
        if (!age) return 'aslConfused'

        if (age < 18) {
          return 'introTooYoung'
        } else if (age < 25) {
          return 'introYoung'

        } else if (age < 41) {
          return 'introJustRight'

        } else {
          return 'introOld'
        }
      } else  {
        return 'aslConfused'
      }
    },
  },


  introTooYoung: {
    messageText: () => `u r too young to be on this web site. you should go to a kid-friendly website`,
    responseHandler: () => `finalRejection`
  },

  introYoung: {
    messageText: (userResponse, ctx) => `wow, you're are a young ${genderSwitch({
      m: 'boy',
      f: 'girl',
      nb: 'baby'
    })}!`,
    followUp: { messageCode: 'fromNY', waitMs: 2000 },
    responseHandler: () => {}
  },

  introJustRight: {
    messageText: () => `perfect, that's my favorite age!`,
    followUp: { messageCode: 'fromNY', waitMs: 2000 },
    responseHandler: () => {}
  },

  introOld: {
    messageText: () => `ok gramps. lol jk`,
    followUp: { messageCode: 'fromNY', waitMs: 2000 },
    responseHandler: () => {}
  },


  fromNY: {
    messageText: () => `Im frm new york, Please answer my next  quest?`,
    responseHandler: (response) => {
      if (isNo(response)) {
        return 'finalRejection'
      }
      return `feetPitch`
    }
  },

  feetPitch: {
    messageText: () => `Do you like big booty women with raw feet? LMAO but for real cuz thats what i am/have..`,
    responseHandler: (response) => `error`
  },




  error: {
    messageText: (userResponse, ctx) => 'ERROR: ' + ctx.state.error,
    responseHandler: (userResponse, ctx) => {

    }
  }
}



export const HHChat = new MessageHandler('heatherHot', HeatherHotMessages, 'START')


// const hhChatWindow = $.id('heatherHot-chat')
// HHChat.addChatWindow(hhChatWindow)


if (!HHChat.ctx.history.length && !HHChat.ctx.eventQueue.length) {
  HHChat.next('', 'hi')
}



