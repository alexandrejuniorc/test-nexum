// abrir e fechar modal
const openModal = () => $('#modal').addClass('active');

// fechar modal quando apertar no botão X
const closeModal = () => {
  $('#modal').removeClass('active');
  clearFields();
};

const getLocalStorage = () =>
  // transforma oque foi pego do localStorage em string para objeto
  JSON.parse(localStorage.getItem('db_client')) ?? [];

const setLocalStorage = (dbClient) =>
  // manda o item pro localStorage como string
  localStorage.setItem('db_client', JSON.stringify(dbClient));

// CRUD - create read update delete

const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  // adiciona item(acrescente +1) a chave criada
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById('form').reportValidity();
};

// interação com o layout

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach((field) => (field.value = ''));
  document.getElementById('nome').dataset.index = 'new';
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

    const index = document.getElementById('nome').dataset.index;

    if (index == 'new') {
      createClient(client);
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
};

const createRow = (client, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td>${client.nome}</td>
  <td>${client.cpfOuCnpj}</td>
  <td>${client.email}</td>
  <td>${client.cidade}</td>
  <td>${client.uf}</td>
  <td>
    <button type="button" class="button green" id='edit-${index}'>Editar</button>
    <button type="button" class="button red" id='delete-${index}'>Excluir</button>
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

const fillFields = (client) => {
  document.getElementById('nome').value = client.nome;
  document.getElementById('cpfOuCnpj').value = client.cpfOuCnpj;
  document.getElementById('email').value = client.email;
  document.getElementById('cidade').value = client.cidade;
  document.getElementById('uf').value = client.uf;
  document.getElementById('nome').dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
  openModal();

  console.log(client);
};

const editDelete = (e) => {
  if (e.target.type === 'button') {
    const [action, index] = e.target.id.split('-');

    if (action === 'edit') {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(
        `Deseja realmente excluir o cliente ${client.nome}`,
      );
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

// eventos
$('#cadastrarCliente').click(openModal);
$('#modalClose, #cancelar').click(closeModal);
$('#salvar').click(saveClient);
$('#tableClient>tbody').click(editDelete);

// máscaras
var options = {
  onKeyPress: function (cpf, op) {
    var masks = ['000.000.000-000', '00.000.000/0000-00'];
    $('#cpfOuCnpj').mask(cpf.length > 14 ? masks[1] : masks[0], op);
  },
};
$('#cpfOuCnpj').length > 11
  ? $('#cpfOuCnpj').mask('00.000.000/0000-00', options)
  : $('#cpfOuCnpj').mask('000.000.000-00#', options);
