# nginx 이미지를 사용. 뒤에 version tag가 없으면 latest 를 사용.
FROM nginx:1.21.6

# root 에 app 폴더를 생성.
RUN mkdir -p /app/frontend

# working directory 고정.
WORKDIR /app/frontend

# working directory 에 dist 폴더 생성. 즉, /app/frontend/dist
RUN mkdir ./dist

# host pc의 현재경로의 dist 폴더를 working directory 의 dist 폴더로 복사.
ADD ./dist ./dist

# nginx 의 default.conf 를 삭제.
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 default.conf 를 아래 경로에 복사.
COPY ./default.conf /etc/nginx/conf.d

# 80 포트 오픈.
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작.
CMD ["nginx", "-g", "daemon off;"]
