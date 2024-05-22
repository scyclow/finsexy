import {MessageHandler, clitLS} from '../state/all.js'
import {createComponent} from '../$.js'
import {provider} from '../eth.js'
import './connectWallet.js'


import {winner, profile, chat, house, star } from './svg.js'


createComponent(
  'sexy-header',
  `
    <style>

      connect-wallet:not(:defined) {
        opacity: 0;
        transition: opacity 0.3s;
      }
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
        background: var(--bg-color);
      }

      h1 a {
        font-family: var(--fancy-font);
        line-height: 1.6;
        text-shadow: 2px 2px 0px var(--dark-color), 3px 3px 2px var(--primary-color);
        font-size: 1em;
        text-decoration: none;
        color: var(--light-color);
        transition: 300ms;
      }

      h1 a:hover, h1 a:active, h1 a:focus {
        outline: none;
        color: var(--medium-color);
        text-shadow: 2px 2px 4px var(--dark-color), 3px 3px 8px var(--primary-color);
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
        text-shadow: 0 0 25px var(--medium-color);
      }
      nav a:hover, #mobileMenu:hover,
      nav a:active, #mobileMenu:active,
      nav a:focus, #mobileMenu:focus {
        outline: none;
        color: var(--primary-color);
        text-shadow: 0px 0px 10px var(--medium-color);
      }


      nav a:active, #mobileMenu:active, h1:active {
        opacity: 0.8;
      }


      nav a:hover svg .svgStroke,
      nav a:active svg .svgStroke,
      nav a:focus svg .svgStroke {
        stroke: var(--primary-color);
      }
      nav a:hover svg .svgFill,
      nav a:active svg .svgFill,
      nav a:focus svg .svgFill {
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

      #totalUnreads, #totalUnreadsMenu {
        position: absolute;
        font-size: 0.7em;
        font-weight: bolder;
        height: 1em;
        width: 1em;
        padding: 0.35em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--light-color);

        border: 1px solid var(--border-color);
        box-shadow: 0 0 1em var(--primary-color);
        text-shadow: 1px 1px 0 var(--dark-color), 2px 2px 3px var(--secondary-color);
      }

      #totalUnreads {
        transform: translate(-4.7em, -0.9em);
      }

      #totalUnreadsMenu {
        transform: translate(0, -1em);
      }

      #totalUnreads.hidden, #totalUnreadsMenu.hidden {
        visibility: hidden
      }

      #topSenders.hidden {
        display: none;
      }

      .connectItem {
        padding: 0 1em;
        display: flex;
        align-items: center;
        justify-content: center
      }

      #connectButton {
        transition: 300ms;
        cursor: pointer;
        padding: 0.5em 1em;
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

      .iconLarge svg {
        width: 17px;
        height: 17px;
        transform: translateY(1px)
      }



      @media (max-width: 735px) {
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

        .connectItem {
          padding: 1em;
        }

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
      <h1><a href="/" style="display:flex; align-items:center">💋 FINSEXY</a></h1>
      <!--
        <h1><a href="/" style="display:flex; align-items:center"><img src="/assets/kiss.png" style="width: 1em; margin-right:0.25em"> FINSEXY</a></h1>
        -->
      <nav id="nav">
        <h4 id="mobileMenu">Menu<span id="totalUnreadsMenu" class="hidden"><span></a></h4>
        <ul id="navItems">
          <li>
            <a href="/">
              <span class="icon iconLarge">${house}</span>Home
            </a>
          </li>
          <li>
            <a href="/chat">
              <span class="icon iconLarge">${chat}</span>Chat
              <span id="totalUnreads" class="hidden"><span>
            </a>
          </li>
          <li><a href="/vip"><span class="icon">${star}</span>VIP</a></li>
          <li><a href="/profile"><span class="icon">${profile}</span>Profile</a></li>
          <li id="topSenders" class="hidden"><a href="/senders"><span class="icon">${winner}</span>Top Senders</a></li>
          <connect-wallet>
            <div slot="notConnected" class="connectItem">
              <li>
                <connect-button>
                  <button id="connectButton" slot="button">Connect Wallet</button>
                  <div slot="loading">Loading...</div>
                </connect-button>
              </li>
            </div>
          </connect-wallet>
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
    ctx.$topSenders = ctx.$('#topSenders')

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

    provider.onConnect(() => {
      ctx.$topSenders.classList.remove('hidden')
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