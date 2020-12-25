from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app=Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

db= SQLAlchemy(app)
ma =Marshmallow(app)

class Gift(db.Model):
    username=db.Column(db.Integer,primary_key=True)
    description=db.Column(db.String(200))
    price = db.Column(db.Float)
    balance = db.Column(db.Float)

    def __init__(self,username,description,price,balance):
        self.username=username
        self.description=description
        self.price=price
        self.balance=balance

class GiftSchema(ma.Schema):
    class Meta:
        fields = ('username','description','price','balance')



gift_schema = GiftSchema()
gifts_schema = GiftSchema(many=True)



if __name__ == '__main__':
    app.run(debug=True)