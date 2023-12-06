createComponent(
  'message-selector',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
      }

      #messageSelectorList .active {
        background: var(--primary-color);
        color: var(--light-color);
      }

      #messageSelectorList {
        list-style-type: none;
      }
      #messageSelectorList li {
        cursor: pointer;
        border: 1px solid var(--border-color);
        padding: 1em;
        transition: 0.2s;
      }
      #messageSelectorList li:hover {
        background: #ff66ff;
      }
      #messageSelectorList .active:hover {
        background: #ff66ff;
      }

    </style>


      <ul id="messageSelectorList">

      </ul>

  `,
  {messageNames: []},
  (ctx) => {
    ctx.$messageSelectorList = ctx.$('#messageSelectorList')

    let activeChat
    ctx.onConvoSelect = (activeChat) => {
      ctx.setState({ activeChat })

      const activeChatWindow = ctx.$('#' + activeChat + '-chat')

      ctx.$('.message-selector').forEach(ms => {
        ms.classList.remove('active')
      })

      ctx.$('.chat-window').forEach(cw => {
        cw.classList.add('display-none')
      })

      // ctx.$('#' + activeChat + '-select').classList.add('active')
      activeChatWindow.classList.remove('display-none')
      activeChatWindow.scroll()

      const url = new URL(window.location)
      url.searchParams.set('activeChat', activeChat)
      window.history.pushState({}, '', url)
    }
  },
  (ctx) => {
    ctx.$messageSelectorList.innerHTML = ctx.state.messageNames.map(m => `
      <li
        id="${m}-select"
        class="message-selector"
        onclick="onConvoSelect('${m}')"
      >
        ${m}
      </li>
    `).join('')

    + `
    <li>
      <button onclick="localStorage.removeItem('__CHAT_CONTEXT'); window.location.reload()">clear</button>
    </li>
  `

    ctx.$('.message-selector').forEach(e => {
      e.onclick = () => ctx.onConvoSelect(e.id.split('-')[0])
    })

  },
)