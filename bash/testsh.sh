DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
TODAY=$(date)

echo "On $TODAY, there were $POSITIVE positive COVID cases"
