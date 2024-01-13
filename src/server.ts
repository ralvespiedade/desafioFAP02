import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response } from 'express';

const app = express();

const usuarios = [
  {
    id: "001",
    nome: "Neo",
    universo: "Matrix",
    
  },
  {
    id: "002",
    nome: "Super-Man",
    universo: "DC Comics",
  },
  {
    id: "003",
    nome: "Wolverine",
    universo: "Marvel",
  }  

]

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Sejá bem vindo a nossa API. \nUse o endpoint "/users" para ter acesso a lista de usuários')
});

app.get('/message/:nome', (req: Request, res: Response) => {
  const nome = req.params

  res.send(`Olá, ${nome.nome}!! Sejá bem vindo a nossa API.`)
});

//Lista todos os usuários
app.get('/users', (req: Request, res: Response) => {
  const nomes: String [] = []
  
  for (const usuario of usuarios) {
    nomes.push(usuario.nome);
  } 
    
  res.send(nomes);
  
});

//filtra por id de usuario, exibindo os detalhes
app.get('/user/:id', (req: Request, res: Response) => {
  
  try {
    
    const id = req.params
    
    const idNum = parseInt(id.id)

    if (idNum > usuarios.length) {
      res.send('Erro: Id do usuário inválido.');
      return;
    }
    
    var chosen: object = {};
    
    
    for (const usuario of usuarios) {
      
      
      if(usuario.id === id.id) {
        chosen = usuarios[idNum - 1];
      };
  
    };
    
    res.json(chosen);

  } catch (error) {
    res.send(`Erro: ${error}.`)  
  }

});

//Adiciona usuário
app.post('/users', (req: Request, res: Response) => {
  const {
    nome,
    universo
  } = req.body

  const qtUsers = usuarios.length

  if (!nome || !universo ) {
    res.send('Erro ao adicionar usuário: nome ou universo inválido.');
    return;
  }

  usuarios.push({
    id: `00${usuarios.length}`,
    nome,
    universo,
  })

  res.json(usuarios[qtUsers])
    
})



const port = process.env.PORT || '5555';

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(`Para listar todos os usuários: http://localhost:${port}/users`);
  console.log(`Para obter detalhes de um usuário: http://localhost:${port}/user/{ID}`);
  console.log(`Para adicionar um novo usuário: http://localhost:${port}/users (método POST)`);
  console.log(`Para uma saudação personalizada: http://localhost:${port}/mesage/{SeuNome}`);
})
