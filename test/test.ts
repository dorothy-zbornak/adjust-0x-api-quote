import { blockchainTests, constants, expect, getRandomInteger, LogDecoder, randomAddress, verifyEventsFromLogs } from '@0x/contracts-test-utils';
import { BigNumber, hexUtils } from '@0x/utils';
import { Order } from '@0x/types';
import { LogEntry } from 'ethereum-types';
import * as _ from 'lodash';

import * as ADJUST_CONTRACT_ARTIFACT from '../generated-artifacts/AdjustZeroExApiQuote.json';
import * as TARGET_CONTRACT_ARTIFACT from '../generated-artifacts/TestAdjustZeroExApiQuoteReceiver.json';

import { AdjustZeroExApiQuoteContract } from '../generated-wrappers/adjust_zero_ex_api_quote';
import {
    TestAdjustZeroExApiQuoteReceiverContract,
    TestAdjustZeroExApiQuoteReceiverEvents
} from '../generated-wrappers/test_adjust_zero_ex_api_quote_receiver';


blockchainTests.resets('AdjustZeroExApiQuote tests', env => {
    let target: TestAdjustZeroExApiQuoteReceiverContract;
    let adjuster: AdjustZeroExApiQuoteContract;
    let logDecoder: LogDecoder;

    before(async () => {
        target = await TestAdjustZeroExApiQuoteReceiverContract.deployFrom0xArtifactAsync(
            TARGET_CONTRACT_ARTIFACT,
            env.provider,
            env.txDefaults,
            {},
        );
        adjuster = await AdjustZeroExApiQuoteContract.deployFrom0xArtifactAsync(
            ADJUST_CONTRACT_ARTIFACT,
            env.provider,
            env.txDefaults,
            {}
        );
        logDecoder = new LogDecoder(
            env.web3Wrapper,
            { TestAdjustZeroExApiQuoteReceiver: TARGET_CONTRACT_ARTIFACT as any },
        );
    });

    type OrderWithoutDomain = Omit<Order, 'chainId' | 'exchangeAddress'>;

    function createOrder(): OrderWithoutDomain {
        return {
            expirationTimeSeconds: getRandomInteger(1, '1e8'),
            salt: getRandomInteger(1, '1e8'),
            feeRecipientAddress: randomAddress(),
            makerAddress: randomAddress(),
            senderAddress: randomAddress(),
            takerAddress: randomAddress(),
            makerAssetData: hexUtils.random(36),
            takerAssetData: hexUtils.random(36),
            makerFeeAssetData: hexUtils.random(36),
            takerFeeAssetData: hexUtils.random(36),
            makerAssetAmount: getRandomInteger(1, '1e18'),
            takerAssetAmount: getRandomInteger(1, '1e18'),
            makerFee: getRandomInteger(1, '1e18'),
            takerFee: getRandomInteger(1, '1e18'),
        };
    }

    async function callTargetAsync(callData: string): Promise<LogEntry[]> {
        const receipt = await env.web3Wrapper.awaitTransactionSuccessAsync(
            await env.web3Wrapper.sendTransactionAsync({
                ...env.txDefaults,
                to: target.address,
                data: callData,
            } as any),
        );
        return logDecoder.decodeReceiptLogs(receipt).logs;
    }

    const FORWARDER_ADDRESS = '0x6958F5e95332D93D21af0D7B9Ca85B8212fEE0A5';
    const EXCHANGE_ADDRESS = '0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef';

    it('can adjust Forwarder.marketSellAmountWithEth fill amount', async () => {
        const orders = _.times(_.random(1, 10), createOrder);
        const fillAmount = getRandomInteger(1, '1e32');
        const newFillAmount = getRandomInteger(1, '1e32');
        const signatures = orders.map(() => hexUtils.random(65));
        const ethFeeAmounts = _.times(_.random(0, 3), () => getRandomInteger(1, '1e18'));
        const feeRecipients = ethFeeAmounts.map(() => randomAddress());
        const callData = target.marketSellAmountWithEth(
            orders,
            fillAmount,
            signatures,
            ethFeeAmounts,
            feeRecipients,
        ).getABIEncodedTransactionData();
        const newCallData = await adjuster
            .adjustFillAmount(FORWARDER_ADDRESS, callData, newFillAmount)
            .callAsync();
        expect(callData).to.not.eq(newCallData);
        const logs = await callTargetAsync(newCallData);
        verifyEventsFromLogs(
            logs,
            [{
                orders,
                signatures,
                feeRecipients,
                ethFeeAmounts,
                ethSellAmount: newFillAmount,
            }],
            TestAdjustZeroExApiQuoteReceiverEvents.MarketSellAmountWithEth,
        )
    });

    it('can adjust Forwarder.marketBuyOrdersWithEth fill amount', async () => {
        const orders = _.times(_.random(1, 10), createOrder);
        const fillAmount = getRandomInteger(1, '1e32');
        const newFillAmount = getRandomInteger(1, '1e32');
        const signatures = orders.map(() => hexUtils.random(65));
        const ethFeeAmounts = _.times(_.random(0, 3), () => getRandomInteger(1, '1e18'));
        const feeRecipients = ethFeeAmounts.map(() => randomAddress());
        const callData = target.marketBuyOrdersWithEth(
            orders,
            fillAmount,
            signatures,
            ethFeeAmounts,
            feeRecipients,
        ).getABIEncodedTransactionData();
        const newCallData = await adjuster
            .adjustFillAmount(FORWARDER_ADDRESS, callData, newFillAmount)
            .callAsync();
        expect(callData).to.not.eq(newCallData);
        const logs = await callTargetAsync(newCallData);
        verifyEventsFromLogs(
            logs,
            [{
                orders,
                signatures,
                feeRecipients,
                ethFeeAmounts,
                makerAssetBuyAmount: newFillAmount,
            }],
            TestAdjustZeroExApiQuoteReceiverEvents.MarketBuyOrdersWithEth,
        )
    });

    it('can adjust Forwarder.marketSellOrdersFillOrKill fill amount', async () => {
        const orders = _.times(_.random(1, 10), createOrder);
        const fillAmount = getRandomInteger(1, '1e32');
        const newFillAmount = getRandomInteger(1, '1e32');
        const signatures = orders.map(() => hexUtils.random(65));
        const callData = target.marketSellOrdersFillOrKill(
            orders,
            fillAmount,
            signatures,
        ).getABIEncodedTransactionData();
        const newCallData = await adjuster
            .adjustFillAmount(EXCHANGE_ADDRESS, callData, newFillAmount)
            .callAsync();
        expect(callData).to.not.eq(newCallData);
        const logs = await callTargetAsync(newCallData);
        verifyEventsFromLogs(
            logs,
            [{
                orders,
                signatures,
                takerAssetFillAmount: newFillAmount,
            }],
            TestAdjustZeroExApiQuoteReceiverEvents.MarketSellOrdersFillOrKill,
        )
    });

    it('can adjust Forwarder.marketBuyOrdersFillOrKill fill amount', async () => {
        const orders = _.times(_.random(1, 10), createOrder);
        const fillAmount = getRandomInteger(1, '1e32');
        const newFillAmount = getRandomInteger(1, '1e32');
        const signatures = orders.map(() => hexUtils.random(65));
        const callData = target.marketBuyOrdersFillOrKill(
            orders,
            fillAmount,
            signatures,
        ).getABIEncodedTransactionData();
        const newCallData = await adjuster
            .adjustFillAmount(EXCHANGE_ADDRESS, callData, newFillAmount)
            .callAsync();
        expect(callData).to.not.eq(newCallData);
        const logs = await callTargetAsync(newCallData);
        verifyEventsFromLogs(
            logs,
            [{
                orders,
                signatures,
                makerAssetFillAmount: newFillAmount,
            }],
            TestAdjustZeroExApiQuoteReceiverEvents.MarketBuyOrdersFillOrKill,
        )
    });
});
