WebInterface
============
Senior Design Project for Iowa State University

Bike Share Web Server

**Rest API**

| Name          | URL           |  Method | Param | Response|
| --------|--------|-----| -----| -----|
| save | /api/save | POST | bikeID, stationID, studentID, action, isDamaged  | Sucess/Failure JSON|
| findall | /api/findall | GET | N/A| Transaction JSON|
| findallbybikeid | /api/findallbybikeid/_ID_ | GET | Inline ID| Transaction JSON|
| findallbystationid | /api/findallbystationid/_ID_ | GET | Inline ID| Transaction JSON|
| findallbystudentid | /api/findallbystudentid/_ID_ | GET | Inline ID| Transaction JSON|
| findallbyactionid | /api/findallbyactionid/_action_ | GET | Inline action| Transaction JSON|
| findallbydamagedid | /api/findallbydamagedid/_isDamaged_ | GET | Inline boolean| Transaction JSON|