# Открыть порт 5080 в брандмауэре Windows (запускать от имени администратора)
$ErrorActionPreference = "Stop"

$ruleName = "ProductCard Office App"

if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Запустите этот скрипт от имени администратора." -ForegroundColor Red
    exit 1
}

$existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "Правило '$ruleName' уже существует." -ForegroundColor Yellow
} else {
    netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow protocol=TCP localport=5080 profile=any | Out-Null
    Write-Host "Порт 5080 открыт для офисной сети." -ForegroundColor Green
}
