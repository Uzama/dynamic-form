## Dynamic Form

- Create a form dynamically based on data fed by a REST API.
- Fetch data from `GET https://ulventech-react-exam.netlify.app/api/form`
- Send the data after editing the form to `POST https://ulventech-react-exam.netlify.app/api/form`

### How to start

- Make sure you have installed docker in your computer
- Clone the repository and move into the project directory
- Run `docker-compose up`
- The server will start at `http://localhost:3000`

### Note

1. if you want to change the name of the docker image you can edit the image field in `docker-compose.yaml` file.
2. If you want to run the application in dev environment, change the following in `docker-compose.yaml` file,

```
    - environment:
      - "NODE_ENV=development"
    - command: ["npm", "dev"]
```
