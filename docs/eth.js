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


export const STEVIEP_CONTRACTS = {
  local: {
    AB: '0xf93b0549cD50c849D792f0eAE94A598fA77C7718',
    FastCash: '0x8CeA85eC7f3D314c4d144e34F2206C8Ac0bbadA1',
    UFIM: '0x29023DE63D7075B4cC2CE30B55f050f9c67548d4',
    IOU: '0xCA87833e830652C2ab07E1e03eBa4F2c246D3b58',
    NVC: '0x9Bb65b12162a51413272d10399282E730822Df44',
    IFD: '0x7A5EC257391817ef241ef8451642cC6b222d4f8C',
    MMO: '0x90E75f390332356426B60FB440DF23f860F6A113',
    CASH: '0x59c7D03d2E9893FB7bAa89dA50a9452e1e9B8b90',
    TenEth: '0x834Ea01e45F9b5365314358159d92d134d89feEb',
    ETF: '0x0dEe24C99e8dF7f0E058F4F48f228CC07DB704Fc',
    KYC: '0xFcCa971FE9Ee20C1Cf22596E700aA993D8fD19c5',
  },
  goerli: {

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
    heatherHot: '0xCC5Bc84C3FDbcF262AaDD9F76652D6784293dD9e',
    katFischer: '0x273c507D8E21cDE039491B14647Fe9278D88e91D',
    SamanthaJones: '0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc',
    VinceSlickson: '0x10537D7bD661C9c34F547b38EC662D6FD482Ae95',
    CrystalGoddess: '0xfb6dAB6200b8958C2655C3747708F82243d3F32E',
    DrAndy: '0xabebE9a2D62Af9a89E86EB208b51321e748640C3',
    DungeonMistress: '0xbc71F5687CFD36f64Ae6B4549186EE3A6eE259a4',
    '0x000000000000000000000000000000000': '0x28227B230d3945e580eD3B1c6c8ea1df658A7AA9',
    'SpecialAgentDiane': '0x28227B230d3945e580eD3B1c6c8ea1df658A7AA9',
    QueenJessica: '0x41219a0a9C0b86ED81933c788a6B63Dfef8f17eE',
    steviep: '0xF67e26649037695DdFAB19f4E22d5c9Fd1564592',
    Hedonitronica: '0x6431AF84d34F0522cAA58b221d94A150B5AdAC69',
  },
  goerli: {},
  mainnet: {},
}



export class Web3Provider {
  onConnectCbs = []

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
        console.log(`New connection: ${addr}`)
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


  async getENS(addr) {
    return this.provider.lookupAddress(addr)
  }

  async getTransactionCount(addr) {
    return this.provider.getTransactionCount(addr)
  }


  async formatAddr(addr, truncate=true, nameLength=19) {
    try {
      const ens = await this.getENS(addr)
      if (ens.slice(-4) === '.eth') {
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
    } else if (hasName) {
      name = network.name
    } else {
      name = network.chainId
    }


    const etherscanPrefix = name === 'goerli' ? 'goerli.' : ''


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
    if (networkName === 'local') networkName = 'mainnet'
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
    }


  }
}



export const provider = new Web3Provider()
