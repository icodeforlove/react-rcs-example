module.exports = [
	{
	    path: "/{path*}",
	    method: "GET",
	    handler: {
	        directory: {
	            path: "./build",
	            listing: false,
	            index: false
	        }
	    }
	}
];