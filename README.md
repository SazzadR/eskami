### Prerequisites
- Docker
- Docker Compose
- Open `8000` port (for backend container)
- Open `3000` port (for frontend container, if only wants to run in development mode)
- Open `80` port (for nginx container, if only wants to run in production mode)

### Installation
- Clone the project from command line and enter the project root directory
```
$ git clone https://github.com/SazzadR/eskami.git
$ cd eskami
```
- Run database migration
```
$ docker-compose exec backend php artisan migrate
```
- Seed database with fake data (optional)
```
$ docker-compose exec backend php artisan db:seed
```
- To run the application in development mode with react's hot module reload run
```
$ docker-compose -f docker-compose.yml up -d  --build
```
- **OR** To run the application in production mode run
```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
- If running in development mode go to [http://127.0.0.1:3000](http://127.0.0.1:3000)
- **OR** If running in production mode go to [http://127.0.0.1](http://127.0.0.1)

#### Improvement
There are quite a few rooms for improvement in this current tasks. Some of those would be
- For backend API url use environment variable in frontend container rather then hardcoded one
- Image validation in backend
- Register nginx webserver container of frontend in `docker-compose.yml` rather then `Dockerfile`
- Catch 500 errors in frontend and display nicely formatter error message
- Add linter and formatter to ensure consistency of the code
