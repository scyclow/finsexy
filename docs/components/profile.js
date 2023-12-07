createComponent(
  'sexy-profile',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);
      }

      #controls {
        display: flex;
        justify-content: space-between;
      }

      #imgLeft, #imgRight {
        user-select: none;
        cursor: pointer;
      }

      #imgLeft:hover, #imgRight:hover {
        color: var(--medium-color);
      }

      #photoContainer {
        padding: 1em;
        width: 400px;
        height: 400px;
      }

      #photos {
        border: 1px solid var(--border-color);
      }

      img {
        width: 100%
      }

      main {
        display: flex;
      }

      @media (max-width: 650px) {
        main {
          flex-direction: column;
          align-items: center;
        }
        #photoContainer {
          width: 300px;
          height: 300px;
        }
      }
    </style>

    <main>
      <aside id="photoContainer">
        <h1 id="name"></h1>
        <div id="photos"></div>
        <div id="controls">
          <span id="imgLeft">← Previous</span>
          <span id="imgRight">Next →</span>
        </div>
      </aside>

      <section>
        <p>descriptiondescriptiondescriptiondescriptiondescription</p>
      </section>

    </main>
  `,
  {activePhoto: 0},
  (ctx) => {
    ctx.$name = ctx.$('#name')
    ctx.$photos = ctx.$('#photos')
    ctx.$imgLeft = ctx.$('#imgLeft')
    ctx.$imgRight = ctx.$('#imgRight')

    ctx.$imgLeft.onclick = () => {
      ctx.setState({ activePhoto: (4 + ctx.state.activePhoto - 1) % 4})
    }

    ctx.$imgRight.onclick = () => {
      ctx.setState({ activePhoto: (ctx.state.activePhoto + 1) % 4})
    }

    ctx.$name.innerHTML = ctx.getAttribute('name')


  },
  (ctx) => {
    ctx.$photos.innerHTML = `<img src="../thumbnails/${ctx.getAttribute('name')}/${ctx.state.activePhoto}.png">`

  },
)