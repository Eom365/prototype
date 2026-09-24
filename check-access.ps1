$ErrorActionPreference = "SilentlyContinue"
. "$PSScriptRoot\get-office-ip.ps1"

Write-Host "=== Proverka servera ===" -ForegroundColor Cyan

$listening = Get-NetTCPConnection -LocalPort 5080 -State Listen
if ($listening) {
    Write-Host "[OK] Server rabotaet, port 5080 otkryt" -ForegroundColor Green
} else {
    Write-Host "[OSHIBKA] Server ne zapuschen! Zapustite: .\start-office.ps1" -ForegroundColor Red
}

try {
    $health = Invoke-WebRequest -Uri "http://localhost:5080/api/health" -UseBasicParsing -TimeoutSec 3
    Write-Host "[OK] API otvechaet" -ForegroundColor Green
} catch {
    Write-Host "[OSHIBKA] API ne otvechaet" -ForegroundColor Red
}

$mainIp = Get-OfficeIpAddress

Write-Host ""
Write-Host "=== Pravilnaya ssylka dlya kolleg ===" -ForegroundColor Cyan
Write-Host "  http://${mainIp}:5080" -ForegroundColor Green

Write-Host ""
Write-Host "=== Proverka u kollegi (na ego PK) ===" -ForegroundColor Cyan
Write-Host "  1. Win+R -> cmd -> ipconfig"
Write-Host "     Dolzhen byt IP: 192.168.1.x (ne 192.168.0.x i ne gostevoy Wi-Fi)"
Write-Host "  2. ping $mainIp"
Write-Host "     Esli 'Prevyshchen interval' - problemа v seti, ne v programme"
Write-Host "  3. Brauzer: http://${mainIp}:5080"

Write-Host ""
Write-Host "=== Esli ping ne prohodit ===" -ForegroundColor Yellow
Write-Host "  - Kollegi na tom zhe Wi-Fi/Ethernet chto i server?"
Write-Host "  - Ne podklyucheny k gostevoy seti?"
Write-Host "  - Na routere mozhet byt 'izolyatsiya klientov Wi-Fi' - nuzhno vyklyuchit"
