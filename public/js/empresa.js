const formElem = document.getElementById("newEmpresaModal");

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

formElem.addEventListener("submit", (ev) => {
	ev.preventDefault();
	const result = {};

	const params = {
		nome: document.getElementById("nome").value,
		latitude: document.getElementById("latitude").value,
		longitude: document.getElementById("longitude").value,
		empresaindicadora: document.getElementById("empresaindicadora").value,
	};

	const validate = validateForm(params);
	if (!validate.valid) {
		alert(validate.msg);
		return;
	} else {
		Http.open("POST", url);
		Http.setRequestHeader("Content-type", "application/json");
		Http.onreadystatechange = (e) => {
			if (Http.status !== result.status) {
				result.status = Http.status;
			}
			if (Http.response !== result.response) {
				result.response = Http.response;
				alert(JSON.parse(Http.response).message ?? Http.response);
			}
			if (Http.status === 200) {
				location.reload();
			}
		};
	}
});
