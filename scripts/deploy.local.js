async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying contracts for addr:', artist.address)




    const FinDomBaseFactory = await ethers.getContractFactory('FinDomBase', artist)
    const FindomProxyFactory = await ethers.getContractFactory('FindomProxy', artist)
    const FinDomBaseLightFactory = await ethers.getContractFactory('FinDomBaseLight', artist)
    const CandyCrushProxyFactory = await ethers.getContractFactory('CandyCrushProxy', artist)
    const CrystalGoddessProxyFactory = await ethers.getContractFactory('CrystalGoddessProxy', artist)
    const VinceSlicksonFactory = await ethers.getContractFactory('VinceSlickson', artist)
    const SteviePProxyFactory = await ethers.getContractFactory('SteviePProxy', artist)
    const SexyGameFactory = await ethers.getContractFactory('SexyGame', artist)


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
      'FinSexy',
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



    const factory = await ethers.getContractFactory('SexyDeployer', artist)
    const deployer = await factory.deploy(ContractAddrs.FastCash)
    await deployer.deployed()



    const heatherHot = (await FinDomBaseFactory.attach(await deployer.heatherHot())).address
    const SamanthaJones = (await FinDomBaseFactory.attach(await deployer.SamanthaJones())).address
    const QueenJessica = (await FinDomBaseFactory.attach(await deployer.QueenJessica())).address
    const DungeonMistress = (await FinDomBaseFactory.attach(await deployer.DungeonMistress())).address
    const DrAndy = (await FinDomBaseFactory.attach(await deployer.DrAndy())).address
    const katFischer = (await FinDomBaseFactory.attach(await deployer.katFischer())).address
    const CandyCrush = (await FinDomBaseFactory.attach(await deployer.CandyCrush())).address
    const CrystalGoddess = (await FinDomBaseFactory.attach(await deployer.CrystalGoddess())).address
    const steviep = (await FinDomBaseFactory.attach(await deployer.steviep())).address
    const VinceSlickson = (await VinceSlicksonFactory.attach(await deployer.vinceSlickson())).address
    const FinXXXpress = (await FinDomBaseLightFactory.attach(await deployer.FinXXXpress())).address
    const Hacker = (await FinDomBaseLightFactory.attach(await deployer.Hacker())).address
    const Hedonitronica = (await FinDomBaseLightFactory.attach(await deployer.Hedonitronica())).address
    const MindyRouge = (await FinDomBaseLightFactory.attach(await deployer.MindyRouge())).address

    const steviepProxy = await SteviePProxyFactory.attach(await deployer.steviep())

    const SexyGame = await SexyGameFactory.attach(await steviepProxy.sexyGame())


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
      FinXXXpress,
      Hedonitronica,
      MindyRouge,
      '0x000000000000000000000000000000000': Hacker,
      SpecialAgentDiane: Hacker,
    }

    ContractAddrs.SexyGame = SexyGame.address



  console.log(JSON.stringify(FindomAddrs, null, 2))
  console.log(JSON.stringify(ContractAddrs, null, 2))


  // const steviep = await ethers.getImpersonatedSigner('0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4')
  // const fcMock = await ethers.getContractFactory('FastCashMock', artist)
  // const FastCash = fcMock.attach('0xcA5228D1fe52D22db85E02CA305cddD9E573D752')
  // await FastCash.connect(steviep).transfer(Contracts.VinceSlickson.address, ethers.utils.parseEther('20'))


}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });