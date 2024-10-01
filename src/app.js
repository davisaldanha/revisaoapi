//Importar o express
const express = require('express');

//Importar o database
const database = require("./database")

//Importar o body-parser
const bodyParser = require('body-parser')

//Criar uma instância do express
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Rotas ALUNO
//GET
app.get('/alunos', (req, res) => {
    database.query('SELECT * FROM aluno', (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        if(result.length > 0) {
            return res.status(200).json(result)
        }
        
        return res.status(200).json({message: 'Nenhum aluno cadastrado!'})
        
    })
})

//POST
app.post('/aluno', (req, res) => {
    let nome = req.body.nome
    let telefone = req.body.telefone
    let status = req.body.status

    if (!nome ||!telefone ||!status) {
        return res.status(400).json({message: 'Todos os dados são obrigatórios'})
    }

    database.query('INSERT INTO aluno(nome, telefone, status) VALUES (?, ?, ?)', [nome, telefone, status], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(201).json({message: 'Aluno cadastrado com sucesso!', aluno: result.insertId})
    })

})

//DELETE

//UPDATE



app.listen(3000, () => console.log(`Servidor rodando na porta ${3000}.`))