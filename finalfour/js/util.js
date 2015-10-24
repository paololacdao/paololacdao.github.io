/**
 * Renders the win-loss table, given a set of team data
 *
 * @function renderWinLossTable
 */
function renderWinLossTable () {
	var winLossTable = $("#winLoss-table > tbody > tr"),
		cellTeamName, cellWins, cellLoss;

	// Clear all non-header table cells
	$.each(winLossTable.find("td"), function (index, item) {
		$(item).html("");
	});

	// Sort the data set to make sure it is updated
	sortTeamData("win");

	// Populate the table
	for (i=0; i < teamData.length; i++) {
		cellTeamName = $($(winLossTable.get(i)).find("td").get(0));
		cellWins = $($(winLossTable.get(i)).find("td").get(1));
		cellLoss = $($(winLossTable.get(i)).find("td").get(2));
		
		cellTeamName.html(teamData[i].name);
		cellWins.html(teamData[i].win);
		cellWins.prop("id", "wins-" + teamData[i].name);
		cellLoss.html(teamData[i].loss);
		cellLoss.prop("id", "loss-" + teamData[i].name);
	}
}

/**
 * Processes a scenario selected by the user. In detail the function performs:
 * 1. Updates the win-loss table
 * 2. Disables the buttons for the particular game and highlights the game winner's button
 * 3. Displays any automatic outcomes
 * 4. Performs final processing when all scenarios have been played out
 * 
 * @param  {String} gameId
 * @param  {String} winner
 * @param  {String} loser
 */
function processGame (gameId, winner, loser) {
	var winnerIdx = 0,
		loserIdx = 0;

	// Disable game's buttons and add indicator for winner's button
	$("#" + gameId + " > button").removeClass("btn-default").prop("disabled", "disabled");
	$("#" + gameId + " > button#" + gameId + "-" + winner + "_" + loser).addClass("btn-success");

	// Add wins ans losses to the win-loss table, then re-render
	winnerIdx = $.map(teamData, function(obj, index) {
					if(obj.name == winner) {
						return index;
					}
				});
	loserIdx = 	$.map(teamData, function(obj, index) {
					if(obj.name == loser) {
						return index;
					}
				});
	if (winnerIdx.length) teamData[winnerIdx].win++;
	if (loserIdx.length) teamData[loserIdx].loss++;
	renderWinLossTable();

	// Do outcome processing
	processOutcome();
}

/**
 * Determines outcomes based on the win-loss record and displays them on the page
 *
 * @method processOutcome
 */
function processOutcome () {
	var length = teamData.length;

	// First place outcome
	if (teamData[0].win + teamData[0].loss == 14 && teamData[1].win + teamData[1].loss == 14 && teamData[2].win + teamData[2].loss == 14 && teamData[0].win > teamData[1].win) {
		$("#outcome-firstplace_" + teamData[0].name).removeClass("hidden");
	}

	// First place tie outcome
	if (teamData[0].win + teamData[0].loss == 14 && teamData[1].win + teamData[1].loss == 14 && teamData[0].win == teamData[1].win) {
		if (teamData[0].name == "ADMU" || teamData[1].name == "ADMU") {
			$("#outcome-firstplacetie_ADMU").removeClass("hidden");
		} else {
			$("#outcome-firstplacetie_FEU").removeClass("hidden");
		}
	}

	// Second place tie outcome, two teams
	if (teamData[1].win + teamData[1].loss == 14 && teamData[2].win + teamData[2].loss == 14 && teamData[3].win + teamData[3].loss == 14 && teamData[1].win == teamData[2].win && teamData[2].win > teamData[3].win) {
		$("#outcome-secondplacetie1").removeClass("hidden");
		$("#secondplacetie1-team1").html(teamData[1].name);
		$("#secondplacetie1-team2").html(teamData[2].name);
	}

	// Second place tie outcome, three teams
	if (teamData[1].win + teamData[1].loss == 14 && teamData[2].win + teamData[2].loss == 14 && teamData[3].win + teamData[3].loss == 14 && teamData[1].win == teamData[2].win && teamData[2].win == teamData[3].win) {
		if (teamData[0].name == "FEU") {
			$("#outcome-secondplacetie2_FEU").removeClass("hidden");
		} else {
			$("#outcome-secondplacetie2_ADMU").removeClass("hidden");
		}
	}

	// Last place tie outcome
	if (teamData[length-1].win + teamData[length-1].loss == 14 && teamData[length-2].win + teamData[length-2].loss == 14 && teamData[length-1].win == teamData[length-2].win) {
		$("#outcome-lastplacetie").removeClass("hidden");
		$("#lastplacetie-team1").html(teamData[length-1].name);
		$("#lastplacetie-team2").html(teamData[length-2].name);
	}

	// Last place outcome
	if (teamData[length-1].win + teamData[length-1].loss == 14 && teamData[length-2].win + teamData[length-2].loss == 14 && teamData[length-1].win < teamData[length-2].win) {
		$("#outcome-lastplace_" + teamData[length-1].name).removeClass("hidden");
	}
}

/**
 * Clears all selections and resets the win-loss table
 * @method performReset
 */
function performReset () {
	teamData = [];
	teamData = $.extend(true, [], teamDataOriginal);
	renderWinLossTable();
	$("button").prop("disabled", false).removeClass("btn-success").addClass("btn-default");
}