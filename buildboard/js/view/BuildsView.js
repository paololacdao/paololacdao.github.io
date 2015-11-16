(function () {
	BB.namespace("view");
	
	var BuildsView = BB.view.BuildsView = Backbone.View.extend({
	    /**
	     * Path to the template for the view
	     *
	     * @method template_source
	     */
		template_source: "template/buildrecord.template",
		
	    /**
	     * List of events and event handlers for the view
	     *
	     * @object events
	     */
		events : {
			"click .record_row" : "_showDetailRow",
			"click .detailed_record_row1" : "_hideDetailRow"
		},
		
	    /**
	     * Initializes the view by fetching the template
	     *
	     * @method _initAutoRefresh
	     */
		initialize: function () {
			this._fetchTemplate();
		},
		
	    /**
	     * Renders the view
	     *
	     * @method render
	     */
		render: function (){
			var o = this,
				data = this.model,
				content = "";
								
			_.each(data.models, function (record){
				item = record.attributes;
				
				// Attributes which are derived from data available in the model (view-related flags mostly)
				item.shortFlag = item.flag.split("-")[1];
				item.buildDownload = (item.buildFlag === "passed" || item.buildFlag === "failed") ? "" : "hidden"; 
				item.buildDownloadDisabled = (item.buildFlag === "passed" || item.buildFlag === "failed") ? "hidden" : ""; 
				item.buildRelease = (item.buildFlag === "passed") ? "" : "hidden"; 
				item.buildReleaseDisabled = (item.buildFlag === "passed") ? "hidden" : ""; 
				item.unitTestStatusDisabled = (item.unitTestFlag === "passed" || item.unitTestFlag === "failed") ? "" : "hidden";
				item.unitTestStatusPieDisabled = (item.unitTestFlag === "passed") ? "" : "hidden"; 
				item.unitTestStatusStatsDisabled = (item.unitTestFlag === "passed") ? "" : "hidden"; 
				item.unitTestStatusReasonDisabled = (item.unitTestFlag === "failed") ? "" : "hidden"; 
				item.functionalTestStatusDisabled = (item.functionalTestFlag === "passed" || item.functionalTestFlag === "failed") ? "" : "hidden";
				item.functionalTestStatusPieDisabled = (item.functionalTestFlag === "passed") ? "" : "hidden"; 
				item.functionalTestStatusReasonDisabled = (item.functionalTestFlag === "failed") ? "" : "hidden";
				item.functionalTestStatusStatsDisabled = (item.functionalTestFlag === "passed") ? "" : "hidden";
				item.middleCircleFlag = item.buildPercentDone === 100 ? item.unitTestFlag : "";
				item.rightCircleFlag = item.unitTestPercentDone === 100 ? item.functionalTestFlag : "";
				
				// Compile template
				var compiled = _.template(o.template);
				content += compiled(item);
			});
				
			this.$el.html(content);
			
			// Render all pie charts
			$('.pie:not(.hidden)').each(function(index, pie) {
				var p = pie.textContent.trim();
				pie.style.animationDelay = '-' + parseFloat(p) + 's';
			});
	    },
		
	    /**
	     * Fetches the template for the view through an Ajax request
	     *
	     * @method _fetchTemplate
	     * @private
	     */
		_fetchTemplate: function () {
			var o = this,
				conf = {
					url: this.template_source,
					success: $.proxy(o._afterFetchTemplate, o),
					complete: function () {},
					error: function () {
						console.error("Failed to fetch template");
					}
				};
			
			$.ajax(conf);
		},
		
	    /**
	     * Callback performed after fetching the template; parses HTML from template
	     *
	     * @method _afterFetchTemplate
	     * @private
	     */
		_afterFetchTemplate: function (html) {
			this.template = $.parseHTML(html)[0].innerHTML;
			
			this.render();
		},
		
	    /**
	     * Displays additional details for the record when clicked by the user
	     *
	     * @method _showDetailRow
	     * @private
	     */
		_showDetailRow: function (event) {
			var el = $(event.srcElement || event.target);
			
			// Look for any shown detailed rows, hide them and show that row's parent
			$(".detailed_record_row:not(.hidden)").prev().removeClass("hidden");
			$(".detailed_record_row").addClass("hidden");
			
			// Show the details row version
			if (el.hasClass("record_row")) {
				el.addClass("hidden");
				el.next().removeClass("hidden");
			} else {
				el.parents(".record_row").addClass("hidden");
				el.parents(".record_row").next().removeClass("hidden");
			}
		},
		
	    /**
	     * Hides the detail row for the record when clicked by the user
	     *
	     * @method _hideDetailRow
	     * @private
	     */
		_hideDetailRow: function (event) {
			var el = $(event.srcElement || event.target);
			
			// Hide detail row
			el.parents(".detailed_record_row").addClass("hidden");
			el.parents(".detailed_record_row").prev().removeClass("hidden");
		}
	});
})();