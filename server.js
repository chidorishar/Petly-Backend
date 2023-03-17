const app = require('./app');
const { connectToMongo } = require('./services');
const { PORT } = process.env;

//MAIN
(async function () {
  const isConnectedToDB = !(await connectToMongo());
  if (!isConnectedToDB) process.exit(1);

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
