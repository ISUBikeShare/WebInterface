WebInterface
============
Senior Design Project for Iowa State University

Bike Share Web Server

**REST API Endpoints**

| Name|URL|Method | Params | Response|
| --------|--------|-----| -----| -----|
| checkIn | /api/checkin | POST | dockID: *String* , bikeID: *String*  | 200/500 HTTP |
| checkOut | /api/checkout| POST | dockID: *String* , bikeID: *String* , cardString: *String*  | 200/500 HTTP |

__Dock Endpoints__

| Name|URL|Method | Params | Response|
| --------|--------|-----| -----| -----|
| Get docks | /api/dock/ | GET | N/A | {<br>{"status": *boolean*, <br>"dockID": *String*, <br>"bikeID": *String*, <br>"location": *String* }, <br>...</br>} |
| Get dock by ID | api/dock/:ID | GET | Inline Param | { "status": *boolean*, <br>"dockID": *String*, <br>"bikeID": *String*, <br>"location": *String*</br> } |
| Create dock | /api/dock/ | POST | dockID: *String*, location: *String* <br>status: *boolean* | 200/500 HTTP |
| Update dock | /api/dock/ | PUT | location: *String*, <br> bikeID: *String*, <br>status: *boolean*| 200/500 HTTP|

__Bike Endpoints__

| Name|URL|Method | Params | Response|
| --------|--------|-----| -----| -----|
| Get bikes | /api/bike/ | GET | N/A | { <br> {"cardString": *String* <b>OR</b> *null*, "bikeID": *String*, "dockID":  *String* <b>OR</b> *null*, <br>"state": *String* enum: ['in', 'out' 'maintenance'] , <br>"isDamaged": *boolean*}, <br>... </br>} |
| Get bike by ID | /api/bike/:ID | GET | Inline Param | { <br>"cardString": *String* <b>OR</b> *null*, "bikeID": *String*, <br>"dockID":  *String* <b>OR</b> *null*, <br>"state": *String* enum: ['in', 'out' 'maintenance'] , <br>"isDamaged": *boolean*  </br>} |
| Create bike | /api/createbike/ | POST | bikeID: *String* | 200/500 HTTP |
| Update bike | /api/bike/ | PUT | dockID: *String*, cardString: *String*, isDamaged: *boolean* | 200/500 HTTP|

__Transaction Endpoints__

| Name|URL|Method | Params | Response|
| --------|--------|-----| -----| -----|
| Get transactions | /api/transaction/ | GET | N/A | {<br>{bikeID: *String*, dockID: *String*, studentID: *String*, date: *Date*, action: *String*, success: *boolean* },<br>...<br>} |


__Error Report Endpoints__

| Name|URL|Method | Params | Response|
| --------|--------|-----| -----| -----|
| Get error reports | /api/errorreport | GET | N/A | {<br>{ stackTrace: *String*, <br> dockID: *String*, <br>date: *Date*},<br>...<br>} |
| Get error reports by dockID | /api/errorreport/:dockID | GET | Inline Param | {<br>{stackTrace: string, <br>dockID: *String*, <br>date: Date},<br>...<br>} |
| Create error report | /api/errorreport | POST | trace: *String* , <br>dockID:*String*  | 200/500 HTTP |