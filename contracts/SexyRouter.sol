// SPDX-License-Identifier: MIT

/*

 /$$$$$$$$ /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$ /$$   /$$ /$$     /$$
| $$_____/|_  $$_/| $$$ | $$ /$$__  $$| $$_____/| $$  / $$|  $$   /$$/
| $$        | $$  | $$$$| $$| $$  \__/| $$      |  $$/ $$/ \  $$ /$$/
| $$$$$     | $$  | $$ $$ $$|  $$$$$$ | $$$$$    \  $$$$/   \  $$$$/
| $$__/     | $$  | $$  $$$$ \____  $$| $$__/     >$$  $$    \  $$/
| $$        | $$  | $$\  $$$ /$$  \ $$| $$       /$$/\  $$    | $$
| $$       /$$$$$$| $$ \  $$|  $$$$$$/| $$$$$$$$| $$  \ $$    | $$
|__/      |______/|__/  \__/ \______/ |________/|__/  |__/    |__/


https://finsexy.com

by steviep.eth

*/

pragma solidity ^0.8.23;

import "./Dependencies.sol";
import "./SexyVIP.sol";
import "./SexyBaseURI.sol";


contract SexyRouter is Ownable {
  address public vip;
  address public baseURI;
  mapping(address => uint256) private _premium;

  constructor() {
    vip = address(new SexyVIP(msg.sender));
    baseURI = address(new SexyBaseURI());
  }

  function premium(address user) external view returns (uint256) {
    return _premium[user] == 0 ? 1 : _premium[user];
  }

  function applyPremium(uint256 p) external {
    require(p > 0 && p < 4, 'Invalid Premium');
    _premium[msg.sender] = p;
  }

  function setBaseURI(address newBaseURI) external onlyOwner {
    baseURI = newBaseURI;
  }

  function setVIP(address newVIP) external onlyOwner {
    vip = newVIP;
  }
}

