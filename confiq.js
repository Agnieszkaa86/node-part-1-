const config = {
    readingEnabled: process.env.READING_ENABLED === "true" ? true : false,
};
console.log("config", config)
module.exports = { config };

