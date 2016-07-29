//	SETUP CONFIGURATIONS FOR REQUIRE.JS WHICH WILL BE LOOKING FOR GLOBAL VARIABLE NAMED REQUIRE
var require = {

	baseUrl	: './js/',

	paths		: {
		'jquery'				: 'modules/jquery/jquery',
		'velocity'              : 'modules/velocity/velocity',
		'velocity.ui'			: 'modules/velocity/velocity.ui',
		'knockout'				: 'modules/knockout/knockout',
		'projections'			: 'modules/knockout/knockout.projections',
		'crossroads'			: 'modules/crossroads/crossroads',
		'hasher'				: 'modules/hasher/hasher',
		'signals'				: 'modules/signals/signals',
		'text'					: 'modules/require/text',
		'domready'				: 'modules/require/domReady',
		'router'				: 'application/application.router',
		'google.analytics'		: 'analytics/google.analytics'
	},

	shim			: {
		'jquery'		: {
			exports			: '$'
		},

		'google.analytics'	: {
			exports			: '__ga__'
		},

		'velocity'		: {
			deps			: ['jquery'],
			exports			: 'velocity'
		},

		'velocity.ui'	: {
			deps			: ['velocity']
		},

		'crossroads'	: {
			deps			: ['signals'],
			exports			: 'crossroads'
		},

		'hasher'		: {
			deps			: ['crossroads'],
			exports			: 'hasher'
		},

		'signals'		: {
			deps			: ['jquery'],
			exports			: 'signals'
		}
	}
};
