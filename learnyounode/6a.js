var fs = require('fs');
module.exports = function(dirname, filter, callback) {
	var reg = new RegExp('\\.' + filter + '$');
	fs.readdir(dirname, function (err, list) {
		if (err)
			return callback(err);
		var ret = [];
		list.forEach(function(file) {
			if (reg.test(file))
				ret.push(file);
		})
		return callback(null, ret);
	});
};