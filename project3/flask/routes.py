from flask import Flask, render_template, request
 
import requests
import json



app = Flask(__name__) 
app.config.from_object(__name__) 
 
@app.route('/') 
def hello(): 
   return render_template("index.html")

@app.route('/welcome', methods=['POST'])
def welcome():
   ID=request.form['stopID']
   # response.data.etas[stopID].etas[objectPosition]['avg'];
   print(ID)
   stopID=request.form['stopID'] 
   stopID = str(stopID)
   print('the stop ID is ' + stopID)
   arrayPosition=request.form['arrayPosition']
   URL = 'https://uc.doublemap.com/map/v2/eta?stop=' + stopID
   print(URL)

   url = "https://uc.doublemap.com/map/v2/eta?stop=" + stopID
   r = requests.get(url)
   cont = r.json()['etas'][stopID]['etas'][0]['avg']
   print(cont)

   return render_template("welcome.html", stopID=request.form['stopID'], arrayPosition=request.form['arrayPosition'], ETA=cont) 


   

