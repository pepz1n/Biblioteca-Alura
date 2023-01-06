import chalk from 'chalk';
import fs from 'fs';

const trataErro = (erro) => {
  throw new Error(chalk.red(erro.code, ' não arquivo no diretorio'));
}

// const pegaArquivo = (caminhoArquivo) => {
//   const encode = 'utf-8';
//   fs.promises.readFile(caminhoArquivo, encode).then(texto => console.log(texto)).catch(trataErro);
// }

const pegaArquivo = async (caminhoArquivo) => {
  try {
    const encode = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArquivo, encode);
    console.log(texto);
  } catch (error) {
    trataErro(error)
  } finally { // finally executa sempre no fim, independente!
    console.log(chalk.bgMagenta('forget'));
  }
}

pegaArquivo('./arquivos/texto.md');