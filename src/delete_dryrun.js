(params) => {
	let managementBundles = api.run("this.get_objects",
                                    {bucketName: params.bucketName});

  	// sort by timestamp, lastes -> oldest
    managementBundles = managementBundles.sort(
		function(a,b){
  			return new Date(b['LastModified']) - new Date(a['LastModified']);
		}
    );
  
  	
  	let latestBundle = managementBundles[0];
    let twoWeeksBeforeLastDeploy = new Date(latestBundle['LastModified']);
  	twoWeeksBeforeLastDeploy.setDate(twoWeeksBeforeLastDeploy.getDate() - params.threshold);
	
  	// get a list of keys to delete
  	let bundlesToDelete = managementBundles.filter(bundle => 
      new Date(bundle['LastModified']) < twoWeeksBeforeLastDeploy);
    api.log(bundlesToDelete.sort(
        function(a,b){
            return new Date(b['LastModified']) - new Date(a['LastModified']);
        }
    ));
  api.log("Here are the objects to be deleted: ");
  return bundlesToDelet;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */