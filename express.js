let dbUsers = [
  {
      username: "Anis",
      password: "Anis14",
      name: "Anis",
      email: "Anis99@gmail.com"
  
  },
  {
      username: "Jay",
      password: "1234",
      name: "Jay2004",
      email: "Jay2004@utem.edu.my"
  
  },
  {
      username: "Amilia",
      password: "230798",
      name: "Amilia",
      email: "Amilia33@utem.edu.my"
  
  }
  ]

function login(reqUsername, reqPassword) {
  let matchUser = dbUsers.find(user => user.username == reqUsername)

  //console.log(matchUser)

if(!matchUser) return "User not found!"

if(matchUser.password == reqPassword){
  return matchUser
}else{
  return "Invalid password"
}
}

function register (reqUsername,reqPassword,reqName,reqEmail){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: reqName,
      email: reqEmail

  })

}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'inipassword', function(err,decoded){
    if(err){
      res.send("Invalid Token")
    }
    res.user = decoded
    next()
  });
}

function generateToken(userData)
{
  const Token = jwt.sign
  (
    userData,
    'inipassword',
    {expiresIn:60}
  );
  return Token
}


const express = require('express')
const app = express()
const port = 3000

const jwt = require('jsonwebtoken');
function generateToken(userData){
  const token = jwt.sign(
    userData,
    'inipassword'
  );
  return token
}

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username,req.body.password)

    let token = generateToken (result)
    res.send(token)

    res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hi WORLD!')
})

app.get('/bye', verifyToken, (req, res) => {
    res.send('No Hi!')
  })

app.post('/register', (req, res) => {
  let result = register(
    req.body.username
    ,
    req.body.password,
    req.body.name,
    req.body.email
  )  
  
  res.send(result)
})



app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})