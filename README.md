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
- cài đặt dependencies trong thư mục dự án Angular (nơi có file package.json)
  ```
  npm install
  ```
- Build Docker Image
  ```
  docker build -t angular-frontend .
  ```
- Chạy Container
  ```
  docker run -d -p 5050:5050 --name angular-container angular-frontend
  ```
- Địa chỉ truy cập ứng dụng frontend (client): http://localhost:5050/
