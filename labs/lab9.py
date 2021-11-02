import requests;
import json;

r = requests.get('http://api.openweathermap.org/data/2.5/weather?zip=%s&appid=0b021b11b88b46ea8d6b0a83a49c5ae7' %zip)
data = r.json()

print(data)


