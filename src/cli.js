import chalk from "chalk";
import fs from 'fs'
import listaValidada from "./http-validacao.js";
import pegaArquivo from "./index.js";

const caminho = process.argv;

const imprimeLista = async (valida, resultado, arquivo = '') => {
  if (valida) {
    console.log(chalk.yellow('DADOS: '), chalk.black.bgGreen(arquivo) ,await listaValidada(resultado)); 
  }else {
    console.log(chalk.yellow('DADOS: '), chalk.black.bgGreen(arquivo) ,resultado); 
  }
}

const processaTexto = async (caminho) => {
  const argumento = caminho[2];
  const valida = caminho[3] === '--valida';

  try {
    fs.lstatSync(argumento);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return console.log(chalk.red('Arquivo ou diretorio não existe'));
    }
  }
  
  if (fs.lstatSync(argumento).isFile()) {
    
    const resultado = await pegaArquivo(argumento);
    await imprimeLista(valida, resultado, argumento.split('/').pop());

  } else if (fs.lstatSync(argumento).isDirectory()) {
    const arquivos = await fs.promises.readdir(argumento);

    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${argumento}/${arquivo}`)
      await imprimeLista(valida, lista, arquivo);
    });
  }
}
processaTexto(caminho)

export default processaTexto