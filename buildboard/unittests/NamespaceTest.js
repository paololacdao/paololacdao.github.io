(function() {
    module("NameSpace Test", {
        setup: function() {

        },
        teardown: function() {

        }
    });
	test("BB.namespace test", function () {
		equal(BB.namespace("test"), BB.test, "BB.namespace('test')");
		equal(BB.namespace("BB.view"), BB.view, "BB.namespace('BB.view')");
		equal(BB.namespace("BB.view.panel"), BB.view.panel, "BB.namespace('BB.view.panel')");		
	});
})();