from web3 import Web3
import json

# Connect to a local Ethereum node
# Update with your node's URL
w3 = Web3(Web3.HTTPProvider('http://127.0.0.0:8545'))

# Load contract ABI and bytecode from files
with open('output/HeartDiseaseStorage.abi') as f:
    abi = json.load(f)
with open('output/HeartDiseaseStorage.bin') as f:
    bytecode = f.read()

# Deploy the contract


def deploy_contract():
    accounts = w3.eth.accounts
    contract = w3.eth.contract(abi=abi, bytecode=bytecode)

    # Build the transaction
    tx_hash = contract.constructor().transact(
        {'from': accounts[0], 'gas': 2000000})

    # Wait for the transaction to be mined
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    contract_address = tx_receipt['contractAddress']

    return contract_address


deployed_contract_address = deploy_contract()
print('Contract deployed at address:', deployed_contract_address)
