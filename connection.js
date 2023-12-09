const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ["localhost"],
  localDataCenter: "datacenter1",
  keyspace: "eshop",
});

client
  .connect()
  .then(() => console.log("Connected to Cassandra"))
  .catch((error) => console.error("Connection to Cassandra failed", error));

module.exports = client;
