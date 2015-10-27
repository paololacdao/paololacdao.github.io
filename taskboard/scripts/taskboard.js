(function () {
	var app = angular.module("taskboard", ["dndLists"]);
	
	app.controller("TaskboardController", function ($scope) {
		$scope.cards = {
			backlog : [],
			inProgress : [],
			done : [],
			trashed : []
		};
		
		if (typeof(Storage) !== "undefined") {
			if (localStorage && localStorage.getItem("cards")) {
				$scope.cards = JSON.parse(localStorage.getItem("cards"));
			}
		}
			
		function card (){
			this.title = "Story #1";
			this.background = "white";
		}
		
		$scope.getBgColorClass = function (color) {
			switch (color) {
				case 'blue' : 
					return 'bg-primary';
					break;
				case 'red' :
					return 'bg-danger';
					break;
				case 'green' : 
					return 'bg-success';
					break;
				case 'yellow' :
					return 'bg-warning';
					break;
				default :
					return '';
			}
		}

		$scope.addCard = function () {
			newCard = new card();
			$scope.cards.backlog.push(newCard);
			$scope._updateLocalStorage();
		};
		
		$scope.updateCard = function (index, cardType) {
			$scope.cards[cardType][index].title = $("#card-title-" + cardType + "-" + index).val();
			$scope.cards[cardType][index].background = $("#card-bg-selector-" + cardType + "-" + index).val();
			
			$scope._updateLocalStorage();
		};
		
		$scope.deleteCard = function (index, cardType) {
			$scope.cards.trashed.push($scope.cards[cardType][index]);
			$scope.cards[cardType].splice(index,1);
			
			$scope._updateLocalStorage();
		};
		
		$scope.purgeCard = function (index) {
			$scope.cards.trashed.splice(index,1);
			
			if ($scope.cards.trashed.length === 0) {
				$("#trash").collapse("hide");
			}
			
			$scope._updateLocalStorage();
		};
		
		$scope.restoreCard = function (index) {
			$scope.cards.backlog.push($scope.cards.trashed[index]);
			$scope.cards.trashed.splice(index,1);
			
			if ($scope.cards.trashed.length == 0) {
				$("#trash").collapse("hide");
			}
			
			$scope._updateLocalStorage();
		};
		
		$scope.deleteAllCards = function () {
			angular.forEach($scope.cards.backlog, function (item){
				$scope.cards.trashed.push(item);
			});
			
			angular.forEach($scope.cards.inProgress, function (item){
				$scope.cards.trashed.push(item);
			});
			
			angular.forEach($scope.cards.done, function (item){
				$scope.cards.trashed.push(item);
			});
			
			$scope.cards.backlog = [];
			$scope.cards.inProgress = [];
			$scope.cards.done = [];
			
			$scope._updateLocalStorage();
			$("#confirmDeleteAllModal").modal("hide");
		};
		
		$scope.emptyTrash = function () {
			$scope.cards.trashed = [];
			
			$scope._updateLocalStorage();
			$("#trash").collapse("hide");
		};
		
		$scope._updateLocalStorage = function () {
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("cards",JSON.stringify($scope.cards));
			}
		};
		
		$scope.postDrag = function (index, type) {
			$scope.cards[type].splice(index,1);
			$scope._updateLocalStorage();
		};
	});
	
	/*** Event handlers ***/
	
	// Show how-to modal
	$("#aboutAppModal").modal("show");
	
	// Display any existing cards
	$(".card-contents").show();
	
	app.directive("cardDirective", function () {
		return function ($scope, element, attrs) {
	    angular.element(element).hover(
				function () {
	    		$(this).find('.controls').show();
		    },
				function () {
					$(this).find('.controls').hide();
				}
			);
	  };
	});
})();