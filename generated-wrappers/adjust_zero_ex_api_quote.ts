// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma enum-naming
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
import {
    AwaitTransactionSuccessOpts,
    ContractFunctionObj,
    ContractTxFunctionObj,
    SendTransactionOpts,
    BaseContract,
    PromiseWithTransactionHash,
    methodAbiToFunctionSignature,
    linkLibrariesInBytecode,
} from '@0x/base-contract';
import { schemas } from '@0x/json-schemas';
import {
    BlockParam,
    BlockParamLiteral,
    BlockRange,
    CallData,
    ContractAbi,
    ContractArtifact,
    DecodedLogArgs,
    MethodAbi,
    TransactionReceiptWithDecodedLogs,
    TxData,
    TxDataPayable,
    SupportedProvider,
} from 'ethereum-types';
import { BigNumber, classUtils, hexUtils, logUtils, providerUtils } from '@0x/utils';
import { EventCallback, IndexedFilterValues, SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { assert } from '@0x/assert';
import * as ethers from 'ethers';
// tslint:enable:no-unused-variable



/* istanbul ignore next */
// tslint:disable:array-type
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class AdjustZeroExApiQuoteContract extends BaseContract {
    /**
     * @ignore
     */
public static deployedBytecode = '0x608060405234801561001057600080fd5b506004361061002b5760003560e01c80638fd848a314610030575b600080fd5b6100f56004803603606081101561004657600080fd5b73ffffffffffffffffffffffffffffffffffffffff823516919081019060408101602082013564010000000081111561007e57600080fd5b82018360208201111561009057600080fd5b803590602001918460018302840111640100000000831117156100b257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925061016a915050565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561012f578181015183820152602001610117565b50505050905090810190601f16801561015c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6060600061017e848263ffffffff61042116565b905073ffffffffffffffffffffffffffffffffffffffff8516736958f5e95332d93d21af0d7b9ca85b8212fee0a5141561029d577fffffffff0000000000000000000000000000000000000000000000000000000081167f939ce6ba00000000000000000000000000000000000000000000000000000000148061024357507fffffffff0000000000000000000000000000000000000000000000000000000081167f9e83231500000000000000000000000000000000000000000000000000000000145b610298576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180610551602f913960400191505060405180910390fd5b610406565b73ffffffffffffffffffffffffffffffffffffffff85167361935cbdd02287b511119ddb11aeb42f1593b7ef14156103b5577fffffffff0000000000000000000000000000000000000000000000000000000081167fa6c3bf3300000000000000000000000000000000000000000000000000000000148061036057507fffffffff0000000000000000000000000000000000000000000000000000000081167f8bc8efb300000000000000000000000000000000000000000000000000000000145b610298576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602e8152602001806105a8602e913960400191505060405180910390fd5b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001806105806028913960400191505060405180910390fd5b6104188460248563ffffffff61047216565b50919392505050565b60008160040183511015610447576104476104426003855185600401610482565b610521565b5001602001517fffffffff000000000000000000000000000000000000000000000000000000001690565b61047d838383610529565b505050565b6060632800659560e01b848484604051602401808460078111156104a257fe5b60ff1681526020018381526020018281526020019350505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090509392505050565b805160208201fd5b8160200183511015610548576105486104426005855185602001610482565b91016020015256fe41646a7573745a65726f457841706951756f74652f494e56414c49445f464f525741524445525f53454c4543544f5241646a7573745a65726f457841706951756f74652f494e56414c49445f43414c4c5f54415247455441646a7573745a65726f457841706951756f74652f494e56414c49445f45584348414e47455f53454c4543544f52a265627a7a72315820470a68208639c0d5de4d27b7e775f068424bc07d6fde1e7113c795d760f93a3e64736f6c63430005110032';
public static contractName = 'AdjustZeroExApiQuote';
    private readonly _methodABIIndex: { [name: string]: number } = {};
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<AdjustZeroExApiQuoteContract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        return AdjustZeroExApiQuoteContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployWithLibrariesFrom0xArtifactAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<AdjustZeroExApiQuoteContract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        const libraryAddresses = await AdjustZeroExApiQuoteContract._deployLibrariesAsync(
            artifact,
            libraryArtifacts,
            new Web3Wrapper(provider),
            txDefaults
        );
        const bytecode = linkLibrariesInBytecode(
            artifact,
            libraryAddresses,
        );
        return AdjustZeroExApiQuoteContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }

    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<AdjustZeroExApiQuoteContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToContractTxDataAsync(
            {
                data: txData,
                ...txDefaults,
            },
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`AdjustZeroExApiQuote successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new AdjustZeroExApiQuoteContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }

    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                constant: true,
                inputs: [
                    {
                        name: 'target',
                        type: 'address',
                    },
                    {
                        name: 'callData',
                        type: 'bytes',
                    },
                    {
                        name: 'fillAmount',
                        type: 'uint256',
                    },
                ],
                name: 'adjustFillAmount',
                outputs: [
                    {
                        name: '',
                        type: 'bytes',
                    },
                ],
                payable: false,
                stateMutability: 'pure',
                type: 'function',
            },
        ] as ContractAbi;
        return abi;
    }

    protected static async _deployLibrariesAsync(
        artifact: ContractArtifact,
        libraryArtifacts: { [libraryName: string]: ContractArtifact },
        web3Wrapper: Web3Wrapper,
        txDefaults: Partial<TxData>,
        libraryAddresses: { [libraryName: string]: string } = {},
    ): Promise<{ [libraryName: string]: string }> {
        const links = artifact.compilerOutput.evm.bytecode.linkReferences;
        // Go through all linked libraries, recursively deploying them if necessary.
        for (const link of Object.values(links)) {
            for (const libraryName of Object.keys(link)) {
                if (!libraryAddresses[libraryName]) {
                    // Library not yet deployed.
                    const libraryArtifact = libraryArtifacts[libraryName];
                    if (!libraryArtifact) {
                        throw new Error(`Missing artifact for linked library "${libraryName}"`);
                    }
                    // Deploy any dependent libraries used by this library.
                    await AdjustZeroExApiQuoteContract._deployLibrariesAsync(
                        libraryArtifact,
                        libraryArtifacts,
                        web3Wrapper,
                        txDefaults,
                        libraryAddresses,
                    );
                    // Deploy this library.
                    const linkedLibraryBytecode = linkLibrariesInBytecode(
                        libraryArtifact,
                        libraryAddresses,
                    );
                    const txDataWithDefaults = await BaseContract._applyDefaultsToContractTxDataAsync(
                        {
                            data: linkedLibraryBytecode,
                            ...txDefaults,
                        },
                        web3Wrapper.estimateGasAsync.bind(web3Wrapper),
                    );
                    const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
                    logUtils.log(`transactionHash: ${txHash}`);
                    const { contractAddress } = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
                    logUtils.log(`${libraryArtifact.contractName} successfully deployed at ${contractAddress}`);
                    libraryAddresses[libraryArtifact.contractName] = contractAddress as string;
                }
            }
        }
        return libraryAddresses;
    }

    public getFunctionSignature(methodName: string): string {
        const index = this._methodABIIndex[methodName];
        const methodAbi = AdjustZeroExApiQuoteContract.ABI()[index] as MethodAbi; // tslint:disable-line:no-unnecessary-type-assertion
        const functionSignature = methodAbiToFunctionSignature(methodAbi);
        return functionSignature;
    }

    public getABIDecodedTransactionData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AdjustZeroExApiQuoteContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecode<T>(callData);
        return abiDecodedCallData;
    }

    public getABIDecodedReturnData<T>(methodName: string, callData: string): T {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AdjustZeroExApiQuoteContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        const abiDecodedCallData = abiEncoder.strictDecodeReturnValue<T>(callData);
        return abiDecodedCallData;
    }

    public getSelector(methodName: string): string {
        const functionSignature = this.getFunctionSignature(methodName);
        const self = (this as any) as AdjustZeroExApiQuoteContract;
        const abiEncoder = self._lookupAbiEncoder(functionSignature);
        return abiEncoder.getSelector();
    }

    public adjustFillAmount(
            target: string,
            callData: string,
            fillAmount: BigNumber,
    ): ContractFunctionObj<string
> {
        const self = this as any as AdjustZeroExApiQuoteContract;
            assert.isString('target', target);
            assert.isString('callData', callData);
            assert.isBigNumber('fillAmount', fillAmount);
        const functionSignature = 'adjustFillAmount(address,bytes,uint256)';

        return {
            async callAsync(
                callData: Partial<CallData> = {},
                defaultBlock?: BlockParam,
            ): Promise<string
            > {
                BaseContract._assertCallParams(callData, defaultBlock);
                let rawCallResult;
                if (self._deployedBytecodeIfExists) {
                    rawCallResult = await self._evmExecAsync(this.getABIEncodedTransactionData());
                } else {
                    rawCallResult = await self._performCallAsync({ ...callData, data: this.getABIEncodedTransactionData() }, defaultBlock);
                }
                const abiEncoder = self._lookupAbiEncoder(functionSignature);
                BaseContract._throwIfUnexpectedEmptyCallResult(rawCallResult, abiEncoder);
                return abiEncoder.strictDecodeReturnValue<string
            >(rawCallResult);
            },
            getABIEncodedTransactionData(): string {
                return self._strictEncodeArguments(functionSignature, [target.toLowerCase(),
            callData,
            fillAmount
            ]);
            },
        }
    };



    constructor(
        address: string,
        supportedProvider: SupportedProvider,
        txDefaults?: Partial<TxData>,
        logDecodeDependencies?: { [contractName: string]: ContractAbi },
        deployedBytecode: string | undefined = AdjustZeroExApiQuoteContract.deployedBytecode,
    ) {
        super('AdjustZeroExApiQuote', AdjustZeroExApiQuoteContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies, deployedBytecode);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
AdjustZeroExApiQuoteContract.ABI().forEach((item, index) => {
            if (item.type === 'function') {
                const methodAbi = item as MethodAbi;
                this._methodABIIndex[methodAbi.name] = index;
            }
        });
    }
}

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
