# S3 cleanup
In our AWS architecture, we use S3 to store static resources, and we get deploy errors when our S3 bucket gets full. Transposit allows us to create our own dynamic rules for cleaning up S3 buckets. This app finds all objects in your S3 bucket and deletes objects older than two weeks since the last deployment.

## Test against your own infrastructure
After entering the correct AWS credentials, you can run `delete_dryrun` operation to see what would be deleted from your bucket. There are three parameters you will need to supply:

- `bucketName`: the name of your S3 bucket.
- `threshold`: max age for existing objects, in days. Default value is 14 days.
- `prefixName`: the prefix of the objects you want to delete.

When you are happy with the dry run results, you could go ahead and run `delete_old_s3_objects` against your infrastructure.

## What else can you do?
Once you fork this app, you can expand and customize the functionality. Some ideas:

- Use the Slack connector to post to your Slack channels what resources have been deleted.
- If you use GitHub and include a commit SHA in your object names, you could use the GitHub connector to verify that the object being deleted was deployed or pushed by a specific commit.
- Schedule a task to clean up your s3 bucket every day, so you will never have a full bucket!
