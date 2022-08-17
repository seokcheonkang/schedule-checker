docker login
start /b npm run build
timeout /t 20 /nobreak
start /b docker build --tag idealful/example:5.0.0 C:\data\dev\workspace3\schedule-checker\fe
timeout /t 5 /nobreak
docker push idealful/example:5.0.0
docker rmi idealful/example:5.0.0
rmdir /s /q dist
