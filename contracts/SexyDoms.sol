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
  DrAndyProxy public DrAndy;

  FinDomBase public baseContract;

  constructor(address router) {
    baseContract = new FinDomBase(msg.sender, router);
    address baseAddr = address(baseContract);


    heatherHot = new FindomProxy('heatherHot Pay Pig', 'SEXY-HH', 0.01 ether, baseAddr, msg.sender, router);
    QueenJessica = new FindomProxy("QueenJessica's Hot Little Pussy", 'SEXY-QJ', 0.04 ether, baseAddr, msg.sender, router);
    DungeonMistress = new FindomProxy('DungeonMistress Tavern Key', 'SEXY-DM', 0.05 ether, baseAddr, msg.sender, router);
    DrAndy = new DrAndyProxy('DrAndy Final Session Invoice', 'SEXY-AI', 0.04 ether, baseAddr, msg.sender, router);
    katFischer = new FindomProxy('katFischer Human ATM', 'SEXY-KF', 0.03 ether, baseAddr, msg.sender, router);
    CandyCrush = new CandyCrushProxy('CandyCrush Tattoo', 'SEXY-CC', 0.01 ether, baseAddr, msg.sender, router);
    steviep = new SteviePProxy('steviep Dick Pic', 'SEXY-SP', baseAddr, msg.sender, router);
    CrystalGoddess = new CrystalGoddessProxy('CrystalGoddess Monetary Enlightenment', 'SEXY-CG', 0.01 ether, baseAddr, msg.sender, router);
    SamanthaJones = new FindomProxy('SamanthaJones Feet Pic', 'SEXY-SJ', 0.03 ether, baseAddr, msg.sender, router);

  }
}

contract SexyDeployer2 {
  VinceSlickson public vinceSlickson;
  FinDomBaseLight public Hacker;
  FinDomBaseLight public Hedonitronica;
  FinDomBaseLight public MindyRouge;
  FinDomBaseLight public HotlineBabe1900;
  FinDomBaseLight public RonaMerch;
  FinDomBaseLight public CustomerSupport247;
  SexyXXXpressBase public SexyXXXpress;
  // FinDomBaseLight public MoneyMommy777;
  // FinDomBaseLight public cagla;

  constructor( address baseAddr,address router, address fcAddr) {
    address A = address(new SexyXXXpressProxy('SexyXXXpress Sexy Picture [MODEL A]', 'SEXY-XXA', 0.01 ether, baseAddr, msg.sender, router, 200));
    address B = address(new SexyXXXpressProxy('SexyXXXpress Sexy Picture [MODEL B]', 'SEXY-XXB', 0.01 ether, baseAddr, msg.sender, router, 100));
    address C = address(new SexyXXXpressProxy('SexyXXXpress Sexy Picture [MODEL C]', 'SEXY-XXC', 0.01 ether, baseAddr, msg.sender, router, 50));

    SexyXXXpress = new SexyXXXpressBase(msg.sender, router, A, B, C);

    vinceSlickson = new VinceSlickson(fcAddr, msg.sender, router);
    Hacker = new FinDomBaseLight(msg.sender, router);
    Hedonitronica = new FinDomBaseLight(msg.sender, router);
    MindyRouge = new FinDomBaseLight(msg.sender, router);
    HotlineBabe1900 = new FinDomBaseLight(msg.sender, router);
    RonaMerch = new FinDomBaseLight(msg.sender, router);
    CustomerSupport247 = new FinDomBaseLight(msg.sender, router);
    // MoneyMommy777 = new FinDomBaseLight(msg.sender, router);
    // cagla = new FinDomBaseLight(msg.sender, router);
  }
}




interface ITributeReceiver {
  function tributes(address) external view returns (uint256);
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
    require(_tributes[msg.sender] >= 0.01 ether, "Must wet Vince's whistle");

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

contract SteviePProxy is ProxyBase {
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

    Address.functionDelegateCall(
        implementationAddr,
        abi.encodeWithSignature(
          "initialize(string,string,uint256,address,address,address,bool)",
          name, symbol, 69 ether, owner_, router, address(sexyGame), false
        ),
        "Address: low-level delegate call failed"
    );
  }
}

interface IFindomBase {
  function mint(address) external;
}

contract SexyGame is Ownable {
  mapping(address => uint256) public insertionAmount;
  mapping(address => uint256) public insertionTime;

  IFindomBase public steviep;

  constructor(address owner_) {
    transferOwnership(owner_);
    steviep = IFindomBase(payable(msg.sender));
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

