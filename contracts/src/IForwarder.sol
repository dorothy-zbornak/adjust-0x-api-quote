pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;

import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";


interface IForwarder {

    function marketSellAmountWithEth(
        LibOrder.Order[] calldata orders,
        uint256 ethSellAmount,
        bytes[] calldata signatures,
        uint256[] calldata ethFeeAmounts,
        address payable[] calldata feeRecipients
    )
        external
        payable
        returns (
            uint256 wethSpentAmount,
            uint256 makerAssetAcquiredAmount
        );

    function marketBuyOrdersWithEth(
        LibOrder.Order[] calldata orders,
        uint256 makerAssetBuyAmount,
        bytes[] calldata signatures,
        uint256[] calldata ethFeeAmounts,
        address payable[] calldata feeRecipients
    )
        external
        payable
        returns (
            uint256 wethSpentAmount,
            uint256 makerAssetAcquiredAmount
        );
}
