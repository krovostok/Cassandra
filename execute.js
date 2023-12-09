const connection = require ("./connection");

const execute = async (query, params) => {
  try {
    const result = await connection.execute(query, params, {
      prepare: true,
    });
    return result;
  } catch (error) {
    console.error("Cassandra Query Execution Error:", error);
    throw error;
  }
};

module.exports = { execute };