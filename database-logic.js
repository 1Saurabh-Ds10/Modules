MRS.dataBaseHandler = (function (global) {


    var db = {},
            // default size of the database, it will keep on increasing
            dbSize = 5 * 1024 * 1024,
			limitRecord = 4,
            format = 'YYYY-MM-DD HH:mm:ss';
            

    //Note:
    //SQLite does not have a separate Boolean storage class. Instead, Boolean values
    //are stored as integers 0 (false) and 1 (true).
	
	var createQuery = {};
	
	createQuery['TableName'] = 'Create Query';
	
	var insertQuery = {};
	
	insertQuery['TableName'] = 'Insert Query';

    // function to populate table
    // Public API
    populateTable = function (tableName, successCallBack, afterErrorCallBack, dataSetToPopulate) {

        var sqlCreateTableQuerry = createQuery[tableName],
            sqlInsertTableQuerry = insertQuery[tableName];
        
		var dataSet = dataSetToPopulate || [];
        // call local populateDatabase function 
        // it takes create table query, insert table query, data set to populate in [[]] format,
        // success call back and call back after error
        populateDatabase(sqlCreateTableQuerry, sqlInsertTableQuerry, dataSet, successCallBack, afterErrorCallBack);

    };

   
    // function to delete table
	// Public API
    dropTableByTableName = function (tableName, successCallBack, afterErrorCallBack)  {
        var sqlQuerry = 'DROP TABLE IF EXISTS "' + tableName + '"';
        
		
        querryDatabase(sqlQuerry, [], successCallBack, afterErrorCallBack);
    };

    // function to check if the particular table is already present in the database
	// Public API
    checkIfTableExistsByTableName = function (tableName, successCallBack, afterErrorCallBack) {
        var sqlQuerry = 'SELECT name FROM sqlite_master WHERE name ="' + tableName + '" AND type="table"';

        // call local querryDatabase function to execute the query
        querryDatabase(sqlQuerry, [], successCallBack, afterErrorCallBack);

    };

    // local function to populate database
    function populateDatabase(sqlCreateTableQuerry, sqlQuerry, dataSet, successCallBack, afterErrorCallBack) {

        // open the database
        db = window.openDatabase('MRS App', '1.0', 'MRS', dbSize);
        
		if (typeof (successCallBack) === 'undefined') {
            successCallBack = '';
        }
        if (typeof (afterErrorCallBack) === 'undefined') {
            afterErrorCallBack = '';
        }
        // call transaction method 
        db.transaction(function (tx) {
			// execute  executePopulateTransection function on success
            executePopulateTransection(tx, sqlCreateTableQuerry, sqlQuerry, dataSet);
        
		}, function (err) {
            //  execute  errorCallBack function on error
            errorCallBack(err, afterErrorCallBack);
        
		}, function (tx) {
            successCallBack(tx);
        });
        // clear the database object
        db = {};
    }

    // local function to query database
    function querryDatabase(sqlQuerry, dataSet, afterSuccessCallBack, afterErrorCallBack) {
        // open the database
        db = window.openDatabase('capgemini', '1.0', 'Mobile Risk Survey', dbSize);
        
		// call transaction method 
        db.transaction(function (tx) {
            // execute  executeQuerryTransection function on success
            executeQuerryTransection(tx, sqlQuerry, afterSuccessCallBack, dataSet, afterErrorCallBack);
        
		}, function (err) {
            // execute  errorCallBack function on error
            errorCallBack(err, afterErrorCallBack);
        
		});
        // clear the database object
        db = {};

    }

    // local function to populate records
    // this function will take the data set to populate and call executeSql method
    function executePopulateTransection(tx, sqlCreateTableQuerry, sqlQuerry, dataSet) {
        // dataset has to be in Array of Array format
        // if it's not defined, create a blank Array of Array
        if ((dataSet === '') || (typeof (dataSet) === 'undefined')) {
            dataSet = [[]];
        
		} else {
            // if dataset is not in Array of Array format,
            // convert it to Array of Array
            if (!($.isArray(dataSet))) {
                
				dataSet = [[dataSet]];
                // if Only Array is passed (i.e. for a single record set), then
                // convert it into Array of Array
            
			} else {
                
				if (!($.isArray(dataSet[0]))) {
                    dataSet = [dataSet];
                }
            }
        }
        //Array of Array
        tx.executeSql(sqlCreateTableQuerry);
        
		if (dataSet[0].length > 0) {
            for (var i = 0, l = dataSet.length; i < l; i++) {

                tx.executeSql(sqlQuerry, dataSet[i]);

            }
        }

    }

    // local function to execute query
    // This function will take the query to execute and call executeSql method
    // optionally it passes the data set to pass to the query while execution
    // data set is in Array format
    function executeQuerryTransection(tx, sqlQuerry, successCallBack, dataSet, afterErrorCallBack) {
        // if no data set is passed, create an empty Array
        if ((dataSet === '') || (typeof (dataSet) === 'undefined')) {
            
			dataSet = [];
            // if data set is not in the Array format, convert it to Array
        
		} else {
            
			if (!($.isArray(dataSet))) {
                dataSet = [dataSet];
            }
        }

        tx.executeSql(sqlQuerry, dataSet, function (tx, results) {
            // if query is successful, execute success call back
            successCallBack(tx, results);
        
		}, function (err) {
            // if query is failed, execute error call back 
            errorCallBack(err, afterErrorCallBack);
        
		});


    }

    
    // error callback function
    function errorCallBack(err, afterErrorCallBack) {
        
        if (typeof (afterErrorCallBack) === 'function') {
            afterErrorCallBack();
        }
        
		console.log(getErrorMessage(err.code));
        db = {};
    }

    // function to get error message
    // it returns the error message based on the error code
    function getErrorMessage(errorCode) {
        var Error = {};
        Error[errorCode] = 'Please try again';
        Error[errorCode] = 'Please try again';
        Error[errorCode] = 'Database version Error';
        Error[errorCode] = 'Data too large Error';
        Error[errorCode] = 'Data quota Error';
        Error[errorCode] = 'Syntax Error';
        Error[errorCode] = 'User name is already present in the database';
        Error[errorCode] = 'Timeout Error';
        return Error[errorCode];
    }
	
	
	
	
	return publicAPI = {
		limitRecord: limitRecord,
		
		populateTable: populateTable,
		dropTableByTableName: dropTableByTableName,
		checkIfTableExistsByTableName: checkIfTableExistsByTableName
				
	};

// in case, if require
})(window.MRS);


