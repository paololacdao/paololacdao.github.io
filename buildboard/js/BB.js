/** Global namespace **/
if (typeof BB === "undefined") {
	BB = {};
}

/**
 * This utility method is used to safely create a namespace (if it doesn't 
 * already exist).
 * 
 * @method namespace
 * @param {string} ns The namespace to create
 * @returns {object} Reference to the namespace object created
 */
BB.namespace = function (ns) {
	var o = this,
		tokens = [], 
		i = 0;
	
	if (ns.indexOf(".") > -1) {
		tokens = ns.split(".");
		for (i = (tokens[0] === "BB") ? 1 : 0; i < tokens.length; i++) {
			o[tokens[i]] = o[tokens[i]] || {};
			o = o[tokens[i]];
		} 
	} else {
		o[ns] = o[ns] || {};
		o = o[ns];
	}
	
	return o;
};

BB.namespace("views");
BB.namespace("models");