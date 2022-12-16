function generateMaker(item) {
	var marker = L.marker([item.latitude, item.longitude], {
		title: item.nome,
		riseOnHover: true,
	}).addTo(map);
	marker.bindPopup(`<b>${item.nome}</b><br>${item.indicacoes * 10} pontos.`);
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
