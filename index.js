import chalk from 'chalk';
import fs from 'fs';


const extraiLinks = (texto) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  let dados = capturas.map(captura => ({[captura[1]]: captura[2]}));

  return dados;
}

const trataErro = (erro) => {
  throw new Error(chalk.red(erro.code, ' não arquivo no diretorio'));
}


const pegaArquivo = async (caminhoArquivo) => {
  try {
    const encode = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArquivo, encode);
    console.log(extraiLinks(texto))
  } catch (error) {
    trataErro(error)
  } finally { // finally executa sempre no fim, independente!
    // console.log(chalk.bgMagenta('forget'));
  }
}

pegaArquivo('./arquivos/texto.md');