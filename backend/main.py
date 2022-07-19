import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
from pymongo import MongoClient
import uvicorn
import motor.motor_asyncio
import models
from fastapi.responses import JSONResponse
import sendgrid_api

# if __name__ == "__main__":
#     uvicorn.run("server.app:app", host="0.0.0.0", port=8000, reload=True)

load_dotenv()
app = FastAPI()

MONGO_DETAILS = "mongodb+srv://sunofntu:P5v90y3xQWptPEEF@cluster.ku9jp.mongodb.net/?retryWrites=true&w=majority"
port = 8000

client = MongoClient(MONGO_DETAILS, port)
database = client["db"]
comment_col = database["comment"]
cuisine_col = database["cuisine"]
game_col = database["game"]
ingredient_col = database["ingredient"]
ingredient_type_col = database["ingredient_type"]

# client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get(MONGO_DETAILS))
# database = client.db
# comment_col = database.get_collection("comment")
# cuisine_col = database.get_collection("cuisine")
# game_col = database.get_collection("game")
# ingredient_col = database.get_collection("ingredient")
# ingredient_type_col = database.get_collection("ingredient_type")

def ResponseModel(data, message="success"):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}


# API

@app.get("/")
async def test():
    return {"message": "Hello World"}


@app.get("/comment", response_description="list all comments", response_model=List[models.Comment])
async def list_comments():
    list = []

    for document in comment_col.find():
        list.append(models.comment_helper(document))

    return list


@app.post("/comment", response_description="add a comment", response_model=models.Comment)
async def add_comment(comment: models.Comment = Body(...)):
    comment = jsonable_encoder(comment)
    new_comment = await comment_col.insert_one(comment)
    added_comment = await comment_col.find_one({"_id": new_comment.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.comment_helper(added_comment)))


@app.get("/cuisine", response_description="list all cuisine", response_model=List[models.Cuisine])
async def list_cuisine():
    list = []

    for document in cuisine_col.find():
        list.append(models.cuisine_helper(document))

    return list


@app.get("/game", response_description="list all game", response_model=List[models.Game])
async def list_game():
    list = []

    for document in game_col.find():
        list.append(models.game_helper(document))

    return list


@app.get("/ingredient", response_description="list all ingredient", response_model=List[models.Ingredient])
async def list_ingredient():
    list = []

    for document in ingredient_col.find():
        list.append(models.ingredient_helper(document))

    return list


@app.get("/ingredient_type", response_description="list all ingredient type", response_model=List[models.IngredientType])
async def list_ingredient_type():
    list = []

    for document in ingredient_type_col.find():
        list.append(models.ingredient_type_helper(document))

    return list

@app.post("/create_ingredient_type", response_description="create ingredient type", response_model=models.IngredientType)
async def post_ingredient_type(ingredient_type: models.IngredientType = Body(...)):
    ingredient_type = jsonable_encoder(ingredient_type)
    new_ingredient_type = ingredient_type_col.insert_one(ingredient_type)
    created_ingredient_type = ingredient_type_col.find_one({"_id": new_ingredient_type.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=jsonable_encoder(models.ingredient_type_helper(created_ingredient_type)))

@app.post("/email", response_description="send email", response_model=models.Email)
async def send_email(data: models.Email = Body(...)):
    data = jsonable_encoder(data)
    response = sendgrid_api.send_email(
        data["from_email"],
        data["to_emails"],
        data["subject"],
        data["html_content"]
    )

    return JSONResponse(status_code=response.status_code, content=jsonable_encoder(response.headers))
