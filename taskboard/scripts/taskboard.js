(function () {
	var app = angular.module("taskboard", []);
	
	app.controller("TaskboardController", function ($scope) {
		$scope.cards = [];
		
		if (typeof(Storage) !== "undefined") {
			if (localStorage && localStorage.getItem("cards")) {
				$scope.cards = JSON.parse(localStorage.getItem("cards"));
			}
		}
		
		$scope.newCard = {
			title : "Story #1",
			background : "white",
			status : "backlog"
		};

		$scope.addCard = function () {
			$scope.cards.push($scope.newCard);
			$scope._updateLocalStorage();
		};
		
		$scope.updateCard = function (index, cardType) {
			var realIndex = $scope.getRealIndex(index, cardType);
					
			$scope.cards[realIndex].title = $("#card-title-" + cardType + "-" + index).val();
			$scope.cards[realIndex].background = $("#card-bg-selector-" + cardType + "-" + index).val();
			
			$scope._updateLocalStorage();
		};
		
		$scope.deleteCard = function (index, cardType) {
			var realIndex = $scope.getRealIndex(index, cardType);
			$scope.cards[realIndex].status = "trashed";
			
			$scope._updateLocalStorage();
		};
		
		$scope.purgeCard = function (index) {
			var realIndex = $scope.getRealIndex(index),
					counter = 0;
					
			$scope.cards.splice(realIndex,1);
			
			for (i=0; i < $scope.cards.length; i++) {
				if ($scope.cards[i].status == "trashed") {
					counter++;
				}
			}
			
			if (!counter) {
				$("#trash").collapse("hide");
			}
			
			$scope._updateLocalStorage();
		};
		
		$scope.restoreCard = function (index) {
			var realIndex = $scope.getRealIndex(index, "trashed"),
					counter = 0;
			
			$scope.cards[realIndex].status = "backlog";
			
			for (i=0; i < $scope.cards.length; i++) {
				if ($scope.cards[i].status == "trashed") {
					counter++;
				}
			}
			
			if (!counter) {
				$("#trash").collapse("hide");
			}
			
			$scope._updateLocalStorage();
		};
		
		$scope.getRealIndex = function (index, type) {
			var counter = -1;
			
			for (i=0; i < $scope.cards.length; i++) {
				if ($scope.cards[i].status == type) {
					counter++;
				}
				if (counter == index) {
					return i;
				}
			}
		};
		
		$scope.deleteAllCards = function () {
			angular.forEach($scope.cards, function (item){
				item.status = "trashed";
			})
			
			$scope._updateLocalStorage();
			$("#confirmDeleteAllModal").modal("hide");
		};
		
		$scope.emptyTrash = function () {
			$scope.cards = [];
			$scope._updateLocalStorage();
			$("#trash").collapse("hide");
		};
		
		$scope._updateLocalStorage = function () {
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("cards",JSON.stringify($scope.cards));
			}
		}
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