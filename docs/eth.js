import {} from './min.ethers.js'

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


function isENS(ens) {
  return ens.slice(-4) === '.eth'
}

window.toETH = toETH
window.bnToN = bnToN
window.fromWei = fromWei



export const FINSEXY_CONTRACT = {
  local: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  sepolia: '0x42714cC3fffC02BCCEafEAD06f9Eb644Df6BcBC6',
  mainnet: ''
}


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
    "FinSexy": "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    "ETF": "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    "KYC": "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
  },
  sepolia: {
    AB: '0x0Fe369b47d8CbEed0586dbaa0dbfee2b249B1C64',
    FastCash: '0xDd3075604272ecb847338Ee3C8A36cd4B6F25f9B',
    UFIM: '0x6b066289884b71182f9fBB98EDfa1eA5Aa53AC2E',
    IOU: '0xac2a54817D6Db0215f592cc50Bcf362A18257963',
    NVC: '0x7689D9d97B767D93c98F85266C5C3c37a246B0C1',
    IFD: '0x85E49424ca0074DB4F1Ae491b1AC02A6090F3d74',
    MMO: '0xf4602A751bb3A5899c7D2C9851e9B1D7A95FCB3e',
    CASH: '0xa24B9F0c2905b370BF2C4AA6bE9715361e86C1e1',
    TenEth: '0x0BE1F7BE6996F969b8e2c68a6F532BE946b57c9a',
    ETF: '0xBe79cF3F13Ded8334dbEe23c7aeE078118eEc45C',
    KYC: '0x9fd04fafD998bfd1bA9aadd24ef1864A5620C05C',
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
    TenEth: '0x13bBBEfE251c94467D183821b663Ef0bD0a8A722',
    ETF: '0x7102653225D537e2FE703723ad83edFeb606396e',
    KYC: '0x0BB72cE0cFE446DD89129B4335e29c0fbbE0c93C',
  }
}

export const DOM_CONTRACTS = {
  local: {
    "SamanthaJones": "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
    "VinceSlickson": "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
    "CrystalGoddess": "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
    "DrAndy": "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1",
    "DungeonMistress": "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
    "QueenJessica": "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    "Hedonitronica": "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB",
    "CandyCrush": "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9",
    "MindyRouge": "0x851356ae760d987E095750cCeb3bC6014560891C",
    "FinXXXpress": "0x95401dc811bb5740090279Ba06cfA8fcF6113778",
    "heatherHot": "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
    "katFischer": "0x9A676e781A523b5d0C0e43731313A708CB607508",
    "SpecialAgentDiane": "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E",
    "steviep": "0xc5a5C42992dECbae36851359345FE25997F5C42d",
    "0x000000000000000000000000000000000": "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E"
  },
  sepolia: {
    SamanthaJones: '0x40f34B5DCc2b8182037b58Add64FD84Ebc60aF04',
    VinceSlickson: '0xbCa00b868294E500d7f047E0C548A20967616330',
    CrystalGoddess: '0x9765F904Efd22AF60A0426CFBEd9d649b5b42a44',
    DrAndy: '0x0353a4df0166Ed29dad300BbF740F6Ad17b5cbDa',
    DungeonMistress: '0xF9c7CB228f0348651F966d700ac927b2A1bd4848',
    QueenJessica: '0x21949D2B84b158a03103A55AAd03523A3D4c3759',
    Hedonitronica: '0x3f351312c0C1183FCe362Ef7f68e8c1895f23Ff6',
    MindyRouge: '0x3f351312c0C1183FCe362Ef7f68e8c1895f23Ff6', // TODO
    FinXXXpress: '0x3f351312c0C1183FCe362Ef7f68e8c1895f23Ff6', // TODO
    CandyCrush: '0xAc35C2714D7B721795334a166Ff8c4D4F8201776', // TODO
    heatherHot: '0xAc35C2714D7B721795334a166Ff8c4D4F8201776',
    katFischer: '0x21949D2B84b158a03103A55AAd03523A3D4c3759',
    SpecialAgentDiane: '0x95d427A098Da43cB3990EDEFca5f1dECd2e00AbD',
    steviep: '0xA2cdc432d3bAfAbE89b5BAC58A5fAfc9107cA76c',
    '0x000000000000000000000000000000000': '0x95d427A098Da43cB3990EDEFca5f1dECd2e00AbD',
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
          cb(addr)
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
      return (new ethers.Contract(contractAddr, abi, this.provider)).connect(this.signer)
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
      TenEth: this.rawContract(CONTRACTS.TenEth, erc721ABI).connect(signer),
      ETF: this.rawContract(CONTRACTS.ETF, erc20ABI).connect(signer),
      KYC: this.rawContract(CONTRACTS.KYC, KYCABI).connect(signer),
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
      'function erc20Price() external view returns (uint256)',
      'function sellERC20(address) payable external returns ()',
    ]

    const goddessABI = [
      ...domABI,
      'function cleanse() external payable'
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
      'SpecialAgentDiane': await this.contract(CONTRACTS['0x000000000000000000000000000000000'], domABI),
      QueenJessica: await this.contract(CONTRACTS.QueenJessica, domABI),
      steviep: await this.contract(CONTRACTS.steviep, domABI),
      Hedonitronica: await this.contract(CONTRACTS.Hedonitronica, domABI),
      MindyRouge: await this.contract(CONTRACTS.MindyRouge, domABI),
      CandyCrush: await this.contract(CONTRACTS.CandyCrush, domABI),
      FinXXXpress: await this.contract(CONTRACTS.FinXXXpress, domABI),
    }


  }
}



export const provider = new Web3Provider()

window.__provider = provider
