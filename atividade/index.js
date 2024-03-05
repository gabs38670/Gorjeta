const inquirer = require ('inquirer')

const chalk = require ('chalk')

// criando a varíavel do cálculo
const caluladoraGorjeta  = async () =>{
// inserido as perguntas  
  const conta =  await
  inquirer
    .prompt([
      {
        type:'input',
        name: 'total',
        message: (chalk.blue.bold('Digite o valor total da conta:'))
      },
      {
        type: 'input',
        name: 'numPessoas',
        message:(chalk.blue.bold('Digite o número de pessoas na mesa:'))

      },
      // criando a lista para saber a porcentagem da gorjeta
      { type: 'list',
     name: 'nivelServico',
     message: (chalk.blue.bold('Selecione o nível de serviço:')),
     choices: ['Ok - 10% de gorjeta',
     'Bom - 15% de gorjeta',
      'Ótimo - 20% de gorjeta', 
      'Excelente - 25% de gorjeta']
      },
    ])

    // varíavel da porcentagem da gorjeta
    let percentualGorjeta = 0.10; 
  if (conta.nivelServico.includes('Bom')){
    percentualGorjeta = 0.15;
  }  
   else if (conta.nivelServico.includes('Ótimo')) {
    percentualGorjeta = 0.20;
  }
   else if (conta.nivelServico.includes('Excelente')) {
    percentualGorjeta = 0.25;
  }

    //criando a conta do total com o número de pessoas e a gorjeta e dividino o valor
    const gorjeta = parseFloat(conta.total) * percentualGorjeta;
    const valortotalP = (parseFloat(conta.total) + gorjeta) / parseInt (conta.numPessoas)

    // agregando o número de pessoas e os nomes
    const valorPessoa = {};

    for(let i = 0; i < parseInt(conta.numPessoas); i++) {
      const contribuicao = await 
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'nome',
            message:(chalk.blue.bold(`Nome da pessoa ${i + 1}`)),
          },
          
        ])
        valorPessoa[contribuicao.nome] = parseFloat(contribuicao.valorContribuicao);
    }

      for(const [nome,valor] of Object.entries(valorPessoa)){
      const gorjetaPorPessoa = gorjeta / parseInt(conta.numPessoas);
      const totalporPessoa = valortotalP - gorjetaPorPessoa;
      console.log(chalk.green.bold(`${nome} deve pagar: R$ ${totalporPessoa + gorjetaPorPessoa}`));
    }

    console.log(chalk.red.bold(`O valor total da gorjeta foi de: R$ ${gorjeta}`));

};

caluladoraGorjeta()






