Set-Location $PSScriptRoot

Write-Output '> Set git repository config'
git.exe config --local core.autocrlf input

Write-Output '> Please check your user'
git.exe config --get-regexp user\.

Read-Host 'Exit'
