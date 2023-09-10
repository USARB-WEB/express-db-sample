const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const usersService = require('./services/UsersServices')

app.get('/', async(req, res) => {
    res.json({'response': 'ok'});
})

app.get('/users', async(req, res) => {
    res.json(await usersService.get(1));
})

app.post('/users', async(req, res) => {
    res.json(await usersService.create(req.body));
})

app.put('/users/:id', async(req, res) => {
    res.json(await usersService.update(req.body, Number(req.params.id)));
})

app.delete('/users/:id', async(req, res) => {
    res.json(await usersService.remove(Number(req.params.id)));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})