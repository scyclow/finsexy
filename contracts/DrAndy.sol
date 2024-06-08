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


interface ITotalSupply {
  function totalSupply() external view returns (uint256);
}

contract DrAndyProxy is ProxyBase, InternalMintCheck {
  mapping(uint256 => address) public mintedBy;
  mapping(uint256 => uint256) public timestamp;


  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementationAddr,
    address owner_,
    address router
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool)",
          name, symbol, mintThreshold, owner_, router, address(0), true
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address sender, uint256) external returns (bool) {
    uint256 tokenId = ITotalSupply(address(this)).totalSupply();
    mintedBy[tokenId] = sender;
    timestamp[tokenId] = block.timestamp;

    return true;
  }
}