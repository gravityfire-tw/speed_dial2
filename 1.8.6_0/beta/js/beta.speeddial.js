var app = angular.module('app', ['ngSanitize'])
.config( 
	[
		'$compileProvider',
		function( $compileProvider ) {
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/); 
		}
	]
)
.controller('speeddial', ['$scope', function($scope) {

	$scope.activeGroup = 0;
	$scope.groups = [];
	$scope.bookmarks = [];
	$scope.searchTerm = '';
	
	$scope.loadGroup = function(id) {
		$scope.activeGroup = id;
		$scope.load();
	}
	
	$scope.getBackground = function(bookmark) {
		if (bookmark.thumbnail) {
			return bookmark.thumbnail;
		// } else if (bookmark.dataThumbnail) {
		// 	return bookmark.dataThumbnail;
		} else {
			
   			// http://api.snapito.io/v2/webshot/spu-7b716a-n2jt-euapxy8f64sfgbk0?url=&size=480x360&screen=1280x800&quality=low&type=jpg&cache=yes
			return 'http://speeddial2.com/screenshot/?url=' + encodeURIComponent(bookmark.url);
		}
	}
	
	$scope.keyPress = function(e) {
		if ( e.keyCode == 27 ) { 
			$scope.searchTerm = '';
		} else if ( e.keyCode == 13 ) { 
			window.location.href = $scope.bookmarks[0].url;
		}
		
	}
		
	$scope.search = function() {
		// load all dials
		speeddial.storage.search($scope.searchTerm)
			.then(function(bookmarks){
								
				$scope.$apply(function(){
					$scope.bookmarks = bookmarks;	
				});
			});	
	}	
	
	$scope.load = function() {

		// get all groups
		speeddial.storage.getAllGroups()
			.then(function(groups){
				$scope.$apply(function(){
					$scope.groups = groups;
				})
			});	

		// load all dials
		speeddial.storage.getAllItemsBeta($scope.activeGroup)
			.then(function(bookmarks){
								
				$scope.$apply(function(){
					$scope.bookmarks = bookmarks;	
				});
			});	
	}
	
	$scope.$watch('searchTerm', function(newValue, oldValue) {
		if (newValue) {
			$scope.search(newValue);
		} else {
			$scope.load();
		}
	})
		
		
	$scope.init = function() {

		// Init DB
		beta_init();
		
		// Get all groups
		$scope.load();
		
	}();
	
}]);
	
jQuery(document).ready(function ($) {

	$scope = angular.element($("[ng-controller='speeddial']")).scope();

});