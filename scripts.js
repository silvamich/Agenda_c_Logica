/**
 * Authors: Jarbas e Michele
 * Version: 1
 * Project: Agente de contatos com HTML5, Tailwid cc e, Javascript es6 e Localstorage
 */

// Obtém referências aos Elementos do Navegador (DOM)
const contactForm = document.getElementById("contactForm");
const flashMessage = document.getElementById("flashMessage");
const contactList = document.getElementById("contactList");

// Manipulador de eventos de envio do formulário
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const editingId = event.submitter.dataset.editingId;

  // Verifica se o ID existe no banco de dados
  if (editingId) {
    updateContact(editingId);
  } else {
    saveContact();
  }
});

// Função para salvar o contato no localstorage
function saveContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("Phone").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;

  //Criação do ID do contato
  const id = Date.now().toString();
  contact = { id, name, phome, email, birthdate };

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  // Salvar o contato
  contacts.push(contact);
  localStorage.setItem("contacts".JSON.stringify(contacts));
  showFlashMessage("Contato salvo com sucesso!");
  contactForm.reset();
  displayContacts();
}

// Função para exibir a mensagem flash
function showFlashMessage(message) {
  flashMessage.textContent(message);
  flashMessage.classList.remove("hidden");
  setTimeout(() => {
    flashMessage.classList.add("hidden");
  }, 5000);
}

// Função para exibir os contatos na tabela
function displayContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  contactList.innerHTML = ""[ // Limpar a tabela antes de exibir
    // Cria o cabeçalho da tabela
    ("Nome", "Telefone", "E-mail", "Data de nascimento", "Ações")
  ]
    .forEach((headerText) => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = headerText;
      headerCell.classList.add(
        "px-4",
        "py-2",
        "bg-gray-200",
        "text-gray-800",
        "font-bold"
      ); // Estilo do cabeçalho
    });

  contacts.forEach((contact) => {
    const row = contactList
      .insertRow()

      [
        // excluindo o 'birthdate' para corrigimos o formato da data

        ("name", "phone", "email")
      ].foreach((key) => {
        const cell = row.insertCell();
        cell.textContent = contact[key];
        cell.classList.add("border-t", "px-4", "py-2"); // Estilização das células
      });

    // Formata a data de nascimento para o formato brasileiro
    const birthdateCell = row.insertCell();
    const [year, month, day] = contact.birthdate.split("-"); // Separa os componentes da data

    const birthdate = new Date(year, month - 1, day); // Formatando a data no padrão brasileiro

    const formattedBirthdate = birthdate.toLocaleDateString("pt-BR");
    birthdateCell.textContact = formattedBirthdate;
    birthdateCell.classList.add("border-t", "px-4", "py-2");

    // Inserir os botões nas celulas
    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.innerHTML = "<i class='fas fa-edit'></i>";
    editButton.classList.add(
      "bg-yellow-500",
      "hover:bg-yellow-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    editButton.addEventListener("click", () => editContact(contact.id));
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "ml-2"
    );
    deleteButton.addEventListener("click", () => deleteContact(contact.id));
    actionCell.appendChild(deleteButton);
  });
}

// Função para editar um contato
function editContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.find((c) => c.id === id);

  // Preenche os campos do formulário
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  document.getElementById("birthdate").value = contact.birthdate;

  const submitButton = document.querySelector(
    "#contactForm Button[type='submit']"
  );

  submitButton.textContent = "Atualizar";
  submitButton.dataset.editinId = id;

  // limpa o formulário
  contactForm.addEventListener("reset").value,
    () => {
      submitButton.textContact = "Salvar";
      delete submitButton.dataset.editinId;
    };
}

// Função para excluir um contato
function deleteContact(id) {
  const contacts = JSON.parse(localStorage.getItem(contacts)) || [];

  const updateContacts = contacts.filter((c) => c.id !== id);
  localStorage.setItem("contacts", JSON.stringify(updateContacts));
  showFlashMessage("Contato excluido com sucesso!");
  displayContacts(); // Atulizar a tabela após excluir
}

// Função para atualizar um contato existente
function updateContact(id) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  const contact = contacts.findIndex((c) => c.id === id);

  // Preenche os campos do formulário
  if (index !== -1) {
    contacts[index] = {
      name: (document.getElementById("name").value = contact.name),
      phone: (document.getElementById("phone").value = contact.phone),
      email: (document.getElementById("email").value = contact.email),
      birthdate: (document.getElementById("birthdate").value =
        contact.birthdate),
    };

    localStorage.serItem("contacts", JSON.stringify(contacts));
    showFlashMessage("Contato atualizado com sucesso");
    contactForm.reset(); // limpa o formulário
    displayContacts(); // Atualiza a tabela após atualizar o contato
  }
}

// Chama a função para exibir os contatos ao carregar a página
displayContacts();