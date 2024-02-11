async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying base contract for artist addr:', artist.address)
  const steviep = await ethers.getImpersonatedSigner('0x47144372eb383466D18FC91DB9Cd0396Aa6c87A4')

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



  const fcMock = await ethers.getContractFactory('FastCashMock', artist)
  const FastCash = fcMock.attach('0xcA5228D1fe52D22db85E02CA305cddD9E573D752')

  await FastCash.connect(steviep).transfer(Contracts.VinceSlickson.address, ethers.utils.parseEther('20'))

  console.log(Contracts.VinceSlickson.address, '< FC BALANCE >', await FastCash.connect(steviep).balanceOf(Contracts.VinceSlickson.address))

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });