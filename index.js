const server = require('./tools/server');
const config = require('./config/config');
const plugins = require('./config/config_plugin');
require("./tools/database");
const _privateKey = config.key.privateKey;
const jwt_tool=require("./tools/jwt_tool");

// Start the server
async function start() {
    try {

        await server.register(plugins);

        server.auth.strategy('jwt', 'jwt',
            {
                key: _privateKey,          // Never Share your secret key
                validate:jwt_tool.validate,            // validate function defined above
                verifyOptions: {
                    ignoreExpiration: false,
                    algorithms: ['HS256']
                } // pick a strong algorithm
            });

        server.auth.default('jwt');

        const route = require('./routes');

// Add the server routes
        route.forEach(function (api) {
            server.route(api);
        });


        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();