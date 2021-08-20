const _ = require('lodash');
const REACT_APP = /^REACT_APP_/i;
function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl,
                WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
                WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
                WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
                FAST_REFRESH: process.env.FAST_REFRESH !== 'false',
            },
        );
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };

    return { raw, stringified };
}

const isDevBuild = () => {
    if (process.env.NODE_ENV === 'development') return true;
    if (process.env.NODE_ENV === 'production') return false;

    throw new Error('Specify "mode" argument: "development" or "production"');
};
const devOnly = (plugin) => (isDevBuild() ? plugin : undefined);
const prodOnly = (plugin) => (isDevBuild() ? undefined : plugin);
const removeEmpty = (list) => (_.isArray(list) ? _.compact(list) : _.pick(list, _.identity));

module.exports = {
    isDevBuild,
    devOnly,
    prodOnly,
    removeEmpty,
    getClientEnvironment,
};
