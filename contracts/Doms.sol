// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./Dependencies.sol";

import "hardhat/console.sol";

contract KatFischer {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


contract VinceSlickson {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

    if (msg.value >= 0.01 ether) {
      tributes[msg.sender] += 1;
      if (tributes[msg.sender] % 2 == 0) {
        _mint(msg.sender);
      } else {
        _sendFastCash(msg.sender);
      }
    }
  }

  function withdraw() external {

  }

  function _mint(address sender) internal {

  }

  function _sendFastCash(address sender) internal {

  }
}


contract CrystalGoddess {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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

contract DrAndy {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


contract DungeonMistress {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


contract Hacker {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


contract QueenOfDiamonds {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


contract StevieP {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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

contract Cagla {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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

contract CandyCrush {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  receive() external payable {
    emit Send(msg.sender, msg.value);

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


