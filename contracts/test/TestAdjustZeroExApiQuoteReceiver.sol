pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;

import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";
import "../src/IExchange.sol";
import "../src/IForwarder.sol";


contract TestAdjustZeroExApiQuoteReceiver is
    IForwarder,
    IExchange
{

    event MarketSellAmountWithEth(
        LibOrder.Order[] orders,
        uint256 ethSellAmount,
        bytes[] signatures,
        uint256[] ethFeeAmounts,
        address payable[] feeRecipients
    );

    event MarketBuyOrdersWithEth(
        LibOrder.Order[] orders,
        uint256 makerAssetBuyAmount,
        bytes[] signatures,
        uint256[] ethFeeAmounts,
        address payable[] feeRecipients
    );

    event MarketSellOrdersFillOrKill(
        LibOrder.Order[] orders,
        uint256 takerAssetFillAmount,
        bytes[] signatures
    );

    event MarketBuyOrdersFillOrKill(
        LibOrder.Order[] orders,
        uint256 makerAssetFillAmount,
        bytes[] signatures
    );

    function marketSellAmountWithEth(
        LibOrder.Order[] calldata orders,
        uint256 ethSellAmount,
        bytes[] calldata signatures,
        uint256[] calldata ethFeeAmounts,
        address payable[] calldata feeRecipients
    )
        external
        payable
        returns (uint256, uint256)
    {
        emit MarketSellAmountWithEth(
            orders,
            ethSellAmount,
            signatures,
            ethFeeAmounts,
            feeRecipients
        );
    }

    function marketBuyOrdersWithEth(
        LibOrder.Order[] calldata orders,
        uint256 makerAssetBuyAmount,
        bytes[] calldata signatures,
        uint256[] calldata ethFeeAmounts,
        address payable[] calldata feeRecipients
    )
        external
        payable
        returns (uint256, uint256)
    {
        emit MarketBuyOrdersWithEth(
            orders,
            makerAssetBuyAmount,
            signatures,
            ethFeeAmounts,
            feeRecipients
        );
    }

    function marketSellOrdersFillOrKill(
        LibOrder.Order[] calldata orders,
        uint256 takerAssetFillAmount,
        bytes[] calldata signatures
    )
        external
        payable
        returns (LibFillResults.FillResults memory)
    {
        emit MarketSellOrdersFillOrKill(
            orders,
            takerAssetFillAmount,
            signatures
        );
    }

    function marketBuyOrdersFillOrKill(
        LibOrder.Order[] calldata orders,
        uint256 makerAssetFillAmount,
        bytes[] calldata signatures
    )
        external
        payable
        returns (LibFillResults.FillResults memory)
    {
        emit MarketBuyOrdersFillOrKill(
            orders,
            makerAssetFillAmount,
            signatures
        );
    }
}
