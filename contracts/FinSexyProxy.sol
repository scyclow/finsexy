// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./ProxyDependencies.sol";
import "hardhat/console.sol";


abstract contract FinDomTribute is Ownable {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);

  function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }
}


interface InternalMintCheck {
  function mintCheck(address sender, uint256 amount) external view returns (bool);
}

interface ISexyRouter {
  function vip() external view returns (address);
  function baseURI() external view returns (address);
  function premium(address user) external view returns (uint256);
}

contract FinDomBase is ERC721, FinDomTribute {
  uint256 public mintThreshold;
  string private _name;
  string private _symbol;

  bool private _isInitialized;

  ISexyRouter public router;
  address public externalMinter;
  bool public internalMintCheck;
  uint256 public totalSupply;

  TokenURI public tokenURIContract;

  constructor () ERC721('', '') {}


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
    tokenURIContract = new TokenURI();

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

  function creditTribute(address recipient, uint256 amount) external {
    require(router.vip() == msg.sender, 'Only VIP contract can credit tributes');
    _receive(recipient, amount);
  }

  receive() external payable {
    _receive(msg.sender, msg.value / router.premium(msg.sender));
  }

  function _receive(address sender, uint256 value) private {
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
    return tokenURIContract.tokenURI(tokenId);
  }


  function setURIContract(address _uriContract) external onlyOwner {
    tokenURIContract = TokenURI(_uriContract);
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
  ISexyRouter public router;

  constructor(address owner_, address router_) {
    transferOwnership(owner_);
    router = ISexyRouter(router_);
  }

  function creditTribute(address recipient, uint256 amount) external {
    require(router.vip() == msg.sender, 'Only VIP contract can credit tributes');
    emit Send(recipient, amount);
    tributes[recipient] += amount;
  }

  receive() external payable {
    emit Send(msg.sender, msg.value);
    tributes[msg.sender] += msg.value;
  }
}



contract CandyCrushProxy is FindomProxy {
  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementation,
    address owner_,
    address router
  ) FindomProxy(name, symbol, mintThreshold, implementation, owner_, router) {}

  function safeTransferFrom(address from, address to, uint256 tokenId) external {
    revert('Cannot transfer tattoo');
  }

  function transferFrom(address from, address to, uint256 tokenId) external {
    revert('Cannot transfer tattoo');
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external {
    revert('Cannot transfer tattoo');
  }
}


contract CrystalGoddessProxy is ProxyBase, InternalMintCheck {
  mapping(address => uint256) public cleansedETH;

  event Cleanse(address indexed sinner, uint256 amount);

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
          name, symbol, mintThreshold, owner_, router, address(0), true
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address sender, uint256 amount) external view returns (bool) {
    return cleansedETH[sender] >= amount;
  }

  function cleanse() external payable {
    require(msg.value >= 0.01 ether, 'You must cleanse at least 0.01 ether');
    require(address(msg.sender).balance <= 0.00666 ether, 'You must cleanse your entire balance');

    emit Cleanse(msg.sender, msg.value);
    cleansedETH[msg.sender] += msg.value;
    payable(msg.sender).transfer(msg.value);
  }
}


interface FastCash {
  function transfer(address to, uint256 amount) external;
}

contract VinceSlickson is FinDomBaseLight {
  FastCash public fastcash;
  uint256 public fastcashPrice = 0.01 ether;
  event FastCashSaleMade(address indexed to, uint256 amount);

  constructor(address fastcashAddr, address owner_, address router) FinDomBaseLight(owner_, router) {
    fastcash = FastCash(fastcashAddr);
  }

  function buyFastCash() external payable {
    require(msg.value >= fastcashPrice, "Don't waste Vince's time");
    require(tributes[msg.sender] >= 0.01 ether, "Must wet Vince's whistle");

    uint256 amount = (msg.value  * 1 ether) / fastcashPrice;
    emit FastCashSaleMade(msg.sender, amount);
    fastcash.transfer(msg.sender, amount);
  }

  function updateFastCashPrice(uint256 price) external onlyOwner {
    fastcashPrice = price;
  }

  function compFastCash(address to, uint256 amount) external onlyOwner {
    fastcash.transfer(to, amount);
  }
}




interface IFinDomProxy {
  function setExternalMinter(address) external;
}
contract SteviePProxy is ProxyBase, InternalMintCheck {
  SexyGame public sexyGame;

  constructor(
    string memory name,
    string memory symbol,
    address implementationAddr,
    address owner_,
    address router
  ) {
    sexyGame = new SexyGame(owner_);

    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool)",
          name, symbol, 69 ether, owner_, router, address(sexyGame), false
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address, uint256) external view returns (bool) {
    return false;
  }
}

contract SexyGame is Ownable {
  mapping(address => uint256) public insertionAmount;
  mapping(address => uint256) public insertionTime;

  FinDomBase public steviep;

  constructor(address owner_) {
    transferOwnership(owner_);
    steviep = FinDomBase(payable(msg.sender));
  }

  function insert() external payable {
    require(insertionAmount[msg.sender] == 0, 'Cannot insert twice');
    require(msg.value == 1 ether, 'Can only insert 1 ETH');

    insertionAmount[msg.sender] = msg.value;
    insertionTime[msg.sender] = block.timestamp;
  }

  function pullOut() external {
    require(insertionAmount[msg.sender] == 1 ether, 'Nothing to pull out');

    if (block.timestamp >= insertionTime[msg.sender] + 1 hours) {
      steviep.mint(msg.sender);
    }

    insertionAmount[msg.sender] = 0;
    payable(msg.sender).transfer(1 ether);
  }

  function take(address paypig) external onlyOwner {
    require(insertionAmount[paypig] == 1 ether, 'Nothing to take');

    insertionAmount[paypig] = 0;
    payable(msg.sender).transfer(1 ether);
  }
}



contract SexyDeployer {
  FindomProxy public heatherHot;
  FindomProxy public SamanthaJones;
  FindomProxy public QueenJessica;
  FindomProxy public DungeonMistress;
  FindomProxy public DrAndy;
  FindomProxy public katFischer;
  FindomProxy public FDXXXpress;

  CandyCrushProxy public CandyCrush;
  SteviePProxy public steviep;
  CrystalGoddessProxy public CrystalGoddess;

  FinDomBase public baseContract;

  constructor(address router) {
    baseContract = new FinDomBase();
    address baseAddr = address(baseContract);

    heatherHot = new FindomProxy('heatherHot Money on Fire', 'SEXY-HH', 0.01 ether, baseAddr, msg.sender, router);
    SamanthaJones = new FindomProxy('SamanthaJones ...', 'SEXY-SJ', 0.04 ether, baseAddr, msg.sender, router);
    QueenJessica = new FindomProxy('QueenJessica Hot Little Pussy', 'SEXY-QJ', 0.04 ether, baseAddr, msg.sender, router);
    DungeonMistress = new FindomProxy('DungeonMistress ...', 'SEXY-DM', 0.05 ether, baseAddr, msg.sender, router);
    DrAndy = new FindomProxy('DrAndy ...', 'SEXY-AI', 0.04 ether, baseAddr, msg.sender, router);
    katFischer = new FindomProxy('katFischer ...', 'SEXY-KF', 0.03 ether, baseAddr, msg.sender, router);
    FDXXXpress = new FindomProxy('FDXXXpress Sexy Pics', 'SEXY-XXX', 0.01 ether, baseAddr, msg.sender, router);

    CandyCrush = new CandyCrushProxy('CandyCrush Tattoo', 'SEXY-CC', 0.01 ether, baseAddr, msg.sender, router);
    steviep = new SteviePProxy('steviep Dick Pics', 'SEXY-SP', baseAddr, msg.sender, router);
    CrystalGoddess = new CrystalGoddessProxy('CrystalGoddess ...', 'SEXY-CG', 0.01 ether, baseAddr, msg.sender, router);
  }
}


contract SexyDeployer2 {
  VinceSlickson public vinceSlickson;
  FinDomBaseLight public Hacker;
  FinDomBaseLight public Hedonitronica;
  FinDomBaseLight public MindyRouge;

  constructor(address router, address fcAddr) {
    vinceSlickson = new VinceSlickson(fcAddr, msg.sender, router);
    Hacker = new FinDomBaseLight(msg.sender, router);
    Hedonitronica = new FinDomBaseLight(msg.sender, router);
    MindyRouge = new FinDomBaseLight(msg.sender, router);
  }
}