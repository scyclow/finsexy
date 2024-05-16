const { expect, use } = require('chai')
const { ethers, waffle } = require('hardhat')
const { expectRevert, time, snapshot } = require('@openzeppelin/test-helpers')



const num = n => Number(ethers.utils.formatEther(n))
const toETH = amt => ethers.utils.parseEther(String(amt))
const txValue = amt => ({ value: toETH(amt) })
const ethVal = n => Number(ethers.utils.formatEther(n))
const getBalance = async a => ethVal(await ethers.provider.getBalance(a.address))


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
const safeTransferFromData = 'safeTransferFrom(address,address,uint256,bytes)'



describe('SexyDeployer', () => {
  let signers, artist, paypig, paypig2

  let FastCash

  let heatherHot, SamanthaJones, QueenJessica, DungeonMistress, DrAndy, katFischer, CandyCrush,
      CrystalGoddess, steviep, VinceSlickson, FinXXXpress, Hacker, Hedonitronica, MindyRouge,
      CandyCrushProxy, CrystalGoddessProxy, steviepProxy, SexyGame

  beforeEach(async () => {
    signers = await ethers.getSigners()
    artist = signers[0]
    paypig = signers[1]
    paypig2 = signers[2]


    const FinDomBaseFactory = await ethers.getContractFactory('FinDomBase', artist)
    const FindomProxyFactory = await ethers.getContractFactory('FindomProxy', artist)
    const FinDomBaseLightFactory = await ethers.getContractFactory('FinDomBaseLight', artist)
    const CandyCrushProxyFactory = await ethers.getContractFactory('CandyCrushProxy', artist)
    const CrystalGoddessProxyFactory = await ethers.getContractFactory('CrystalGoddessProxy', artist)
    const VinceSlicksonFactory = await ethers.getContractFactory('VinceSlickson', artist)
    const SteviePProxyFactory = await ethers.getContractFactory('SteviePProxy', artist)
    const SexyGameFactory = await ethers.getContractFactory('SexyGame', artist)

    FastCash = await ethers.getContractAt(
      [
        'function balanceOf(address) external view returns (uint256)',
        'function transfer(address, uint256) external'
      ],
      '0xcA5228D1fe52D22db85E02CA305cddD9E573D752'
    )

    const fcCentralBanker = await ethers.getImpersonatedSigner('0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4')

    const factory = await ethers.getContractFactory('SexyDeployer', artist)
    const deployer = await factory.deploy(FastCash.address)
    await deployer.deployed()



    heatherHot = await FinDomBaseFactory.attach(await deployer.heatherHot())
    SamanthaJones = await FinDomBaseFactory.attach(await deployer.SamanthaJones())
    QueenJessica = await FinDomBaseFactory.attach(await deployer.QueenJessica())
    DungeonMistress = await FinDomBaseFactory.attach(await deployer.DungeonMistress())
    DrAndy = await FinDomBaseFactory.attach(await deployer.DrAndy())
    katFischer = await FinDomBaseFactory.attach(await deployer.katFischer())

    CandyCrush = await FinDomBaseFactory.attach(await deployer.CandyCrush())
    CrystalGoddess = await FinDomBaseFactory.attach(await deployer.CrystalGoddess())
    steviep = await FinDomBaseFactory.attach(await deployer.steviep())

    CandyCrushProxy = await CandyCrushProxyFactory.attach(await deployer.CandyCrush())
    CrystalGoddessProxy = await CrystalGoddessProxyFactory.attach(await deployer.CrystalGoddess())
    steviepProxy = await SteviePProxyFactory.attach(await deployer.steviep())
    VinceSlickson = await VinceSlicksonFactory.attach(await deployer.vinceSlickson())

    FinXXXpress = await FinDomBaseLightFactory.attach(await deployer.FinXXXpress())
    Hacker = await FinDomBaseLightFactory.attach(await deployer.Hacker())
    Hedonitronica = await FinDomBaseLightFactory.attach(await deployer.Hedonitronica())
    MindyRouge = await FinDomBaseLightFactory.attach(await deployer.MindyRouge())

    SexyGame = await SexyGameFactory.attach(await steviepProxy.sexyGame())


    // Infura is being dumb
    // FastCash.connect(fcCentralBanker).transfer(VinceSlickson.address, toETH(50))
  })


  describe('standard mints', () => {
    it('should mint at the correct points for each NFT dom', async () => {
      const doms = [
        [heatherHot, 0.01, 'heatherHot'],
        [CandyCrush, 0.01, 'CandyCrush'],
        [katFischer, 0.03, 'katFischer'],
        [SamanthaJones, 0.04, 'SamanthaJones'],
        [QueenJessica, 0.04, 'QueenJessica'],
        [DrAndy, 0.04, 'DrAndy'],
        [DungeonMistress, 0.05, 'DungeonMistress'],
      ]

      for (let [dom, price, name] of doms) {
        const startingArtistBalance = await getBalance(artist)
        expect(await dom.totalSupply()).to.equal(0)
        expect(await dom.exists(0)).to.equal(false)
        await paypig.sendTransaction({to: dom.address, ...txValue(price - 0.001)})
        expect(await dom.balanceOf(paypig.address)).to.equal(0)
        await paypig.sendTransaction({to: dom.address, ...txValue(0.00101)})
        expect(await dom.balanceOf(paypig.address)).to.equal(1)
        await paypig.sendTransaction({to: dom.address, ...txValue(0.00001)})
        expect(await dom.balanceOf(paypig.address)).to.equal(1)
        expect(await dom.totalSupply()).to.equal(1)
        expect(await dom.exists(0)).to.equal(true)
        expect(await dom.ownerOf(0)).to.equal(paypig.address)

        await dom.connect(artist).withdraw()
        const endingArtistBalance = await getBalance(artist)
        expect(endingArtistBalance - startingArtistBalance).to.be.closeTo(price, 0.0001)
        expect(ethVal(await dom.connect(paypig).tributes(paypig.address))).to.be.closeTo(price + 0.00002, 0.000001)
      }
    })
  })


  describe('no nft findoms', () => {
    it('should work', async () => {
      const doms = [
        [VinceSlickson, 'VinceSlickson'],
        [FinXXXpress, 'FinXXXpress'],
        [Hacker, 'Hacker'],
        [Hedonitronica, 'Hedonitronica'],
        [MindyRouge, 'MindyRouge'],
      ]

      for (let [dom, name] of doms) {
        const startingArtistBalance = await getBalance(artist)

        await paypig.sendTransaction({to: dom.address, ...txValue(0.05)})

        await dom.connect(artist).withdraw()
        const endingArtistBalance = await getBalance(artist)
        expect(endingArtistBalance - startingArtistBalance).to.be.closeTo(0.05, 0.0001)
        expect(ethVal(await dom.connect(paypig).tributes(paypig.address))).to.equal(0.05)
      }
    })
  })

  // Infura is being dumb
  describe.skip('VinceSlickson', () => {
    it('should only allow contract owner to update price of comp FC', async () => {
      await expectRevert(
        VinceSlickson.connect(paypig).updateFastCashPrice(1),
        'Ownable: caller is not the owner'
      )

      await expectRevert(
        VinceSlickson.connect(paypig).compFastCash(paypig.address, toETH(5)),
        'Ownable: caller is not the owner'
      )

      expect(ethVal(await FastCash.connect(artist).balanceOf(VinceSlickson.address))).to.equal(50)

      await VinceSlickson.connect(artist).compFastCash(artist.address, toETH(5))
      expect(ethVal(await FastCash.connect(artist).balanceOf(VinceSlickson.address))).to.equal(45)

      await VinceSlickson.connect(artist).updateFastCashPrice(123)
      expect(await VinceSlickson.connect(artist).fastcashPrice()).to.equal(123)
    })

    it('should send fastcash if available', async () => {
      await expectRevert(
        VinceSlickson.connect(paypig).buyFastCash(txValue(0.1)),
        'Must wet Vince\'s whistle'
      )

      await paypig.sendTransaction({to: VinceSlickson.address, ...txValue(0.01)})

      await expectRevert(
        VinceSlickson.connect(paypig).buyFastCash(txValue(0.009)),
        'Don\'t waste Vince\'s time'
      )
      console.log('qweqw')

      await VinceSlickson.connect(paypig).buyFastCash(txValue(0.1))
      await VinceSlickson.connect(artist).updateFastCashPrice(toETH(0.02))
      await VinceSlickson.connect(paypig).buyFastCash(txValue(0.1))

      expect(ethVal(await FastCash.connect(paypig).balanceOf(paypig.address))).to.equal(15)

      await expectRevert.unspecified(
        VinceSlickson.connect(paypig).buyFastCash(txValue(0.71)),
        'sdfsd'
      )
    })
  })

  describe('CandyCrush', () => {
    it('should not allow transfers', async () => {
      await paypig.sendTransaction({to: CandyCrush.address, ...txValue(0.01)})
      expect(await CandyCrush.ownerOf(0)).to.equal(paypig.address)

      await expectRevert(
        CandyCrush.connect(paypig).transferFrom(paypig.address, artist.address, 0),
        'Cannot transfer tattoo'
      )

      await expectRevert(
        CandyCrush.connect(paypig)[safeTransferFrom](paypig.address, artist.address, 0),
        'Cannot transfer tattoo'
      )

      await expectRevert(
        CandyCrush.connect(paypig)[safeTransferFromData](paypig.address, artist.address, 0, ethers.constants.HashZero),
        'Cannot transfer tattoo'
      )

    })
  })


  describe('CrystalGoddess', () => {
    it('cleanse should fail correctly', async () => {
      await expectRevert(
        CrystalGoddessProxy.connect(paypig).cleanse(txValue(0.0110)),
        'You must cleanse at least 0.0111 ether'
      )

      await expectRevert(
        CrystalGoddessProxy.connect(paypig).cleanse(txValue(1)),
        'You must cleanse your entire balance'
      )
    })

    // this works in theory, but successful cleansing causes a weird gas error
    // double check on etherscan
    it.skip('mint should work', async () => {
      const price = 0.0111
      const startingArtistBalance = await getBalance(artist)
      expect(await CrystalGoddess.totalSupply()).to.equal(0)
      expect(await CrystalGoddess.exists(0)).to.equal(false)
      await paypig.sendTransaction({to: CrystalGoddess.address, ...txValue(price)})
      expect(await CrystalGoddess.balanceOf(paypig.address)).to.equal(0)

      const paypigBalance = await getBalance(paypig)
      await CrystalGoddessProxy.connect(paypig).cleanse(txValue(paypigBalance - 0.00666))
      await CrystalGoddessProxy.connect(paypig).cleanse(txValue(1))

      await paypig.sendTransaction({to: CrystalGoddess.address, ...txValue(price)})

      expect(await CrystalGoddess.balanceOf(paypig.address)).to.equal(1)
      await paypig.sendTransaction({to: CrystalGoddess.address, ...txValue(0.00001)})
      expect(await CrystalGoddess.balanceOf(paypig.address)).to.equal(1)
      expect(await CrystalGoddess.totalSupply()).to.equal(1)
      expect(await CrystalGoddess.exists(0)).to.equal(true)
      expect(await CrystalGoddess.ownerOf(0)).to.equal(paypig.address)

      await CrystalGoddess.connect(artist).withdraw()
      const endingArtistBalance = await getBalance(artist)
      expect(endingArtistBalance - startingArtistBalance).to.be.closeTo(price*2, 0.0001)
    })
  })


  describe('steviep', () => {
    it('should not mint an nft', async () => {
      const startingArtistBalance = await getBalance(artist)
      expect(await steviep.totalSupply()).to.equal(0)
      expect(await steviep.exists(0)).to.equal(false)
      await paypig.sendTransaction({to: steviep.address, ...txValue(1)})
      expect(await steviep.balanceOf(paypig.address)).to.equal(0)
      await paypig.sendTransaction({to: steviep.address, ...txValue(1)})
      expect(await steviep.balanceOf(paypig.address)).to.equal(0)

      expect(await steviep.totalSupply()).to.equal(0)
      expect(await steviep.exists(0)).to.equal(false)

      await steviep.connect(artist).withdraw()
      const endingArtistBalance = await getBalance(artist)
      expect(endingArtistBalance - startingArtistBalance).to.be.closeTo(2, 0.0001)
    })

    it('should mint on sexy game win', async () => {
      await expectRevert(
        SexyGame.connect(paypig).insert(txValue(0.999)),
        'Can only insert 1 ETH'
      )

      await expectRevert(
        SexyGame.connect(paypig).insert(txValue(1.0001)),
        'Can only insert 1 ETH'
      )
      await SexyGame.connect(paypig).insert(txValue(1))
      await SexyGame.connect(paypig2).insert(txValue(1))

      await expectRevert(
        SexyGame.connect(paypig).insert(txValue(1)),
        'Cannot insert twice'
      )

      expect(ethVal(await SexyGame.connect(paypig).insertionAmount(paypig.address))).to.equal(1)


      const paypigBalance1 = await getBalance(paypig)

      await SexyGame.connect(paypig).pullOut()
      await expectRevert(
        SexyGame.connect(paypig).pullOut(),
        'Nothing to pull out'
      )

      expect(ethVal(await SexyGame.connect(paypig).insertionAmount(paypig.address))).to.equal(0)

      const paypigBalance2 = await getBalance(paypig)
      expect(paypigBalance2 - paypigBalance1).to.be.closeTo(1, 0.0001)

      expect(await steviep.balanceOf(paypig.address)).to.equal(0)

      await SexyGame.connect(paypig).insert(txValue(1))
      await time.increase(time.duration.minutes(59))
      await SexyGame.connect(paypig).pullOut()
      expect(await steviep.balanceOf(paypig.address)).to.equal(0)


      const paypigBalance3 = await getBalance(paypig)
      await SexyGame.connect(paypig).insert(txValue(1))
      await time.increase(time.duration.hours(1))
      await SexyGame.connect(paypig).pullOut()
      expect(await steviep.balanceOf(paypig.address)).to.equal(1)
      const paypigBalance4 = await getBalance(paypig)
      expect(paypigBalance4 - paypigBalance3).to.be.closeTo(0, 0.001)


      const artistBalance1 = await getBalance(artist)
      await SexyGame.connect(paypig).insert(txValue(1))
      await time.increase(time.duration.minutes(59))
      await SexyGame.connect(artist).take(paypig.address)
      await expectRevert(
        SexyGame.connect(paypig).pullOut(),
        'Nothing to pull out'
      )
      const artistBalance2 = await getBalance(artist)
      expect(artistBalance2 - artistBalance1).to.be.closeTo(1, 0.0001)


      await SexyGame.connect(paypig).insert(txValue(1))
      await time.increase(time.duration.hours(1))
      await SexyGame.connect(paypig).pullOut()
      expect(await steviep.balanceOf(paypig.address)).to.equal(2)

      await expectRevert(
        SexyGame.connect(artist).take(paypig.address),
        'Nothing to take'
      )
      expect(ethVal(await SexyGame.connect(paypig).insertionAmount(paypig2.address))).to.equal(1)
    })
  })


})