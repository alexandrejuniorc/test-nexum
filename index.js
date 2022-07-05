// abrir e fechar modal
const openModal = () => $('#modal').addClass('active');

// fechar modal quando apertar no botão X
const closeModal = () => {
  $('#modal').removeClass('active');
  clearFields();
};

const tempClient = {
  nome: 'nicolas',
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

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById('form').reportValidity();
};

// interação com o layout
const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach((field) => (field.value = ''));
};

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('nome').value,
      cpfOuCnpj: document.getElementById('cpfOuCnpj').value,
      email: document.getElementById('email').value,
      cidade: document.getElementById('cidade').value,
      uf: document.getElementById('uf').value,
    };
    createClient(client);
    clearFields();
    closeModal();
  }
};
saveClient();

// eventos
$('#cadastrarCliente').click(openModal);
$('#modalClose').click(closeModal);
$('#salvar').click(saveClient);
