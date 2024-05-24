// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./ProxyDependencies.sol";


interface IERC20 {
  function transfer(address to, uint256 value) external returns (bool);
}

// interface IERC721 {
//   function safeTransferFrom(address from, address to, uint256 tokenId) external;
// }

interface IERC1155 {
  function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
}

abstract contract TokenWithdrawer is Ownable {
  function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  function withdrawERC20(address erc20, uint256 amount) external onlyOwner {
    IERC20(erc20).transfer(msg.sender, amount);
  }

  function withdrawERC721(address erc721, uint256 tokenId) external onlyOwner {
    IERC721(erc721).safeTransferFrom(address(this), msg.sender, tokenId);
  }

  function withdrawERC1155(address erc1155, uint256 tokenId, uint256 amount, bytes calldata data) external onlyOwner {
    IERC1155(erc1155).safeTransferFrom(address(this), msg.sender, tokenId, amount, data);
  }

  function onERC721Received(address, address, uint256, bytes calldata) external pure returns(bytes4) {
    return this.onERC721Received.selector;
  }

  function onERC1155Received(address, address, uint256, uint256, bytes calldata) external pure returns (bytes4) {
    return this.onERC1155Received.selector;
  }

  function onERC1155BatchReceived(address, address, uint256[] calldata, uint256[] calldata, bytes calldata) external pure returns (bytes4) {
    return this.onERC1155BatchReceived.selector;
  }
}


interface ISexyRouter {
  function vip() external view returns (address);
  function baseURI() external view returns (address);
  function premium(address user) external view returns (uint256);
}


abstract contract FinDomTribute is TokenWithdrawer {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  ISexyRouter public router;

  constructor(address owner_, address router_) {
    _setOwner(owner_);
    router = ISexyRouter(router_);
  }

  function creditTribute(address recipient, uint256 amount) external {
    require(router.vip() == msg.sender, 'Only VIP contract can credit tributes');
    _receive(recipient, amount);
  }

  receive() external payable {
    _receive(msg.sender, msg.value / router.premium(msg.sender));
  }

  // TODO test premium here
  function _receive(address sender, uint256 value) internal virtual {
    emit Send(sender, value);
    tributes[sender] += value;
  }
}


interface InternalMintCheck {
  function mintCheck(address sender, uint256 amount) external view returns (bool);
}

interface ITokenURI {
  function tokenURI(string memory symbol, uint256 tokenId) external view returns (string memory);
}

contract FinDomBase is ERC721, FinDomTribute {
  uint256 public mintThreshold;
  string private _name;
  string private _symbol;

  bool private _isInitialized;

  // ISexyRouter public router;
  address public externalMinter;
  bool public internalMintCheck;
  uint256 public totalSupply;

  constructor (address owner_, address router_) ERC721('', '') FinDomTribute(owner_, router_) {}


  function initialize(
    string memory name_,
    string memory symbol_,
    uint256 mintThreshold_,
    address owner_,
    address router_,
    address externalMinter_,
    bool internalMintCheck_
  ) external {
    require(!_isInitialized, "Can't initialize more than once");
    _isInitialized = true;
    _name = name_;
    _symbol = symbol_;
    mintThreshold = mintThreshold_;
    router = ISexyRouter(router_);
    externalMinter = externalMinter_;
    internalMintCheck = internalMintCheck_;

    _setOwner(owner_);
  }

  function name() public view virtual override(ERC721) returns (string memory) {
   return  _name;
  }

  function symbol() public view virtual override(ERC721) returns (string memory) {
    return _symbol;
  }


  function exists(uint256 tokenId) external view returns (bool) {
    return _exists(tokenId);
  }

  function setMintThreshold(uint256 mintThreshold_) external onlyOwner {
    mintThreshold = mintThreshold_;
  }

  function mint(address to) external {
    require(externalMinter == msg.sender, 'Incorrect minting address');
    _mint(to, totalSupply);
    totalSupply++;
  }

  function _receive(address sender, uint256 value) internal override {
    emit Send(sender, value);
    tributes[sender] += value;

    if (internalMintCheck) {
      if (!InternalMintCheck(address(this)).mintCheck(sender, value)) return;
    }

    if (
      value >= mintThreshold
      || (
        tributes[sender] % mintThreshold
        < (tributes[sender] - value) % mintThreshold
      )
    ) {
      _mint(sender, totalSupply);
      totalSupply++;
    }

  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return ITokenURI(router.baseURI()).tokenURI(_symbol, tokenId);
  }
}

contract TokenURI {
  function tokenURI(uint256 tokenId) external view returns (string memory) {}
}

abstract contract ProxyBase is Proxy {
  bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

  struct AddressSlot {
    address value;
  }

  function getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {
    assembly {
      r.slot := slot
    }
  }

  function _implementation() internal override view returns (address) {
    return getAddressSlot(_IMPLEMENTATION_SLOT).value;
  }

  function implementation() public view returns (address) {
    return _implementation();
  }
}

contract FindomProxy is ProxyBase {
  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementationAddr,
    address owner_,
    address router
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool)",
          name, symbol, mintThreshold, owner_, router, address(0), false
        ),
        "Address: low-level delegate call failed"
    );
  }
}



contract FinDomBaseLight is FinDomTribute {

  constructor(address owner_, address router_) FinDomTribute(owner_, router_) {}

  // TODO test receiving
}


