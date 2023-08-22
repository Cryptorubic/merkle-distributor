require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
const { ethers } = require('hardhat')

async function main() {
    const constructorArguments = [
        // Token Address
        '0x10aaed289a7b1b0155bf4b86c862f297e84465e0',
        // Merkle root
        '0xff2231a6c3b89bf73495e8ca4d0b2d8a7f0ff9ba8152c0d5c7388e621b2cc42d',
        '0x333ce751b413cA71725D7CDEf3cf50C8351E3333',
        '7776000'
    ];

    const MerkleDistributor = await ethers.getContractFactory('MerkleDistributorToStaking')
    const merkleDistributor = await MerkleDistributor.deploy(...constructorArguments)
    await merkleDistributor.deployed()

    console.log(`merkleDistributor deployed at ${merkleDistributor.address}`)

    await new Promise(r => setTimeout(r, 30000));

    await hre.run('verify:verify', {
        address: merkleDistributor.address,
        constructorArguments
    });
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
