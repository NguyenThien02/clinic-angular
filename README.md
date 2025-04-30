# 1. Prerequisite
- Cài nvm
  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```
- Cài đặt Node.js
  ```
  nvm install --lts
  ```
- Cài đặt angular
  ```
  npm install -g @angular/cli
  ```

# 2. Build & Run Application
- Clone dự án
  ```
  git clone git@github.com:NguyenThien02/clinic-angular.git
  ```
- Build Docker Image
  ```
  docker build -t angular-frontend .
  ```
- Chạy Container
  ```
  docker run -d -p 5050:80 --name angular-container angular-frontend
  ```
- Địa chỉ truy cập ứng dụng frontend (client): http://localhost:5050/
