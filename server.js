const server = require('./projeto/src/app')
const port = 3000

server.listen(port, () =>{
    console.log(`Bagui ta rodando http://localhost:${port}`)
})