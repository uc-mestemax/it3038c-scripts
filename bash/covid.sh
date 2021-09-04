#!/bin/bash
# This script downloads covid data and displays it.
DATA=$(curl https://api.covidtracking.com/v1/us/current.json)
POSITIVE=$(echo $DATA | jq '.[0].positive')
TODAY=$(date)


HOSPITALIZED=$(echo $DATA | jq '.[0].hospitalizedCurrently')
VENTILATORS=$(echo $DATA | jq '.[0].onVentilatorCurrently')
TOTALTESTRESULTS=$(echo $DATA | jq '.[0].totalTestResults')

echo "On $TODAY, there were $POSITIVE positive COVID cases, $HOSPITALIZED currently in the hospital, $VENTILATORS on ventilators, with a cumulative total of $TOTALTESTRESULTS test results."
