### My private IP was in the 10.0.0.0/8 subnet, so I changed the Select-String parameters
function getIP {
    (Get-NetIPAddress).IPv4Address | Select-String "10.*"
}

$IP = getIP
$Version = $HOST.Version.Major
$Date = date -UFormat "%A, %B %d, %Y"

# Write-Host("This machine's IP is $IP")
# Write-Host("This machine's IP is {0}" -f $IP)

#Tried to run $HOST.Version.Major in my script, but ended up getting "System.Management.Automation.Internal.Host.InternalHost.Version.Major" as output. Had to use -f substition outside of string.

$Body = "This machine's IP is $IP. User is $env:UserName. Hostname is $env:computername. Powershell version {0}. Today's Date is $Date" -f $Version 

Write-Host("$Body") 

#Outputs the $Body variable to a file called sysinfo.txt in the current working directory.

$Body | Out-File -FilePath .\sysinfo.txt


#The email worked! I did replace my actual email with "<myemailhere>" before I pushed the code in case there are scrapers on github that would spam me. I am probably just paranoid.

Send-MailMessage -From <myemailhere> -Subject "IT3038C Windows SysInfo" -To <myemailhere> -Body "$Body" -Port 587 -SmtpServer smtp.gmail.com -UseSSL -Credential (Get-Credential)