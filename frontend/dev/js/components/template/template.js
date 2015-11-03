/*global define, console*/
define(["knockout", "text!./template.html"], function (ko, templateHTML) {
	"use strict";

	// DEFINE VIEW MODEL
	var TemplateViewModel = function (params) {
		this.params			= ko.observable(params);
		this.componentID	= ko.observable('component-page-' + params.page);
	};

	// ADD ACTION FUNCTIONALITY TO THE INTERFACE / VIEWMODEL

	//  TemplateViewModel.prototype.doSomething = function() {
	//    this.message('You invoked doSomething() on the viewmodel.');
	//  };

	// EXTEND FUNCTIONS ON THE VIEW MODEL AFTER INTITIALIZATION

	//	TemplateViewModel.prototype.extend({
	//		someFunction: function () {
	//			...do some actions here
	//		}
	//	});

    //  HOUSEKEEPING DISPOSE AND CLEANUP

    //	TemplateViewModel.prototype.dispose = function () { };

	return { viewModel: TemplateViewModel, template: templateHTML };

});
