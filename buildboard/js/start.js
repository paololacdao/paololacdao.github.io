$(document).ready(function () {
	// Create the model and fetch data
	BB.models.builds = new BB.model.Builds();
	BB.models.builds.fetch();
	
	// Create the view
	BB.views.buildsView = new BB.view.BuildsView({
		el: "#build_records_container",
		model: BB.models.builds
	});
})