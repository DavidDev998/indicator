function generateMaker(item) {
	var marker = L.marker([item.latitude, item.longitude], {
		title: item.nome,
		riseOnHover: true,
	}).addTo(map);
	marker.bindPopup(
		`<b>${
			item.nome
		}</b><button type="button" class="btn btn-danger delete-empresa-btn" onclick="deleteEmpresa(${
			item.id
		})"><i class="bi bi-trash Inline text"></i></button>
		<button type="button" class="btn btn-warning edit-empresa-btn" data-bs-toggle="modal" data-bs-target="#createModal" onclick="editEmpresa(${
			item.id
		})"><i class="bi bi-pencil"></i></button><br>${
			item.indicacoes * 10
		} pontos.`,
	);
	return marker;
}

function generateLine(item) {
	var line = L.polyline([
		[item.empresaIndicadora.latitude, item.empresaIndicadora.longitude],
		[item.empresaIndicada.latitude, item.empresaIndicada.longitude],
	]).addTo(map);
	line.bindPopup(
		`${item.empresaIndicadora.nome} indicou ${item.empresaIndicada.nome}`,
	);
}
