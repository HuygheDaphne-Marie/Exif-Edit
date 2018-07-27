# Exif Edit
Exif edit is a tool made by Henri-Thibault Huyghe a 2nd year applied computer science student at Howest. It aims at being an easy to use simple tool and will be expanded on in the future to allow for more tags to be edited.

## How it works
Exif Edit uses a commandline tool called exiftool in the background, and changes the metadata of every picture under the folder you specify (Also those that are in folders inside the one you specified. It runs a local expressjs server to provide you with the user interface you see now. The entire app can run offline without any issues and everything needed is installed locally one you installed it and it's packages.

## Important Enviroment Variables
### Server.js Variables
*PORT* (int) local express server will listen on this, `default 5000`<br>
*LOGGING* (boolean) enables logging with remoteLogger.js, `default false`<br>
### RemoteLogger.js Variables
*HOSTNAME* (domain OR IP) hostname or IP that remote logging messages will be sent to, `default 127.0.0.1`<br>
*RPORT* (int) port that logging message will be sent to, `default 5050`<br>
### RemoteServer.js Variables
*LOGPORT* (int) port express server will listen on for log messages, `default 5050`<br>