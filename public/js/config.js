const Http = new XMLHttpRequest();
const url = "/empresa";

function generateMap() {
	var map = L.map("map", {
		minZoom: 0,
		maxZoom: 19,
	});

	var cartodbAttribution =
		'&copy; <a href="https://github.com/DavidDev998">DavidDev998</a>';

	var positron = L.tileLayer(
		"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
		{
			attribution: cartodbAttribution,
		},
	).addTo(map);

	return map;
}
var map = generateMap();
map.setView([0, 0], 2);
