function isLatitude(lat) {
	return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
	return isFinite(lng) && Math.abs(lng) <= 180;
}
