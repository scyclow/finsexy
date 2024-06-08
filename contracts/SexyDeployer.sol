// SPDX-License-Identifier: MIT

/*

 /$$$$$$$$ /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$ /$$   /$$ /$$     /$$
| $$_____/|_  $$_/| $$$ | $$ /$$__  $$| $$_____/| $$  / $$|  $$   /$$/
| $$        | $$  | $$$$| $$| $$  \__/| $$      |  $$/ $$/ \  $$ /$$/
| $$$$$     | $$  | $$ $$ $$|  $$$$$$ | $$$$$    \  $$$$/   \  $$$$/
| $$__/     | $$  | $$  $$$$ \____  $$| $$__/     >$$  $$    \  $$/
| $$        | $$  | $$\  $$$ /$$  \ $$| $$       /$$/\  $$    | $$
| $$       /$$$$$$| $$ \  $$|  $$$$$$/| $$$$$$$$| $$  \ $$    | $$
|__/      |______/|__/  \__/ \______/ |________/|__/  |__/    |__/


https://finsexy.com

by steviep.eth

*/

pragma solidity ^0.8.23;

import "./SexyProxy.sol";
import "./SexyDoms.sol";


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

  constructor(address baseAddr,address router, address fcAddr) {
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
  }
}

