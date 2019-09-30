// CORE VIEW MODEL - SINGLE PAGE APPLICATIONS SHOULD ONLY INCLUDE TEMPLATES AND COMPONENTS WITIN THIS AND ONLY THIS VIEW MODEL
// DEFINE DEPENDENCIES
/*global define, console*/
define(['jquery', 'knockout', 'router'], function ($, ko, router) {
	"use strict";

	// REGISTER KNOCKOUT COMPONENTS AS AMD MODULES
	/* example */
	/*
	ko.components.register('component_name', { require: 'component_path/componentjsfilename' });
	*/

	ko.components.register('template',	{ require: 'components/template/template' });
	// COMPONENTS AS NAVIGATION
	// COMPONENTS AS UTILITY
	// COMPONENTS AS WIDGETS

	/**************************************************************************************************/

	// COMPONENTS AS REGISTERED PAGES ONLY
	/* example */
	/*
		ko.components.register('template_name', { template: { require: 'text!component_path/componentjsfilename' } });
	*/

	/**************************************************************************************************/

	// COMPONENTS AS PAGE INCLUDES - THESE ARE TREATED DIFFERENTLY - URLS SHOULD NOT BE LINKED TO DIRECTLY - EACH INCLUDE BELONGS TO A PARENT
	/* example */
	/*
		ko.components.register('template_name', { template: { require: 'text!component_path/componentjsfilename' } });
	*/

	/**************************************************************************************************/

	// START THE APPLICATION
	ko.applyBindings({ route: router.activeRoute });

});
