import chalk from "chalk";

const extraiLinks = (arrLinks) => {
  let itens = arrLinks.map((objetoLinks) => Object.values(objetoLinks).join());
  return itens;
}


const checaStatus = async (listaUrl = new Array) => {
  const arrStatus = await Promise.all(
    listaUrl.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (error) {
        return manejaErro(error);
      }
    })
  );
  return arrStatus;
}

const manejaErro = (erro) => {
  if (erro.cause.code == 'ENOTFOUND') {
    return 'Link Não Encontrado';
  }
  return 'OUTRO ERRO';
}

const listaValidada = async (listaDeLinks) => {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);
  
  return listaDeLinks.map((objeto, i) =>  ({
    ...objeto,
    status: status[i]
  }));
}

export default listaValidada


/*
[Teste de retorno 400](https://httpstat.us/404).
[gatinho salsicha](http://gatinhosalsicha.com.br/)
*/ 