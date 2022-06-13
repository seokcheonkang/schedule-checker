REM Need to build first

REM move to target folder
cd ../../
cd KimYunBeom.github.io

REM delete previous files
rmdir /s /q assets
del /q *.*

REM copy files
xcopy /e /y "../schedule-checker/fe/dist" .

REM deployment
git add .
git reset --soft 48ad03016563024c6667e12b78f244db76765160
git commit -m 'deploy'
git push -f

REM return current folder
cd ../schedule-checker/fe
