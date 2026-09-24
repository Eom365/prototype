function Get-OfficeIpAddress {
    $candidates = Get-NetIPAddress -AddressFamily IPv4 |
        Where-Object {
            $_.IPAddress -notlike "127.*" -and
            $_.PrefixOrigin -ne "WellKnown" -and
            $_.InterfaceAlias -notlike "*Loopback*" -and
            $_.InterfaceAlias -notlike "vEthernet*" -and
            $_.InterfaceAlias -notlike "*Virtual*" -and
            $_.InterfaceAlias -notlike "Meta" -and
            $_.InterfaceAlias -notlike "*Bluetooth*"
        }

    $officeIp = $candidates |
        Where-Object { $_.IPAddress -match '^(192\.168\.|10\.)' } |
        Select-Object -First 1 -ExpandProperty IPAddress

    if (-not $officeIp) {
        $officeIp = $candidates | Select-Object -First 1 -ExpandProperty IPAddress
    }

    return $officeIp
}
