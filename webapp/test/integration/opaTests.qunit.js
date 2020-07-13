/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zcrud/zcrud/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});