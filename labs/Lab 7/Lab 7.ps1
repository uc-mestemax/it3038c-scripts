$myIP = (Get-NetIPAddress -AddressFamily IPV4 -InterfaceAlias Ethernet).IPAddress
$mySubnetMask = (Get-NetIPAddress -AddressFamily IPV4 -InterfaceAlias Ethernet).PrefixLength
#Write-Host "Your IP is " $myIP

#Write-Host '********Subnet Statistics********'
#New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask

$newSubnet = New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask

Write-Host '*********Dividing the Subnet*********'
#$newSubnet.Split(4)

#Write-Host $newSubnet


$newSubnet.ContainsIP('10.217.16.1')



New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask