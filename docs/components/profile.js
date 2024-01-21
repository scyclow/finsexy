import {createComponent} from '../$.js'
import {MessageHandler, ProfileStats} from '../state/all.js'
import {provider} from '../eth.js'



createComponent(
  'sexy-profile',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
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

      figcaption * {
      }

      h1 {
        font-size: 3em;
        text-shadow: 0 0 5px var(--medium-color), 0 0 8px var(--border-color);
      }

      h2 {
        text-align: center;
        text-decoration: underline;
        margin-bottom: 0.5em;
      }

      a {
        color: var(--medium-color);
        text-shadow: 0 0 50px var(--primary-color);
      }
      a:hover {
        text-decoration: none;
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
        margin-bottom: 0.5em;
      }

      #imgLeft, #imgRight {
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

      #imgLeft:hover, #imgRight:hover {
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
        box-shadow: 0 0 10px #888;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actionContainer {
        margin: 1em 0;
        padding: 1em;
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

      .modalContent {
        width: 80vmin;
        height: 80vmin;
        border: 2px solid var(--primary-color);
      }


      #sendModule {
        box-shadow: 0 0 20px var(--green1-color);
      }
      #sendModule * {
        font-size: 1.15em;
      }

      #sendButton {
        border: 1px solid var(--border-color);
        border-left: 0px;
        background: var(--green1-color);
        color: var(--light-color);
        padding: 0.5em 1em;
        cursor: pointer;
        transition: 0.2s;
      }

      #sendError {
        margin-top: 0.75em;
        text-align: center;
        color: var(--red-color);
      }

      #sendInput {
        border-right: 0;
        width: 6em;
        box-shadow: inset 0px 0px 10px #555;

      }
      #sendInput:focus {
        border: 1px solid var(--green1-color);
        border-right: 0;
        outline: none;
      }

      #sendInput:focus + button {
        border: 1px solid var(--green1-color);
        border-left: 0;
      }

      #chat {
        font-size: 1.8em;
        box-shadow: 0 0 2em #b47aa7;
        transition: 300ms;
        display: inline-block;
        cursor: pointer;
        background: var(--primary-color);
        color: var(--light-color);
        border: 0px solid;
        border-radius: 3px;
        transition: 150ms;
        padding: 0.35em 1em;
        text-decoration: none;
      }

      #chat:hover {
        background: var(--medium-color);
        border-color: var(--light-color);
      }

      #sendButton:hover {
        background: var(--green2-color);
      }


      #imgContainer {
        display: flex;
        align-items: center;
      }

      .imgControl {
        width: 0;
        z-index: 2;
      }

      aside, #photoContainer {
        max-width: 100%
      }

      @media (max-width: 800px) {
        main {
          flex-direction: column;
          align-items: center;
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

        #sendModule {
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


      .sideWindow #content,
      .sideWindow aside,
      .sideWindow header {
        padding: 0;
      }

      .sideWindow h1 {
        font-size: 2.5em
      }

      .sideWindow #chat {
        display: none
      }
      .sideWindow main {
        flex-direction: column;
        align-items: center;
      }

      .sideWindow h1 {
        text-align: center;
      }

      .sideWindow #photoContainer {
        width: 300px;
        height: 300px;
        }

      .sideWindow .actions {
        flex-direction: column;
      }

      .sideWindow #sendModule {
        margin-top: 1em
      }

      .hidden {
        display: none;
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
        border: 1px solid var(--border-color);
        box-shadow: 0 0 5px var(--border-color);
/*
        background: var(--border2-color);
*/
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


      .testimonial + .testimonial {
        margin-top: 2em;
      }
      .testimonial {
        border: 1px solid var(--border-color);
      }

      .testimonialName {
        border-bottom: 1px solid var(--border-color);
        background: var(--gray-color);
        text-decoration: underline;
        user-select: none;
      }
      .testimonialName span {
        cursor: no-drop;
      }

      .testimonialName, .testimonialReview {
        padding: 0.75em;
      }

      .testimonialReview {
        box-shadow: inset 0 0 10px #777;
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
        background: var(--green1-color);
      }
    </style>

    <article id="parent">
      <header>
        <h1 id="name"></h1>
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
              <a id="chat">Chat</a>

              <div id="sendModule" class="disconnected">
                <input disabled id="sendInput" type="number" step="0.01" placeholder="0.01"><button id="sendButton">SEND</button>
              </div>

              <div id="sendError"></div>

            </div>
            <connect-wallet id="connectMsg">
              <div slot="noWeb3" style="text-align: center; margin-top: 1em">
                <em class="error">Please Connect in a Web3-enabled Browser to send</em>
              </div>
              <div slot="notConnected" style="text-align: center; margin-top: 1em">
                <em class="error">Please Connect your wallet to send</em>
              </div>
            </connect-wallet>
          </div>
        </aside>

        <section id="content">
          <section id="profileInfo">
            <h2>Profile</h2>
            <div id="info"></div>
            <p id="description"></p>
          </section>

          <section id="testimonials">
            <h2>Testimonials</h2>
            <div id="testimonialContainer">
              <h3>Powered by <a href="https://friendworld.social" target="_blank">friendworld.social</a></h3>
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

    if (ctx.getAttribute('sideWindow')) ctx.parent.classList.add('sideWindow')



    const name = ctx.getAttribute('name')
    const {age, distance, gender, maxPhotos, description, testimonials} = ProfileStats[name]

    ctx.$description.innerHTML = `"${description}"`
    ctx.$name.innerHTML = name
    ctx.$info.innerHTML = `
      <div>Age: ${age}</div>
      <div>Gender: ${gender}</div>
      <div>${distance} miles away!</div>
    `

    ctx.$chat.href = `/chat?activeChat=${name}`

    ctx.$imgLeft.onclick = () => {
      ctx.setState({ activePhoto: (maxPhotos + ctx.state.activePhoto - 1) % maxPhotos})
    }

    ctx.$imgRight.onclick = () => {
      ctx.setState({ activePhoto: (ctx.state.activePhoto + 1) % maxPhotos})
    }


    setInterval(() => {
      if (MessageHandler.chats[name].ctx.unread) {
        ctx.$unread.classList.remove('hidden')
      } else {
        ctx.$unread.classList.add('hidden')
      }
    }, 200)


    const send$ = () => {
      const val = Number(ctx.$sendInput.value)
      if (val) {
        ctx.$sendError.innerHTML = ''
        sexyCLIT//.run(name, `$sexy send ${name} ${val}`, {}, true)
          .send(name, val,
            (msg) => {},
            (msg) => {
              console.log(msg)
              ctx.$sendError.innerHTML = msg
            },
          )
        ctx.$sendInput.value = ''
      }
    }
    ctx.$sendButton.onclick = send$

    ctx.$sendInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        send$()
      }
    }

    ctx.$testimonialContent.innerHTML = testimonials.map(t => `
      <div class="testimonial">
        <div class="testimonialName"><span>${t.name}</span></div>
        <div class="testimonialReview">${t.review}</div>
      </div>
    `).join('')


    provider.onConnect((addr) => {
      if (addr) {
        ctx.$sendModule.classList.remove('disconnected')
        ctx.$sendInput.disabled = false
      } else {
        ctx.$sendModule.classList.add('disconnected')
        ctx.$sendInput.disabled = true
      }
    })

  },
  (ctx) => {
    ctx.$photos.innerHTML = `
      <img id="activeThumbnail" src="../thumbnails/${ctx.getAttribute('name')}/${ctx.state.activePhoto}.png">
      <sexy-modal id="activeThumbnailModal">
        <div slot="content" class="modalContent">
          <img src="../thumbnails/${ctx.getAttribute('name')}/${ctx.state.activePhoto}.png">
        </div>
      </sexy-modal>
    `

    ctx.$('#activeThumbnail').onclick = () => {
      ctx.$('#activeThumbnailModal').open()
    }

  },
)