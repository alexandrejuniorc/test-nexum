// abrir e fechar modal
const openModal = () => $('#modal').addClass('active');

// fechar modal quando apertar no botão X
const closeModal = () => {
  $('#modal').removeClass('active');
  clearFields();
};

/* const tempClient = {
  nome: 'nicolas',
  cpf: '123.456.789-10',
  email: 'ana@ana.com',
  cidade: 'São Paulo',
  uf: 'MG',
}; */

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
  /*   return document.getElementById('form').reportValidity(); 
  CORRIGIR NO FINAL
  */
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
    updateTable();
    closeModal();
  }
};
saveClient();

const createRow = (client) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td>${client.nome}</td>
  <td>${client.cpfOuCnpj}</td>
  <td>${client.email}</td>
  <td>${client.cidade}</td>
  <td>${client.uf}</td>
  <td>
    <button type="button" class="button green">editar</button>
    <button type="button" class="button red">excluir</button>
  </td>`;

  document.querySelector('#tableClient>tbody').appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr');
  // apaga a própria linha
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};
updateTable();

// eventos
$('#cadastrarCliente').click(openModal);
$('#modalClose').click(closeModal);
$('#salvar').click(saveClient);
