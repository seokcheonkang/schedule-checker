# schedule-checker

## updated : 2022-10-28

---

## Source

[Schedule Checker Github](https://github.com/KimYunBeom/schedule-checker)

---

## Directory

### BackEnd

be-home
be-auth

### FrontEnd

fe

### Batch

batch

---

## Environment

### Text Editor

- Visual Studio Code
  - EXTENSIONS
    - Active File In StatusBar
    - Auto Rename Tag
    - HTML CSS Support
    - indent-rainbow
    - Markdown Preview Enhanced
    - Material Icon Theme
    - Prettier - Code formatter
    - Vue Language Features (Volar)

## Web Server

- Nginx

## FrontEnd

- HTML
- CSS
  - Framework
    - Bootstrap
  - Pre-processor
    - SCSS(SASS)
- JavaScript
  - Build Tool
    - vite
  - Framework
    - Vue.js 3 sfc
      - Vue.js Modules
        - vue-router
        - vue-sweetalert2
        - vuejs-paginate-next
        - axios
        - jwt-decode
        - pinia
        - vue3-google-oauth2
        - vue3-charts

### Authentication

- Google Sign-in

### BackEnd

- Language
  - Node.js
- Web Framework
  - Express.js

### Batch

- Java
- Spring Batch
- Spring Scheduler

### DataBase

- MariaDB

### Container

- Docker

### Version Control System

- local
  - Git
- remote
  - Github

### CI

- Github Actions

### Cloud

- Oracle Cloud

## Environment > Local Setting

- vscode 설치
- nodejs 설치
- git clone 실행
- vscode 실행
- 각 폴더에서 npm i 실행
- 각 폴더에서 npm run dev 실행

## Local Build

```
$vite build --mode test
```

---

## Deployment

### ~~Github Pages - 종료~~

정적 페이지 임시 배포

주의 : 웹 브라우저에서 Refresh(단축키 F5)는 /(Root) 에서만 실행하세요. 로컬은 F5 됩니다.

[Schedule Checker Github Pages](https://kimyunbeom.github.io)

#### Action

schedule-checker의 dist 폴더를 수동 업로드 혹은 아래 실행

```
92copy-gitHubPages.bat
```

## Github Actions

#### Action

원격 소스 업로드 이후, 자체 빌드 및 컨테이너 이미지 생성됨

[Schedule Checker](https://idealful.kro.kr)

```
git push
```
