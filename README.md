WebInterface
============
Senior Design Project for Iowa State University

Bike Share Web Server

**Rest API**

| Name          | URL           |  Method | Param | Response|
| --------|--------|-----| -----| -----|
| save | /api/save | POST | bikeID, stationID, studentID, action, isDamaged  | Sucess/Failure JSON|
| findall | /api/findall | GET | N/A| Transaction JSON|
| findallbybikeid | /api/findallbybikeid/_ID_ | GET | Inline Param| Transaction JSON|
| findallbystationid | /api/findallbystationid/_ID_ | GET | Inline Param| Transaction JSON|
| findallbystudentid | /api/findallbystudentid/_ID_ | GET | Inline Param| Transaction JSON|
| findallbyaction | /api/findallbyaction/_action_ | GET | Inline Param| Transaction JSON|
| findallbydamaged | /api/findallbydamaged/_isDamaged_ | GET | Inline Param| Transaction JSON|