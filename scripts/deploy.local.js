async function main() {
  const signers = await ethers.getSigners()
  const artist = signers[0]
  console.log('Deploying base contract for artist addr:', artist.address)

  KatFischerFactory = await ethers.getContractFactory('KatFischer', artist)
  KatFischer = await KatFischerFactory.deploy()
  await KatFischer.deployed()



  console.log(`KatFischer:`, KatFischer.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });