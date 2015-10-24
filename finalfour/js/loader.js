$(document).ready(function () {
	// Populate the win-loss table with values from the data set
	renderWinLossTable();

	// Register event handlers
	$("button").on("click", function (e) {
		// Get the id of the button that was clicked, game ID, and winning team
		var id = e.target.id,
			delimiterGameIdx = id.indexOf("-"),
			delimiterWinnerIdx = id.indexOf("_"),
			gameId = id.substr(0, delimiterGameIdx),
			winningTeam = id.substring(delimiterGameIdx + 1, delimiterWinnerIdx),
			losingTeam = id.substr(delimiterWinnerIdx + 1);

		if (id === "reset") {
			performReset();
		} else {
			processGame(gameId, winningTeam, losingTeam);	
		}
	});
});