function createGuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
function rnd(address) {
	var dt = new Date();
	var RandomNumber = (dt.getSeconds() % 10000) + 1;
	var RandomNumber2 = Math.floor(Math.random() * 1000);
	var s = address.indexOf('?') > -1 ? '&rnbr=' : '?rnbr=';
	return address + s + RandomNumber + RandomNumber2;
}

String.format = function () {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		s = s.replace(reg, arguments[i + 1]);
	}
	return s;
};
String.prototype.endsWith = function (suffix) {
	return (this.substr(this.length - suffix.length) === suffix);
};

String.prototype.startsWith = function (prefix) {
	return (this.substr(0, prefix.length) === prefix);
};
String.formatUrl = function () {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {
		var reg = new RegExp("\\{" + i + "\\}", "gm");
		s = s.replace(reg, arguments[i + 1]);
	}
	return rnd(s);
};
String.removeRnd = function () {
	var s = arguments[0];
	if (s.indexOf('?rnbr=') > 0) return s.slice(0, s.indexOf('?rnbr='));
	return s;
};
String.convertDate = function () {
	var s = arguments[0];
	var d = new Date(s);
	var convertdate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
	return convertdate;
};
String.convertDateSF = function () {
	var s = arguments[0];
	var d = new Date(s);
	var convertdate = d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2) + 'T' + ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + d.getUTCSeconds() + '0' + 'Z';
	return convertdate;
};
String.convertDateTime = function () {
	var s = arguments[0];
	var d = new Date(s);
	var convertdate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' + ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + d.getUTCSeconds() + '0';
	return convertdate;
};

String.getHour = function () {
	return String(arguments[0]).slice(11, 13);
};
String.getMinute = function () {
	return String(arguments[0]).slice(14, 16);
};
String.getDate = function () {
	return String(arguments[0]).slice(0, 10);
};
String.getTimeSF = function () {
	var time = String(arguments[0]);
	var hour = String(arguments[0]).substring(0, 2);
	var endTime = Number(hour);
	if (endTime < 9) time = time.substring(0, 1) + String((endTime + 1)) + time.substring(2);
	else if (endTime >= 9 && endTime < 23) time = String((endTime + 1)) + time.substring(2);
	else time = "00" + time.substring(2);
	return time;
};


Array.prototype.indexOf = function (obj, fromIndex) {
	if (fromIndex == null) {
		fromIndex = 0;
	} else if (fromIndex < 0) {
		fromIndex = Math.max(0, this.length + fromIndex);
	}
	for (var i = fromIndex, j = this.length; i < j; i++) {
		if (this[i] === obj)
			return i;
	}
	return -1;
};
String.empty = function () {
	var s = arguments[0];
	return !(s != undefined && s != null && String(s).length > 0);
};

String.isValidEmail = function () {
	var value = arguments[0];
	var retVal = true;
	var input = document.createElement('input');
	input.type = 'email';
	input.value = value;
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	try { retVal = input.checkValidity(); } catch (err) { retVal = regex.test(value); }
	return retVal;
}
String.prototype.escapeSpecialChars = function () {
	return this.replace(/\\n/gi, "\\n")
        .replace(/\\'/gi, "\\'")
        .replace(/\\"/gi, '\\"')
        .replace(/\\&/gi, "\\&")
        .replace(/\\r/gi, "\\r")
        .replace(/\\t/gi, "\\t")
        .replace(/\\b/gi, "\\b")
        .replace(/\\f/gi, "\\f");
};
String.prototype.htmlEscape = function () {
	return this.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};
String.prototype.htmlUnEscape = function () {
	return this.replace(/&#x3D;/g, "=").replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
};

Date.prototype.convertDateSF = function () {
	var s = this;
	var d = new Date(s);
	var convertdate = d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2) + 'T' + ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ':' + d.getUTCSeconds() + '0' + 'Z';
	return convertdate;
};
Date.prototype.convertDate = function () {
	var s = this;
	var d = new Date(s);
	var convertdate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
	return convertdate;
};
Date.prototype.getMonday = function () {
	var d = new Date(this);
	var day = d.getDay();
	var diff = d.getDate() - day + (day == 0 ? -6:1);
	return new Date(d.setDate(diff)).getDate();
};


module.exports = function () {
	return {
		createGuid : createGuid,
		rnd: rnd
	}
}

