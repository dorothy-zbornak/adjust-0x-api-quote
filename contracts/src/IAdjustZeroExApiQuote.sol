pragma solidity ^0.5.17;


interface IAdjustZeroExApiQuote {

    function adjustFillAmount(
        address target,
        bytes calldata callData,
        uint256 fillAmount
    )
        external
        pure
        returns (bytes memory);
}
