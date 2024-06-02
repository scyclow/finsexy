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
const decodeImage = parsedURI => b64Decode(parsedURI.image)
const getSVG = rawURI => decodeImage(getJsonURI(rawURI))
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
const spendCredit = 'spendCredit(uint256,address,uint256)'
const spendCreditPresent = 'spendCredit(uint256,address,uint256,address)'



describe('FinSexy', () => {
  let signers, artist, paypig, paypig2

  let FastCash, SexyVIP, SexyBaseURI, SexyGame, SexyMinter, CandyCrushURI

  let heatherHot, SamanthaJones, QueenJessica, DungeonMistress, DrAndy, katFischer, CandyCrush,
      CrystalGoddess, steviep, VinceSlickson, SexyXXXpress, Hacker, Hedonitronica, MindyRouge,
      CandyCrushProxy, CrystalGoddessProxy, steviepProxy, DrAndyProxy

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
    const DrAndyProxyFactory = await ethers.getContractFactory('DrAndyProxy', artist)
    const SexyXXXpressBaseFactory = await ethers.getContractFactory('SexyXXXpressBase', artist)

    const SexyGameFactory = await ethers.getContractFactory('SexyGame', artist)
    const SexyVIPFactory = await ethers.getContractFactory('SexyVIP', artist)
    const SexyBaseURIFactory = await ethers.getContractFactory('SexyBaseURI', artist)
    const SexyMinterFactory = await ethers.getContractFactory('SexyMinter', artist)
    const SexyVIPTokenURIFactory = await ethers.getContractFactory('SexyVIPTokenURI', artist)
    const SexyRouterFactory = await ethers.getContractFactory('SexyRouter', artist)

    FastCash = await ethers.getContractAt(
      [
        'function balanceOf(address) external view returns (uint256)',
        'function transfer(address, uint256) external'
      ],
      '0xcA5228D1fe52D22db85E02CA305cddD9E573D752'
    )

    const fcCentralBanker = await ethers.getImpersonatedSigner('0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4')

    SexyRouter = await SexyRouterFactory.deploy()
    await SexyRouter.deployed()

    SexyVIP = await SexyVIPFactory.attach(await SexyRouter.vip())
    SexyMinter = await SexyMinterFactory.attach(await SexyVIP.minter())
    SexyVIPTokenURI = await SexyVIPTokenURIFactory.attach(await SexyVIP.uri())
    SexyBaseURI = await SexyBaseURIFactory.attach(await SexyRouter.baseURI())

    const factory = await ethers.getContractFactory('SexyDeployer', artist)
    const deployer = await factory.deploy(SexyRouter.address)
    await deployer.deployed()

    const factory2 = await ethers.getContractFactory('SexyDeployer2', artist)
    const deployer2 = await factory2.deploy(SexyRouter.address, FastCash.address)
    await deployer2.deployed()

    const baseContract = await deployer.baseContract()

    const factory3 = await ethers.getContractFactory('SexyDeployer3', artist)
    const deployer3 = await factory3.deploy(SexyRouter.address, baseContract)
    await deployer3.deployed()



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
    DrAndyProxy = await DrAndyProxyFactory.attach(await deployer.DrAndy())


    SexyXXXpress = await SexyXXXpressBaseFactory.attach(await deployer3.connect(artist).SexyXXXpress())
    SexyXXXpressA = await FinDomBaseFactory.attach(await SexyXXXpress.a())
    SexyXXXpressB = await FinDomBaseFactory.attach(await SexyXXXpress.b())
    SexyXXXpressC = await FinDomBaseFactory.attach(await SexyXXXpress.c())




    VinceSlickson = await VinceSlicksonFactory.attach(await deployer2.vinceSlickson())
    Hacker = await FinDomBaseLightFactory.attach(await deployer2.Hacker())
    Hedonitronica = await FinDomBaseLightFactory.attach(await deployer2.Hedonitronica())
    MindyRouge = await FinDomBaseLightFactory.attach(await deployer2.MindyRouge())

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
        [SamanthaJones, 0.03, 'SamanthaJones'],
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

      // for (let i=0; i<100; i++) {
      //   await paypig.sendTransaction({to: DungeonMistress.address, ...txValue(0.05)})
      //   await paypig.sendTransaction({to: heatherHot.address, ...txValue(0.01)})
      // }
      // expect(await DungeonMistress.totalSupply()).to.equal(64)
      // expect(await heatherHot.totalSupply()).to.equal(101)
    })
  })

  it.only('should handle SexyXXXpress properly', async () => {
    expect(await SexyXXXpressA.totalSupply()).to.equal(0)
    expect(await SexyXXXpressB.totalSupply()).to.equal(0)
    expect(await SexyXXXpressC.totalSupply()).to.equal(0)

    for (let i = 0; i < 200; i++) {
      await paypig.sendTransaction({
        to: SexyXXXpressA.address,
        ...txValue(0.01)
      })
    }

    for (let i = 0; i < 100; i++) {
      await paypig.sendTransaction({
        to: SexyXXXpressB.address,
        ...txValue(0.01)
      })
    }

    for (let i = 0; i < 50; i++) {
      await paypig.sendTransaction({
        to: SexyXXXpressC.address,
        ...txValue(0.01)
      })
    }

    expect(await SexyXXXpressA.totalSupply()).to.equal(200)
    expect(await SexyXXXpressB.totalSupply()).to.equal(100)
    expect(await SexyXXXpressC.totalSupply()).to.equal(50)

    expect(ethVal(await SexyXXXpressA.tributes(paypig.address))).to.equal(2)
    expect(ethVal(await SexyXXXpressB.tributes(paypig.address))).to.equal(1)
    expect(ethVal(await SexyXXXpressC.tributes(paypig.address))).to.equal(0.5)

    expect(ethVal(await SexyXXXpress.tributes(paypig.address))).to.equal(3.5)


    await expectRevert(
      paypig.sendTransaction({
        to: SexyXXXpressA.address,
        ...txValue(0.01)
      }),
      'ERROR: SUPPLY EXCEEDED'
    )

    await expectRevert(
      paypig.sendTransaction({
        to: SexyXXXpressB.address,
        ...txValue(0.01)
      }),
      'ERROR: SUPPLY EXCEEDED'
    )


    await expectRevert(
      paypig.sendTransaction({
        to: SexyXXXpressC.address,
        ...txValue(0.01)
      }),
      'ERROR: SUPPLY EXCEEDED'
    )


      await paypig.sendTransaction({
        to: SexyXXXpress.address,
        ...txValue(0.01)
      })

    expect(ethVal(await SexyXXXpress.tributes(paypig.address))).to.equal(3.51)

  })


  describe('no nft findoms', () => {
    it('should work', async () => {
      const doms = [
        [VinceSlickson, 'VinceSlickson'],
        [SexyXXXpress, 'SexyXXXpress'],
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
        CrystalGoddessProxy.connect(paypig).cleanse(txValue(0.00999)),
        'You must cleanse at least 0.01 ether'
      )

      await expectRevert(
        CrystalGoddessProxy.connect(paypig).cleanse(txValue(1)),
        'You must cleanse your entire balance'
      )
    })

    // this works in theory, but successful cleansing causes a weird gas error
    // double check on etherscan
    it.skip('mint should work', async () => {
      const price = 0.01
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

  // TODO findom token uri tests


  describe('premiums', () => {
    it('should adjust tribute amounts', async () => {
      await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))
      await SexyMinter.connect(paypig2).mint('paypigie123', false, txValue(0.1))

      await expectRevert(
        SexyRouter.connect(paypig).applyPremium(0),
        'Invalid Premium'
      )

      await expectRevert(
        SexyRouter.connect(paypig).applyPremium(4),
        'Invalid Premium'
      )


      for (let dom of [heatherHot, MindyRouge]) {
        expect(await SexyRouter.connect(paypig).premium(paypig.address)).to.equal(1)
        expect(await SexyRouter.connect(paypig2).premium(paypig.address)).to.equal(1)

        await SexyRouter.connect(paypig).applyPremium(2)
        expect(await SexyRouter.connect(paypig).premium(paypig.address)).to.equal(2)

        await paypig.sendTransaction({to: dom.address, ...txValue(0.02)})
        await paypig2.sendTransaction({to: dom.address, ...txValue(0.02)})

        await SexyRouter.connect(paypig).applyPremium(3)
        expect(await SexyRouter.connect(paypig).premium(paypig.address)).to.equal(3)

        await paypig.sendTransaction({to: dom.address, ...txValue(0.03)})
        await paypig2.sendTransaction({to: dom.address, ...txValue(0.03)})

        await SexyRouter.connect(paypig).applyPremium(1)
        expect(await SexyRouter.connect(paypig).premium(paypig.address)).to.equal(1)

        await paypig.sendTransaction({to: dom.address, ...txValue(0.01)})
        await paypig2.sendTransaction({to: dom.address, ...txValue(0.01)})

        expect(ethVal(await dom.connect(paypig).tributes(paypig.address))).to.equal(0.03)
        expect(ethVal(await dom.connect(paypig2).tributes(paypig2.address))).to.equal(0.06)
      }
    })
  })


  describe('SexyVIP', () => {
    it('should construct', async () => {
      expect(await SexyVIP.connect(paypig).totalSupply()).to.equal(1)
      expect(await SexyVIP.connect(paypig).exists(0)).to.equal(true)
      expect(await SexyVIP.connect(paypig).ownerOf(0)).to.equal(artist.address)
      expect(await SexyVIP.connect(paypig).isGold(0)).to.equal(true)
      expect(await SexyVIP.connect(paypig).memberName(0)).to.equal('steviep')
      expect(await SexyVIP.connect(paypig).creditBalance(0)).to.equal(25)
      expect(await SexyVIP.connect(paypig).getCreditApproval(0)).to.equal(zeroAddr)
    })

    describe('minting', () => {
      it('should work', async () => {

        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))

        expect(await SexyVIP.connect(paypig).totalSupply()).to.equal(2)
        expect(await SexyVIP.connect(paypig).exists(1)).to.equal(true)
        expect(await SexyVIP.connect(paypig).ownerOf(1)).to.equal(paypig.address)
        expect(await SexyVIP.connect(paypig).isGold(1)).to.equal(false)
        expect(await SexyVIP.connect(paypig).memberName(1)).to.equal('paypigie123')
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(25)
        expect(await SexyVIP.connect(paypig).getCreditApproval(1)).to.equal(zeroAddr)

        await expectRevert(
          SexyMinter.connect(paypig).withdraw(),
          'Ownable: caller is not the owner'
        )

        const startingArtistBalance = await getBalance(artist)
        await SexyMinter.connect(artist).withdraw()
        const endingArtistBalance = await getBalance(artist)

        expect(endingArtistBalance - startingArtistBalance).to.be.closeTo(0.1, 0.001)

        await expectRevert(
          SexyMinter.connect(paypig).mint('paypigie321', false, txValue(0.0999)),
          'Amount too low'
        )


        await SexyMinter.connect(paypig).mint('paypigie321', false, txValue(0.1))
        expect(await SexyVIP.connect(paypig).isGold(2)).to.equal(false)
        await SexyMinter.connect(paypig).mint('paypigie321', true, txValue(0.15))
        expect(await SexyVIP.connect(paypig).isGold(3)).to.equal(true)

        await expectRevert(
          SexyMinter.connect(paypig).mint('paypigie321', true, txValue(0.14999)),
          'Amount too low'
        )

        for (let i = 3; i < 100; i++) {
          await SexyMinter.connect(paypig).mint('paypigie' + i, false, txValue(0.1))
        }

        expect(await SexyVIP.connect(paypig).totalSupply()).to.equal(101)

        await expectRevert(
          SexyMinter.connect(paypig).mint('paypigie101', false, txValue(0.1)),
          'Cannot mint more VIPs'
        )
      })

      it('minter should mint okay', async () => {
        expect(await SexyVIP.connect(artist).minter()).to.equal(SexyMinter.address)
        await expectRevert(
          SexyVIP.connect(paypig).setMinter(zeroAddr),
          'Ownable: caller is not the owner'
        )

        await expectRevert(
          SexyVIP.connect(paypig).mint(paypig.address, 'evilpiggie123', true),
          'Incorrect minting address'
        )


        await SexyVIP.connect(artist).setMinter(zeroAddr)
        expect(await SexyVIP.connect(artist).minter()).to.equal(zeroAddr)
      })

      // TODO: test setMintThreshold
    })

    describe('using credits', async () => {
      it('should work', async () => {
        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))
        expect(await SexyVIP.connect(paypig).ownerOf(1)).to.equal(paypig.address)

        await expectRevert(
          SexyVIP.connect(paypig2)[spendCredit](1, heatherHot.address, 1),
          'Only VIP or operator can transfer credits'
        )

        await SexyVIP.connect(paypig)[spendCredit](1, heatherHot.address, 1)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(24)
        expect(ethVal(await heatherHot.connect(paypig).tributes(paypig.address))).to.equal(0.01)

        expect(await heatherHot.connect(paypig).totalSupply()).to.equal(1)
        expect(await heatherHot.connect(paypig).exists(0)).to.equal(true)
        expect(await heatherHot.connect(paypig).ownerOf(0)).to.equal(paypig.address)

        await SexyVIP.connect(paypig)[spendCredit](1, heatherHot.address, 2)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(22)
        expect(ethVal(await heatherHot.connect(paypig).tributes(paypig.address))).to.equal(0.03)
        expect(await heatherHot.connect(paypig).totalSupply()).to.equal(2)

        await SexyVIP.connect(paypig)[spendCreditPresent](1, heatherHot.address, 1, paypig2.address)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(21)
        expect(await heatherHot.connect(paypig).totalSupply()).to.equal(3)
        expect(await heatherHot.connect(paypig).ownerOf(2)).to.equal(paypig2.address)
        expect(ethVal(await heatherHot.connect(paypig).tributes(paypig2.address))).to.equal(0.01)

        expect(await SexyVIP.connect(paypig).creditBalance(0)).to.equal(29)

        await SexyVIP.connect(paypig)[spendCredit](1, MindyRouge.address, 1)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(20)
        expect(ethVal(await MindyRouge.connect(paypig).tributes(paypig.address))).to.equal(0.01)

        await SexyVIP.connect(paypig)[spendCreditPresent](1, MindyRouge.address, 1, paypig2.address)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(19)
        expect(ethVal(await MindyRouge.connect(paypig).tributes(paypig2.address))).to.equal(0.01)

        await expectRevert.unspecified(
          SexyVIP.connect(paypig)[spendCredit](1, MindyRouge.address, 20)
        )
      })
    })

    describe('uri', () => {
      it('setURI should work', async () => {
        expect(await SexyVIP.connect(artist).uri()).to.equal(SexyVIPTokenURI.address)
        await expectRevert(
          SexyVIP.connect(paypig).setURI(zeroAddr),
          'Ownable: caller is not the owner'
        )

        await SexyVIP.connect(artist).setURI(zeroAddr)
        expect(await SexyVIP.connect(artist).uri()).to.equal(zeroAddr)
      })

      it('should return the correct uri data', async () => {
        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))
        await SexyVIP.connect(paypig)[spendCredit](1, heatherHot.address, 1)


        const uri0 = getJsonURI(await SexyVIP.connect(artist).tokenURI(0))
        const uri1 = getJsonURI(await SexyVIP.connect(artist).tokenURI(1))

        expect(uri0.description).to.equal('FinSexy V.I.P. Memberships grant the holder 25 SexyCredits, which they may send to sexy findoms on https://finsexy.com or transfer to other V.I.P. Members.')
        expect(uri0.external_url).to.equal('https://finsexy.com')
        expect(uri0.name).to.equal('FinSexy VIP Membership #0')
        expect(uri0.attributes[0].trait_type).to.equal('Member Name')
        expect(uri0.attributes[0].value).to.equal('steviep')
        expect(uri0.attributes[1].trait_type).to.equal('SexyCredits')
        expect(uri0.attributes[1].value).to.equal('26')
        expect(uri0.attributes[2].trait_type).to.equal('VIP Gold')
        expect(uri0.attributes[2].value).to.equal('true')

        expect(uri1.name).to.equal('FinSexy VIP Membership #1')
        expect(uri1.attributes[0].trait_type).to.equal('Member Name')
        expect(uri1.attributes[0].value).to.equal('paypigie123')
        expect(uri1.attributes[1].trait_type).to.equal('SexyCredits')
        expect(uri1.attributes[1].value).to.equal('24')
        expect(uri1.attributes[2].trait_type).to.equal('VIP Gold')
        expect(uri1.attributes[2].value).to.equal('false')

        console.log((uri0))
        console.log(decodeImage(uri1))
      })

    })

    describe('other stuff', () => {
      it('should change price ok', async () => {
        expect(ethVal(await SexyMinter.connect(artist).mintPrice())).to.equal(0.1)
        expect(ethVal(await SexyMinter.connect(artist).goldPrice())).to.equal(0.15)

        await expectRevert(
          SexyMinter.connect(paypig).setPrices(toETH(0.2), toETH(0.3)),
          'Ownable: caller is not the owner'
        )

        await SexyMinter.connect(artist).setPrices(toETH(0.2), toETH(0.3))
        expect(ethVal(await SexyMinter.connect(artist).mintPrice())).to.equal(0.2)
        expect(ethVal(await SexyMinter.connect(artist).goldPrice())).to.equal(0.3)


        await expectRevert(
          SexyMinter.connect(paypig).mint('paypigie321', false, txValue(0.1999)),
          'Amount too low'
        )

        await SexyMinter.connect(paypig).mint('paypigie321', false, txValue(0.2))
        expect(await SexyVIP.connect(paypig).isGold(1)).to.equal(false)


        await expectRevert(
          SexyMinter.connect(paypig).mint('paypigie321', true, txValue(0.299)),
          'Amount too low'
        )

        await SexyMinter.connect(paypig).mint('paypigie321', true, txValue(0.3))
        expect(await SexyVIP.connect(paypig).isGold(2)).to.equal(true)
      })

      it('owner should change name', async () => {
        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))

        await expectRevert(
          SexyVIP.connect(paypig2).changeName(1, 'cashCow69'),
          'Only membership owner can update name'
        )

        await SexyVIP.connect(paypig).changeName(1, 'cashCow69')
        expect(await SexyVIP.connect(paypig).memberName(1)).to.equal('cashCow69')
      })

      it('owner can transfer credits', async () => {
        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))
        await SexyMinter.connect(paypig2).mint('humanWallet777', false, txValue(0.1))

        await expectRevert(
          SexyVIP.connect(paypig2).transferCredits(1, 2, 25),
          'Only VIP or operator can transfer credits'
        )
        await SexyVIP.connect(paypig).transferCredits(1, 2, 20)

        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(5)
        expect(await SexyVIP.connect(paypig).creditBalance(2)).to.equal(45)

        await SexyVIP.connect(paypig).transferCredits(1, 2, 5)
        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(0)
        expect(await SexyVIP.connect(paypig).creditBalance(2)).to.equal(50)

        await expectRevert.unspecified(
          SexyVIP.connect(paypig2).transferCredits(1, 2, 1),
        )
      })

      it('approvals work', async () => {
        await SexyMinter.connect(paypig).mint('paypigie123', false, txValue(0.1))
        await expectRevert(
          SexyVIP.connect(paypig2).transferCredits(1, 2, 1),
          'Only VIP or operator can transfer credits'
        )

        await expectRevert(
          SexyVIP.connect(paypig2).approveCredits(1, paypig2.address),
          'Only VIP can approve own credits'
        )

        await SexyVIP.connect(paypig).approveCredits(1, paypig2.address)

        expect(await SexyVIP.connect(paypig).getCreditApproval(1)).to.equal(paypig2.address)

        await SexyVIP.connect(paypig2).transferCredits(1, 2, 1)

        expect(await SexyVIP.connect(paypig).creditBalance(1)).to.equal(24)
        expect(await SexyVIP.connect(paypig).creditBalance(2)).to.equal(1)

        await SexyVIP.connect(paypig)[safeTransferFrom](paypig.address, artist.address, 1)
        expect(await SexyVIP.connect(paypig).getCreditApproval(1)).to.equal(zeroAddr)

        await expectRevert(
          SexyVIP.connect(paypig2).transferCredits(1, 2, 1),
          'Only VIP or operator can transfer credits'
        )

      })
    })
  })

  describe('SexyRouter', () => {
    it('setVIP should work', async () => {
      expect(await SexyRouter.connect(artist).vip()).to.equal(SexyVIP.address)

      await expectRevert(
        SexyRouter.connect(paypig).setVIP(zeroAddr),
        'Ownable: caller is not the owner'
      )

      await SexyRouter.connect(artist).setVIP(zeroAddr)
      expect(await SexyRouter.connect(artist).vip()).to.equal(zeroAddr)
    })

    it('setBaseURI should work', async () => {
      expect(await SexyRouter.connect(artist).baseURI()).to.equal(SexyBaseURI.address)

      await expectRevert(
        SexyRouter.connect(paypig).setBaseURI(zeroAddr),
        'Ownable: caller is not the owner'
      )

      await SexyRouter.connect(artist).setBaseURI(zeroAddr)
      expect(await SexyRouter.connect(artist).baseURI()).to.equal(zeroAddr)
    })
  })

  describe('SexyBaseURI', () => {
    describe('CandyCrush setURIString, setURIAddr', () => {
      it('should work', async () => {
        await expectRevert(
          SexyBaseURI.connect(paypig).setURIString('SEXY-CC', 'incorrectURI/', 'bad description', 'wrong dom name', 2),
          'Ownable: caller is not the owner'
        )

        await expectRevert(
          SexyBaseURI.connect(paypig).setURIAddr('SEXY-CC', zeroAddr),
          'Ownable: caller is not the owner'
        )
        await SexyBaseURI.connect(artist).setURIString('SEXY-CC', 'incorrectURI/', 'bad description', 'wrongDomName', 2)


        const uri0 = getJsonURI(await CandyCrush.connect(artist).tokenURI(0))

        expect(uri0.name).to.equal('CandyCrush Tattoo #0')
        expect(uri0.description).to.equal('bad description')
        expect(uri0.image).to.equal('incorrectURI/0.png')
        expect(uri0.external_url).to.equal('https://finsexy.com/doms/wrongDomName')
        expect(uri0.attributes[0].value).to.equal('0')

        const uri1 = getJsonURI(await CandyCrush.connect(artist).tokenURI(1))
        expect(uri1.name).to.equal('CandyCrush Tattoo #1')
        expect(uri1.image).to.equal('incorrectURI/1.png')
        expect(uri1.attributes[0].value).to.equal('1')

        const uri2 = getJsonURI(await CandyCrush.connect(artist).tokenURI(2))
        expect(uri2.name).to.equal('CandyCrush Tattoo #2')
        expect(uri2.attributes[0].value).to.equal('0')

        const CandyCrushURIFactory = await ethers.getContractFactory('CandyCrushURI', artist)
        const CandyCrushURI = await CandyCrushURIFactory.deploy()
        await CandyCrushURI.deployed()

        await SexyBaseURI.connect(artist).setURIAddr('SEXY-CC', CandyCrushURI.address)

        const uri0_b = getJsonURI(await CandyCrush.connect(artist).tokenURI(0))
        const uri1_b = getJsonURI(await CandyCrush.connect(artist).tokenURI(1))

        expect(uri0_b.name).to.equal('CandyCrush Tattoo #0')
        expect(uri1_b.name).to.equal('CandyCrush Tattoo #1')

        expect(uri0_b.description).to.equal('All tattoos are non-transferable')
        expect(uri0_b.external_url).to.equal('https://finsexy.com/doms/CandyCrush')
        console.log(decodeImage(uri0_b))
      })
    })

    describe('DrAndyURI', () => {
      it('should work', async () => {
        const DrAndyURIFactory = await ethers.getContractFactory('DrAndyURI', artist)
        const DrAndyURI = await DrAndyURIFactory.deploy(DrAndy.address)
        await DrAndyURI.deployed()

        await SexyBaseURI.connect(artist).setURIAddr('SEXY-AI', DrAndyURI.address)

        expect(await DrAndy.totalSupply()).to.equal(0)
        expect(await DrAndy.exists(0)).to.equal(false)
        await paypig.sendTransaction({to: DrAndy.address, ...txValue(0.04)})

        expect(await DrAndy.totalSupply()).to.equal(1)
        expect(await DrAndy.exists(0)).to.equal(true)


        expect(await DrAndyProxy.connect(paypig).mintedBy(0)).to.equal(paypig.address)
        expect(bnToN(await DrAndyProxy.connect(paypig).timestamp(0)) !== 0).to.equal(true)

        const uri0_a = getJsonURI(await DrAndy.connect(artist).tokenURI(0))

        expect(uri0_a.name).to.equal('DrAndy Final Session Invoice #0')
        expect(uri0_a.description).to.equal('Invoices must be paid within 90 business days with either ETH or SexyCredits.')
        expect(uri0_a.attributes[0].trait_type).to.equal('Final Session Paid')
        expect(uri0_a.attributes[0].value).to.equal('False')
        console.log(decodeImage(uri0_a))

        await paypig.sendTransaction({to: DrAndy.address, ...txValue(0.01)})
        const uri0_b = getJsonURI(await DrAndy.connect(artist).tokenURI(0))
        console.log(decodeImage(uri0_b))
        expect(uri0_b.attributes[0].value).to.equal('True')
      })
    })
  })
})
