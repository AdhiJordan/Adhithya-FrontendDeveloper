module.exports = {
    name: 'prod.config',
    constants: {
        ENV: {
            BASE_URL: process.env.REACT_APP_API_BASE_URL,
        },
    },
};
