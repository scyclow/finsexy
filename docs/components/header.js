import {MessageHandler} from '../state/all.js'
import {createComponent} from '../$.js'

createComponent(
  'sexy-header',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
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
        color: var(--light-color)
      }

      nav ul {
        list-style-type: none;
        display: flex;
        align-items: center;
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
        text-shadow: 1px 1px 2px var(--primary-color);
      }

      #mobileMenu, .displayNone {
        display: none;
      }

      .centerFlex {
        justify-content: center;
      }




      @media (max-width: 650px) {
        #mobileMenu {
          display: initial;
          user-select: none;
          margin-right: 0.5em;
        }

        #navItems {
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
        font-size: 0.5em;
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

      #totalUnreads.hidden, #totalUnreadsMenu.hidden {
        visibility: hidden
      }
    </style>

    <header id="header">
      <h1><a href="/">💋 FINSEXY</a></h1>
      <nav id="nav">
        <h4 id="mobileMenu">Menu<span id="totalUnreadsMenu"><span></a></h4>
        <ul id="navItems">
          <li><a href="/">Browse</a></li>
          <li><a href="/chat">Chat<span id="totalUnreads" class="hidden"><span></a></li>
          <li><a href="#">VIP</a></li>
          <li><a href="/profile">Preferences</a></li>
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
    }, 100)
  },
  (ctx) => {
    if (ctx.state.hideNav) {
      ctx.$nav.classList.add('displayNone')
      ctx.$header.classList.add('centerFlex')
    }

  },
)