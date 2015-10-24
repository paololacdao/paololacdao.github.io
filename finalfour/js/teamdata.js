/**
 * Array containing the data set used in the application
 * @type {Array}
 */
var teamData = [
					{	
						"name" : "ADMU",
						"win" : 10,
						"loss" : 3
					},

					{
						"name" : "DLSU",
						"win" : 9,
						"loss" : 3
					},

					{
						"name" : "FEU",
						"win" : 10,
						"loss" : 3
					},

					{
						"name" : "NU",
						"win" : 8,
						"loss" : 4
					},

					{	
						"name" : "UE",
						"win" : 7,
						"loss" : 5
					}
				],
	// Deep copy of teamData for resetting purposes
	teamDataOriginal = $.extend(true, [], teamData);

/**
 * Sorts the teamData array
 *
 * @function sortTeamData
 * @param {String} prop The property which will the data set will be sorted on
 * @param {Boolean} asc Determines whether data should be sorted in ascending manner
 */
function sortTeamData(prop, asc) {
	teamData = teamData.sort(function(a, b) {
		if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
		else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
	});
}