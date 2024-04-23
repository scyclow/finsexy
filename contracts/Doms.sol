// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import "./Dependencies.sol";

import "hardhat/console.sol";

interface IFinSexy {
  function mint(address to, uint256 domId) external;
  function owner() external view returns (address);
}

interface IERC20 {
  function transfer(address to, uint256 value) external returns (bool);
}


abstract contract FinDom is Ownable {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);
  IFinSexy public finSexy;
  uint256 immutable THRESHOLD;
  uint256 public immutable findomId;
  string public name;

  constructor(uint256 id, uint256 threshold, string memory _name, address fs) {
    THRESHOLD = threshold;
    findomId = id;
    name = _name;
    finSexy = IFinSexy(fs);
  }

  receive() external payable {
    emit Send(msg.sender, msg.value);
    tributes[msg.sender] += msg.value;

    if (
      msg.value >= THRESHOLD
      || (
        tributes[msg.sender] % THRESHOLD
        < tributes[msg.sender] - msg.value % THRESHOLD
      )
    ) {
      _mint(msg.sender);
    }
  }

  function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  function _mint(address sender) internal {
    finSexy.mint(sender, findomId);
  }
}


abstract contract FinDomLight is Ownable {
  mapping(address => uint256) public tributes;
  event Send(address indexed from, uint256 amount);
  uint256 public immutable findomId;
  string public name;

  constructor(uint256 id, string memory _name) {
    findomId = id;
    name = _name;
  }

  receive() external payable {
    emit Send(msg.sender, msg.value);
    tributes[msg.sender] += msg.value;
  }

  function withdraw() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }
}


contract HeatherHot is FinDom {
  constructor(address fs) FinDom(0, 0.01 ether, 'heatherHot', fs) {}
}
contract KatFischer is FinDom {
  constructor(address fs) FinDom(1, 0.03 ether, 'katFischer', fs) {}
}

contract SamanthaJones is FinDom {
  constructor(address fs) FinDom(2, 0.06 ether, 'SamanthaJones', fs) {}
}

contract VinceSlickson is FinDom {
  uint256 public erc20Price = 0.01 ether;
  event ERC20SaleMade(address indexed from, uint256 amount);


  constructor(address fs) FinDom(3, 0.03 ether, 'VinceSlickson', fs) {}

  function sellERC20(address erc20) external payable {
    require(msg.value >= erc20Price, "Don't waste Vince's time");
    require(tributes[msg.sender] >= 0.01 ether, "Must wet Vince's whistle");

    uint256 amount = (msg.value / erc20Price) * 1 ether;
    IERC20(erc20).transfer(msg.sender, amount);
  }
  function updateERC20Price(uint256 price) external onlyOwner {
    erc20Price = price;
  }

}

contract VinceSlicksonAlpha {
  mapping(address => uint256) public stakedBalance;
  mapping(address => uint256) public stakeTime;

  function stake() external payable {
    stakedBalance[msg.sender] = msg.value;

  }

  function unstake() external {

  }
}

contract CrystalGoddess is FinDom {
  constructor(address fs) FinDom(4, 0.03 ether, 'CrystalGoddess', fs) {}
}

contract DrAndy is FinDom {
  constructor(address fs) FinDom(5, 0.03 ether, 'DrAndy', fs) {}
}

contract DungeonMistress is FinDom {
  constructor(address fs) FinDom(6, 0.03 ether, 'DungeonMistress', fs) {}
}

contract Hacker is FinDom {
  constructor(address fs) FinDom(7, 0.03 ether, '0x0', fs) {}
}

contract QueenJessica is FinDom {
  constructor(address fs) FinDom(8, 0.03 ether, 'QueenJessica', fs) {}
}

contract StevieP is FinDom {
  constructor(address fs) FinDom(9, 0.03 ether, 'steviep', fs) {}
}


contract Hedonitronica is FinDomLight {
  constructor() FinDomLight(11, 'Hedonitronica') {}
}

// contract Cagla is FinDom {
//   constructor() FinDom(id, amount, _name) {}
// }

// contract CandyCrush is FinDom {
//   constructor() FinDom(id, amount, _name) {}
// }



// contract HeatherHot {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (
//       msg.value >= THRESHOLD
//       || (
//         tributes[msg.sender] % THRESHOLD
//         < tributes[msg.sender] - msg.value % THRESHOLD
//       )
//     ) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }

// contract SamanthaJones {
//   // audit - post your seed phrase
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (
//       msg.value >= THRESHOLD
//       || (
//         tributes[msg.sender] % THRESHOLD
//         < tributes[msg.sender] - msg.value % THRESHOLD
//       )
//     ) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }


// contract VinceSlickson {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }

//   function _sendFastCash(address sender) internal {

//   }
// }


// contract CrystalGoddess {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }

// contract DrAndy {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }


// contract DungeonMistress {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }


// contract Hacker {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }


// contract QueenJessica {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }


// contract StevieP {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }

// contract Cagla {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }

// contract CandyCrush {
//   mapping(address => uint256) public tributes;
//   event Send(address indexed from, uint256 amount);
//   uint256 constant THRESHOLD = 0 ether;

//   receive() external payable {
//     emit Send(msg.sender, msg.value);
//     tributes[msg.sender] += msg.value;

//     if (false) {
//       _mint(msg.sender);
//     }
//   }

//   function withdraw() external {

//   }

//   function _mint(address sender) internal {

//   }
// }

