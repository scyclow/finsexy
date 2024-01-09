import {createComponent} from '../$.js'
import {MessageHandler} from '../state/all.js'
import {KatProfile} from '../chats/katFischer.js'
import {HeatherHotProfile} from '../chats/heatherHot.js'
import {HackerProfile} from '../chats/hacker.js'
import {VinceProfile} from '../chats/VinceSlickson.js'
import {SamanthaProfile} from '../chats/samanthaJones.js'

export const ProfileStats = {
  katFischer: KatProfile,

  heatherHot: HeatherHotProfile,

  VinceSlickson: VinceProfile,

  samanthaJones: SamanthaProfile,

  hacker: HackerProfile
}



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
        width: 100%
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
        margin-top: -3.3em;
        margin-left: 1px;
        padding: 0.5em;
        padding-top: 1.5em;
        background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0) 100%);
        text-shadow: 1px -2px 0 #000;
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
      }

      #imgLeft:hover, #imgRight:hover {
        color: var(--medium-color);
      }

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
        margin: 1em 0;
        padding: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            <div id="photos"></div>
            <figcaption>
              <span id="imgLeft">← Previous</span>
              <span id="imgRight">Next →</span>
            </figcaption>
          </div>

          <div class="actions">
            <a id="chat">Chat</a>
            <div id="sendModule">
              <input id="sendInput" type="number" step="0.01" placeholder="0.01"><button id="sendButton">SEND</button>
            </div>
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
    ctx.$sendInput = ctx.$('#sendInput')
    ctx.$testimonials = ctx.$('#testimonials')
    ctx.$testimonialContent = ctx.$('#testimonialContent')

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

    ctx.$sendButton.onclick = () => {
      const val = Number(ctx.$sendInput.value)
      if (val) {
        sexyCLIT.run(name, `$sexy send ${name} ${val}`)
        ctx.$sendInput.value = ''
      }
    }

    ctx.$testimonialContent.innerHTML = testimonials.map(t => `
      <div class="testimonial">
        <div class="testimonialName"><span>${t.name}</span></div>
        <div class="testimonialReview">${t.review}</div>
      </div>
    `).join('')



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