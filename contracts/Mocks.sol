// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;


contract ABMock {
  function tokensOfOwner(address owner) external view returns (uint256[] memory) {
    uint256[] memory abOwned;
    abOwned[0] = 44000100;
    abOwned[0] = 152000000;
    return abOwned;
  }
}

contract FastCashMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }

  function transfer(address to, uint256 value) external returns (bool) {
    return true;
  }
}

contract ETFMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}


contract UFIMMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}


contract IOUMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract NVCMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract IFDMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract MMOMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract CASHMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract TenETHMock {
  function balanceOf(address owner) external view returns (uint256 balance) {
    return 1;
  }
}

contract KYCMock {

  struct KYCInfo {
    string firstName;
    string lastName;
    address addr;
  }

  function addrToTokenId(address owner) external view returns (uint256 tokenId) {
    return 1;
  }

  function kycInfo(uint256 tokenId) external view returns (KYCInfo memory) {
    return KYCInfo('Steven', 'Pikelny', msg.sender);
  }
}


contract MockDeployer {
  ABMock public ab;
  FastCashMock public fc;
  ETFMock public etf;
  UFIMMock public ufim;
  IOUMock public iou;
  NVCMock public nvc;
  IFDMock public ifd;
  MMOMock public mmo;
  CASHMock public cash;
  TenETHMock public tenEth;
  KYCMock public kyc;

  constructor() {
    ab = new ABMock();
    fc = new FastCashMock();
    etf = new ETFMock();
    ufim = new UFIMMock();
    iou = new IOUMock();
    nvc = new NVCMock();
    ifd = new IFDMock();
    mmo = new MMOMock();
    cash = new CASHMock();
    tenEth = new TenETHMock();
    kyc = new KYCMock();
  }
}