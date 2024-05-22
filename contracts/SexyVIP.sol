// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./Dependencies.sol";


interface SexyDom {
  function creditTribute(address recipient, uint256 amount) external;
}

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

  // TODO: test
  function setBaseURI(address newBaseURI) external onlyOwner {
    baseURI = newBaseURI;
  }

  // TODO: test
  function setVIP(address newVIP) external onlyOwner {
    vip = newVIP;
  }
}

contract SexyBaseURI {
  // TODO
  function tokenURI(string memory symbol, uint256 tokenId) external view returns (string memory) {
    return '';
  }
}

contract SexyVIP is ERC721, Ownable {
  uint256 public totalSupply;
  uint256 public constant maxSupply = 101;

  SexyMinter public minter;
  SexyVIPTokenURI public uri;

  mapping(uint256 => bool) public isGold;
  mapping(uint256 => string) public memberName;

  mapping(uint256 => uint256) public creditBalance;
  mapping(uint256 => address) private _approvals;

  event MetadataUpdate(uint256 _tokenId);
  event BatchMetadataUpdate(uint256 _fromTokenId, uint256 _toTokenId);

  constructor(address newOwner) ERC721('FinSexy VIP Membership', 'VIP') {
    minter = new SexyMinter();
    uri = new SexyVIPTokenURI();

    isGold[0] = true;
    memberName[0] = 'steviep';
    creditBalance[0] = 25;

    transferOwnership(newOwner);
    _mint(newOwner, 0);
    totalSupply++;
  }

  function exists(uint256 tokenId) external view returns (bool) {
    return _exists(tokenId);
  }


  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    return uri.tokenURI(tokenId);
  }

  function mint(address to, string memory name, bool isGold_) external {
    require(msg.sender == address(minter), 'Incorrect minting address');
    require(totalSupply < maxSupply, 'Cannot mint more VIPs');

    if (isGold_) isGold[totalSupply] = true;
    memberName[totalSupply] = name;
    creditBalance[totalSupply] = 25;

    _mint(to, totalSupply);
    totalSupply++;
  }

  function spendCredit(uint256 tokenId, address domAddr, uint256 amount, address recipient) external {
    _spendCredit(tokenId, domAddr, amount, recipient);
  }

  function spendCredit(uint256 tokenId, address domAddr, uint256 amount) external {
    _spendCredit(tokenId, domAddr, amount, msg.sender);
  }

  function _spendCredit(uint256 tokenId, address domAddr, uint256 amount, address recipient) private {
    transferCredits(tokenId, 0, amount);
    SexyDom(domAddr).creditTribute(recipient, amount * 0.01 ether);
  }

  function changeName(uint256 tokenId, string memory newName) external {
    require(ownerOf(tokenId) == msg.sender, 'Only membership owner can update name');
    memberName[tokenId] = newName;
    emit MetadataUpdate(tokenId);
  }

  function transferCredits(uint256 fromTokenId, uint256 toTokenId, uint256 amount) public {
    require(
      ownerOf(fromTokenId) == msg.sender || _approvals[fromTokenId] == msg.sender,
      'Only VIP or operator can transfer credits'
    );

    emit MetadataUpdate(fromTokenId);
    emit MetadataUpdate(toTokenId);

    creditBalance[fromTokenId] -= amount;
    creditBalance[toTokenId] += amount;
  }

  function approveCredits(uint256 tokenId, address operator) external {
    require(ownerOf(tokenId) == msg.sender, 'Only VIP can approve own credits');
    _approvals[tokenId] = operator;
  }

  function getCreditApproval(uint256 tokenId) external view returns (address) {
    return  _approvals[tokenId];
  }

  function _beforeTokenTransfer(address, address, uint256 tokenId) internal virtual override {
    _approvals[tokenId] = address(0);
  }

  function setMinter(address newMinter) external onlyOwner {
    minter = SexyMinter(newMinter);
  }

  function setURI(address newURI) external onlyOwner {
    uri = SexyVIPTokenURI(newURI);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
    return interfaceId == bytes4(0x49064906) || super.supportsInterface(interfaceId);
  }
}

// TODO IOU mint
contract SexyMinter {
  uint256 public mintPrice = 0.1 ether;
  uint256 public goldPrice = 0.15 ether;
  SexyVIP public sexyVIP;

  constructor() {
    sexyVIP = SexyVIP(msg.sender);
  }

  function mint(string memory name, bool isGold) external payable {
    require(
      msg.value >= (isGold ? goldPrice : mintPrice),
      'Amount too low'
    );
    sexyVIP.mint(msg.sender, name, isGold);
  }

  function setPrices(uint256 newPrice, uint256 newGoldPrice) external {
    require(msg.sender == sexyVIP.owner(), 'Ownable: caller is not the owner');
    mintPrice = newPrice;
    goldPrice = newGoldPrice;
  }

  function withdraw() external {
    require(msg.sender == sexyVIP.owner(), 'Ownable: caller is not the owner');
    payable(sexyVIP.owner()).transfer(address(this).balance);
  }
}

contract SexyVIPTokenURI {
  using Strings for uint256;
  SexyVIP public sexyVIP;

  constructor() {
    sexyVIP = SexyVIP(msg.sender);
  }

  function tokenURI(uint256 tokenId) external view returns (string memory) {
    string memory description = 'FinSexy V.I.P. Memberships grant the holder 25 Sexy Credits, which they may send to sexy findoms on https://finsexy.com or transfer to other V.I.P. Members.';

    bytes memory json = abi.encodePacked(
      'data:application/json;utf8,',
      '{"name": "FinSexy VIP Membership #', tokenId.toString(),'",'
      '"description": "', description, '",'
      '"external_url": "https://finsexy.com",'
      '"attributes": ', tokenAttrs(tokenId), ','
      '"image": "', encodedSVG(tokenId),
      '"}'
    );

    return string(json);
  }

  function encodedSVG(uint256 tokenId) public view returns (string memory) {
    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64.encode(rawSVG(tokenId))
    ));
  }

  function tokenAttrs(uint256 tokenId) public view returns (string memory) {
    bool isGold = sexyVIP.isGold(tokenId);
    string memory name = sexyVIP.memberName(tokenId);
    uint256 creditBalance = sexyVIP.creditBalance(tokenId);

    return string.concat(
      '[{"trait_type": "Member Name", "value": "', name,'"},{"trait_type": "Sexy Credits", "value": "', creditBalance.toString(),'"},{"trait_type": "VIP Gold", "value": "', isGold ? 'true' : 'false','"}]'
    );
  }

  function rawSVG(uint256 tokenId) public view returns (bytes memory) {
    bool isGold = sexyVIP.isGold(tokenId);
    string memory name = sexyVIP.memberName(tokenId);
    uint256 creditBalance = sexyVIP.creditBalance(tokenId);

    bytes memory str = abi.encodePacked(
      '<svg viewBox="0 0 850 525" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="Gradient1" x1="0.8" x2="0" y1="-0.25" y2="1.15"><stop stop-color="#ff00c7" offset="0%"></stop><stop stop-color="#120211" offset="20%"></stop><stop stop-color="#120211" offset="58%"></stop><stop stop-color="#ff00c7" offset="100%"></stop></linearGradient><filter id="insetShadow"><feOffset dx="0" dy="0"/><feGaussianBlur stdDeviation="10" result="offset-blur"/><feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/><feFlood flood-color="#888" flood-opacity=".95" result="color"/><feComposite operator="in" in="color" in2="inverse" result="shadow"/><feComposite operator="over" in="shadow" in2="SourceGraphic"/></filter></defs><style>text{fill:#',
      isGold ? 'f3ba00' : 'fff8ff;',
      ';font-family:monospace;font-size: 35px;filter:drop-shadow(1px 1px 0px #ff00c7) drop-shadow(2px 2px 0px #120211)}.t{font-family:cursive;font-size:95px;dominant-baseline:middle;text-anchor:middle;filter:drop-shadow(4px 4px 1px #120211) drop-shadow(3px 3px 6px #ff00c7)}</style><rect x="2" y="2" width="846" height="521" fill="url(#Gradient1)" stroke="#524552" stroke-width="4" stroke-location="outside" rx="15" filter="url(#insetShadow)"></rect><text x="50%" y="26%" class="t" style="font-size:90px">',
      unicode'💋',
      ' FINSEXY V.I.P.</text><text x="50%" y="41%" class="t" style="font-size:50px">Very Important Paypig</text>'
    );

    str = abi.encodePacked(
      str,
      '<text x="7%" y="78%">', name, '</text>',
      '<text x="7%" y="88%">Sexy Credits: ', creditBalance.toString(), '</text>'
    );

    string memory tokenString;
    if (tokenId < 10) tokenString = string.concat('00', tokenId.toString());
    else if (tokenId < 100) tokenString = string.concat('0', tokenId.toString());
    else tokenString = tokenId.toString();

    str = abi.encodePacked(str, '<text x="73%" y="88%">ID: ', tokenString, '</text>');


    if (isGold) {
      str = abi.encodePacked(
        str,
        '<text x="85%" y="78%" stroke="#f3ba00" stroke-width="9" style="filter: drop-shadow(0 0 20px #888) drop-shadow(0 0 15px #f3ba00)">',
        unicode'⭑',
        '</text>'
      );
    }

    return abi.encodePacked(str, '</svg>');
  }

}