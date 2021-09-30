Add-Type -AssemblyName PresentationFramework #This is to add the message box assembly into powershell.
[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') #This adds the Inputbox functionality for the inputing busStopID

#[System.Windows.MessageBox]::Show('Please enter your bus stop ID.', 'UC Shuttle Stop Tracker', 'OkCancel');
$busStopID = [Microsoft.VisualBasic.Interaction]::InputBox('Enter your bus stop ID (only the digits)', 'UC Shuttle Stop Tracker')
$objectPosition = [Microsoft.VisualBasic.Interaction]::InputBox('What is the array position of the route you are tracking. (select 0 for default)', 'UC Shuttle Stop Tracker')
$timeToLeave = [Microsoft.VisualBasic.Interaction]::InputBox('How many minutes does it take you to get to the stop?', 'UC Shuttle Stop Tracker')
#This collects the shuttle data
$json = Invoke-WebRequest -Uri https://uc.doublemap.com/map/v2/eta?stop=$busStopID
$convertedjson = $json | ConvertFrom-Json

#This ensures that the object position is valid, before the script continues.
if ($convertedjson.etas.$busStopID.etas.avg[$objectPosition] -eq $NULL) 
{
    Write-Host "That object position does not match any value in the json data, please run the program again and select a correct object position."
    [System.Windows.MessageBox]::Show('That object position does not match any value in the json data, please run the program again and select a correct object position.', 'UC Shuttle Stop Tracker', 'Ok');
    Exit
}

### This code below was a futile attempt to try and select the ETA when the user inputs the route ID, bus_ID, or the bus_name. I couldn't really figure it out, but I may come back to it when I get more familiar.
#$busid = $convertedjson.etas.$busStopID | where { $_.bus_id -eq "3008" } # I was trying to figure out a way to take into account the bus ID to actually select the correct ETA, but I am not sure how because the bus_id is not a selector or a parent element, 
#only the object position gets what I need, which requires the user to check themselves.
#Write-Host 'This is busid ' $busid
#$moreThanOneBus = [System.Windows.MessageBox]::Show('Is there more than one shuttle route that uses this bus stop?', 'UC Shuttle Stop Tracker', 'YesNoCancel');
#if ($moreThanOneBus = 'Yes')
#{$busStopID = [Microsoft.VisualBasic.Interaction]::InputBox("What is the shuttle's name that you want to track (only the digits)", 'UC Shuttle Stop Tracker')}

$hasTimeToLeaveBeenUsed = $false
$hasETA5BeenUsed = $false
$hasETA1BeenUsed = $false
$hasETA0BeenUsed = $false
Write-Host 'There is'  $convertedjson.etas.$busStopID.etas.avg[$objectPosition]  ' minute(s) until the shuttle arrives'
[System.Windows.MessageBox]::Show('There is '+ $convertedjson.etas.$busStopID.etas.avg[$objectPosition] + ' minute(s) until the shuttle arrives', 'UC Shuttle Stop Tracker', 'Ok');




do { ##SET THIS AS WHILE TRUE
#These three lines of code collect the bus stop data every 10 seconds.
Start-Sleep -Seconds 10
$ETA = $convertedjson.etas.$busStopID.etas.avg[$objectPosition]
$json = Invoke-WebRequest -Uri https://uc.doublemap.com/map/v2/eta?stop=$busStopID
$convertedjson = $json | ConvertFrom-Json

#if ($ETA -ne $ETA) # This only shows if the time has changed in the powershell terminal. Rather than continously saying "There is x minutes until the shuttle arrives" with the same value of x, it then checks if x has changed.
#{
    Write-Host 'There is'  $ETA  ' minute(s) until the shuttle arrives.'
#}

#These are if statements that watch the ETA and alert you when the time reaches a certain number, like the timeToLeave that I set.
if ($convertedjson.etas.$busStopID.etas.avg -le $timeToLeave -And $hasTimeToLeaveBeenUsed -eq $false) # I have no idea why powershell doesn't accept the = sign rather than -eq.
{
    Write-Output "It's time to leave!"
    [System.Windows.MessageBox]::Show('Get out the door, you gotta go! Shuttle is incoming in ' + $eta + ' minutes', 'UC Shuttle Stop Tracker', 'Ok');
    $hasTimeToLeaveBeenUsed = $true
}

if ($convertedjson.etas.$busStopID.etas.avg -eq 5 -And $timeToLeave -ne 5 -And $hasETA5BeenUsed -eq $false) #The -And operator prevents a duplicate prompt from showing if the time to leave matches the integer its checking
{
    Write-Output "The bus is arriving in five minutes!"
    [System.Windows.MessageBox]::Show('The bus is arriving in five minutes!.', 'UC Shuttle Stop Tracker', 'Ok');
    $hasETA5BeenUsed = $true
}


#If the eta is 0, the bus is arriving, and you better be waiting.
if ($convertedjson.etas.$busStopID.etas.avg -eq 1 -And $timeToLeave -ne 1 -And $hasETA1BeenUsed -eq $false)
{
    Write-Output "The bus is arriving in one minute!"
    [System.Windows.MessageBox]::Show('The bus is arriving in one minute!.', 'UC Shuttle Stop Tracker', 'Ok');
    $hasETA1BeenUsed = $true
}

if ($convertedjson.etas.$busStopID.etas.avg -eq 0 -And $timeToLeave -ne 0 -And $hasETA0BeenUsed -eq $false)
{
    Write-Output "The bus is arriving now!"
    [System.Windows.MessageBox]::Show('The bus is arriving now!.', 'UC Shuttle Stop Tracker', 'Ok');
    $hasETA1BeenUsed = $true
    Break
}

} while($true)  




#TODO: Set the task as a function so you can pass an argument through the CLI with the busstop already passed, rather than being prompted every time.