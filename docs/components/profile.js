import {createComponent} from '../$.js'
import {MessageHandler, ProfileStats, defaultProfileLS} from '../state/all.js'
import {provider} from '../eth.js'

import {chat} from './svg.js'


createComponent(
  'sexy-profile',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
      }


      connect-wallet:not(:defined) {
        opacity: 0;
        transition: opacity 0.3s;
      }

      article {
        padding: 1em;
        margin: auto;
        max-width: 1000px;
      }

      img {
        width: 100%;
        display: block;
      }

      main {
        display: flex;
      }

      header {
        margin-top: 1em;
        margin-bottom: 2em;
      }

      figcaption {
        position: relative;
        box-sizing: border-box;
        width: calc(100% - 2px);
        display: flex;
        justify-content: space-between;
        padding: 0.5em;
        text-shadow: 1px -2px 0 #000;
        /*
          padding-top: 1.5em;
          margin-left: 1px;
          margin-top: -3.3em;
          background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0) 100%);
          pointer-events: none;
        */
      }

      #onlineStatus {
        display: flex;
        align-items: center;
        font-style: italic;
        font-size: 0.9em;
        padding-top: 0.5em;
        padding-left: 1.5em;
      }
      .online {
        height: 0.5em;
        width: 0.5em;
        margin-right: 0.35em;
        border-radius: 100%;
        background: var(--green-color);
        display: inline-block;
      }

      .offline {
        height: 0.5em;
        width: 0.5em;
        margin-right: 0.35em;
        border-radius: 100%;
        border: 1px solid var(--light-color);
        box-sizing: border-box;
        display: inline-block;
      }

      h1 {
        font-family: var(--fancy-font);
        line-height: 1.1;
        font-size: 3em;
        text-shadow: 0 0 5px var(--medium-color), 0 0 8px var(--border-color);
      }

      h2 {
        font-family: var(--fancy-font);
        text-align: center;
        // text-decoration: underline;
        margin-bottom: 0.1em;
        text-shadow: 0 0 2px var(--medium-color), 0 0 4px var(--border-color);
      }

      h3 {
        text-align: center;
        font-size: 0.75em;
        margin-bottom: 1em;
        text-shadow: 0 0 2px var(--medium-color), 0 0 4px var(--border-color);
      }

      a {
        color: var(--medium-color);
        text-shadow: 0 0 50px var(--primary-color);
      }
      a:hover, a:active, a:focus {
        text-decoration: none;
        outline: 1px solid var(--primary-color);
      }

      button {
        user-select: none;
      }

      input {
        color: var(--light-color);
        background: var(--input-color);
        padding: 0.5em;
        border: 1px solid var(--border-color);
        text-align: center;
      }

      #content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #content, aside, header {
        padding: 0 1em;
      }


      #name {
        margin-right: 0.5em;
      }

     #imgLeft2, #imgRight2 {
      text-shadow: 3px 3px 0px var(--dark-color), 3px 3px 8px var(--dark-color);
     }
      #imgLeft, #imgRight,
      #imgLeft2, #imgRight2 {
        user-select: none;
        cursor: pointer;

        font-size: 1.25em;

        /*
          padding: 0.25em;
          background: rgba(0, 0, 0, 0.3);
          font-size: 1.5em;
          border-radius: 50%;
          display: inline-block;
          width: 1em;
          text-align: center;
          margin: 0.25em;
        */
      }

      #imgLeft, #imgRight,
      #imgLeft2, #imgRight2 {
        transition: 0.3s;
      }
      #imgLeft:hover, #imgRight:hover,
      #imgLeft2:hover, #imgRight2:hover {
        color: var(--medium-color);
      }

      /*
      #imgRight {
        transform: translateX(-1em);
      }
      */

      #photoContainer {
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;


      }

      #photos {
        border: 1px solid var(--border-color);
        box-shadow: 0 0 10px var(--gloss-color);
        transition: 300ms;
      }

      #photos:hover {
        box-shadow: 0 0 15px var(--medium-color);
      }

      .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
      }

      .actionContainer {
        margin-bottom: 1em;
        padding: 1em;
        width: 100%;
      }

      #description {
        font-style: italic;
        padding: 0.5em;
        text-align: center;
      }

      #info > div + div {
        margin-top: 0.25em;
      }
      #info > div {
        text-align: center;
      }

      #activeThumbnail {
        cursor: pointer
      }

      .modalContent, #imgOverlay, #imgOverlayLeft, #imgOverlayRight {
        height: 80vmin;
      }

      .modalContent, #imgOverlay {
        width: 80vmin;
      }

      #imgOverlay {
        display: flex;
      }

      #imgOverlayLeft {
        flex: 1;
      }

      #imgOverlayRight {
        flex: 3;
      }

      #imgOverlayLeft, #imgOverlayRight {
        cursor: pointer;

        user-select: none;
      }
      .modalContent {
        border: 2px solid var(--primary-color);
        box-shadow: 0 0 90px var(--primary-color);
        border-radius: 5px;
      }

      #imgOverlay {
        position: absolute;
      }


      #sendModule, #creditSendModule {
        margin-top: 1.25em;
        border-radius: 5px;
        transition: 300ms;
      }

      #sendModule {
        box-shadow: 0 0 17px var(--dark-green-color);
      }

      #creditSendModule {
        box-shadow: 0 0 17px var(--yellow-color);
        display: inline-block;
        margin-top: 1.5em

      }

      #sendModule:hover {
        box-shadow: 0 0 30px var(--green-color);
      }

      #creditSendModule:hover {
        box-shadow: 0 0 30px var(--yellow-color);
      }
      #sendModule *, #creditSendModule * {
        font-size: 1.15em;
      }

      #sendButton, #creditSendButton {
        border: 1px solid var(--border-color);
        border-left: 0px;
        color: var(--light-color);
        padding: 0.5em 1em;
        cursor: pointer;
        transition: 0.2s;
        text-shadow: 0 1px 1px var(--dark-color);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      #sendButton {
        background: var(--dark-green-color);
        color: var(--light-color);
      }

      #creditSendButton {
        background: linear-gradient(45deg, var(--yellow-color), var(--orange-color));
        color: var(--light-color);
        text-shadow: 0px 0px 1px var(--bg-color), 0px 0px 4px var(--secondary-color);
        border-color: var(--orange-color);

      }

      #sendError {
        text-align: center;
        color: var(--red-color);
        max-width: 360px;
        margin: auto;
        margin-top: 0.75em;
      }

      .sendInput {
        border-right: 0;
        width: 6em;
        box-shadow: inset 0px 0px 10px #555;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      #sendInput:focus, #sendInput:active {
        border: 1px solid var(--dark-green-color);
        border-right: 0;
        outline: none;
      }

      #creditSendInput:focus, #creditSendInput:active {
        border: 1px solid var(--yellow-color);
        border-right: 0;
        outline: none;
      }

      #sendInput:focus + button,
      #sendInput:active + button {
        border: 1px solid var(--dark-green-color);
        border-left: 0;
      }

      #creditSendInput:focus + button,
      #creditSendInput:active + button {
        border: 1px solid var(--yellow-color);
        border-left: 0;
      }

      #chat {
        font-size: 1.4em;
        box-shadow: 0 0 2em var(--primary-color);
        transition: 300ms;
        display: inline-block;
        cursor: pointer;
        background: var(--primary-color);
        color: var(--light-color);
        border: 0px solid;
        border-radius: 3px;
        transition: 200ms;
        padding: 0.35em 2.25em;
        text-decoration: none;
        user-select: none;
        text-shadow: 1px 1px 0 var(--dark-color), 1px 1px 3px var(--secondary-color);

        animation: FadeInOut 1s ease-in-out;
        animation-delay: 4s;
      }

      img {
        user-select: none;
      }

      #chat:hover, #chat:active, #chat:focus {
        outline: none;
        background: var(--medium-color);
        border-color: var(--light-color);
        box-shadow: 0 0 3em var(--glow-color);
      }

      #sendButton:hover, #sendButton:active, #sendButton:focus {
        outline: none;
        background: var(--mint-color);
      }

      #creditSendButton:hover, #creditSendButton:active, #creditSendButton:focus {
        outline: none;
        filter: saturate(1.3);
      }

      #sendButton:active, #creditSendButton:active, #buySexyPic:active {
        opacity: 0.8;
      }


      #imgContainer {
        display: flex;
        align-items: center;
      }

      #photos, img {
        border-radius: 3px;
      }

      .imgControl {
        width: 0;
        z-index: 2;
      }

      aside {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      aside, #photoContainer {
        max-width: 100%
      }

      #sexyPicText {
        font-style: italic;
        text-align: center;
        padding: 0.6em;
      }

      @media (max-width: 875px) {
        #sexyPicSection {
          flex-direction: column;
        }
      }

      @media (max-width: 800px) {
        main {
          flex-direction: column;
          align-items: center;
        }
        header {
          flex-direction: column;
        }
        #onlineStatus {
          justify-content: center;
          margin-top: 0.5em;
          padding: 0;
        }

        #name {
          margin-right: 0;
        }


        h1 {
          text-align: center;
        }

        #photoContainer {
          width: 300px;
        }

        .actions {
          flex-direction: column;
        }

        #sendModule, #creditSendModule {
          margin-top: 1em
        }

        #content, aside, header {
          padding: 0;
        }

      }


      @media (max-width: 400px) {
        h1 {
          font-size: 2.5em
        }
      }


      .sideWindow#parent {
        box-shadow: inset 0 0 10px var(--border-color);
      }
      .sideWindow #content,
      .sideWindow aside,
      .sideWindow header {
        padding: 0;
      }
      .sideWindow header {
        margin-bottom: 1em;
        margin-top: 0.5em;
      }

      .sideWindow #onlineStatus {
        justify-content: center;
        margin: 0.5em 0;
        padding: 0;
      }

      .sideWindow h1#name {
        font-size: 2.5em;
        margin-right: 0;
      }

      .sideWindow #chat {
        display: none
      }
      .sideWindow main {
        flex-direction: column;
        align-items: center;
      }

      .sideWindow header {
        flex-direction: column;
      }

      .sideWindow h1 {
        text-align: center;
      }

      .sideWindow #sexyPicSection {
        flex-direction: column;
      }

      .sideWindow #photoContainer {
        width: 300px;
      }

      .sideWindow #sendModule {
        margin-top: 0;
      }

      .sideWindow .actions {
        flex-direction: column;
      }

      .hidden {
        display: none !important;
      }

      .unreadContainer {
        pointer-events: none;
        position: relative;
        height: 0;
        top: 0;
      }

      .unreadMessage {
        background:linear-gradient(180deg, var(--primary-color) 17%, rgba(255,0,0,0) 100%);
        padding: 0.25em;
        color: var(--light-color);
        text-shadow: 0 0 2px #000;
        text-align: center;
      }

      #profileInfo {
        padding: 1em;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;

        box-shadow: 0 0 5px var(--border-color), inset 0 0 5px var(--border-color);
        background: linear-gradient(335deg, var(--gray-color), var(--bg-color) 60%);
      }
      #testimonialContainer {
        border: 2px dotted var(--border-color);
        padding: 0.75em;
      }

      #testimonialContent {
        padding-top: 0.75em;
      }

      #testimonials {
        margin-top: 3em;
        max-width: 500px;
      }

      .quote {
        font-size: 2em;
        line-height: 0;
        position: relative;
        top: 0.35em;
        padding-right: 0.15em;
      }

      .testimonial + .testimonial {
        margin-top: 2em;
      }
      .testimonial {
        border: 1px solid var(--border-color);
        border-radius: 5px;
      }

      .testimonialName {
        border-bottom: 1px solid var(--border-color);
        background: var(--gray-color);
        text-decoration: underline;
        user-select: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .testimonialName span {
        cursor: no-drop;
      }

      .testimonialName, .testimonialReview {
        padding: 0.75em;
      }

      .testimonialReview {
        box-shadow: inset 0 0 5px var(--gloss-color);
        line-height: 1.25;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      ::selection {
        background: var(--light-color);
        color: var(--dark-color);
      }

      .disconnected {
        border: 1px solid var(--error-color);
        opacity: 0.5;
        cursor: no-drop;
      }
      .disconnected * {
        cursor: no-drop !important;
        user-select: none !important;
      }
      .disconnected #sendButton:hover {
        background: var(--dark-green-color);
      }

      #sexyPicSection {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5em;
          margin-top: 2em;
      }

      .noWeb3Error {
        text-shadow: 1px 1px 0 var(--secondary-color), 1px 1px 3px var(--medium-color);
        box-shadow: 0 0 5px var(--medium-color);
        width: 60%;
        display: block;
        margin: auto;
        padding: 0.5em;
        border: 1px solid var(--primary-color);
      }

      #buySexyPic {
        font-size: 1.1em;
        padding: 0.5em;
        cursor: pointer;
        color: var(--light-color);
        border: 0;
        box-shadow: 0 0 25px var(--secondary-color);
        border-radius: 5px;
        background: linear-gradient(145deg, var(--secondary-color), var(--blue-color));
        transition: 0.3s;
      }
      #buySexyPic:hover, #buySexyPic:active, #buySexyPic:focus {
        outline: none;
        box-shadow: 0 0 50px var(--secondary-color);
        filter: saturate(2);
      }

      connect-button {
        display: inline-flex;
        width: 7em;
      }

      #connectButton {
        background: var(--bg-color);
        color: var(--primary-color);
        text-decoration: underline;
        cursor: pointer;
        border: 0;
        font-size: 1em;
        transition: 200ms;
        margin-left: 0.1em;
        font-style: italic;
        text-shadow: 0 0 10px var(--medium-color)
      }

      #connectButton:hover {
        color: var(--light-link-color);
        text-shadow: 0 0 15px var(--light-color)
      }

      .icon svg {
        stroke: var(--light-color);
        width: 20px;
        height: 20px;
        filter: drop-shadow(1px 1px var(--dark-color));
      }


      @keyframes FadeInOut {
        0%, 100% {
          opacity: 1;
        }

        50% {
          opacity: 0;
        }
      }
    </style>

    <article id="parent">
      <header>
        <h1 id="name"></h1>
        <div id="onlineStatus"></div>
      </header>

      <main>
        <aside>
          <div id="photoContainer">
            <div class="unreadContainer">
              <div id="unread" class="unreadMessage hidden">New Message!</div>
            </div>
            <div id="imgContainer">
            <!--
              <span class="imgControl">
                <span id="imgLeft">&lt;</span>
              </span>
            -->
              <div id="photos">
                <img id="activeThumbnail" >
                <sexy-modal id="activeThumbnailModal">
                  <div slot="content">
                    <div class="modalContent">
                      <div id="imgOverlay">
                        <div id="imgOverlayLeft"></div>
                        <div id="imgOverlayRight"></div>
                      </div>
                      <img id="activeThumbnail2" >
                    </div>
                    <figcaption>
                      <span id="imgLeft2">← Previous</span>
                      <span id="imgRight2">Next →</span>
                    </figcaption>
                  </div>
                </sexy-modal>
              </div>
            <!--
              <span class="imgControl">
                <span id="imgRight">&gt;</span>
              </span>
            -->
            </div>
            <figcaption>
              <span id="imgLeft">← Previous</span>
              <span id="imgRight">Next →</span>
            </figcaption>
          </div>

          <div class="actionContainer">

            <div class="actions">
              <a id="chat">Chat <span class="icon">${chat}</span></a>

              <div id="sendModule" class="disconnected">
                <input disabled id="sendInput" class="sendInput" type="number" step="0.01" placeholder="0.01 ETH"><button id="sendButton">SEND</button>
              </div>
            </div>

            <div id="creditSection" class="hidden" style="display: flex; justify-content: center">
              <div id="creditSendModule">
                <input id="creditSendInput" class="sendInput" type="number" step="1" min="1" placeholder="1 Credit"><button id="creditSendButton">SEND CREDIT</button>
              </div>
            </div>

            <div id="sendError"></div>


            <connect-wallet id="connectMsg">
              <div slot="connected">
                <div id="sexyPicSection" style="display: none">
                  <button id="buySexyPic">Buy Sexy Pic</button>
                  <div id="sexyPicText">(0.069 ETH)</div>
                </div>
              </div>

              <div slot="noWeb3" style="text-align: center; margin-top: 1em">
                <em class="noWeb3Error">Please revisit this page in a Web3-enabled browser to Send</em>
              </div>
              <div slot="notConnected" style="text-align: center; margin-top: 1em">
                <em class="error">Please <connect-button ><button id="connectButton" slot="button">Connect Wallet</button></connect-button> to Send</em>
              </div>
            </connect-wallet>
          </div>
        </aside>

        <section id="content">
          <section id="profileInfo">
            <h2>About Me</h2>
            <div id="info"></div>
            <blockquote id="description"></blockquote>
          </section>

          <section id="testimonials">
            <h2>What Subs are Saying:</h2>
            <h3>Powered by <a href="https://friendworld.social" target="_blank">friendworld.social</a></h3>
            <div id="testimonialContainer">
              <div id="testimonialContent"></div>
            </div>
          </section>
        </section>


      </main>
    </article>
  `,
  {activePhoto: 0},
  (ctx) => {
    ctx.parent = ctx.$('#parent')
    ctx.$name = ctx.$('#name')
    ctx.$photos = ctx.$('#photos')
    ctx.$description = ctx.$('#description')
    ctx.$info = ctx.$('#info')
    ctx.$imgLeft = ctx.$('#imgLeft')
    ctx.$imgRight = ctx.$('#imgRight')
    ctx.$chat = ctx.$('#chat')
    ctx.$unread = ctx.$('#unread')
    ctx.$sendButton = ctx.$('#sendButton')
    ctx.$sendModule = ctx.$('#sendModule')
    ctx.$sendInput = ctx.$('#sendInput')
    ctx.$testimonials = ctx.$('#testimonials')
    ctx.$testimonialContent = ctx.$('#testimonialContent')
    ctx.$sendError = ctx.$('#sendError')
    ctx.$activeThumbnail = ctx.$('#activeThumbnail')
    ctx.$onlineStatus = ctx.$('#onlineStatus')
    ctx.$creditSection = ctx.$('#creditSection')
    ctx.$creditSendButton = ctx.$('#creditSendButton')
    ctx.$creditSendInput = ctx.$('#creditSendInput')

    if (ctx.getAttribute('sideWindow')) ctx.parent.classList.add('sideWindow')



    const name = ctx.getAttribute('name')
    const {age, distance, gender, maxPhotos, description, testimonials, domType} = ProfileStats[name]

    ctx.$description.innerHTML = `<span class="quote">“</span>${description}<span class="quote">”</span>`
    ctx.$name.innerHTML = name

    ctx.$info.innerHTML = `
      <div>Age: ${age}</div>
      ${defaultProfileLS.get('location') ? `<div>${distance} miles away!</div>` : ''}
      <div>Gender: ${gender}</div>
      <div>Dom Type: ${domType}</div>
    `

    ctx.$chat.href = `../chat?activeChat=${name}`


    if (MessageHandler.visibilityCtx[name] === 'online') {
      ctx.$onlineStatus.innerHTML = `<span class="online"></span>Online now!`
    } else {
      ctx.$onlineStatus.innerHTML = `<span class="offline"></span>Offline`

    }


    const getActiveThumbnail = () => `../thumbnails/${ctx.getAttribute('name')}/${ctx.state.activePhoto}.png`

    ctx.changeImgLeft = id => () => {
      ctx.setState({ activePhoto: (maxPhotos + ctx.state.activePhoto - 1) % maxPhotos})
      ctx.$(id).src = getActiveThumbnail()
    }

    ctx.changeImgRight = id => () => {
      ctx.setState({ activePhoto: (ctx.state.activePhoto + 1) % maxPhotos})
      ctx.$(id).src = getActiveThumbnail()
    }

    ctx.$imgLeft.onclick = ctx.changeImgLeft('#activeThumbnail')
    ctx.$imgRight.onclick = ctx.changeImgRight('#activeThumbnail')


    setInterval(() => {
      if (MessageHandler.chats[name].ctx.unread) {
        ctx.$unread.classList.remove('hidden')
      } else {
        ctx.$unread.classList.add('hidden')
      }
    }, 200)


    const send$ = () => {
      const amount = Number(ctx.$sendInput.value)
      ctx.$sendError.innerHTML = ''
      if (amount) {
        sexyCLIT
          .send(name, amount,
            (msg) => {},
            (msg) => {
              console.log(msg)
              ctx.$sendError.innerHTML = msg
            },
            (tx) => {
              ctx.$sendError.innerHTML = ''
              ctx.$sendInput.value = ''
            }
          )
      }
    }
    ctx.$sendButton.onclick = send$


    const creditSend$ = () => {
      const numberOfCredits = Math.floor(Number(ctx.$creditSendInput.value))
      ctx.$sendError.innerHTML = ''

      if (numberOfCredits) {
        sexyCLIT
          .vipSpend(name, numberOfCredits,
            (msg) => {},
            (msg) => {
              console.log(msg)
              ctx.$sendError.innerHTML = msg
            },
            (tx) => {
              ctx.$sendError.innerHTML = ''
              ctx.$sendInput.value = ''
              ctx.$creditSendInput.value = ''
            }
          )
      }
    }
    ctx.$creditSendButton.onclick = creditSend$

    ctx.$sendInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        send$()
      }
    }

    ctx.$testimonialContent.innerHTML = testimonials.map(t => `
      <div class="testimonial">
        <div class="testimonialName"><span>anonymous</span></div>
        <div class="testimonialReview">${t.review}</div>
      </div>
    `).join('')


    if (!window.ethereum) ctx.$sendModule.remove()

    provider.onConnect(async (addr) => {
      if (addr) {
        ctx.$sendModule.classList.remove('disconnected')
        ctx.$sendInput.disabled = false
      } else {
        ctx.$sendModule.classList.add('disconnected')
        ctx.$sendInput.disabled = true
      }

      try {
        const { SexyVIP } = await provider.sexyContracts()
        if (bnToN(await SexyVIP.balanceOf(addr)) > 0) {
          ctx.$creditSection.classList.remove('hidden')
        } else {
          ctx.$creditSection.classList.add('hidden')

        }

      } catch (e) {
        console.error(e)
      }

    })

    ctx.$activeThumbnail.src = getActiveThumbnail()
    ctx.$activeThumbnail.alt = `Sexy findom ${name} #${ctx.state.activePhoto}`


    ctx.$activeThumbnail.onclick = () => {
      ctx.$('#activeThumbnailModal').open()
      ctx.$('#activeThumbnail2').src = getActiveThumbnail()
      ctx.$('#activeThumbnail2').alt = `Sexy findom ${name} #${ctx.state.activePhoto}`
      ctx.$('#imgLeft2').onclick = ctx.changeImgLeft('#activeThumbnail2')
      ctx.$('#imgOverlayLeft').onclick = ctx.changeImgLeft('#activeThumbnail2')
      ctx.$('#imgRight2').onclick = ctx.changeImgRight('#activeThumbnail2')
      ctx.$('#imgOverlayRight').onclick = ctx.changeImgRight('#activeThumbnail2')
    }

    ctx.$('#imgLeft2').onclick = ctx.changeImgLeft
    ctx.$('#imgRight2').onclick = ctx.changeImgRight
  },
  (ctx) => {


  },
)