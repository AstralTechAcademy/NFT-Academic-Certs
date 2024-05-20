// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WLNCert is ERC721 {
    uint256 private _nextTokenId;
    address private _ownwer;

    constructor()
        ERC721("WLN-TECH", "Techforum24")
    {
        _ownwer = msg.sender;
    }


    function _baseURI() internal pure override returns (string memory) {
        return "https://jade-negative-emu-951.mypinata.cloud/ipfs/Qma7qHV4kbUpgwaH1kM5E8BNAMWpg923zewWmTSrbvwQ9Q/";
    }

    function safeMint(address to, uint256 tokenId) public {
        require(msg.sender == _ownwer, "The signer cannot perform this action, only Worldline can do it");
        _safeMint(to, tokenId);
    }
}
