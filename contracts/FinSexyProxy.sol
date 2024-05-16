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

contract FinDomBase is ERC721, FinDomTribute {
  uint256 public mintThreshold;
  string private _name;
  string private _symbol;

  bool private _isInitialized;

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
    address externalMinter_,
    bool internalMintCheck_
  ) external {
    require(!_isInitialized, "Can't initialize more than once");
    _isInitialized = true;
    _name = name_;
    _symbol = symbol_;
    mintThreshold = mintThreshold_;
    externalMinter = externalMinter_;
    internalMintCheck = internalMintCheck_;
    tokenURIContract = new TokenURI();

    _setOwner(owner_);
  }

  /// @notice Name of collection
  /// @return Name
  function name() public view virtual override(ERC721) returns (string memory) {
   return  _name;
  }

  /// @notice Symbol of collection
  /// @return Symbol
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


  receive() external payable {
    emit Send(msg.sender, msg.value);
    tributes[msg.sender] += msg.value;

    if (internalMintCheck) {
      if (!InternalMintCheck(address(this)).mintCheck(msg.sender, msg.value)) return;
    }

    if (
      msg.value >= mintThreshold
      || (
        tributes[msg.sender] % mintThreshold
        < (tributes[msg.sender] - msg.value) % mintThreshold
      )
    ) {
      _mint(msg.sender, totalSupply);
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
    address _owner
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,bool)",
          name, symbol, mintThreshold, _owner, address(0), false
        ),
        "Address: low-level delegate call failed"
    );
  }
}



contract FinDomBaseLight is FinDomTribute {
  constructor(address _owner) {
    transferOwnership(_owner);
  }

  receive() external payable {
    emit Send(msg.sender, msg.value);
    tributes[msg.sender] += msg.value;
  }
}



contract CandyCrushProxy is FindomProxy {
  constructor(string memory name, string memory symbol, uint256 mintThreshold, address implementation, address _owner)
    FindomProxy(name, symbol, mintThreshold, implementation, _owner) {}

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
    address _owner
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,bool)",
          name, symbol, mintThreshold, _owner, address(0), true
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address sender, uint256 amount) external view returns (bool) {
    return cleansedETH[sender] >= amount;
  }

  function cleanse() external payable {
    require(msg.value >= 0.0111 ether, 'You must cleanse at least 0.0111 ether');
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

  constructor(address fastcashAddr, address _owner) FinDomBaseLight(_owner) {
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
    address _owner
  ) {
    sexyGame = new SexyGame(_owner);

    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,bool)",
          name, symbol, 69 ether, _owner, address(sexyGame), false
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

  constructor(address _owner) {
    transferOwnership(_owner);
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

  CandyCrushProxy public CandyCrush;
  VinceSlickson public vinceSlickson;
  SteviePProxy public steviep;
  CrystalGoddessProxy public CrystalGoddess;

  FinDomBaseLight public FinXXXpress;
  FinDomBaseLight public Hacker;
  FinDomBaseLight public Hedonitronica;
  FinDomBaseLight public MindyRouge;

  FinDomBase public baseContract;

  constructor(address fcAddr) {
    baseContract = new FinDomBase();
    address baseAddr = address(baseContract);

    heatherHot = new FindomProxy('heatherHot Money on Fire', 'SEXY-HH', 0.01 ether, baseAddr, msg.sender);
    SamanthaJones = new FindomProxy('SamanthaJones ...', 'SEXY-SJ', 0.04 ether, baseAddr, msg.sender);
    QueenJessica = new FindomProxy('QueenJessica Hot Little Pussy', 'SEXY-QJ', 0.04 ether, baseAddr, msg.sender);
    DungeonMistress = new FindomProxy('DungeonMistress ...', 'SEXY-DM', 0.05 ether, baseAddr, msg.sender);
    DrAndy = new FindomProxy('DrAndy ...', 'SEXY-AI', 0.04 ether, baseAddr, msg.sender);
    katFischer = new FindomProxy('katFischer ...', 'SEXY-KF', 0.03 ether, baseAddr, msg.sender);

    CandyCrush = new CandyCrushProxy('CandyCrush Tattoo', 'SEXY-CC', 0.01 ether, baseAddr, msg.sender);
    steviep = new SteviePProxy('steviep Dick Pics', 'SEXY-SP', baseAddr, msg.sender);
    CrystalGoddess = new CrystalGoddessProxy('CrystalGoddess ...', 'SEXY-CG', 0.0111 ether, baseAddr, msg.sender);

    vinceSlickson = new VinceSlickson(fcAddr, msg.sender);

    FinXXXpress = new FinDomBaseLight(msg.sender);
    Hacker = new FinDomBaseLight(msg.sender);
    Hedonitronica = new FinDomBaseLight(msg.sender);
    MindyRouge = new FinDomBaseLight(msg.sender);
  }
}