WebInterface
============
Senior Design Project for Iowa State University

Bike Share Web Server

**Public REST API**

| Name|URL|Method | Param | Response|
| --------|--------|-----| -----| -----|
| register | /api/register | POST | *number* dockID | 200/400 HTTP|
| checkIn | /api/checkin | POST | *number* dockID, *number* bikeID | 200/400 HTTP |
| checkOut | /api/checkout| POST | *number* dockID, *number* bikeID, *string* cardString | 200/400 HTTP |

**Private REST API**

| Name          | URL           |  Method | Param | Response|
| --------|--------|-----| -----| -----|
| Create dock | /api/createdock | POST | N/A | 200/400 HTTP |
| Find dock status | /api/finddockstatus | GET | *number* dockID | { status: boolean} |  
| Set dock location | /api/setdocklocation | POST | *string* location | 200/400 HTTP |
| Create bike | /api/createbike | POST | N/A | 200/400 HTTP |
| Set bike damage | /api/setbikedamage | POST | *number* bikeID, *boolean* isDamaged | 200/400 HTTP |
| Create admin | /api/createadmin | POST | *string* cardString | 200/400 HTTP |
| Remove admin | /api/removeadmin | POST | *string* cardString | 200/400 HTTP |
| Find all admins | /api/findalladmins | GET| N/A | {<br>{cardString: string},<br>{cardString: string},<br>...<br>} |
| Find bike by ID | /api/findbikebyid/:ID | GET | Inline Param | { bikeID: number, dockID: number, state: string, isDamaged: boolean} |
| Find dock by ID | /api/finddockbyid/:ID | GET | Inline Param | { dockID: number, bikeID: number, location: string, status: boolean}|
| Find all transactions | /api/findalltransactions | GET | N/A | {<br>{bikeID: number, dockID: number, studentID: number, date: Date, action: string, success: boolean},<br>...<br>} |
| Find transactions by param ID | /api/findtransactionsbyparamid | POST | Optional params - number bikeID, number dockID, number studentID | {<br>{bikeID: number, dockID: number, studentID: number, date: Date, action: string, success: boolean},<br>...<br>} |