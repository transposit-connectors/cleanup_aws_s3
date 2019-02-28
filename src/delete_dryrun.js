(params) => {

	
  	// get a list of keys to delete
  	let bundlesToDelete = api.run("this.delete_dryrun", {bucketName: params.bucketName, threshold: params.threshold});
  	
  	if (bundlesToDelete.length == 0) {
       api.log("There is nothing to delete :)");
    } else {
       api.log("Here are the objects to be deleted: ");
    }
 
  return bundlesToDelete;
}

/*
 * For sample code and reference material, visit
 * https://api-composition.transposit.com/references/js-operations
 */