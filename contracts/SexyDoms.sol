// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./SexyProxy.sol";


contract SexyDeployer {
  FindomProxy public heatherHot;
  FindomProxy public SamanthaJones;
  FindomProxy public QueenJessica;
  FindomProxy public DungeonMistress;
  FindomProxy public katFischer;

  CandyCrushProxy public CandyCrush;
  SteviePProxy public steviep;
  CrystalGoddessProxy public CrystalGoddess;
  FindomProxy public SexyXXXpress;
  DrAndyProxy public DrAndy;

  FinDomBase public baseContract;

  constructor(address router) {
    baseContract = new FinDomBase(msg.sender, router);
    address baseAddr = address(baseContract);

    // TODO nft collection names

    // cash cow
    // pay pig
    // human atm

    heatherHot = new FindomProxy('heatherHot Feet Pic', 'SEXY-HH', 0.01 ether, baseAddr, msg.sender, router, 0);
    SamanthaJones = new FindomProxy('SamanthaJones Sexy Pic', 'SEXY-SJ', 0.03 ether, baseAddr, msg.sender, router, 0);
    QueenJessica = new FindomProxy("QueenJessica's Hot Little Pussy", 'SEXY-QJ', 0.04 ether, baseAddr, msg.sender, router, 0);
    DungeonMistress = new FindomProxy('DungeonMistress Tavern Key', 'SEXY-DM', 0.05 ether, baseAddr, msg.sender, router, 64);
    DrAndy = new DrAndyProxy('DrAndy Final Session Invoice', 'SEXY-AI', 0.04 ether, baseAddr, msg.sender, router, 0);
    katFischer = new FindomProxy('katFischer Human ATM', 'SEXY-KF', 0.03 ether, baseAddr, msg.sender, router, 0);
    CandyCrush = new CandyCrushProxy('CandyCrush Tattoo', 'SEXY-CC', 0.01 ether, baseAddr, msg.sender, router, 0);
    steviep = new SteviePProxy('steviep Dick Pic', 'SEXY-SP', baseAddr, msg.sender, router, 0);
    CrystalGoddess = new CrystalGoddessProxy('CrystalGoddess Monetary Enlightenment', 'SEXY-CG', 0.01 ether, baseAddr, msg.sender, router, 0);
    SexyXXXpress = new FindomProxy('SexyXXXpress ...', 'SEXY-XXX', 0.01 ether, baseAddr, msg.sender, router, 0);
  }
}

contract SexyDeployer2 {
  VinceSlickson public vinceSlickson;
  FinDomBaseLight public Hacker;
  FinDomBaseLight public Hedonitronica;
  FinDomBaseLight public MindyRouge;
  FinDomBaseLight public MoneyMommy777;
  FinDomBaseLight public HotlineBabe1900;
  FinDomBaseLight public RonaMerch;
  FinDomBaseLight public CustomerSupport247;
  FinDomBaseLight public cagla;

  constructor(address router, address fcAddr) {
    vinceSlickson = new VinceSlickson(fcAddr, msg.sender, router);
    Hacker = new FinDomBaseLight(msg.sender, router);
    Hedonitronica = new FinDomBaseLight(msg.sender, router);
    MindyRouge = new FinDomBaseLight(msg.sender, router);
    MoneyMommy777 = new FinDomBaseLight(msg.sender, router);
    HotlineBabe1900 = new FinDomBaseLight(msg.sender, router);
    RonaMerch = new FinDomBaseLight(msg.sender, router);
    CustomerSupport247 = new FinDomBaseLight(msg.sender, router);
    cagla = new FinDomBaseLight(msg.sender, router);
  }
}


contract CandyCrushProxy is FindomProxy {
  constructor(
    string memory name,
    string memory symbol,
    uint256 mintThreshold,
    address implementation,
    address owner_,
    address router,
    uint256 maxSupply
  ) FindomProxy(name, symbol, mintThreshold, implementation, owner_, router, maxSupply) {}

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
    address router,
    uint256 maxSupply
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool,uint256)",
          name, symbol, mintThreshold, owner_, router, address(0), true, maxSupply
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address sender, uint256 amount) external returns (bool) {
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

contract SteviePProxy is ProxyBase, InternalMintCheck {
  SexyGame public sexyGame;

  constructor(
    string memory name,
    string memory symbol,
    address implementationAddr,
    address owner_,
    address router,
    uint256 maxSupply
  ) {
    sexyGame = new SexyGame(owner_);

    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool,uint256)",
          name, symbol, 69 ether, owner_, router, address(sexyGame), false, maxSupply
        ),
        "Address: low-level delegate call failed"
    );
  }

  function mintCheck(address, uint256) external returns (bool) {
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
    address router,
    uint256 maxSupply
  ) {
    getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

    // Invoke the preInitialize function on itself, as defined by the archetype contract
    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool,uint256)",
          name, symbol, mintThreshold, owner_, router, address(0), true, maxSupply
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


// TODO
  // DrAndy proxy
  // mintCheck
    // store totalSupply => minter address
    // strore totalSupply => timeStamp
    // return true


// contract XXXpressProxy is ProxyBase, InternalMintCheck {
//   mapping(uint256 => uint256) public tokenIdToURIID;
//   uint256 public seriesAIssued;
//   uint256 public seriesBIssued;
//   uint256 public seriesCIssued;

//   constructor(
//     string memory name,
//     string memory symbol,
//     uint256 mintThreshold,
//     address implementationAddr,
//     address owner_,
//     address router
//   ) {
//     getAddressSlot(_IMPLEMENTATION_SLOT).value = implementationAddr;

//     // Invoke the preInitialize function on itself, as defined by the archetype contract
//     Address.functionDelegateCall(
//         implementationAddr,
//         abi.encodeWithSignature(
//           "initialize(string,string,uint256,address,address,address,bool)",
//           name, symbol, mintThreshold, owner_, router, address(0), true
//         ),
//         "Address: low-level delegate call failed"
//     );
//   }

//   function mintCheck(address sender, uint256 amount) external view returns (bool) {
//     return cleansedETH[sender] >= amount;
//   }
// }