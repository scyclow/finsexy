async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying base contract for artist addr:', artist.address)

  HeatherHotFactory = await ethers.getContractFactory('HeatherHot', artist)
  KatFischerFactory = await ethers.getContractFactory('KatFischer', artist)
  HeatherHot = await HeatherHotFactory.deploy()
  KatFischer = await KatFischerFactory.deploy()
  await HeatherHot.deployed()
  await KatFischer.deployed()



  console.log(`HeatherHot:`, HeatherHot.address)
  console.log(`KatFischer:`, KatFischer.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });