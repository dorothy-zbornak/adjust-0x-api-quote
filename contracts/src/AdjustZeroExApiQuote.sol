pragma solidity ^0.5.17;

import "@0x/contracts-utils/contracts/src/LibBytes.sol";
import "./IExchange.sol";
import "./IForwarder.sol";


contract AdjustZeroExApiQuote {

    address private constant FORWARDER_ADDRESS = 0x6958F5e95332D93D21af0D7B9Ca85B8212fEE0A5;
    address private constant EXCHANGE_ADDRESS = 0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef;

    using LibBytes for bytes;

    function adjustFillAmount(
        address target,
        bytes memory callData,
        uint256 fillAmount
    )
        public
        pure
        returns (bytes memory)
    {
        bytes4 selector = callData.readBytes4(0);
        if (target == FORWARDER_ADDRESS) {
            require(
                selector == IForwarder(address(0)).marketSellAmountWithEth.selector ||
                selector == IForwarder(address(0)).marketBuyOrdersWithEth.selector,
                "AdjustZeroExApiQuote/INVALID_FORWARDER_SELECTOR"
            );
        } else if (target == EXCHANGE_ADDRESS) {
            require(
                selector == IExchange(address(0)).marketSellOrdersFillOrKill.selector ||
                selector == IExchange(address(0)).marketBuyOrdersFillOrKill.selector,
                "AdjustZeroExApiQuote/INVALID_EXCHANGE_SELECTOR"
            );
        } else {
            revert("AdjustZeroExApiQuote/INVALID_CALL_TARGET");
        }
        callData.writeUint256(36, fillAmount);
        return callData;
    }
}
