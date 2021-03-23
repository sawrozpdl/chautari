export APP_NAME=chautari
heroku container:push web -a $APP_NAME
heroku container:release web -a $APP_NAME
