// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./Dependencies.sol";

import "hardhat/console.sol";

contract KatFischer {
  mapping(address => uint256) public tributes;

  receive() external payable {
    if (msg.value >= 0.01 ether) {
      tributes[msg.sender] += 1;

      if (tributes[msg.sender] > 0 && tributes[msg.sender] % 3 == 0) {
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


contract HeatherHot {
  mapping(address => uint256) public tributes;

  receive() external payable {
    if (msg.value >= 0.01 ether) {
      tributes[msg.sender] += 1;
      _mint(msg.sender);
    }
  }

  function withdraw() external {

  }

  function _mint(address sender) internal {

  }
}

contract SamanthaJones {
  // audit - post your seed phrase

  mapping(address => uint256) public tributes;

  receive() external payable {
    uint256 requiredTributeValue = tributes[msg.sender] % 2 == 0 ? 0.01 ether : 0.05 ether;

    if (msg.value >= requiredTributeValue) {
      tributes[msg.sender] += 1;

      if (tributes[msg.sender] % 2 == 0) {
        _mint(msg.sender);

      }
    }
  }

  fallback() external payable {
    // TODO do i really need this?
    uint256 requiredTributeValue = tributes[msg.sender] % 2 == 0 ? 0.01 ether : 0.05 ether;

    if (msg.value >= requiredTributeValue) {
      tributes[msg.sender] += 1;

      if (tributes[msg.sender] % 2 == 0) {
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


contract QueenOfDiamonds {
  // money is 25% chance you make her cum; won't give you nft until she cums
}


contract StevieP {
  // post on twitter
}

contract VinceSlickson {
  // wants fastcash
}
