"use strict;"

require.config({
	baseUrl: "/js",
	paths: {
	}
});

require([ "app" ], function() {
	var App = require("app");

	App.initialize();

	console.log("async complete");
});
