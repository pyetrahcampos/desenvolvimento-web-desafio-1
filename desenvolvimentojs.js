let form = document.getElementById("myForm"),
    placa = document.getElementById("placa"),
    proprietario = document.getElementById("proprietario"),
    bloco = document.getElementById("bloco"),
    modelo = document.getElementById("modelo"),
    vaga = document.getElementById("vaga"),
    cor = document.getElementById("cor"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('estacionamento') ? JSON.parse(localStorage.getItem('estacionamento')) : [];
let isEdit = false, editId;


newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = "Enviar";
    modalTitle.innerText = "Preencha o formulário";
    isEdit = false;
    form.reset();
});


function showInfo() {
    userInfo.innerHTML = "";
    getData.forEach((element, index) => {
        let createElement = `
        <tr>
            <td>${index + 1}</td>
            <td>${element.placa}</td>
            <td>${element.proprietario}</td>
            <td>${element.bloco}</td>
            <td>${element.modelo}</td>
            <td>${element.vaga}</td>
            <td>${element.cor}</td>
            <td>
                <button onclick="editInfo(${index})" class="btn btn-warning btn-sm">Editar</button>
                <button onclick="deleteInfo(${index})" class="btn btn-danger btn-sm">Excluir</button>
            </td>
        </tr>`;
        userInfo.innerHTML += createElement;
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        placa: placa.value,
        proprietario: proprietario.value,
        bloco: bloco.value,
        modelo: modelo.value,
        vaga: vaga.value,
        cor: cor.value
    };

  
    const vagaOcupada = getData.some((item, index) => {
        return item.vaga === information.vaga && (!isEdit || index !== editId);
    });

    if (vagaOcupada) {
        alert("Essa vaga já está ocupada. Escolha outra.");
        return;
    }

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
        isEdit = false;
    }

    localStorage.setItem("estacionamento", JSON.stringify(getData));
    showInfo();
    form.reset();
    modal.style.display = "none";

    let backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
});



function editInfo(index) {
    isEdit = true;
    editId = index;

    const data = getData[index];

    placa.value = data.placa;
    proprietario.value = data.proprietario;
    bloco.value = data.bloco;
    modelo.value = data.modelo;
    vaga.value = data.vaga;
    cor.value = data.cor;

    submitBtn.innerText = "Atualizar";
    modalTitle.innerText = "Editar Registro";
    modal.style.display = "block";
}


function deleteInfo(index) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        getData.splice(index, 1);
        localStorage.setItem("estacionamento", JSON.stringify(getData));
        showInfo();
    }
}


showInfo();



