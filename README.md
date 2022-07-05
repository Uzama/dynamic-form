## Dynamic Form

- Create a form dynamically based on data fed by a REST API.
- Fetch data from `GET https://ulventech-react-exam.netlify.app/api/form`
- Send the data after editing the form to `POST https://ulventech-react-exam.netlify.app/api/form`

### How to start

- Make sure you have install docker in your computer
- Clone the repository
- Run `docker-compose up`
- The server will start at `http://localhost:3000`

Note: if you want to change the name of docker image you can edit the image field in `docker-compose.yaml` file. If you want to run application in dev environment, change the following in `docker-compose.yaml` file

```
    - environment:
      - "NODE_ENV=development"
    - command: ["yarn", "dev"]
```
