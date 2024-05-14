import {$, ls, createComponent} from '../$.js'
import {defaultProfileLS, getAgeYears} from '../state/profile.js'


createComponent(
  'sexy-user-profile',
  `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: var(--default-font);


      }



    main {
      max-width: 1400px;
      background: var(--bg-color);
      border: 1px solid var(--border-color);

      max-height: 90vh;
      overflow: scroll;
      padding: 3em 4em;
      animation: FadeIn 0.25s linear;
      box-shadow: 0 0 60px var(--border-color), 0 0 220px var(--secondary-color), inset 0 0 30px var(--border-color);
      border-radius: 5px;
    }


    ::selection {
      background: var(--light-color);
      color: var(--dark-color);
      text-shadow: none;
    }



    h1 {
      text-decoration: none;
      color: var(--light-color);
      font-family: var(--fancy-font);
      font-size: 2.2em;
      line-height: 1.1;
      text-align: center;
      margin-bottom: 0.6em;
    }

    h1, legend {
      text-shadow: 0px 0px 2px var(--dark-color), 0 0 5px var(--medium-color), 0 0 8px var(--border-color);
    }

    h2 {
      text-align: center;
    }

    a {
      color: #fff;
      text-decoration: none;
      height: 280px;
      width: 280px;
      overflow: hidden;
    }

    #connectButton {
      background: var(--secondary-color);
      animation: Glissen 3s ease-in-out infinite;
    }

    #skip {
      font-size: 1.5em;
      text-align: center;

    }
    #skip a {
      color: var(--primary-color);
      transition: 0.3s;
      animation: SkipGlow 3s ease-in-out infinite;
      text-decoration: underline;

    }

    #skip a:hover {
      text-decoration: none;
      color: var(--light-color);
    }

    fieldset {
      padding: 1em;
    }

    form fieldset + fieldset {
      margin-top: 1em;
    }

    legend {
      font-family: var(--code-font);
      padding: 0 0.5em;
    }

    textarea, input, select {
      padding: 0.25em;
      font-size: 1.25em;
      color: var(--light-color);
      background: var(--input-color);
      border:  1px solid var(--border-color);
      font-family: var(--code-font);
    }

    textarea {
      width: 97%;
      height: 4em;
    }

    fieldset, input {
      border-color: var(--border-color);
      border-style: solid;
    }

    select {
      cursor: pointer;
    }

    input, select, textarea {
      transition: 0.15s;
    }
    input:hover, select:hover, textarea:hover {
      border-color: var(--light-color);
    }

    input:active,
    input:focus,
    textarea:active,
    textarea:focus,
    select:active,
    select:focus {
      color: var(--medium-color);
      box-shadow: inset 0 0 3px var(--primary-color);
      outline: none;
      border-color: var(--primary-color);
      /*box-sizing: border-box;*/
    }



    #birthday, select {
      width: 8em;
    }

    .doubleRow, .submitRow {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1em;
    }
    .doubleRow > *:last-child, .submitRow > *:last-child {
      margin-left: 1em;
    }

    .doubleRow > *:last-child {
      flex: 1;
      margin-top: 0;
    }

    .submitContainer {
      display: flex;
      padding: 1em;
      padding-bottom: 0em;
      margin-top: 0.5em;
      justify-content: center;
      margin-bottom: 0em;
    }

    .submitRow {
      justify-content: center;

    }

    #page1, #page2, main {
      transition: 1s;
      overflow: hidden;
      opacity: 1;
      max-height: 999px;
    }

    #xClose {
      cursor: pointer;
      padding: 0.75em;
      display: inline-block;
      font-size: 1.8em;
      transform: translate(7%, -65%);
      transition: 0.15s;
    }



    #xClose:hover {
      color: var(--primary-color);
      text-shadow: 0 0 5px var(--primary-color);
    }

    .hidden {
      opacity: 0 !important;
      max-height: 0px !important;
      transition: 1s;
    }

    button {
      font-size: 1.5em;
      box-shadow: 0 0 2em #b47aa7;
      transition: 300ms;
      cursor: pointer;
      padding: 0.35em 1em;
      background: var(--primary-color);
      color: var(--light-color);
      border: 0px solid;
      border-radius: 3px;
      transition: 150ms;
      padding: 0.25em 1em;
    }

    button:hover, button:active, button:focus {
      background: #fff;
      color: #000;
      color: var(--light-color);
      background: var(--medium-color);
      border-color: var(--light-color);
      outline: none;
    }

    button:disabled {
      opacity: 0.55;
      user-select: none;
      cursor: no-drop;
      box-shadow: 0 0 0;
    }

    button:disabled:hover {
      background: var(--primary-color);
      color: #fff;
    }

    ::-webkit-calendar-picker-indicator { filter: invert(100%); }


    button, img {
      user-select: none;
    }


    @media (max-width: 600px) {
      h1 {
        font-size: 1.5em;
      }

      h2 {
        font-size: 1em;
      }
      .doubleRow, .submitRow {
        flex-direction: column;
        align-items: center;
      }
      .doubleRow > *:last-child, .submitRow > *:last-child {
        margin-left: 0;
        margin-top: 0.5em;
      }

      .doubleRow {
        align-items: stretch;
      }

      legend {
        text-align: center;
      }

      select, input {
        display: block;
        margin: auto;
      }

      main {
        padding: 2em 2em;
      }

      #xClose {
        transform: translate(-20%, -60%);
      }

      button, #skip {
        font-size: 1.35em
      }

    }

    @keyframes SkipGlow {
      0%, 100% {
        text-shadow: 0px 0px 5px var(--primary-color);
      }

      50% {
        text-shadow: none;
      }
    }


    @keyframes FadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
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



  <main>
  <div style="height: 0; width: 0; float: right">
    <span id="xClose">X</span>
  </div>

    <h1 id="headerText">Welcome to FinSexy</h1>


    <form id="form" onsubmit="onSexyProfileSubmit(event)">

      <div id="page1">
        <div class="doubleRow">
          <fieldset>
            <legend>Name</legend>
            <input required type="text" name="name" id="name" placeholder="paypiggie123">
          </fieldset>

          <fieldset>
            <legend>Gender</legend>
            <select id="gender">
              <option value="" selected disabled hidden></option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="nb">undefined</option>
            </select>
          </fieldset>
        </div>

        <fieldset>
          <legend>Birthday (18+ only)</legend>
          <input required type="date" name="birthday" id="birthday" style="cursor: pointer;" />
        </fieldset>
      </div>

      <div id="page2">
        <fieldset>
          <legend>Location</legend>
          <input required type="text" name="location" id="location" placeholder="New York, NY">
        </fieldset>



        <fieldset>
          <legend>What's your deepest, darkest sexual fantasy?</legend>
          <textarea required name="fantasy" id="fantasy" placeholder="I want a sexy dom to drain my wallet until it hurts 💦"></textarea>
        </fieldset>

        <fieldset>
          <legend>Password</legend>
          <input required type="text" minlength="6" name="pass" id="pass" placeholder="******">
        </fieldset>
      </div>

      <p id="error"></p>
      <div class="submitContainer submitRow">
        <div>
          <button id="submit">Submit</button>
        </div>
        <div id="skip">
          <a href="#" id="skipForNow">Skip →</a>
        </div>
      </div>



    </form>
  </main>
  `,
  {
    activePage: defaultProfileLS.get('name') && defaultProfileLS.get('birthday') ? 2 : 1
  },
  (ctx) => {
    // on load
    ctx.parent = ctx.$('#parent')



    const fields = [
      'name',
      'location',
      'birthday',
      'gender',
      // 'interested',
      // 'income',
      'fantasy',
      'pass',
    ]

    ctx.$form = ctx.$('#form')
    ctx.$error = ctx.$('#error')
    ctx.$submit = ctx.$('#submit')
    ctx.$birthday = ctx.$('#birthday')

    ctx.$headerText = ctx.$('#headerText')
    ctx.$xClose = ctx.$('#xClose')
    ctx.$page1 = ctx.$('#page1')
    ctx.$page2 = ctx.$('#page2')


    if (ctx.state.activePage === 1) {
      ctx.$page2.classList.add('hidden')
    } else {
      ctx.$headerText.innerHTML = 'Last Step!'
      ctx.$page1.classList.add('hidden')

    }

    const now = new Date()

    const maxDateYear = now.getFullYear() - 18
    const maxDateMonth = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1)
    const maxDateDay = (now.getDate() < 10 ? '0' : '') + now.getDate()

    ctx.$birthday.max = `${maxDateYear}-${maxDateMonth}-${maxDateDay}`


    if (!ls.get('profileCompleted')) {
      ctx.$('#skipForNow').onclick = () => {
        ls.set('profileDeferred', true)
        ls.set('__enteredSite', true)
        ctx.parentElement.close()
      }
    } else {

      ctx.$('#skip').classList.add('hidden')
    }

    function onSexyProfileSubmit(e) {
      e.preventDefault()
      submitForm(e)
    }

    window.onSexyProfileSubmit = onSexyProfileSubmit

    fields.forEach(field => {
      const $elem = ctx.$('#'+field)
      if (defaultProfileLS.get()[field]) {
        $elem.value = defaultProfileLS.get()[field]
      }

      $elem.onchange = () => {
        const val = $elem.value
        if (val) {
          if (field === 'birthday' && getAgeYears(val) < 18) return
          else defaultProfileLS.set(field, val)
        }
      }
    })


    ctx.$xClose.onclick = () => ctx.parentElement.close()


    const submitForm = (e) => {
      if (
        ctx.state.activePage === 1
        && ctx.$('#name').checkValidity()
        && ctx.$('#birthday').checkValidity()
      ) {
        ctx.setState({ activePage: 2 })

        // ctx.$page1.style.maxHeight = 0;


        ctx.$page1.classList.add('hidden')
        setTimeout(() => {
          ctx.$headerText.innerHTML = 'Last Step!'
          ctx.$page2.classList.remove('hidden')
      }, 700)



        e.preventDefault()
      } else if (
        ctx.state.activePage === 2
        && ctx.$('#location').checkValidity()
        && ctx.$('#fantasy').checkValidity()
      ) {

        ls.set('profileCompleted', true)
        if (ctx.$('#pass').checkValidity()) ctx.parentElement.close()
      }




      // const fieldsValid = fields.every(field => ctx.$('#'+field).checkValidity())


    }
    ctx.$submit.onclick = submitForm



  ctx.$form.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      submitForm(e)
    }
  })

  },
  (ctx) => {
    // render

  },
)