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

import "./SexyProxy.sol";


contract CandyCrushProxy is FindomProxy {
  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementation,
    address owner_,
    address router
  ) FindomProxy(name, symbol, mintThreshold, implementation, owner_, router) {}

  function safeTransferFrom(address, address, uint256) external {
    revert('Cannot transfer tattoo');
  }

  function transferFrom(address, address, uint256) external {
    revert('Cannot transfer tattoo');
  }

  function safeTransferFrom(address, address, uint256, bytes calldata) external {
    revert('Cannot transfer tattoo');
  }
}