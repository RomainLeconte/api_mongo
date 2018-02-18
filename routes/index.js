module.exports = (server) => {
    server.get('/users', (req, res) => {
        res.send({users:' lot of users'});
    });
    server.get('/user/:id', (req, res) => {
        res.send({user:'a user id : '+req.params.id});
    });
}