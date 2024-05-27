import {} from './min.ethers.js'
import {clitLS} from './state/clit.js'

export const bnToN = bn => Number(bn.toString())
export const ethVal = n => Number(ethers.utils.formatEther(n))
export const truncateAddr = (addr, len=13) => {
  const padding = Math.floor((len - 5)/2)
  return addr.slice(0, 2+padding) + '...' + addr.slice(-padding)
}
export const toETH = amt => ethers.utils.parseEther(String(amt))
export const fromWei = amt => bnToN(amt)/1e18
export const ethValue = amt => ({ value: toETH(amt) })
export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'
export const txValue = amt => ({ value: toETH(amt) })


function isENS(ens) {
  return ens.slice(-4) === '.eth'
}

window.toETH = toETH
window.bnToN = bnToN
window.fromWei = fromWei



// export const FINSEXY_CONTRACT = {
//   local: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
//   sepolia: '0x42714cC3fffC02BCCEafEAD06f9Eb644Df6BcBC6',
//   mainnet: ''
// }


export const STEVIEP_CONTRACTS = {
  local: {
    "AB": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    "FastCash": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    "UFIM": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    "IOU": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    "NVC": "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "IFD": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    "MMO": "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    "CASH": "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    "TenETH": "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    "ETF": "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    "KYC": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    // "SexyGame": "0xF8Fbd197365ACbA81D250FE4Bc2d1B5019e7d306",
    "SexyVIP": "0x8dAF17A20c9DBA35f005b6324F493785D239719d",
    "SexyMinter": "0x6F00454894e0790AaE84E7A6406E85075a321469",
    "SexyRouter": "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
  },
  sepolia: {
    AB: '0x4f857a92269dc9b42edb7fab491679decb46e848',
    FastCash: '0xDd3075604272ecb847338Ee3C8A36cd4B6F25f9B',
    UFIM: '0x6b066289884b71182f9fBB98EDfa1eA5Aa53AC2E',
    IOU: '0xac2a54817D6Db0215f592cc50Bcf362A18257963',
    NVC: '0x7689D9d97B767D93c98F85266C5C3c37a246B0C1',
    IFD: '0x85E49424ca0074DB4F1Ae491b1AC02A6090F3d74',
    MMO: '0xf4602A751bb3A5899c7D2C9851e9B1D7A95FCB3e',
    CASH: '0xa24B9F0c2905b370BF2C4AA6bE9715361e86C1e1',
    TenETH: '0x0BE1F7BE6996F969b8e2c68a6F532BE946b57c9a',
    ETF: '0xBe79cF3F13Ded8334dbEe23c7aeE078118eEc45C',
    KYC: '0x9fd04fafD998bfd1bA9aadd24ef1864A5620C05C',
    // "SexyGame": "",
    "SexyVIP": "0xDC1ae014938D648964b6c3EDA8955108C8C94ed3",
    "SexyMinter": "0xde01fceb00EC6cb2F3a89423aE4326A84Dee7fCE",
    "SexyRouter": "0x24140eb824f2fa9d1f1946b01fed132eb0421c28"
  },
  mainnet: {
    AB: '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270',
    FastCash: '0xcA5228D1fe52D22db85E02CA305cddD9E573D752',
    UFIM: '0xf49b26cF118Db11A7DD1D9B88C7E1bC153851757',
    IOU: '0x13178AB07A88f065EFe6D06089a6e6AB55AE8a15',
    NVC: '0xE6da43BCFA2aE0eD8C6aC4b3BEeA1eC9ae65DAbA',
    IFD: '0xf49b26cF118Db11A7DD1D9B88C7E1bC153851757',
    MMO: '0x41d3d86a84c8507A7Bc14F2491ec4d188FA944E7',
    CASH: '0x6DEa3f6f1bf5ce6606054BaabF5452726Fe4dEA1',
    TenETH: '0x13bBBEfE251c94467D183821b663Ef0bD0a8A722',
    ETF: '0x7102653225D537e2FE703723ad83edFeb606396e',
    KYC: '0x0BB72cE0cFE446DD89129B4335e29c0fbbE0c93C',
    // "SexyGame": "",
    "SexyVIP": "",
    "SexyMinter": "",
    "SexyRouter": ""
  }
}

export const DOM_CONTRACTS = {
  local: {
    "heatherHot": "0xf41B47c54dEFF12f8fE830A411a09D865eBb120E",
    "SamanthaJones": "0x05242D4AC717Cdf38C36AF290F2b0DA99AA82c67",
    "QueenJessica": "0x1655f30B495586cDC5E1E332844FabF7363b3667",
    "DungeonMistress": "0x1E01182454073691d6190FC0F977cB7D646981E1",
    "DrAndy": "0x436932D6361Db21CbDf440A39046093a1C12D2B4",
    "katFischer": "0x235B28c74f19083a5CAce20C506513417a90BE29",
    "CandyCrush": "0x72D1fE35eB1aEb7437eEeCa567A93F67dD76A9dA",
    "CrystalGoddess": "0x9ace813B1adA8a75DF6518A6d1b50f1A418CdAB7",
    "steviep": "0xa8F7C1571e3522ED545F949558eCB7B8e72529B2",
    "VinceSlickson": "0x32467b43BFa67273FC7dDda0999Ee9A12F2AaA08",
    "SexyXXXpress": "0x46A9cF43B44f5CEb06747aF10955A02fD6671783",
    "Hedonitronica": "0x4AE5AF759E17599107c1C688bfaCF6131C376D51",
    "MindyRouge": "0x1881d02D05a44713a69d6eDDE3e7167792A636d6",
    "0x000000000000000000000000000000000": "0x4ABEaCA4b05d8fA4CED09D26aD28Ea298E8afaC8",
    "SpecialAgentDiane": "0x4ABEaCA4b05d8fA4CED09D26aD28Ea298E8afaC8",
    "RonaMerch": "0x72616c92Bcb8660B5bE0fa423Fe0C58BdE3EFd28",
    "MoneyMommy777": "0xa9b19BA63eD2fFa19f50a63Bddf5F4a0092678C7",
    "HotlineBabe1900": "0x3083DB70660BB6bbB7A905743D181383aa439b46",
    "CustomerSupport247": "0xdcd0868CDE29952A285da154ff0a5a2A1C88CD13",
    "cagla": "0xe2657e5E56De8b4c6B6bB2AB57Beb7964F9ab941"
  },
  sepolia: {
    SamanthaJones: '0x6c3Ba73b503810154a375757a1562B5fa0F07395',
    VinceSlickson: '0x120D15bc7D200866eeA5707a71A77947C183ee17',
    CrystalGoddess: '0x746933CdD53180Faf6B4B092Fd55Fb5D962e769e',
    DrAndy: '0xbd0a836134D252A17419316ba0919303c48EcDEa',
    DungeonMistress: '0x6721E4DE05328Eebbc559713cacB17FCe363a60F',
    QueenJessica: '0xB0aA3152240948076D551455cb0b8424cAfEb456',
    Hedonitronica: '0xb487Fd88c15a3057F3B5fDBA9F3AF4710d830ba6',
    MindyRouge: '0xc5A32eC2FDbBdFfb15443c900995C17Edb6b6783',
    SexyXXXpress: '0x8399B31c1798a58A35852d29F4d8bBd3E3AB8F6c',
    CandyCrush: '0x01b29F753F82b4262A4CFf621B323eCE063E352e',
    heatherHot: '0x56Ac50BDeD44Da46C5fE582Aa469B4726B779a4b',
    katFischer: '0x0c8E71dCA3F4FC3bEAe304Fd0C31c6ecF6f000d3',
    SpecialAgentDiane: '0x5F19f38ADE25F0ee7e4f3fB463674B1C3376780f',
    steviep: '0x99B6FA3461061DC22E5B5e84441a46cCf1Bf1FB1',
    '0x000000000000000000000000000000000': '0x5F19f38ADE25F0ee7e4f3fB463674B1C3376780f',
    "SpecialAgentDiane": "0x5F19f38ADE25F0ee7e4f3fB463674B1C3376780f",
    "RonaMerch": "0x519ed2F6079523b7DDBFad6eFCcCCcbc61509A13",
    "MoneyMommy777": "0x5C4F3670BC913394181E442a73bd0D3713acc4AC",
    "HotlineBabe1900": "0x46047907a9569dA46A1F692c3512357E93F009B0",
    "CustomerSupport247": "0x1D5Cd15A04985eC3b26c9Ba98Bd1b38f8eB111BD",
    "cagla": "0x5C59808DC06857CD2D8b599734Fc2E9C152523cd"
  },
  mainnet: {},
}



export class Web3Provider {
  onConnectCbs = []
  ens = ''

  constructor() {
    if (window.ethereum) {
      try {
        this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        this.isEthBrowser = true

        let currentAccount

        this.provider.listAccounts().then(accounts => currentAccount = accounts[0])

        setRunInterval(async () => {
          const [connectedAccount, ...accounts] = await this.provider.listAccounts()
          if (currentAccount !== connectedAccount) {
            currentAccount = connectedAccount
            this.connect()
          }
        }, 500)

        this.isConnected()
          .then(async addr => {
            try {
              if (addr) {
                const ens = await this.getENS(addr)
                if (isENS(ens)) this.ens = ens
              }
            } catch(_e) {}
          })
      } catch (e) {
        console.error(e)
      }

    } else {
      console.log('no Web3 detected')
      this.isEthBrowser = false
    }
  }

  onConnect(cb, errorCb) {
    this.onConnectCbs.push(cb)
    this.isConnected()
      .then(addr => {
        if (addr) {
          return Promise.all([addr, this.getNetwork()])
        } else {
          return []
        }
      })
      .then(([addr, network]) => {
        if (addr) {
          cb(addr, network)
        }
      })
      .catch(errorCb)
  }

  connect() {
    this.onConnectCbs.forEach(async cb => cb(await this.isConnected()))
  }

  get signer() {
    return this.provider.getSigner()
  }

  async isConnected() {
    if (!this.isEthBrowser) return false

    try {
      return await this.signer.getAddress()
    } catch (e) {
      return false
    }
  }

  isWeb3() {
    return !!window.ethereum
  }

  rawContract(contractAddr, abi) {
    return new ethers.Contract(contractAddr, abi, this.provider)
  }

  async contract(contractAddr, abi) {
    const signer = await this.isConnected()
    if (signer) {
      const c = (new ethers.Contract(contractAddr, abi, this.provider)).connect(this.signer)
      return {
        ...c,
        queryFilter: async (...args) => new ethers.Contract(contractAddr, abi, this.provider).queryFilter(...args),
        async tributes(addr) {
          const t = await c.tributes(addr)

          const fakedPaymentAmount = clitLS.get(`__${contractAddr}_fakedPayments`)
          const amountToAdd = ethers.utils.parseEther(String(fakedPaymentAmount || 0))

          return t.add(amountToAdd)
        }
      }
    }
  }

  isAddress(addr) {
    return ethers.utils.isAddress(addr)
  }

  BN(n) {
    return ethers.BigNumber.from(n)
  }

  async getENS(addr) {
    return this.provider.lookupAddress(addr)
  }

  async getTransactionCount(addr) {
    return this.provider.getTransactionCount(addr)
  }


  async formatAddr(addr, truncate=true, nameLength=19) {
    try {
      const ens = await this.getENS(addr)
      if (isENS(ens)) {
        return ens.length > nameLength
          ? ens.slice(0, nameLength-3) + '...'
          : ens
      } else {
        return truncate ? truncateAddr(addr, nameLength) : addr
      }
    } catch (e) {
      return truncate ? truncateAddr(addr, nameLength) : addr
    }
  }

  async getETHBalance(addr) {
    return (await this.provider.getBalance(addr)) / 1e18
  }


  async getNetwork() {
    const network = await this.provider.getNetwork()
    const hasName = network.name && network.name !== 'unknown'
    const { chainId } = network

    let name
    if (network.chainId === 1) {
      name = 'mainnet'
    } else if (network.chainId === 31337) {
      name = 'local'
    } else if (network.chainId === 11155111) {
      name = 'sepolia'
    } else if (hasName) {
      name = network.name
    } else {
      name = network.chainId
    }


    const etherscanPrefix = name === 'sepolia' ? 'sepolia.' : ''


    return { name, chainId, hasName, network, etherscanPrefix }
  }

  async contractEvents(contract, event, filterArgs) {
    const filter = contract.filters[event](...filterArgs)
    return (await contract.queryFilter(filter)).map(e => ({
      ...e.args,
      blockNumber: e.blockNumber,
      txHash: e.transactionHash
    }))
  }

  async steviepContracts() {
    let networkName = (await provider.getNetwork()).name
    // if (networkName === 'local') networkName = 'mainnet'
    const signer = await this.isConnected()

    const erc20ABI = [
      'function balanceOf(address owner) external view returns (uint256 balance)',
      'function transfer(address, uint256) external',
      'event Transfer(address indexed from, address indexed to, uint256 value)'
    ]

    const erc721ABI = [
      'function balanceOf(address owner) external view returns (uint256 balance)'
    ]

    const erc721EnumerableABI = [
      'function tokensOfOwner(address owner) external view returns (uint256[])'
    ]

    const KYCABI = [
      'function addrToTokenId(address owner) external view returns (uint256 tokenId)',
      `function kycInfo(uint256 tokenId) external view returns (string firstName, string lastName, address addr)`,
    ]


    const CONTRACTS = STEVIEP_CONTRACTS[networkName]

    return {
      AB: this.rawContract(CONTRACTS.AB, erc721EnumerableABI).connect(signer),
      UFIM: this.rawContract(CONTRACTS.UFIM, erc721ABI).connect(signer),
      IOU: this.rawContract(CONTRACTS.IOU, erc721ABI).connect(signer),
      NVC: this.rawContract(CONTRACTS.NVC, erc721ABI).connect(signer),
      IFD: this.rawContract(CONTRACTS.IFD, erc721ABI).connect(signer),
      MMO: this.rawContract(CONTRACTS.MMO, erc721ABI).connect(signer),
      CASH: this.rawContract(CONTRACTS.CASH, erc721ABI).connect(signer),
      FastCash: this.rawContract(CONTRACTS.FastCash, erc20ABI).connect(signer),
      TenETH: this.rawContract(CONTRACTS.TenETH, erc721ABI).connect(signer),
      ETF: this.rawContract(CONTRACTS.ETF, erc20ABI).connect(signer),
      KYC: this.rawContract(CONTRACTS.KYC, KYCABI).connect(signer),
    }
  }

  async sexyContracts() {
    let networkName = (await provider.getNetwork()).name
    const signer = await this.isConnected()
    const GameABI = []

    const VIPABI = [
      'function totalSupply() external view returns (uint256)',
      'function balanceOf(address owner) external view returns (uint256)',
      'function maxSupply() external view returns (uint256)',
      'function ownerOf(uint256 tokenId) external view returns (address)',
      'function transferCredits(uint256 fromTokenId, uint256 toTokenId, uint256 amount) external',
      'function approveCredits(uint256 tokenId, address operator) external',
      'function creditBalance(uint256 tokenId) external view returns (uint256)',
      'function spendCredit(uint256 tokenId, address domAddr, uint256 amount) external',
      'function memberName(uint256 tokenId) external view returns (string)',
      'function isGold(uint256 tokenId) external view returns (bool)',
      'function exists(uint256 tokenId) external view returns (bool)'
    ]

    const VIPMinterABI = [
      'function mint(string name, bool isGold) external payable',
      'function mintPrice() external view returns (uint256)',
      'function goldPrice() external view returns (uint256)',
    ]

    const RouterABI = [
      'function premium(address user) external view returns (uint256)',
      'function applyPremium(uint256 p) external',
    ]

    const CONTRACTS = STEVIEP_CONTRACTS[networkName]

    return {
      // SexyGame: await this.contract(CONTRACTS.SexyGame, GameABI),
      SexyVIP: await this.contract(CONTRACTS.SexyVIP, VIPABI),
      SexyMinter: await this.contract(CONTRACTS.SexyMinter, VIPMinterABI),
      SexyRouter: await this.contract(CONTRACTS.SexyRouter, RouterABI),
    }
  }

  async domContract(name) {
    return (await this.domContracts())[name]

  }
  async domContracts() {
    const networkName = (await provider.getNetwork())?.name || 'mainnet'

    const domABI = [
      'event Send(address indexed sender, uint256 amount)',
      'function tributes(address) external view returns (uint256)'
    ]

    const vinceABI = [
      ...domABI,
      'function fastcashPrice() external view returns (uint256)',
      'function buyFastCash() payable external returns ()',
    ]

    const goddessABI = [
      ...domABI,
      'function cleanse() external payable',
      'function cleansedETH(address) external view returns (uint256)'
    ]

    const stevieABI = [
      ...domABI,
      'function sexyGame() external view returns (address)',
    ]

    const CONTRACTS = DOM_CONTRACTS[networkName]


    return {
      heatherHot: await this.contract(CONTRACTS.heatherHot, domABI),
      katFischer: await this.contract(CONTRACTS.katFischer, domABI),
      SamanthaJones: await this.contract(CONTRACTS.SamanthaJones, domABI),
      VinceSlickson: await this.contract(CONTRACTS.VinceSlickson, vinceABI),
      CrystalGoddess: await this.contract(CONTRACTS.CrystalGoddess, goddessABI),
      DrAndy: await this.contract(CONTRACTS.DrAndy, domABI),
      DungeonMistress: await this.contract(CONTRACTS.DungeonMistress, domABI),
      '0x000000000000000000000000000000000': await this.contract(CONTRACTS['0x000000000000000000000000000000000'], domABI),
      SpecialAgentDiane: await this.contract(CONTRACTS['0x000000000000000000000000000000000'], domABI),
      QueenJessica: await this.contract(CONTRACTS.QueenJessica, domABI),
      steviep: await this.contract(CONTRACTS.steviep, stevieABI),
      Hedonitronica: await this.contract(CONTRACTS.Hedonitronica, domABI),
      MindyRouge: await this.contract(CONTRACTS.MindyRouge, domABI),
      CandyCrush: await this.contract(CONTRACTS.CandyCrush, domABI),
      SexyXXXpress: await this.contract(CONTRACTS.SexyXXXpress, domABI),
      RonaMerch: await this.contract(CONTRACTS.RonaMerch, domABI),
      MoneyMommy777: await this.contract(CONTRACTS.MoneyMommy777, domABI),
      HotlineBabe1900: await this.contract(CONTRACTS.HotlineBabe1900, domABI),
      CustomerSupport247: await this.contract(CONTRACTS.CustomerSupport247, domABI),
      cagla: await this.contract(CONTRACTS.cagla, domABI),

    }


  }
}



export const provider = new Web3Provider()

window.__provider = provider
