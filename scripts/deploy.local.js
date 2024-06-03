async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying contracts for addr:', artist.address)




  const Contracts = {}
  const ContractAddrs = {}


  const contracts = [
    'ABMock',
    'FastCashMock',
    'UFIMMock',
    'IOUMock',
    'NVCMock',
    'IFDMock',
    'MMOMock',
    'CASHMock',
    'TenETHMock',
    'ETFMock',
    'KYCMock',
  ]

  for (let i = 0; i < contracts.length; i++) {
    console.log('=>', contracts[i])
    const factory = await ethers.getContractFactory(contracts[i], artist)
    const contract = await factory.deploy()
    await contract.deployed()

    Contracts[contracts[i].replace('Mock', '')] = contract

    ContractAddrs[contracts[i].replace('Mock', '')] = contract.address
  }
  console.log('==================================')



  const FinDomBaseFactory = await ethers.getContractFactory('FinDomBase', artist)
  const FindomProxyFactory = await ethers.getContractFactory('FindomProxy', artist)
  const FinDomBaseLightFactory = await ethers.getContractFactory('FinDomBaseLight', artist)
  const CandyCrushProxyFactory = await ethers.getContractFactory('CandyCrushProxy', artist)
  const CrystalGoddessProxyFactory = await ethers.getContractFactory('CrystalGoddessProxy', artist)
  const VinceSlicksonFactory = await ethers.getContractFactory('VinceSlickson', artist)
  const SteviePProxyFactory = await ethers.getContractFactory('SteviePProxy', artist)
  const SexyXXXpressBaseFactory = await ethers.getContractFactory('SexyXXXpressBase', artist)

  const SexyGameFactory = await ethers.getContractFactory('SexyGame', artist)
  const SexyVIPFactory = await ethers.getContractFactory('SexyVIP', artist)
  const SexyMinterFactory = await ethers.getContractFactory('SexyVIPMinter', artist)
  const SexyRouterFactory = await ethers.getContractFactory('SexyRouter', artist)
  const SexyBaseURIFactory = await ethers.getContractFactory('SexyBaseURI', artist)


  FastCash = await ethers.getContractAt(
    [
      'function balanceOf(address) external view returns (uint256)',
      'function transfer(address, uint256) external'
    ],
    '0xcA5228D1fe52D22db85E02CA305cddD9E573D752'
  )


  /// 1. Sexy Router
  SexyRouter = await SexyRouterFactory.deploy()
  await SexyRouter.deployed()

  SexyVIP = await SexyVIPFactory.attach(await SexyRouter.vip())
  SexyVIPMinter = await SexyMinterFactory.attach(await SexyVIP.minter())
  SexyBaseURI = await SexyBaseURIFactory.attach(await SexyRouter.baseURI())


  /// 2. Sexy Deployer
  const factory = await ethers.getContractFactory('SexyDeployer', artist)
  const deployer = await factory.deploy(SexyRouter.address)
  await deployer.deployed()

  const baseContract = await deployer.baseContract()


  /// 3. Sexy Deployer 2
  const factory2 = await ethers.getContractFactory('SexyDeployer2', artist)
  const deployer2 = await factory2.deploy(baseContract, SexyRouter.address, FastCash.address)
  await deployer2.deployed()

  /// 4, 5. continued below...



  heatherHot = (await FinDomBaseFactory.attach(await deployer.heatherHot())).address
  SamanthaJones = (await FinDomBaseFactory.attach(await deployer.SamanthaJones())).address
  QueenJessica = (await FinDomBaseFactory.attach(await deployer.QueenJessica())).address
  DungeonMistress = (await FinDomBaseFactory.attach(await deployer.DungeonMistress())).address
  DrAndy = (await FinDomBaseFactory.attach(await deployer.DrAndy())).address
  katFischer = (await FinDomBaseFactory.attach(await deployer.katFischer())).address
  CandyCrush = (await FinDomBaseFactory.attach(await deployer.CandyCrush())).address
  CrystalGoddess = (await FinDomBaseFactory.attach(await deployer.CrystalGoddess())).address
  steviep = (await FinDomBaseFactory.attach(await deployer.steviep())).address
  CandyCrushProxy = (await CandyCrushProxyFactory.attach(await deployer.CandyCrush())).address
  CrystalGoddessProxy = (await CrystalGoddessProxyFactory.attach(await deployer.CrystalGoddess())).address
  steviepProxy = (await SteviePProxyFactory.attach(await deployer.steviep())).address

  SexyXXXpress = await SexyXXXpressBaseFactory.attach(await deployer2.connect(artist).SexyXXXpress())
  SexyXXXpressA = await FinDomBaseFactory.attach(await SexyXXXpress.a()).address
  SexyXXXpressB = await FinDomBaseFactory.attach(await SexyXXXpress.b()).address
  SexyXXXpressC = await FinDomBaseFactory.attach(await SexyXXXpress.c()).address

  VinceSlickson = (await VinceSlicksonFactory.attach(await deployer2.vinceSlickson())).address
  Hacker = (await FinDomBaseLightFactory.attach(await deployer2.Hacker())).address
  Hedonitronica = (await FinDomBaseLightFactory.attach(await deployer2.Hedonitronica())).address
  MindyRouge = (await FinDomBaseLightFactory.attach(await deployer2.MindyRouge())).address
  HotlineBabe1900 = (await FinDomBaseLightFactory.attach(await deployer2.HotlineBabe1900())).address
  RonaMerch = (await FinDomBaseLightFactory.attach(await deployer2.RonaMerch())).address
  CustomerSupport247 = (await FinDomBaseLightFactory.attach(await deployer2.CustomerSupport247())).address

  // MoneyMommy777 = (await FinDomBaseLightFactory.attach(await deployer2.MoneyMommy777())).address
  // cagla = (await FinDomBaseLightFactory.attach(await deployer2.cagla())).address



  /// 4. CandyCrush URI
  const CandyCrushURIFactory = await ethers.getContractFactory('CandyCrushURI', artist)
  CandyCrushURI = await CandyCrushURIFactory.deploy()
  await CandyCrushURI.deployed()
  await SexyBaseURI.connect(artist).setURIAddr('SEXY-CC', CandyCrushURI.address)

  /// 5. DrAndy URI
  const DrAndyURIFactory = await ethers.getContractFactory('DrAndyURI', artist)
  DrAndyURI = await DrAndyURIFactory.deploy(DrAndy.address)
  await DrAndyURI.deployed()
  await SexyBaseURI.connect(artist).setURIAddr('SEXY-AI', DrAndyURI.address)


  SexyGame = await deployer.steviep()
    .then(sp => SteviePProxyFactory.attach(sp))
    .then(sp => sp.sexyGame())
    .then(sp => SexyGameFactory.attach(sp))
    .then(sg => sg.address)



  const FindomAddrs = {
    heatherHot,
    SamanthaJones,
    QueenJessica,
    DungeonMistress,
    DrAndy,
    katFischer,
    CandyCrush,
    CrystalGoddess,
    steviep,
    VinceSlickson,
    Hedonitronica,
    MindyRouge,
    '0x000000000000000000000000000000000': Hacker,
    SpecialAgentDiane: Hacker,
    RonaMerch,
    MoneyMommy777,
    HotlineBabe1900,
    CustomerSupport247,
    cagla,
    SexyXXXpress: SexyXXXpress.address,
    SexyXXXpressA,
    SexyXXXpressB,
    SexyXXXpressC,
  }


  ContractAddrs.SexyGame = SexyGame
  ContractAddrs.SexyVIP = SexyVIP.address
  ContractAddrs.SexyVIPMinter = SexyVIPMinter.address
  ContractAddrs.SexyRouter = SexyRouter.address


  // const fcCentralBanker = await ethers.getImpersonatedSigner('0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4')
  // FastCash.connect(fcCentralBanker).transfer(VinceSlickson.address, toETH(50))

  console.log(JSON.stringify(FindomAddrs, null, 2))
  console.log(JSON.stringify(ContractAddrs, null, 2))




}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });