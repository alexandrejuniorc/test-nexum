// abrir e fechar modal
const openModal = () => $('#modal').addClass('active');

// fechar modal quando apertar no botão X
const closeModal = () => $('#modal').removeClass('active');

const tempClient = {
  nome: 'ana',
  cpf: '123.456.789-10',
  email: 'ana@ana.com',
  cidade: 'São Paulo',
  uf: 'MG',
};

const getLocalStorage = () =>
  // transforma oque foi pego do localStorage em string para objeto
  JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) =>
  // manda o item pro localStorage como string
  localStorage.setItem('db_client', JSON.stringify(dbClient));

// CRUD - create read update delete
const createClient = (client) => {
  const dbClient = getLocalStorage();
  // adiciona item(acrescente +1) a chave criada
  dbClient.push(client);
  setLocalStorage(dbClient);
};
const readClient = () => getLocalStorage();
const updateClient = (client) => {
  const dbClient = getLocalStorage;
};
// eventos
$('#cadastrarCliente').click(openModal);
$('#modalClose').click(closeModal);
