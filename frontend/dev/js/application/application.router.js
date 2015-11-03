// ROUTER - NAVIGATION SCRIPT TO LISTEN FOR URL CHANGES AND ENABLE HASHTAGS
/*global define, console*/
define(['knockout', 'crossroads', 'hasher'], function (ko, crossroads, hasher) {
	'use strict';

	// DEFINE FUNCTION TO START LISTENING AND ROUTE NAVIGATION
	function activateCrossroads() {

		// HASH TAG PROCESSES
		function parseHash(newHash, oldHash) { crossroads.parse(newHash); }

		// NORMALIZE PARAMETERS BEFORE THEY ARE PASSED
		crossroads.normalizeFn	= crossroads.NORM_AS_OBJECT;

		// HASHER SETTINGS BEFORE AND AFTER INITIALIZATION
		hasher.initialized.add(parseHash);
		hasher.changed.add(parseHash);
		hasher.init();
	}

		// VIEW MODEL - ROUTER - CONFIGURATION SETTINGS
	var Router			= function (config) {

			// OBSERVABLES
			var activeRoute = this.activeRoute = ko.observable();

			// LOAD ROUTES INTO CROSSROADS AND OBSERVABLE
			ko.utils.arrayForEach(config.routes, function (route) {
				crossroads.addRoute(route.url, function (requestParams) {
					activeRoute(ko.utils.extend(requestParams, route.params));
				});
			});

			// START ROUTER
			activateCrossroads();
		},

		// SET HOSTNAME FOR ABSOLUTE PATH WHEN NEEDED
		www	= window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port + '/' : '/');


	// DEFINE ROUTES
	return new Router({
		routes: [
			{ url: '',			params: { page: 'template' } },
			{ url: 'index',		params: { page: 'template' } }
		]
	});
});
