// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.23;

// import "./Dependencies.sol";
// import "./FinDomTokenURI.sol";


// contract FinDom is ERC721, Ownable {
//   uint256 public totalSupply = 7;
//   FinDomTokenURI public tokenURIContract;
//   FinSub public finSubContract;

//   mapping(uint256 => uint256) public findomMinimumStake;


//   constructor() ERC721('FinDom', 'FINDOM') {
//     tokenURIContract = new FinDomTokenURI();
//     finSubContract = new FinSub(address(this));

//     for (uint256 i; i < 7; i++) {
//       _mint(msg.sender, i);
//     }
//   }

//   function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
//     return tokenURIContract.tokenURI(tokenId);
//   }

//   function exists(uint256 tokenId) external view returns (bool) {
//     return _exists(tokenId);
//   }

//   function setURIContract(address _uriContract) external onlyOwner {
//     require(msg.sender == mmo.ownerOf(0), 'Cannot update');
//     tokenURIContract = Prop15WpTokenURI(_uriContract);
//   }

//   function drainStake(uint256 subId) external {

//   }

//   function updateMinimumTribute() {

//   }
// }

// contract FinSub is ERC721 {
//   uint256 public totalSupply;
//   FinSubTokenURI public tokenURIContract;
//   FinDom public finDomContract;

//   mapping(uint256 => uint256) public subIdToDomId;
//   mapping(uint256 => uint256) public subIdToStake;
//   mapping(uint256 => uint256) public subIdToStartingBlock;
//   mapping(uint256 => uint256) public subIdToEndingBlock;

//   constructor(address finDomAddr) ERC721('FinDom', 'FINDOM') {
//     tokenURIContract = new FinSubTokenURI();
//     finDomContract = FinDom(finDomAddr);
//   }



//   function edge(uint256 domId) public {
//     require(domId < finDomContract.totalSupply, 'That Dom does not exist');
//     require(msg.value > 0 && msg.value > finDomContract.findomMinimumStake(domId), 'Stake not large enough');
//     subIdToDomId[totalSupply] = domId;
//     subIdToStartingBlock[totalSupply] = block.number;
//     _mint(msg.sender, totalSupply);
//     totalSupply++;
//   }

//   function release() public {

//   }

//   function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
//     return tokenURIContract.tokenURI(tokenId);
//   }

//   function exists(uint256 tokenId) external view returns (bool) {
//     return _exists(tokenId);
//   }

//   function setURIContract(address _uriContract) external onlyOwner {
//     tokenURIContract = Prop15WpTokenURI(_uriContract);
//   }
// }
