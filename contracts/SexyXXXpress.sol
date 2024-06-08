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


interface ITributeReceiver {
  function tributes(address) external view returns (uint256);
}

interface ITotalSupply {
  function totalSupply() external view returns (uint256);
}

contract SexyXXXpressBase is FinDomBaseLight {
  ITributeReceiver public a;
  ITributeReceiver public b;
  ITributeReceiver public c;

  constructor(address owner_, address router_, address A, address B, address C) FinDomBaseLight(owner_, router_) {
    a = ITributeReceiver(A);
    b = ITributeReceiver(B);
    c = ITributeReceiver(C);
  }

  function tributes(address sender) external virtual override view returns (uint256) {
    return _tributes[sender] + a.tributes(sender) + b.tributes(sender) + c.tributes(sender);
  }
}


contract SexyXXXpressProxy is ProxyBase, InternalMintCheck {
  mapping(uint256 => address) public mintedBy;
  mapping(uint256 => uint256) public timestamp;

  uint256 public maxSupply;

  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementationAddr,
    address owner_,
    address router,
    uint256 maxSupply_
  ) {
    maxSupply = maxSupply_;

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

  function mintCheck(address, uint256) external view returns (bool) {
    uint256 tokenId = ITotalSupply(address(this)).totalSupply();
    require(tokenId < maxSupply, 'ERROR: SUPPLY EXCEEDED');

    return true;
  }
}