# Geolocation

[Node.js](https://nodejs.org/en/) application built with [Express](https://expressjs.com/).

## Demo

Demo available at:
[http://3.69.233.75:3000/](http://3.69.233.75:3000/) (AWS).



## Run Locally

Clone the project

```bash
  git clone https://github.com/Viorel1989/geolocation
```

Go to the project directory

```bash
  cd geolocation
```

Create the `.env` file and update

```bash
  cp .env.sample .env
```

### Docker

Build the Docker image for app service

```bash
  docker-compose build app
```

Start the Docker container for database service

```bash
  docker-compose up -d postgress
```
Run database migrations/seeding

```bash
  docker-compose exec app npx sequelize-cli db:migrate
```

Start all Docker containers

```bash
  docker-compose up -d
```

Display app log output from app service

```bash
  docker-compose logs -f app
```

## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
