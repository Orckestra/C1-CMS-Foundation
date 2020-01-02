param (
    [string]$cleanupTargetName,
    [string]$cleanupDirectory
)

Write-Host "ReleaseCleanup script started..."
# This script deletes/rename files according to rules in ReleaseCleanupConfiguration.xml - it is used by automated builds

if(-not($cleanupTargetName)) { Throw "You must supply a value for -cleanupTargetName - matching a target name in ReleaseCleanupConfiguration.xml" }
if(-not($cleanupDirectory)) { Throw "You must supply a value for -cleanupDirectory - this is the path where cleaning will be taking place" }

$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
[xml]$xml = Get-Content (Join-Path $scriptPath "ReleaseCleanupConfiguration.xml")

$targetItems = $xml.SelectNodes("/Configuration/Target[@name='" + $cleanupTargetName + "']/*/*[@path]")

Foreach ($fileNode in $targetItems) {
    $relPath = $fileNode.Attributes["path"].Value
    $fullPath = Join-Path $cleanupDirectory $relPath

    if (($fileNode.Attributes["rename-find"]) -and ($fileNode.Attributes["rename-replace"]) ) {
        # if rename
        Write-Host "Handling $fullPath for renaming"

        $findString = $fileNode.Attributes["rename-find"].Value.Replace("\","/")
        $replaceString = $fileNode.Attributes["rename-replace"].Value
    
        $matches = Get-ChildItem -Path $fullPath -Recurse

        if ($matches.length -eq 0) { Write-Warning "Pattern matched 0 files - probably you should remove it from ReleaseCleanupConfiguration.xml in repo" }
        
        Foreach ($match in $matches) {
            $name = $match.FullName.Replace("\","/")
            $newName = $name.Replace($findString.Replace("\","/"), $replaceString)

            #ensure dir
            $newDirPath = Split-Path -Path $newName
            if (-not (Test-Path($newDirPath))) { New-Item -ItemType Directory -Force -Path $newDirPath }
            Move-Item $match -Destination $newName -Force
        }
    }
    else {
        # assume delete otherwise
        Write-Host "Handling $fullPath for deletion"

        if (($fileNode.Name -eq "Directory") -and (Test-Path $fullPath)) {
            Remove-Item -LiteralPath $fullPath -Force -Recurse
        } else {
            $matches = Get-ChildItem -Path $fullPath -Recurse

            if ($matches.length -eq 0) { Write-Warning "Pattern matched 0 files - probably you should remove it from ReleaseCleanupConfiguration.xml in repo" }
    
            $matches | Where-Object { Test-Path($_) } | Remove-Item -Force -Recurse
        }
    } 
}
