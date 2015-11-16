(function () {
	BB.namespace("model");
	
	var Builds = BB.model.Builds = Backbone.Collection.extend({
	    /**
	     * Path to the JSON data set
	     *
	     * @object url
	     */
		url : "json/changelist.json",
		
	    /**
	     * Performs post-processing following a data fetch
	     *
	     * @method parse
	     */
		parse: function (data) {
			return data.builds;
		}
	});
})();