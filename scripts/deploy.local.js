async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying contracts for addr:', artist.address)


  const Contracts = {}
  const ContractAddrs = {}
  const FindomAddrs = {}

  const FinDoms = [
    'HeatherHot',
    'KatFischer',
    'SamanthaJones',
    'VinceSlickson',
    'CrystalGoddess',
    'DrAndy',
    'DungeonMistress',
    'QueenJessica',
    'StevieP',
    'Hacker',
    'Hedonitronica',
  ]
  const FinDomsLight = [
    'Hedonitronica',
    'Hacker',
  ]

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

  for (let i = 0; i < FinDoms.length; i++) {
    console.log('=>', FinDoms[i])
    const factory = await ethers.getContractFactory(FinDoms[i], artist)

    const contract = FinDomsLight.includes(FinDoms[i])
      ? await factory.deploy()
      : await factory.deploy(Contracts.FinSexy.address)

    await Contracts.FinSexy.setFindom(i, contract.address)
    await contract.deployed()
    Contracts[FinDoms[i]] = contract
    FindomAddrs[FinDoms[i]] = contract.address
  }


  FindomAddrs['heatherHot'] = FindomAddrs['HeatherHot']
  FindomAddrs['katFischer'] = FindomAddrs['KatFischer']
  FindomAddrs['SpecialAgentDiane'] = FindomAddrs['Hacker']
  FindomAddrs['steviep'] = FindomAddrs['StevieP']
  FindomAddrs['0x000000000000000000000000000000000'] = FindomAddrs['Hacker']
  delete FindomAddrs['Hacker']
  delete FindomAddrs['HeatherHot']
  delete FindomAddrs['KatFischer']
  delete FindomAddrs['StevieP']

  console.log('FinSexy:', Contracts.FinSexy.address)

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