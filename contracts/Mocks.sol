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
