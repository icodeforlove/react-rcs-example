module.exports = [
	{
	    path: "/static/{path*}",
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