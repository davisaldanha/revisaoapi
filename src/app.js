//Importar o express
const express = require('express');

//Importar o database
const database = require("./database")

//Importar o body-parser
const bodyParser = require('body-parser')

//Criar uma instância do express
const app = express();

//Usar o body-parser para interpretar os dados enviados via JSON e URL-encoded
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
app.delete('/aluno/:id', (req, res) => {
    let id = req.params.id

    database.query('DELETE FROM aluno WHERE id = ?', [id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Aluno deletado com sucesso!'})
        }

        return res.status(404).json({message: 'Aluno não encontrado!'})

    })
})

//UPDATE
app.put('/aluno/:id', (req, res) => {
    let id = req.params.id
    let nome = req.body.nome
    let telefone = req.body.telefone
    let status = req.body.status

    database.query('UPDATE aluno SET nome=?, telefone=?, status=? WHERE id=?', [nome, telefone, status, id], (err, result) => {
        if(err){
            return res.status(500).json(err)
        }

        if(result.affectedRows > 0){
            return res.status(200).json({message: 'Aluno atualizado com sucesso!'})
        }
        
        return res.status(404).json({message: 'Aluno não encontrado!'})
    })
})

//Rotas Turma
//GET
app.get('/turmas', (req, res) => {
    database.query('SELECT * FROM turma', (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }

        if(result.length > 0){
            return res.status(200).json(result)
        }

        return res.status(200).json({message: 'Nenhuma turma cadastrada!'})
    })
})

//POST

//DELETE

//UPDATE


app.listen(3000, () => console.log(`Servidor rodando na porta ${3000}.`))