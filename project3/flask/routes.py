from flask import Flask, render_template, request;
import requests;
import json;



app = Flask(__name__) 
app.config.from_object(__name__) 
 
@app.route('/') 
def hello(): 
   return render_template("index.html")

@app.route('/post-eta', methods=['POST'])
def welcome():
   stopID=request.form['stopID'] 
   print('the stop ID is ' + stopID)
   arrayPosition=request.form['arrayPosition']
   url = "https://uc.doublemap.com/map/v2/eta?stop=" + stopID
   r = requests.get(url)
   cont = r.json()['etas'][stopID]['etas'][0]['avg']
   return render_template("welcome.html", stopID=request.form['stopID'], arrayPosition=request.form['arrayPosition'], ETA=cont) 

