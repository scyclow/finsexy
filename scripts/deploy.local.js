async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying base contract for artist addr:', artist.address)

  const Contracts = {}

  const FinDoms = [
    'HeatherHot',
    'KatFischer',
    'SamanthaJones',
    'VinceSlickson',
    'CrystalGoddess',
    'DrAndy',
    'DungeonMistress',
    'Hacker',
    'QueenJessica',
    'StevieP',
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
  ]

  for (let i = 0; i < contracts.length; i++) {
    const factory = await ethers.getContractFactory(contracts[i], artist)
    const contract = await factory.deploy()
    await contract.deployed()
    Contracts[contracts[i]] = contract
    console.log(contracts[i], contract.address)
  }
  console.log('==================================')

  for (let i = 0; i < FinDoms.length; i++) {
    const factory = await ethers.getContractFactory(FinDoms[i], artist)
    const contract = await factory.deploy(Contracts.FinSexy.address)
    await Contracts.FinSexy.setFindom(i, contract.address)
    await contract.deployed()
    Contracts[FinDoms[i]] = contract
    console.log(FinDoms[i], contract.address)
  }


}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });