from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from web3 import Web3
import joblib
import uvicorn
import json

app = FastAPI()

# Load the pre-trained ML model
model = joblib.load('model.pkl')
origins = [
    "http://localhost",
    "http://localhost:3000"
]

# Connect to Ethereum node
web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
contract_address = "0xff320483ea8070a392C32FBdD34E621113a1b839"
with open('output/HeartDiseaseStorage.abi') as file:
    contract_abi = file.read()
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    # patient_address: str
    highBP: bool
    highChol: bool
    cholCheck: bool
    bmi: int
    smoker: bool
    stroke: bool
    diabetes: bool
    physActivity: bool
    fruits: bool
    veggies: bool
    hvyAlcoholConsump: bool
    anyHealthcare: bool
    noDocbcCost: bool
    genHlth: int
    mentHlth: int
    physHlth: int
    diffWalk: bool
    sex: bool
    age: int
    education: int
    income: int


@app.post('/predict')
def predict(payload: PredictionInput):
    try:
        # LR model loaded
        input_data = dict(payload)
        prediction = model.predict([list(input_data.values())])[0]

        if prediction == 0:
            input_data['prediction'] = False
        else:
            input_data['prediction'] = True

        # # Convert the prediction to a format suitable for blockchain storage
        # prediction_hash = web3.to_hex(int(prediction))
        print(web3.eth.get_block('latest'))

        # Call the addHeartDiseaseRecord function on the smart contract
        tx_hash = contract.functions.addHeartDiseaseRecord(input_data).transact(
            {'from': web3.eth.accounts[0], 'gas': web3.eth.get_block('latest').gasLimit, 'gasPrice': web3.eth.gas_price})

        # Wait for the transaction to be mined
        web3.eth.wait_for_transaction_receipt(tx_hash)
        print(web3.eth.get_block('latest'))

        # Call the getNumRecords function on the smart contract
        num_records = contract.functions.getNumRecords().call(
            {'from': web3.eth.accounts[0]})

        return {
            "prediction": prediction, 
            # "num_records": num_records
        }
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))


if __name__ == '__main__':
    uvicorn.run('api:app', reload=True, port=8000)
