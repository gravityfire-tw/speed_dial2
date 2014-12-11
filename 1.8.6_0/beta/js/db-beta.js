// BETA FUNCTIONS

	speeddial.storage.getAllGroups = function() {
		
		var deferred = $.Deferred();

		speeddial.storage.db.transaction(function(tx) {

			var query = 'SELECT * FROM groups ORDER BY position ASC, title ASC';

			tx.executeSql(query, [], function(tx, rs) {
				
				g = [];
						
				for (var i=0; i < rs.rows.length; i++) {
					g.push(rs.rows.item(i));
				}

				deferred.resolve(g);
			
			}, speeddial.storage.onError);
		});
		
		return deferred.promise();
	}
	
	speeddial.storage.getAllItemsWithThumbnails = function(id_group) {
		
		var deferred = $.Deferred();
		
		if (parseInt(id_group) > -1) {

			// default order
			var query = 'SELECT thumbnails.thumbnail as dataThumbnail, bookmarks.* FROM bookmarks LEFT JOIN thumbnails ON thumbnails.url = bookmarks.url WHERE bookmarks.idgroup = ? ORDER BY bookmarks.visits DESC';

			speeddial.storage.db.transaction(function(tx) {
				tx.executeSql(query, [id_group], function(tx, rs) {
					
					bookmarks = [];
							
					for (var i=0; i < rs.rows.length; i++) {
						bookmarks.push(rs.rows.item(i));
					}

					deferred.resolve(bookmarks);
					
				}, speeddial.storage.onError);
			});
			
		} else {

			deferred.reject();
		}
		return deferred.promise();
	}

	speeddial.storage.getAllItemsBeta = function(id_group) {
		
		var deferred = $.Deferred();
		
		if (parseInt(id_group) > -1) {

			// default order
			var query = 'SELECT * FROM bookmarks WHERE idgroup = ? ORDER BY position ASC';

			speeddial.storage.db.transaction(function(tx) {
				tx.executeSql(query, [id_group], function(tx, rs) {
					
					bookmarks = [];
							
					for (var i=0; i < rs.rows.length; i++) {
						bookmarks.push(rs.rows.item(i));
					}

					deferred.resolve(bookmarks);
					
				}, speeddial.storage.onError);
			});
			
		} else {

			deferred.reject();
		}
		return deferred.promise();
	}

	speeddial.storage.search = function(searchTerm) {
		
		var deferred = $.Deferred();
		
		// default order
		var query = "SELECT * FROM bookmarks WHERE title LIKE ? OR url LIKE ? ORDER BY visits DESC";

		speeddial.storage.db.transaction(function(tx) {
			tx.executeSql(query, ["%"+searchTerm+"%", "%"+searchTerm+"%"], function(tx, rs) {
				
				bookmarks = [];
						
				for (var i=0; i < rs.rows.length; i++) {
					bookmarks.push(rs.rows.item(i));
				}

				deferred.resolve(bookmarks);
				
			}, speeddial.storage.onError);
		});
			
		return deferred.promise();
	}
	
	function beta_init()
	{
		speeddial.storage.open();
		// create table bookmarks if not exists
		speeddial.storage.createTable();
		// uuid
		speeddial.storage.uuid();
	}	