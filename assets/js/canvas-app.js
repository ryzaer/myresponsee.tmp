document.addEventListener('DOMContentLoaded', function (event) {

	'use strict';

	// Initialise resize library
	var resize = new window.resize();
	resize.init();

	// Upload photo
	var upload = function (photo,id) {
		var formData = new FormData();
		formData.append(id, photo);
		var request = new XMLHttpRequest();
		request.open('POST', '../lib/file_skck');
		request.responseType = 'json';
		request.send(formData);
	};

	var fileSize = function (size) {
		var i = Math.floor(Math.log(size) / Math.log(1024));
		return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	};

	var arrID = ["foto","ktp","kk","akta","fpc","skk"];
	arrID.forEach(function(entry) {
		document.getElementById(entry).addEventListener('change', function (event) {
		event.preventDefault();
		var files = event.target.files;
		for (var i in files) {
				if (typeof files[i] !== 'object') return false;
				(function () {
					var initialSize = files[i].size;
					resize.photo(files[i], 1200, 'file', function (resizedFile) {					
						upload(resizedFile, entry );
					});
				}());
			}
		});	
	});

});
