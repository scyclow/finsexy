// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./Dependencies.sol";
import "./Doms.sol";
import "hardhat/console.sol";


contract FinSexy is ERC721, Ownable {
  uint256 public totalSupply;
  mapping(uint256 => address) public idToFindom;
  mapping(uint256 => uint256) public tokenIdToFindomId;

  TokenURI public tokenURIContract;


  constructor() ERC721('FinSexy', 'SEXY') {
    // idToFindom[0] = address(new HeatherHot(0, 0.01 ether, 'heatherHot'));
    // idToFindom[1] = address(new KatFischer(1, 0.03 ether, 'katFischer'));
    // idToFindom[2] = address(new SamanthaJones(2, 0.06 ether, 'SamanthaJones'));
    // idToFindom[3] = address(new VinceSlickson(3, 0.03 ether, 'VinceSlickson'));
    // idToFindom[4] = address(new CrystalGoddess(4, 0.03 ether, 'CrystalGoddess'));
    // idToFindom[5] = address(new DrAndy(5, 0.03 ether, 'DrAndy'));
    // idToFindom[6] = address(new DungeonMistress(6, 0.03 ether, 'DungeonMistress'));
    // idToFindom[7] = address(new Hacker(7, 0.03 ether, '0x0'));
    // idToFindom[8] = address(new QueenJessica(8, 0.03 ether, 'QueenJessica'));
    // idToFindom[9] = address(new StevieP(9, 0.03 ether, 'steviep'));

    tokenURIContract = new TokenURI();
  }

  function exists(uint256 tokenId) external view returns (bool) {
    return _exists(tokenId);
  }

  function setFindom(uint256 id, address findom) external onlyOwner {
    idToFindom[id] = findom;

    console.log(id, findom, idToFindom[id]);
  }

  function mint(address to, uint256 findomId) external {
    require(idToFindom[findomId] == msg.sender, 'Only findom can mint');
    tokenIdToFindomId[totalSupply] = findomId;
    _mint(to, totalSupply);
    totalSupply++;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return tokenURIContract.tokenURI(tokenId);
  }


  function setURIContract(address _uriContract) external onlyOwner {
    tokenURIContract = TokenURI(_uriContract);
  }
}

contract TokenURI {
  function tokenURI(uint256 tokenId) external view returns (string memory) {}
}

