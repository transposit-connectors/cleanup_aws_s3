(params) => {	
  	// get a list of keys to delete
  	let bundlesToDelete = api.run("this.delete_dryrun", {bucketName: params.bucketName, threshold: params.threshold, prefix: params.prefixName});
    // delete management bundles older than twoWeeksBeforeLastDeploy
  	bundlesToDelete.forEach(function(bd) {
    	let result = api.run("aws_s3.delete_object", {Bucket: params.bucketName, Key: bd['Key']});
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