(function() {
    module("View Test", {
        setup: function() {

        },
        teardown: function() {

        }
    });
	test("BB.model.Builds test", function () {
		var c = new BB.view.BuildsView({
			// Some mock data
			model: [{ id: "000001", owner: "testOwner" }, { id: "000002", owner: "jTuck" }]
		});
		equal(typeof c, "object", "BB.view.BuildsView creation test");
		equal(typeof c.render, "function", "BB.view.BuildsView creation test - render function check");
		equal(typeof c._showDetailRow, "function", "BB.view.BuildsView creation test - _showDetailRow function check");
		equal(typeof c._hideDetailRow, "function", "BB.view.BuildsView creation test - _hideDetailRow function check");
	});
})();