// array
let participantes=[
  {
    nome: "Thiago Betone",
    email: "thiagobetone@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Amanda Briatori",
    email: "amandabriatori@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 20, 30),
    dataCheckIn: new Date(2024, 2, 26, 22, 0)
  },
  {
    nome: "Lucas Silva",
    email: "lucassilva@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 15),
    dataCheckIn: new Date(2024, 2, 26, 21, 0)
  },
  {
    nome: "Carolina Santos",
    email: "carolinasantos@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 8, 45),
    dataCheckIn: new Date(2024, 2, 27, 20, 0)
  },
  {
    nome: "Pedro Oliveira",
    email: "pedrooliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 12, 0),
    dataCheckIn: new Date(2024, 2, 28, 19, 30)
  },
  {
    nome: "Camila Ferreira",
    email: "camilaferreira@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 14, 30),
    dataCheckIn: new Date(2024, 2, 29, 18, 0)
  },
  {
    nome: "Bruno Souza",
    email: "brunosouza@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 17, 10),
    dataCheckIn: new Date(2024, 3, 1, 17, 0)
  },
  {
    nome: "Marina Lima",
    email: "marinalima@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 19, 20),
    dataCheckIn: new Date(2024, 3, 2, 16, 30)
  },
  {
    nome: "Rafael Mendes",
    email: "rafaelmendes@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 22, 0),
    dataCheckIn: new Date(2024, 3, 3, 15, 45)
  },
  {
    nome: "Vanessa Almeida",
    email: "vanessaalmeida@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 8, 30),
    dataCheckIn: new Date(2024, 3, 3, 15, 45)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button 
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `

}

const atualizarLista = (participante) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody')
  .innerHTML = output
} // arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )
  

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer check-in?'
  if(confirm(mensagemConfirmacao) == false){
    return 
  }

  const participante = participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}

