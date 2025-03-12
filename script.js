let personajes = [];

function cargarPersonajes() {
    fetch("/api/personajes")
        .then(response => response.json())
        .then(data => {
            personajes = data;
            actualizarFiltros();
            mostrarTabla(personajes);
            document.getElementById("tabla").style.display = "table";
        })
        .catch(error => console.error("Error al cargar los  datos:", error));
}

function mostrarTabla(datos) {
    const tablaBody = document.getElementById("tablabody");
    tablaBody.innerHTML = "";

    datos.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.homeworld}</td>
            <td>${item.species}</td>
        `;
        tablaBody.appendChild(row);
    });
}

function actualizarFiltros() {
    const planetas = [...new Set(personajes.map(p => p.homeworld))];
    const especies = [...new Set(personajes.map(p => p.species))];

    const filtroPlaneta = document.getElementById("filtro por planeta");
    const filtroEspecie = document.getElementById("filtro por especie");

    filtroPlaneta.innerHTML = '<option value="">Todos</option>' + planetas.map(p => `<option value="${p}">${p}</option>`).join("");
    filtroEspecie.innerHTML = '<option value="">Todos</option>' + especies.map(e => `<option value="${e}">${e}</option>`).join("");
}

function filtrarTabla() {
    const filtroPlaneta = document.getElementById("filtro por planeta").value;
    const filtroEspecie = document.getElementById("filtro por especie").value;

    const filtrados = personajes.filter(p =>
        (filtroPlaneta === "" || p.homeworld === filtroPlaneta) &&
        (filtroEspecie === "" || p.species === filtroEspecie)
    );

    mostrarTabla(filtrados);
}
