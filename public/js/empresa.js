const formElem = document.getElementById("newEmpresaModal");
const modal = document.getElementById("createModal");
var updateId = "";

var nome = document.getElementById("nome");
var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");
var empresaindicadora = document.getElementById("empresaindicadora");

(function initializeEmpresasMap() {
	empresas.map((item, index) => {
		try {
			window["marker_" + item.id] = generateMaker(item);
		} catch {
			alert(
				`A empresa : "${item.nome}" está com a latitude ou longitude inválida`,
			);
		}
	});

	indicacoes.map((item, index) => {
		try {
			var empresaIndicada = empresas.find((i) => i.id === item.empresa);
			var empresaIndicadora = empresas.find(
				(i) => i.id === item.empresaindicadora,
			);
			window["polyline_" + item.id] = generateLine({
				empresaIndicada,
				empresaIndicadora,
			});
		} catch {
			alert(
				`A empresa : "${item.nome}" está com a latitude ou longitude inválida`,
			);
		}
	});
})();

function validateForm(params) {
	var valid = true;
	var msg = "";

	if (!params.nome) {
		valid = false;
		msg = "Nome da empresa é obrigatório";
	}

	if (!params.latitude || !isLatitude(params.latitude)) {
		valid = false;
		msg = "Latitude inserida é inválida";
	}

	if (!isLongitude(params.longitude)) {
		valid = false;
		msg = "Longitude inserida é inválida";
	}

	return { valid, msg };
}

function deleteEmpresa(id) {
	const result = {};
	if (id && confirm("Deseja mesmo excluir essa empresa?")) {
		Http.open("DELETE", url + `/${id}`);
		Http.setRequestHeader("Content-type", "application/json");
		Http.onreadystatechange = (e) => {
			if (Http.status === 200) {
				location.reload();
			}
		};
		Http.send();
	}
}

function editEmpresa(id) {
	var result = {};
	if (id) {
		Http.open("GET", url + `/${id}`);
		Http.setRequestHeader("Content-type", "application/json");
		Http.onreadystatechange = (e) => {
			if (Http.response) {
				console.log(result);
				result = JSON.parse(Http.response);
				updateId = result.id;
				nome.value = result.nome;
				latitude.value = result.latitude;
				longitude.value = result.longitude;
				empresaindicadora.value = result.empresaindicadora;

				empresaindicadora.disabled = true;
			}
		};
		Http.send();
	}
}

formElem.addEventListener("submit", (ev) => {
	ev.preventDefault();
	const result = {};

	const params = {
		nome: nome.value,
		latitude: latitude.value,
		longitude: longitude.value,
		empresaindicadora: empresaindicadora.value,
	};

	const validate = validateForm(params);
	if (!validate.valid) {
		alert(validate.msg);
		return;
	} else {
		if (updateId) {
			Http.open("PUT", url + `/${updateId}`);
			Http.setRequestHeader("Content-type", "application/json");
			Http.onreadystatechange = (e) => {
				if (Http.status !== result.status) {
					result.status = Http.status;
				}
				if (Http.response && Http.response !== result.response) {
					result.response = Http.response;
					alert(JSON.parse(Http.response).message);
				}
				if (Http.status === 200) {
					updateId = "";
					location.reload();
				}
			};
			Http.send(JSON.stringify(params));
		} else {
			Http.open("POST", url);
			Http.setRequestHeader("Content-type", "application/json");
			Http.onreadystatechange = (e) => {
				if (Http.status !== result.status) {
					result.status = Http.status;
				}
				if (Http.response && Http.response !== result.response) {
					result.response = Http.response;
					alert(JSON.parse(Http.response).message);
				}
				if (Http.status === 200) {
					updateId = "";
					location.reload();
				}
			};
			Http.send(JSON.stringify(params));
		}
	}
});

modal.addEventListener("hide.bs.modal", (ev) => {
	updateId = "";
	nome.value = "";
	latitude.value = "";
	longitude.value = "";
	empresaindicadora.value = "";
	empresaindicadora.disabled = false;
});
