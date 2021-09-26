Add-Type -AssemblyName PresentationFramework #This is to add the message box assemply into powershell.
[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') #This adds the Inputbox functionality for the inputing busStopID

$someLowNumber = 1000
#while ($someLowNumber > 1000) {
#[System.Windows.MessageBox]::Show('Please enter your bus stop ID.', 'UC Shuttle Stop Tracker', 'OkCancel');
$busStopID = [Microsoft.VisualBasic.Interaction]::InputBox('Enter your bus stop ID (only the digits)', 'UC Shuttle Stop Tracker')
$json = Invoke-WebRequest -Uri https://uc.doublemap.com/map/v2/eta?stop=$busStopID

$convertedjson = $json | ConvertFrom-Json

Write-Host 'There is ' $convertedjson.etas.$busStopID.etas.avg ' minutes until the shuttle arrives'
#}


#$moreThanOneBus = [System.Windows.MessageBox]::Show('Is there more than one shuttle route that uses this bus stop?', 'UC Shuttle Stop Tracker', 'YesNoCancel');

 
#if ($moreThanOneBus = 'Yes')
 #   {
  #  $busStopID = [Microsoft.VisualBasic.Interaction]::InputBox("What is the shuttle's name that you want to track (only the digits)", 'UC Shuttle Stop Tracker')
   # }