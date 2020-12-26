from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS
from image import get_image_url


app=Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('HEROKU_POSTGRESQL_BLUE_URL') or 'sqlite:///' + os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

db= SQLAlchemy(app)
ma =Marshmallow(app)

class Gift(db.Model):
    username=db.Column(db.String(100),primary_key=True)
    description=db.Column(db.String(200))
    url=db.Column(db.String)
    price = db.Column(db.Float)
    balance = db.Column(db.Float)

    def __init__(self,username,description,url,price,balance):
        self.username=username
        self.description=description
        self.url=get_image_url(url)
        self.price=price
        self.balance=balance

class GiftSchema(ma.Schema):
    class Meta:
        fields = ('username','description','url','price','balance')



gift_schema = GiftSchema()
gifts_schema = GiftSchema(many=True)

@app.route('/gift',methods=['POST'])
def add_gift():
  username = request.json['username']
  description = request.json['description']
  url=request.json['url']
  price = request.json['price']

  new_gift = Gift(username, description,url, price, price)

  db.session.add(new_gift)

  db.session.commit()

  return gift_schema.jsonify(new_gift)


@app.route('/all', methods=['GET'])
def get_products():
  all_gifts = Gift.query.all()
  result = gifts_schema.dump(all_gifts)
  return jsonify(result)


@app.route('/<username>/pay/<pay>',methods=['GET'])
def pay(username,pay):
    gift=Gift.query.get(username)

    gift.balance=gift.price-int(pay)

    db.session.commit()

    return gift_schema.jsonify(gift)


@app.route("/ip", methods=["GET"])
def get_my_ip():
    return jsonify({'ip': request.remote_addr}), 200


if __name__ == '__main__':
    app.run(debug=True)