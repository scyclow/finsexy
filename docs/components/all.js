export * from './connectWallet.js'
export * from './chatWindow.js'
export * from './header.js'
export * from './modal.js'
export * from './profile.js'
export * from './userProfile.js'

export function vipCard(name, tokenId, isGold, balance) {
  return `
    <svg viewBox="0 0 850 525" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient1" x1="0.8" x2="0" y1="-0.25" y2="1.15">
          <stop stop-color="#ff00c7" offset="0%"></stop>
          <stop stop-color="#120211" offset="20%"></stop>
          <stop stop-color="#120211" offset="58%"></stop>
          <stop stop-color="#ff00c7" offset="100%"></stop>
        </linearGradient>

        <filter id="insetShadow">
            <feOffset dx="0"dy="0"/>

            <feGaussianBlur
              stdDeviation="10"
              result="offset-blur"
            />

            <feComposite
              operator="out"
              in="SourceGraphic"
              in2="offset-blur"
              result="inverse"
            />

            <feFlood
              flood-color="#888"
              flood-opacity=".95"
              result="color"
            />
            <feComposite
              operator="in"
              in="color"
              in2="inverse"
              result="shadow"
            />

            <feComposite
              operator="over"
              in="shadow"
              in2="SourceGraphic"
            />
        </filter>
      </defs>
      <style>
        text {
          fill: ${isGold ? '#f3ba00': '#fff8ff'};
          font-family: monospace;
          font-size: 35px;
          filter: drop-shadow(1px 1px 0px #ff00c7) drop-shadow(2px 2px 0px #120211);
        }
        .t {
          font-family: cursive;
          font-size: 95px;
          dominant-baseline: middle;
          text-anchor: middle;
          filter: drop-shadow(4px 4px 1px #120211) drop-shadow(3px 3px 6px #ff00c7);
        }
      </style>
      <rect x="2" y="2" width="846" height="521" fill="url(#Gradient1)" stroke="#524552" stroke-width="4" stroke-location="outside" rx="15" filter="url(#insetShadow)"></rect>

      <text x="50%" y="26%" class="t" style="font-size: 90px">💋 FINSEXY V.I.P.</text>
      <text x="50%" y="41%" class="t" style="font-size: 50px">Very Important Paypig</text>


      <text x="7%" y="78%">${name}</text>
      <text x="7%" y="88%">Sexy Credits: ${balance}</text>
      <text x="73%" y="88%">ID: ${tokenId}</text>
      ${isGold ?'<text x="85%" y="78%" stroke="#f3ba00" stroke-width="9" style="filter: drop-shadow(0 0 20px #888) drop-shadow(0 0 15px #f3ba00);">⭑</text>' : ''}
    </svg>
  `
}