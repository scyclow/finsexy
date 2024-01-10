import {} from './min.ethers.js'

export const bnToN = bn => Number(bn.toString())
export const ethVal = n => Number(ethers.utils.formatEther(n))
export const truncateAddr = addr => addr.slice(0, 6) + '...' + addr.slice(-4)
export const toETH = amt => ethers.utils.parseEther(String(amt))
export const fromWei = amt => amt/1e18
export const ethValue = amt => ({ value: toETH(amt) })
export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'


function isENS(ens) {
  return ens.slice(-4) === '.eth'
}

window.toETH = toETH
window.bnToN = bnToN

const network = 'mainnet'
const etherscanPrefix = network === 'goerli' ? 'goerli.' : ''




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
        return truncate ? truncateAddr(addr) : addr
      }
    } catch (e) {
      return truncate ? truncateAddr(addr) : addr
    }
  }

  async getETHBalance(addr) {
    return (await this.provider.getBalance(addr)) / 1e18
  }

  async getNetwork() {
    const network = await this.provider.getNetwork()
    const hasName = network.name && network.name !== 'unknown'

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


    return { name, hasName, network, etherscanPrefix }
  }

  async steviepContracts(networkOverride='') {
    const networkName = networkOverride || (await provider.getNetwork()).name
    const signer = await this.isConnected()

    const erc20ABI = [
      'function balanceOf(address owner) external view returns (uint256 balance)'
    ]

    const erc721ABI = [
      'function balanceOf(address owner) external view returns (uint256 balance)'
    ]

    const erc721EnumerableABI = [
      'function tokensOfOwner(address owner) external view returns (uint256[])'
    ]


    const CONTRACTS = {
      local: {
        AB: '0xcb0A9835CDf63c84FE80Fcc59d91d7505871c98B',
        FastCash: '0xFD296cCDB97C605bfdE514e9810eA05f421DEBc2',
        UFIM: '0x8b9d5A75328b5F3167b04B42AD00092E7d6c485c',
        IOU: '0x9BcA065E19b6d630032b53A8757fB093CbEAfC1d',
        NVC: '0xd8A9159c111D0597AD1b475b8d7e5A217a1d1d05',
        IFD: '0xCdb63c58b907e76872474A0597C5252eDC97c883',
        MMO: '0x15BB2cc3Ea43ab2658F7AaecEb78A9d3769BE3cb',
        CASH: '0xa4d0806d597146df93796A38435ABB2a3cb96677',
        TenEth: '0xAE246E208ea35B3F23dE72b697D47044FC594D5F',
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
      }
    }[networkName]

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
    }
  }
}



export const provider = new Web3Provider()
