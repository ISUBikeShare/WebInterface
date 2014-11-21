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
| createDock | /api/createdock | POST | N/A | 200/400 HTTP |
| findDockStatus | /api/finddockstatus | GET | *number* dockID | { status: boolean} |  
| setDockLocation | /api/setdocklocation | POST | *string* location | 200/400 HTTP |
| createBike | /api/createbike | POST | N/A | 200/400 HTTP |
| setBikeDamage | /api/setbikedamage | POST | *number* bikeID, *boolean* isDamaged | 200/400 HTTP |
| createAdmin | /api/createadmin | POST | *string* cardString | 200/400 HTTP |
| removeAdmin | /api/removeadmin | POST | *string* cardString | 200/400 HTTP |
| findAllAdmins | /api/findalladmins | GET| N/A | {<br>{ cardString: string},<br>{cardString: string},<br>...<br>} |
| findBikeByID | /api/findbikebyid/:ID | GET | Inline Param | { bikeID: number, dockID: number, state: string, isDamaged: boolean} |
| findDockByID | /api/finddockbyid/:ID | GET | Inline Param | { dockID: number, bikeID: number, location: string, status: boolean}|
| findAllTransactions | /api/findalltransactions | GET | N/A | {{bikeID: number, dockID: number, studentID: number, date: Date, action: string, success: boolean},...} |
| findTransactionsByParamID | /api/findtransactionsbyparamid | POST | Optional params - number bikeID, number dockID, number studentID | {{bikeID: number, dockID: number, studentID: number, date: Date, action: string, success: boolean},...} |