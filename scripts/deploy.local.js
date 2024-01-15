async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying base contract for artist addr:', artist.address)


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
    'CrystalGoddess',
    'DrAndy',
    'DungeonMistress',
    'Hacker',
    'QueenOfDiamonds',
    'StevieP',

  ]

  for (let dom of doms) {
    const factory = await ethers.getContractFactory(dom, artist)
    const contract = await factory.deploy()
    await contract.deployed()
    console.log(dom, contract.address)
  }

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });