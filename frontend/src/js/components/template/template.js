/*global ga, define, console*/
/*jslint nomen: true */
define(["knockout", "text!./template.html", "google.analytics"], function (ko, templateHTML, __ga__) {
	"use strict";

	// DEFINE VIEW MODEL
	var TemplateViewModel = function (params) {
		this.params			= ko.observable(params);
		this.componentID	= ko.observable('component-page-' + params.page);
		this.pageview();
	};

	// ADD ACTION FUNCTIONALITY TO THE INTERFACE / VIEWMODEL
	//  TemplateViewModel.prototype.doSomething = function() {
	//    this.message('You invoked doSomething() on the viewmodel.');
	//  };

	// EXTEND FUNCTIONS ON THE VIEW MODEL AFTER INTITIALIZATION
	ko.utils.extend(TemplateViewModel.prototype, {

		// SEND PAGE VIEW TO GOOGLE
		pageview : function () {
			ga('create', 'UA-26957181-12', 'auto');
			ga('set', {
				page: 'index',
				title: 'Web Application Template'
			});
			return ga('send', 'pageview');
		}
	});

    //  HOUSEKEEPING DISPOSE AND CLEANUP
    //	TemplateViewModel.prototype.dispose = function () { };

	return { viewModel: TemplateViewModel, template: templateHTML };

});
/*jslint nomen: false */