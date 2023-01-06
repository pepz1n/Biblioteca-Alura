import chalk from 'chalk';
import fs from 'fs';


const extraiLinks = (texto) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  let dados = capturas.map(captura => ({[captura[1]]: captura[2]}));

  return dados.length !== 0 ? dados : 'Não À links!';
}

const trataErro = (erro) => {
  throw new Error(chalk.red(erro, ' não arquivo no diretorio'));
}


const pegaArquivo = async (caminhoArquivo) => {
  try {
    const encode = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArquivo, encode);
    return extraiLinks(texto)
  } catch (error) {
    trataErro(error)
  } finally { // finally executa sempre no fim, independente!
    // console.log(chalk.bgMagenta('forget'));
  }
}

export default pegaArquivo;