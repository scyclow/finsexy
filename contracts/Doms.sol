// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Dependencies.sol";

contract KatFischer {
  mapping(address => uint256) public tributes;

  receive() external payable {
    if (msg.value >= 0.01 ether) {
      tributes[msg.sender] += 1;

      if (tributes[msg.sender] == 3) {
        tributes[msg.sender] = 0;
        _mint(msg.sender);

      }
    }
  }

  function withdraw() external {

  }

  function _mint(address sender) internal {

  }
}


contract Cagla {
  // generic
}

contract CandyCrush {
  // buy4me
}

contract DrAndy {
  // role play
}


contract DungeonMistress {
  // role play
}

contract GoddessJessica {
  // initial tribute
}

contract Hacker {
  // blackmail
}

contract HeatherHot {}

contract QueenOfDiamonds {
  // money is 25% chance you make her cum; won't give you nft until she cums
}

contract SamantheJones {
  // audit - post your seed phrase
}

contract StevieP {
  // post on twitter
}

contract VinceSlickson {
  // wants fastcash
}
