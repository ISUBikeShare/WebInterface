WebInterface
============
Senior Design Project for Iowa State University

Bike Share Web Server

**mongo-start.bat**

1. Starts Mongo DB
2. Starts CLI-Mongo
3. Opens a command prompt in the MongoDB/bin directory

Note: you will need to update this to point to where Mongo is

**export.json**

1. This is a basic version of the data our app will be using
2. Run the mongo-start.bat
3. Run `db.test.remove({})` in the mongo.exe to remove everything you currently have (You don't need to do this the first time)
4. Run `mongoimport --db test --collection test --type json --file export.json` in the command prompt window in your MongoDB/bin directory