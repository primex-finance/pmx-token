// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { OFTUpgradeable } from "./oft/OFTUpgradeable.sol";

contract PrimexOFT is OFTUpgradeable {

    /**
     * @dev Constructor for the MyOFT contract.
     * @param _lzEndpoint The LayerZero endpoint address.
     */
    constructor(
        address _lzEndpoint
    ) OFTUpgradeable(_lzEndpoint) {}


    /**
     * @dev Initializes the OFT with the provided name, symbol, and delegate.
     * @param _name The name of the OFT.
     * @param _symbol The symbol of the OFT.
     * @param _delegate The delegate capable of making OApp configurations inside of the endpoint.
     *
     * @dev The delegate typically should be set as the owner of the contract.
     * @dev Ownable is not initialized here on purpose. It should be initialized in the child contract to
     * accommodate the different version of Ownable.
     */

    function initialize(
        string memory _name, string memory _symbol, address _delegate
    ) external initializer {
        __OFT_init(_name, _symbol, _delegate);
        __Ownable_init(_delegate);
    }

}
