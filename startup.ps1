# Look at this sweet sweet browser bias

# Check Firefox
if([System.IO.File]::Exists("C:\Program Files\Mozilla Firefox\firefox.exe")) {
  Start-Process "firefox.exe" "http://localhost:5000/"
} else {
  
  # Check Chrome
  if([System.IO.File]::Exists("C:\Program Files (x86)\Google\Chrome\Application\chrome.exe")) {
    Start-Process "chrome.exe" "http://localhost:5000/"
  } else {

    # Check Edge
    if([System.IO.File]::Exists("C:\Windows\SystemApps\Microsoft.MicrosoftEdge_8wekyb3d8bbwe\MicrosoftEdge.exe")) {
      start microsoft-edge:http://localhost:5000/
    } else {

      # Resort to Explorer ;-;
      Start-Process "iexplore.exe" "http://localhost:5000/"
    }
  }
}

node ./server.js
