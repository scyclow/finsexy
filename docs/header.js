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

      #mobileMenu {
        display: none;
      }

      @media (max-width: 650px) {
        #mobileMenu {
          display: initial;
          user-select: none;
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

        #navItems.mobileDisplay li span {
          text-align: right;
          display: block;
          padding: 0.25em 1em;
          cursor: pointer
        }
      }
    </style>

    <header>
      <h1><a href="./index.html">💋 FINSEXY</a></h1>
      <nav>
        <h4 id="mobileMenu">Menu</h4>
        <ul id="navItems">
          <li><a href="./index.html">Browse</a></li>
          <li><a href="./chat.html">Chat</a></li>
          <li><a href="#">VIP</a></li>
          <li><a href="#">Preferences</a></li>
        </ul>
      </nav>
    </header>
  `,
  {},
  (ctx) => {
    ctx.$mobileMenu = ctx.$('#mobileMenu')
    ctx.$navItems = ctx.$('#navItems')

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
  },
  (ctx) => {},
)