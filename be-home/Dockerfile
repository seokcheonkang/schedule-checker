# Base Image 지정
FROM node:lts-alpine

# Info
LABEL maintainer "김윤범YunBeom Kim<yunbeom.kim@bespinglobal.com>"
LABEL title="Schedule Checker"
LABEL org.opencontainers.image.source https://github.com/KimYunBeom/schedule-checker

# 앱 디렉터리 생성 및 지정
WORKDIR /app/be-home

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해 와일드카드를 사용
COPY package*.json ./

# 빌드
RUN npm i

# 앱 소스 추가
COPY . .

# 볼륨 설정
# VOLUME ["/app/deploy/secret", "/app/deploy/secret"]

# ENV 설정
ENV BASE_URL_THIS=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com:8001
ENV BASE_URL_BACKEND_HOME=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com:8001
ENV BASE_URL_BACKEND_AUTH=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com:8002
ENV BASE_URL_BACKEND_MEMBER=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com:8003
ENV BASE_URL_FRONTEND=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com
ENV DB_HOST=http://k8s-default-frontend-0d7d9686de-270860005.ap-northeast-2.elb.amazonaws.com

# PORT 매핑
EXPOSE 8001

# 실행
CMD ["npm", "run", "prd"]
