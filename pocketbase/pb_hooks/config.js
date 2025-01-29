const urlFromEnv = (env) => {
    if (env === 'production') {
        return 'https://pb.margauxdepauw.com'
    } else if (env === 'preview') {
        return 'http://178.62.204.252:8080' // digital ocean server
    }
    return 'http://127.0.0.1:8090'
}

module.exports = {
    "pocketbaseUrl": urlFromEnv("production"),
}
