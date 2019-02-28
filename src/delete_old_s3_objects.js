(params) => {
	let managementBundles = api.run("this.get_management_bundles",
                                    {bucketName: params.bucketName});

  	// sort by timestamp, lastes -> oldest
    managementBundles = managementBundles.sort(
		function(a,b){
  			return new Date(b['LastModified']) - new Date(a['LastModified']);
		}
    );
  
  	
  	var latestBundle = managementBundles[0];
    var twoWeeksBeforeLastDeploy = new Date(latestBundle['LastModified']);
  	twoWeeksBeforeLastDeploy.setDate(twoWeeksBeforeLastDeploy.getDate() - params.threshold);
	
  	// get a list of keys to delete
  	var bundlesToDelete = managementBundles.filter(bundle => 
      new Date(bundle['LastModified']) < twoWeeksBeforeLastDeploy);
    api.log(bundlesToDelete.sort(
        function(a,b){
            return new Date(b['LastModified']) - new Date(a['LastModified']);
        }
    ));
  	
    // delete management bundles older than twoWeeksBeforeLastDeploy
  	bundlesToDelete.forEach(function(bd) {
    	var result = api.run("aws_s3.delete_object", {Bucket: params.bucketName, Key: bd['Key']});
        if (result[0] != 'success') {
          api.log("Failed to delete: " + bd['Key'] + " from bucket " + params.bucketName); 
        } else {
          api.log("Deleted " + bd['Key']);
        };
     });  	
  
  if (bundlesToDelete.length == 0){
  	api.log("There is nothing to clean!");
  }
}