REM move to target folder
cd ../../
cd KimYunBeom.github.io

REM delete previous files
rmdir /s /q assets
del /q *.*

REM copy files
xcopy /e /y "../schedule-checker/client/dist" .

REM deployment
git add .
git commit -m 'deploy'
git push

REM return current folder
cd ../schedule-checker/client
