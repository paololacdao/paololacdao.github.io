(function () {
	var app = angular.module("taskboard", []);
	
	app.controller("TaskboardController", function ($scope) {
		$scope.cards = [];
		
		if (typeof(Storage) !== "undefined") {
			if (localStorage.cards) {
				$scope.cards = JSON.parse(localStorage.cards);
			}
		}
		
		$scope.newCard = {
			title : "Story #1",
			bgColorClass : "",
			status : "backlog"
		};
		
		$scope.selected = function (index, cardType) {
			var realIndex = $scope.getRealIndex(index, cardType);
			
		};

		$scope.addCard = function () {
			$scope.newCard.id = $scope.cards.length;
			$scope.cards.push($scope.newCard);
			$scope._updateLocalStorage();
		};
		
		$scope.updateCard = function (index, cardType) {
			var realIndex = $scope.getRealIndex(index, cardType);
					
			$scope.cards[realIndex].title = $("#card-title-" + cardType + "-" + index).val();
			$scope.cards[realIndex].bgColorClass = $("#card-bg-selector-" + cardType + "-" + index).val();
			
			$scope._updateLocalStorage();
		};
		
		$scope.deleteCard = function (index, cardType) {
			var realIndex = $scope.getRealIndex(index, cardType);
			$scope.cards.splice(realIndex,1);
			
			$scope._updateLocalStorage();
			
			$("#confirmDeleteModal").modal("hide");
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
			$scope.cards = [];
			$scope._updateLocalStorage();
			$("#confirmDeleteAllModal").modal("hide");
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