import {MessageHandler} from '../state/all.js'
import {createComponent} from '../$.js'
import {provider} from '../eth.js'

import {winner, profile, chat, house} from './svg.js'


createComponent(
  'sexy-header',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
        user-select: none;
      }
      header {
        padding: 0.25em 0.5em;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h1 a {
        font-family: var(--fancy-font);
        text-shadow: 2px 2px var(--dark-color), 3px 3px 2px var(--primary-color);
        font-size: 1em;
        text-decoration: none;
        color: var(--light-color);
        transition: 300ms;
      }

      h1 a:hover {
        color: var(--medium-color)

      }

      nav ul {
        list-style-type: none;
        display: flex;
        align-items: center;
      }

      em {
        color: var(--red-color);
        font-size: 0.75em;
      }

      .error {
        color: var(--red-color);
      }

      nav a, #mobileMenu {
        padding: 1em;
        color: var(--light-color);
        text-decoration: none;
        transition: 0.2s;
        cursor: pointer;
      }
      nav a:hover, #mobileMenu:hover {
        color: var(--primary-color);
        text-shadow: 0px 0px 10px var(--medium-color);
      }

      nav a:hover svg .svgStroke {
        stroke: var(--primary-color);
      }
      nav a:hover svg .svgFill {
        stroke: var(--primary-color);
        fill: var(--primary-color);
      }

      #mobileMenu, .displayNone {
        display: none;
      }

      .centerFlex {
        justify-content: center;
      }

      .icon {
        display: inline-block;
        margin-right: 0.5em;
        transform: translateY(1px);
      }
      .icon svg {
        width: 15px;
        height: 15px;
        stroke: var(--light-color);

      }
      .icon svg .svgStroke {
        transition: 0.2s;
        stroke: var(--light-color);
      }

      .icon svg .svgFill {
        transition: 0.2s;
        stroke: var(--light-color);
        fill: var(--light-color);

      }



      @media (max-width: 780px) {
        #mobileMenu {
          display: initial;
          user-select: none;
          margin-right: 0.5em;
        }

        #navItems {
          z-index: 600;
          display: none;
          border-bottom: 1px solid var(--border-color)
        }

        #navItems.mobileDisplay {
          background: var(--dark-color);
          position: absolute;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          top: 60px;
          left: 0;
          box-shadow: 0 5px 10px var(--dark-color);
        }

        #navItems.mobileDisplay li {
          text-align: center;
          padding: 0 3em;
        }
        #navItems.mobileDisplay li a {
          display: block;
          border-bottom: 1px dotted var(--border-color);
        }
        #navItems.mobileDisplay li:last-child a {
          border-bottom: 0;
        }

      }

      #totalUnreads, #totalUnreadsMenu {
        position: absolute;
        font-size: 0.55em;
        font-weight: bolder;
        height: 1em;
        width: 1em;
        padding: 0.5em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--light-color);

        transform: translate(0, -1em);
        border: 1px solid var(--border-color);
        box-shadow: 0 0 1em var(--primary-color)
      }

      #totalUnreads {
        transform: translate(-6.1em, -1em);
      }

      #totalUnreadsMenu {
        transform: translate(0, -1em);
      }

      #totalUnreads.hidden, #totalUnreadsMenu.hidden {
        visibility: hidden
      }

      #connectButton {
        transition: 300ms;
        cursor: pointer;
        padding: 0.35em 1em;
        border: 0;
        color: var(--light-color);
        border-radius: 3px;
        background: var(--primary-color);
        animation: Glissen 3s ease-in-out infinite;
      }

      #connectButton:hover {
        background: var(--light-color);
        color: var(--primary-color);
        animation: none;
        box-shadow: 0 0 3em var(--primary-color);
      }

      @keyframes Glissen {
        0%, 100% {
          background: var(--primary-color);
          box-shadow: 0 0 3em var(--primary-color);
        }

        50% {
          background: var(--secondary-color);
          box-shadow: 0 0 3em var(--secondary-color);
        }
      }
    </style>

    <header id="header">
      <h1><a href="/">💋 FINSEXY</a></h1>
      <nav id="nav">
        <h4 id="mobileMenu">Menu<span id="totalUnreadsMenu"><span></a></h4>
        <ul id="navItems">
          <li>
            <a href="/">
              <span class="icon">${house}</span>
              Home
            </a>
          </li>
          <li>
            <a href="/chat">
              <span class="icon">${chat}</span>
              Chat
              <span id="totalUnreads" class="hidden"><span>
            </a>
          </li>
          <!--<li><a href="/">Browse</a></li>-->
          <!--<li><a href="#">VIP</a></li>-->
          <li><a href="/profile"><span class="icon">${profile}</span>Profile</a></li>
          <li><a href="/senders"><span class="icon">${winner}</span>Top Senders</a></li>
          <li style="margin-right: 1em">
            <connect-wallet>
              <div slot="noWeb3">
                <em class="error">Please Connect in a <br>Web3-enabled Browser</em>
              </div>

              <div slot="notConnected">
                <connect-button>
                  <button id="connectButton" slot="button">Connect</button>
                  <div slot="loading">Loading...</div>
                </connect-button>
              </div>

              <div slot="connected" id="connected"></div>

              <div slot="connectionError" class="error">

              </div>
            </connect-wallet>
          </li>
        </ul>
      </nav>
    </header>
  `,
  {},
  (ctx) => {

    ctx.$mobileMenu = ctx.$('#mobileMenu')
    ctx.$navItems = ctx.$('#navItems')
    ctx.$nav = ctx.$('#nav')
    ctx.$header = ctx.$('#header')
    ctx.$connected = ctx.$('#connected')
    ctx.$totalUnreads = ctx.$('#totalUnreads')
    ctx.$totalUnreadsMenu = ctx.$('#totalUnreadsMenu')

    let menuOpen = false
    ctx.$mobileMenu.onclick = () => {
      if (menuOpen) {
        ctx.$mobileMenu.innerHTML = 'Menu'
        ctx.$navItems.classList.remove('mobileDisplay')
      } else {
        ctx.$mobileMenu.innerHTML = 'X'
        ctx.$navItems.classList.add('mobileDisplay')
      }
      menuOpen = !menuOpen
    }

    provider.onConnect(async (addr) => {
      ctx.$connected.innerHTML = `<div style="color:var(--medium-color); padding: 0.5em">${await provider.formatAddr(addr)}</div>`
    })


    // TODO make this a handler instead of an interval
    setInterval(() => {
      const totalUnreads = MessageHandler.totalUnreads()

      if (totalUnreads) {
        ctx.$totalUnreads.innerHTML = totalUnreads
        ctx.$totalUnreads.classList.remove('hidden')

        ctx.$totalUnreadsMenu.innerHTML = totalUnreads
        ctx.$totalUnreadsMenu.classList.remove('hidden')
      } else {
        ctx.$totalUnreads.classList.add('hidden')

        ctx.$totalUnreadsMenu.classList.add('hidden')

      }
    }, 500)
  },
  (ctx) => {
    if (ctx.state.hideNav) {
      ctx.$nav.classList.add('displayNone')
      ctx.$header.classList.add('centerFlex')
    }

  },
)