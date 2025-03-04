FROM nginx:latest 
COPY ./dist/clinic-angular /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
