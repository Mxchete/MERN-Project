# make sure that you are running this file in linux/WSL with sudo permissions & docker installed
# also make sure to run "npm i" to build dependencies
# in order to see running project, go to http://localhost:3000
run:
	sudo docker build -t mern-app .
	sudo docker run -p 3000:3000 -d --name mern mern-app:latest

stop:
	sudo docker rm -f mern
