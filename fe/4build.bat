docker login
start /b npm run build-dev
timeout /t 20 /nobreak
start /b docker build --tag idealful/example:4.0.0 C:\data\dev\workspace3\schedule-checker\fe
timeout /t 5 /nobreak
docker push idealful/example:4.0.0
docker rmi idealful/example:4.0.0
rmdir /s /q dist
