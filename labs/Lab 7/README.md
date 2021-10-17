# Subnet calculator module for powershell

First, Install the module
```powershell
Install-Module -Name IPAndNetworkCalculator 
```

You can use the plugin with the command 
```powershell 
New-IPCalcNetwork```

1. For faster use, pass in the arguments 
```powershell 
New-IPCalcNetwork -NetworkID <IP> -NetworkMask <subnetMask>
```

I went and grabbed my private IP and subnet mask using 
```powershell 
$myIP = (Get-NetIPAddress -AddressFamily IPV4 -InterfaceAlias Ethernet).IPAddress
```

```powershell 
$mySubnetMask = (Get-NetIPAddress -AddressFamily IPV4 -InterfaceAlias Ethernet).PrefixLength
```

Then, you can pass the two variables into the subnet calculator.```powershell New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask```

2. You can also divide up your subnet using the .Split(x) function.

```powershell 
(New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask).Split(4)
``` 

This example will cut your subnet into 4 parts.

3. You can also check if a given IP is located in a given subnet with the .ContainsIP(x) function

```powershell 
(New-IPCalcNetwork -NetworkID $myIP -NetworkMaskLength $mySubnetMask).ContainsIP($myIP)
```