@echo off
echo —————————————–
echo . Starting the MongoDB instance
echo —————————————–
start C:\MongoDB\bin\mongod.exe 
start C:\MongoDB\bin\mongo.exe
start cmd /k "cd C:\MongoDB\bin"
exit