import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from typing import List
import motor.motor_asyncio
import models


load_dotenv()
app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("MONGODB_URL"))
database = client.db
comment_col = database.get_collection("comment")
cuisine_col = database.get_collection("cuisine")
game_col = database.get_collection("game")
ingredient_col = database.get_collection("ingredient")
ingredient_type_col = database.get_collection("ingredient_type")


def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


# API

@app.get("/")
async def test():
    return {"message": "Hello World"}


@app.get("/comment", response_description="list all comments", response_model=List[models.Comment])
async def list_comments():
    list = []

    async for document in comment_col.find():
        list.append(models.comment_helper(document))

    return list
    

@app.get("/cuisine", response_description="list all cuisine", response_model=List[models.Cuisine])
async def list_cuisine():
    list = []

    async for document in cuisine_col.find():
        list.append(models.cuisine_helper(document))

    return list


@app.get("/game", response_description="list all game", response_model=List[models.Game])
async def list_game():
    list = []

    async for document in game_col.find():
        list.append(models.game_helper(document))

    return list


@app.get("/ingredient", response_description="list all ingredient", response_model=List[models.Ingredient])
async def list_ingredient():
    list = []

    async for document in ingredient_col.find():
        list.append(models.ingredient_helper(document))

    return list


@app.get("/ingredient_type", response_description="list all ingredient type", response_model=List[models.IngredientType])
async def list_ingredient_type():
    list = []

    async for document in ingredient_type_col.find():
        list.append(models.ingredient_type_helper(document))

    return list
