import chalk from "chalk";
import fs from 'fs'
import pegaArquivo from "./index.js";

const caminho = process.argv;

const imprimeLista = (resultado) => {
    console.log(chalk.yellow('DADOS: '), resultado); 
  
}

const processaTexto = async (caminho) => {
  const argumento = caminho[2]
  
  if (fs.lstatSync(argumento).isFile()) {
    
    const resultado = await pegaArquivo(argumento);
    imprimeLista(resultado);

  } else if (fs.lstatSync(argumento).isDirectory()) {
    const arquivos = await fs.promises.readdir(argumento);

    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${argumento}/${arquivo}`)
      imprimeLista(lista);
    });
  }
}

processaTexto(caminho)