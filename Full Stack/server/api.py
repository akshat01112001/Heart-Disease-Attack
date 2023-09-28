from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from web3 import Web3
import joblib
import uvicorn

app = FastAPI()

# Load the pre-trained ML model
model = joblib.load('model.pkl')
origins = [
    "http://localhost",
    "http://localhost:3000"
]

# # Connect to Ethereum node
# web3 = Web3(Web3.HTTPProvider('your_ethereum_node_url'))
# contract_address = "0xYourContractAddress"
# contract_abi = [...]  # Your contract's ABI
# contract = web3.eth.contract(address=contract_address, abi=contract_abi)

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
    HighBP: bool
    HighChol: bool
    CholCheck: bool
    BMI: int
    Smoker: bool
    Stroke: bool
    Diabetes: int
    PhysActivity: bool
    Fruits: bool
    Veggies: bool
    HvyAlcoholConsump: bool
    AnyHealthcare: bool
    NoDocbcCost: bool
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: bool
    Sex: bool
    Age: int
    Education: int
    Income: int


@app.post('/predict')
def predict(payload: PredictionInput):
    try:
        # LR model loaded
        input_data = dict(payload)
        prediction = model.predict([list(input_data.values())])[0]

        # # Convert the prediction to a format suitable for blockchain storage
        # prediction_hash = web3.toHex(prediction)

        # # Store the prediction on the blockchain
        # account = "0xYourAccountAddress"  # Your Ethereum address
        # contract.functions.setHash(
        #     payload.patient_address, prediction_hash).transact({'from': account})

        # return {"prediction_hash": prediction_hash}
        return {"prediction": prediction}
    except Exception as e:
        return HTTPException(status_code=500, detail="Internal Server Error")


if __name__ == '__main__':
    uvicorn.run('api:app', reload=True, port=8000)
