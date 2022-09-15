# nginx 이미지를 사용. 뒤에 version tag가 없으면 latest 를 사용.
FROM nginx:alpine

# Info
LABEL maintainer "김윤범YunBeom Kim<yunbeom.kim@bespinglobal.com>"
LABEL title="Schedule Checker"
LABEL org.opencontainers.image.source https://github.com/KimYunBeom/schedule-checker

# working directory 고정.
WORKDIR /app/fe/dist

# host pc의 현재경로의 dist 폴더를 working directory 의 dist 폴더로 복사.
ADD ./dist /app/fe/dist

# nginx 의 default.conf 를 삭제.
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 default.conf 를 아래 경로에 복사.
COPY ./default.conf /etc/nginx/conf.d

# ENV 설정

ENV VITE_APP_SERVER=
ENV VITE_APP_BASE_URL_BACKEND_HOME=http://schedulechecker.kro.kr:8001
ENV VITE_APP_BASE_URL_BACKEND_AUTH=http://schedulechecker.kro.kr:8002
ENV VITE_APP_BASE_URL_FRONTEND=http://schedulechecker.kro.kr
ENV VITE_APP_GOOGLE_CLIENT_ID=594148934886-26bepje4v1immq8gii3jiusci6d989dn.apps.googleusercontent.com

# PORT 매핑
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작.
CMD ["nginx", "-g", "daemon off;"]
