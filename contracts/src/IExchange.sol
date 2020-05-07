pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;

import "@0x/contracts-exchange-libs/contracts/src/LibOrder.sol";
import "@0x/contracts-exchange-libs/contracts/src/LibFillResults.sol";


interface IExchange {

    function marketSellOrdersFillOrKill(
        LibOrder.Order[] calldata orders,
        uint256 takerAssetFillAmount,
        bytes[] calldata signatures
    )
        external
        payable
        returns (LibFillResults.FillResults memory fillResults);

    function marketBuyOrdersFillOrKill(
        LibOrder.Order[] calldata orders,
        uint256 makerAssetFillAmount,
        bytes[] calldata signatures
    )
        external
        payable
        returns (LibFillResults.FillResults memory fillResults);
}
