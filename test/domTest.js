const { expect, use } = require('chai')
const { ethers, waffle } = require('hardhat')
const { expectRevert, time, snapshot } = require('@openzeppelin/test-helpers')



const toETH = amt => ethers.utils.parseEther(String(amt))
const bidAmount = amt => ({ value: toETH(amt) })
const num = n => Number(ethers.utils.formatEther(n))
const _num = n => n.toString()

const utf8Clean = raw => raw.replace(/data.*utf8,/, '')
const b64Clean = raw => raw.replace(/data.*,/, '')
const b64Decode = raw => Buffer.from(b64Clean(raw), 'base64').toString('utf8')
const getJsonURI = rawURI => JSON.parse(utf8Clean(rawURI))
const getSVG = rawURI => b64Decode(JSON.parse(utf8Clean(rawURI)).image)
const bnToN = bn => Number(bn.toString())


function times(t, fn) {
  const out = []
  for (let i = 0; i < t; i++) {
    out.push(fn(i))
  }
  return out
}


const zeroAddr = '0x0000000000000000000000000000000000000000'
const safeTransferFrom = 'safeTransferFrom(address,address,uint256)'


describe('Doms', () => {
  const Doms = {}

  let signers, artist, paypig

  beforeEach(async () => {
    signers = await ethers.getSigners()
    artist = signers[0]
    paypig = signers[1]


    const doms = [
      'ABMock',
      'FastCashMock',
      'UFIMMock',
      'IOUMock',
      'NVCMock',
      'IFDMock',
      'MMOMock',
      'CASHMock',
      'TenETHMock',

      'HeatherHot',
      'KatFischer',
      'SamanthaJones',
      'VinceSlickson',

    ]

    for (let dom of doms) {
      const factory = await ethers.getContractFactory(dom, artist)
      const contract = await factory.deploy()
      await contract.deployed()
      Doms[dom] = contract
    }
  })

  describe('SamanthaJones', () => {
    it('should work', async () => {
      const steveip = await ethers.getImpersonatedSigner('0x8D55ccAb57f3Cba220AB3e3F3b7C9F59529e5a65')
      await steveip.sendTransaction({to: Doms.SamanthaJones.address, value: ethers.utils.parseEther('0.01')})
      await steveip.sendTransaction({to: Doms.SamanthaJones.address, value: ethers.utils.parseEther('0.01')})

      expect(bnToN(await Doms.SamanthaJones.connect(steveip).tributes(steveip.address))).to.equal(1)
      await steveip.sendTransaction({to: Doms.SamanthaJones.address, value: ethers.utils.parseEther('0.05')})
      expect(bnToN(await Doms.SamanthaJones.connect(steveip).tributes(steveip.address))).to.equal(2)

    })
  })

})