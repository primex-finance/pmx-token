// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PrimexToken is ERC20 {
    constructor(
        string memory _name,
        string memory _symbol,
        address _delegate
    ) ERC20(_name, _symbol) {
        _mint(_delegate, 1_000_000_000 ether);
    }
}
