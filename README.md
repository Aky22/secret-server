# Secret server
## How to run

Please create a `.env` file in the root directory with the following content:

```bash
MONGODB_URI=mongodb://mongo:27017/secretServer
MONGO_INITDB_DATABASE=secretServer
MONGO_USERNAME=<USERNAME>
MONGO_PASSWORD=<PASSWORD>
```

Then run the following command:

```bash
docker-compose up
```