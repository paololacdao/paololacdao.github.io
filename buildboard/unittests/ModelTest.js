(function() {
    module("Model Test", {
        setup: function() {

        },
        teardown: function() {

        }
    });
	test("BB.model.Builds test", function () {
		var c = new BB.model.Builds();
		equal(typeof c, "object", "BB.model.Builds creation test");
		
		c.set([{ id: "000001", owner: "testOwner" }, { id: "000002", owner: "jTuck" }]);
		
		equal(c.models[0].get("id"), "000001", "BB.models.builds fetch test - Record ID");
		equal(c.models[1].get("owner"), "jTuck", "BB.models.builds fetch test - Owner");
	});
})();