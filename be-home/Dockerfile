# Base Image 지정
FROM node:lts-alpine

# Author
MAINTAINER yunbeom.kim@bespinglobal.com

# 앱 디렉터리 생성
WORKDIR /app/be-home

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
RUN npm i

# 앱 소스 추가
COPY . .

# ENV 설정
ENV BASE_URL_THIS=http://idealful.kro.kr:8001
ENV BASE_URL_BACKEND_HOME=http://idealful.kro.kr:8001
ENV BASE_URL_BACKEND_AUTH=http://idealful.kro.kr:8002
ENV BASE_URL_BACKEND_MEMBER=http://idealful.kro.kr:8003
ENV BASE_URL_FRONTEND=http://idealful.kro.kr
ENV DB_HOST=144.24.79.181

# PORT 매핑
EXPOSE 8001

# 실행
CMD ["npm", "run", "prd"]
