function getIP {
    (Get-NetIPAddress).IPv4Address | Select-String "10.*"
}

$IP = getIP
Write-Host("This machine's IP is $IP")
Write-Host("This machine's IP is {0}" -f $IP)

