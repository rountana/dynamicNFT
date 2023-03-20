// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    // leverage function from counters for struct Counters.Counter
    using Counters for Counters.Counter;

    // unique id for the NFTs
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenIdToLevels;

    constructor() ERC721("ChainBattles", "CBTLS") {}

    //generate SVGs
    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Warrior",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Levels: ",
            getLevels(tokenId),
            "</text>",
            "</svg>"
        );

        return
            string(
                abi.encodePacked(
                    "data: image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getLevels(uint256 tokenId) public view returns (string memory) {
        uint256 levels = tokenIdToLevels[tokenId];
        return levels.toString();
    }

    //create tokenURI - allows Opensea to know what we are minting
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data: application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    // mint the NFT
    function mint() public {
        //increment the current token Id
        _tokenIds.increment();

        //get the latest token Id
        uint256 newTokenId = _tokenIds.current();
        //mint the token
        _safeMint(msg.sender, newTokenId);

        //set the level for the new token (to zero the first time around)
        tokenIdToLevels[newTokenId] = 0;

        //finish the mint - update meta data - token ID & URI
        _setTokenURI(newTokenId, getTokenURI(newTokenId));
    }

    // train function that allows users to train the NFT

    function train(uint256 tokenId) public {
        // first, ensure token id exists
        require(_exists(tokenId), "Please use an existing token");
        // ensure owner of this token id is msg.sender
        require(ownerOf(tokenId) == msg.sender, "Must own this token");
        //get  current level from token id, and then update to a new level
        uint256 currentLevel = tokenIdToLevels[tokenId];
        //update the metadata associated with this NFT, pass the token Id and get thew new token URI
        tokenIdToLevels[tokenId] = currentLevel + 1;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
