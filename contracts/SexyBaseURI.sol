// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

interface ISexyRouter {
  function owner() external view returns (address);
}

interface IForwardedURI {
  function tokenURI(string memory name, string memory symbol, uint256 tokenId) external view returns (string memory);
  function isSpecial(uint256 tokenId) external view returns (bool);
}

contract SexyBaseURI {
  using IntToString for uint256;

  ISexyRouter public router;

  struct URIInfo {
    string baseURI;
    string description;
    string domName;
    uint256 maxImages;
  }

  mapping(string => URIInfo) public symbolToURIInfo;
  mapping(string => address) public symbolToForwardedAddr;

  constructor() {
    router = ISexyRouter(msg.sender);

    _setURIString('SEXY-CG', 'ipfs://QmXxuewooGfrtNno52sftykoAFLsBubPG8k3DeBXYbKNvr/', 'This token symbolizes your purge of profits profile, and embrace of the numismatic numina', 'CrystalGoddess', 36);
    _setURIString('SEXY-DM', 'ipfs://QmaH6ZdxNe2xkS7SjdkR2VHoYrHQtwms2GpsiyryZBJiqx/', 'The Tavern Key glissens in the sun, reminding you of the journey you took to acquire it', 'DungeonMistress', 64);
    _setURIString('SEXY-QJ', 'ipfs://Qme5RSzc1kxoUAc4cnwS6RBrF8Y5XQ8LCyUJq3FCLFrmcq/', 'Here\'s my hot little pussy, idiot', 'QueenJessica', 25);
    _setURIString('SEXY-SJ', 'ipfs://QmYztV8Pi4GiCVbM8iiLtViGve85jsAAripLVy2CwLudBf/', 'Hopefully this gives you a little motivation to keep your taxes in poor standing.', 'SamanthaJones', 36);
    _setURIString('SEXY-XXA', 'ipfs://QmTgt6nxVB3rUBLhL8iWofWmHAXr22Ss6Q7AGuYPeoZcyR/', 'MODEL A', 'SexyXXXPress', 200); // A
    _setURIString('SEXY-XXB', 'ipfs://QmbTwHkcVzweEmZP6T2a1aLaJUv2Biwim7KcEhpfhZjBsN/', 'MODEL B', 'SexyXXXPress', 100); // B
    _setURIString('SEXY-XXC', 'ipfs://QmaZhCNAwpxePAexTgQAdpkcGWZsBUAKsu9P6jHVMp5sHq/', 'MODEL C', 'SexyXXXPress', 50); // C
    _setURIString('SEXY-HH', 'ipfs://QmcmSw7urQCHyiqsLxXJKPdJdHnRPhSRt3JWgUHESEkkLd/', 'you have \'paypig\' written all over you ;)', 'heatherHot', 81);
    _setURIString('SEXY-KF', 'ipfs://QmQo8okVhKAreJv3kaauoCZ2h4H5i6niUtpKZDCgGAgfvF/', 'OMG, you really are a human ATM', 'katFischer', 49);
    _setURIString('SEXY-SP', 'ipfs://QmcHMVW79r3q1xaCmMnrDj64YTmxBp1yWvPo23ei3f6EN8/', 'pleasure doing business with you.', 'steviep', 49);
  }

  function isSpecial(string memory symbol, uint256 tokenId) public view returns (bool) {
    if (symbolToForwardedAddr[symbol] != address(0)) {
      return IForwardedURI(symbolToForwardedAddr[symbol]).isSpecial(tokenId);
    }
    return tokenId < symbolToURIInfo[symbol].maxImages;
  }



  function tokenURI(string memory name, string memory symbol, uint256 tokenId) external view returns (string memory) {
    if (symbolToForwardedAddr[symbol] != address(0)) {
      return IForwardedURI(symbolToForwardedAddr[symbol]).tokenURI(name, symbol, tokenId);
    }

    uint256 outputNum = tokenId % symbolToURIInfo[symbol].maxImages;

    string memory tokenName = string.concat(name, ' #', tokenId.toString());
    string memory imageURI = string.concat(symbolToURIInfo[symbol].baseURI, outputNum.toString(), '.png');
    string memory specialness = isSpecial(symbol, tokenId) ? 'True' : 'False';

    bytes memory json = abi.encodePacked(
      'data:application/json;utf8,'
      '{"name": "', tokenName,'",'
      '"description": "', symbolToURIInfo[symbol].description, '",'
      '"external_url": "https://finsexy.com/doms/', symbolToURIInfo[symbol].domName,'",'
      '"attributes": [{"trait_type": "Output #", "value": "', outputNum.toString(),'"}, {"trait_type": "Is Special", "value": "', specialness, '"}],'
      '"image": "', imageURI,
      '"}'
    );

    return string(json);
  }

  function setURIString(
    string memory symbol,
    string memory baseURI,
    string memory description,
    string memory domName,
    uint256 maxImages
  ) external {
    require(msg.sender == router.owner(), 'Ownable: caller is not the owner');
    _setURIString(symbol, baseURI, description, domName, maxImages);
  }

  function _setURIString(
    string memory symbol,
    string memory baseURI,
    string memory description,
    string memory domName,
    uint256 maxImages
  ) internal {
    symbolToURIInfo[symbol].baseURI = baseURI;
    symbolToURIInfo[symbol].description = description;
    symbolToURIInfo[symbol].domName = domName;
    symbolToURIInfo[symbol].maxImages = maxImages;
  }

  function setURIAddr(string memory symbol, address addr) external {
    require(msg.sender == router.owner(), 'Ownable: caller is not the owner');
    symbolToForwardedAddr[symbol] = addr;
  }
}


contract CandyCrushURI is IForwardedURI {
  using IntToString for uint256;

  function tokenURI(string memory name, string memory symbol, uint256 tokenId) external view returns (string memory) {
    string memory tokenName = string.concat(name, ' #', tokenId.toString());

    bytes memory json = abi.encodePacked(
      'data:application/json;utf8,'
      '{"name": "', tokenName,'",'
      '"description": "All tattoos are non-transferable",'
      '"external_url": "https://finsexy.com/doms/CandyCrush",'
      '"attributes": [{"trait_type": "Is Special", "value": "', isSpecial(tokenId) ? 'True' : 'False','"}],'
      '"image": "', encodedSVG(tokenId),
      '"}'
    );

    return string(json);
  }

  function isSpecial(uint256 tokenId) public pure returns (bool) {
    return tokenId < 60;
  }

  function encodedSVG(uint256 tokenId) public pure returns (string memory) {
    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64Encode.encode(rawSVG(tokenId))
    ));
  }

  function rawSVG(uint256 tokenId) public pure returns (bytes memory) {
    string[10] memory bgColors = [
      '120211', // bg
      '120211', // bg
      '120211', // bg

      'fff8ff', // primary
      'fff8ff', // primary
      'fff8ff', // primary

      'ff00c7', // light
      'ff00c7', // light

      '00ffef', // light link
      '00ffef' // light link
    ];

    string[10] memory textColors = [
      'fff8ff', // primary
      'ff00c7', // light
      '00ffef', // light link

      '120211', // bg
      'ff00c7', // light
      '00ffef', // light link

      '120211', // bg
      'fff8ff', // primary

      '120211', // bg
      'fff8ff' // primary
    ];

    bytes[6] memory tattoos = [
      abi.encodePacked("I'm a little paypiggie"),
      abi.encodePacked('I ', unicode'💖', ' CandyCrush'),
      abi.encodePacked('Property of CandyCrush'),
      abi.encodePacked("Cash Cow ",  unicode'💵', unicode'🐄'),
      abi.encodePacked("Human ATM ",  unicode'🙇', unicode'🏧'),
      abi.encodePacked("Pay Pig ",  unicode'💸', unicode'🐖')
    ];

    string memory bgColor = bgColors[(tokenId / tattoos.length) % bgColors.length];
    string memory textColor = textColors[(tokenId / tattoos.length) % textColors.length];
    bytes memory tattoo = tattoos[tokenId % tattoos.length];

    return abi.encodePacked(
      '<svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">'
        '<rect x="0" y="0" width="900" height="300" fill="#', bgColor, '"></rect>'
        '<text x="50%" y="50%" style="fill:#', textColor, ';font-family:cursive;font-size:95px;dominant-baseline:middle;text-anchor: middle;">', tattoo,'</text>'
      '</svg>'
    );
  }
}


interface IDrAndy {
  function mintedBy(uint256) external view returns (address);
  function timestamp(uint256) external view returns (uint256);
  function tributes(address) external view returns (uint256);
}

contract DrAndyURI is IForwardedURI{
  using IntToString for uint256;

  IDrAndy public ai;

  constructor(address addr) {
    ai = IDrAndy(addr);
  }

  function tokenURI(string memory name, string memory, uint256 tokenId) external view returns (string memory) {
    string memory tokenName = string.concat(name, ' #', tokenId.toString());

    address originalMinter = ai.mintedBy(tokenId);
    bool finalSessionPaid = ai.tributes(originalMinter) >= 0.05 ether;

    bytes memory json = abi.encodePacked(
      'data:application/json;utf8,'
      '{"name": "', tokenName,'",'
      '"description": "Invoices must be paid within 90 business days with either ETH or SexyCredits.",'
      '"external_url": "https://finsexy.com/doms/DrAndy",'
      '"attributes": [{"trait_type": "Final Session Paid", "value": "', finalSessionPaid ? 'True' : 'False','"},{"trait_type": "Is Special", "value": "', isSpecial(tokenId) ? 'True' : 'False','"}],'
      '"image": "', encodedSVG(tokenId),
      '"}'
    );

    return string(json);
  }

  function isSpecial(uint256) public pure returns (bool) {
    return true;
  }

  function encodedSVG(uint256 tokenId) public view returns (string memory) {
    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64Encode.encode(rawSVG(tokenId))
    ));
  }

  function rawSVG(uint256 tokenId) public view returns (bytes memory) {
    address originalMinter = ai.mintedBy(tokenId);
    bool finalSessionPaid = ai.tributes(originalMinter) >= 0.05 ether;
    uint256 taxId = uint256(keccak256(abi.encodePacked(originalMinter, tokenId))) % 1000000;

    string memory header = string.concat(
      '<svg viewBox="0 0 850 1100" xmlns="http://www.w3.org/2000/svg"><style>.c{dominant-baseline:hanging;text-anchor:middle}.e{text-anchor:end}text{font-size:25px}line{stroke:#000}</style><rect x="0" y="0" width="850" height="1100" fill="#fff"></rect><text class="c" x="50%" y="125" style="font-size:60px">INVOICE</text><text class="c" x="50%" y="183" style="font-size:45px">Dr. Andy Ingram</text><text class="c s" x="50%" y="240">',
      uint256(uint160(address(ai))).toHexString(),
      '</text>'
    );

    string memory middleSection = string.concat(
      '<text x="100" y="345" class="s">Invoice # ',
      tokenId.toString(),
      '</text><text x="750" y="345" class="s e">Tax # ',
      taxId.toString(),
      '</text><line x1="100" x2="750" y1="350" y2="350"></line><text x="100" y="410" class="s">Statement Timestamp: ',
      ai.timestamp(tokenId).toString(),
      '</text><text x="100" y="445" class="s">Patient:</text><text x="185" y="445" class="s">',
       uint256(uint160(originalMinter)).toHexString(),
      '</text>'
    );

    string memory feeSection = string.concat(
      '<text x="100" y="595" class="s"># of Sessions: 4</text><text x="750" y="595" class="s e">Fee Per Session: 0.01 ETH</text><line x1="100" x2="750" y1="600" y2="600"></line><text x="150" y="675">Session 1:</text><text x="300" y="675">0.01 ETH</text><text x="450" y="675">PAID</text><text x="150" y="715">Session 2:</text><text x="300" y="715">0.01 ETH</text><text x="450" y="715">PAID</text><text x="150" y="755">Session 3:</text><text x="300" y="755">0.01 ETH</text><text x="450" y="755">PAID</text><text x="150" y="795">Session 4:</text><text x="300" y="795">0.01 ETH</text><text x="450" y="795" fill="',
      finalSessionPaid ? '#000' : '#f00',
      '">',
      finalSessionPaid ? 'PAID' : 'UNPAID',
      '</text>'
    );

    string memory end = string.concat(
      '<text x="100" y="935">Balance Paid: 0.0',
      finalSessionPaid ? '4' : '3',
      ' ETH</text><text x="100" y="975">Balance Due: 0.0',
       finalSessionPaid ? '0' : '1',
       ' ETH</text></svg>'
    );

    return abi.encodePacked(
      header,
      middleSection,
      feeSection,
      end
    );
  }
}





library IntToString {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /*
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}


library Base64Encode {
    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(input, 0x3F))), 0xFF))
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}