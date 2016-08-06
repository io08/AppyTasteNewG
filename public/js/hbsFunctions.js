var registerHB = function (Handlebars) {
    var checkHandleBars = function (Handlebars) {
        return Handlebars && typeof Handlebars.registerHelper === "function";
    };
    var helpers = {
        // put all of your helpers inside this object
        if_eq: function (a, b, opts) {
            if (a == b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_gt: function (a, b, opts) {
            if (+a > +b)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_or: function (a, b, c, opts) {
            if (a == b || a == c)
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_orEvent: function (a, b, opts) {
            if ((a == 'Kesinleşen' || a == 'Gerçekleşen' || a == 'Gerçekleşen - Teklif Verilemedi') && (b == 'Ilk gorusme' || b == 'Devam gorusmesi'))
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        dateFormat: function (date) {
            if (date != null) {
                if (String(date).length > 10) date = String.convertDateTime(date).slice(0, -3);
                //else if (String(date).length < 11) date = String.convertDate(date);
                return date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4) + (date.length > 10 ? ' ' + date.substring(11, 13) + ':' + date.substring(14, 16) : '');
            }
            return '';
        },
        shortDate: function (date) {
            if (date != null && String(date).length > 0) {
                //date = String.convertDate(date);
                return date.substring(8, 10) + '-' + date.substring(5, 7) + '-' + date.substring(0, 4);
            }
            return '';
        },
        getHour: function (date) {
            if (date != null && String(date).length > 0)
                return String.getHour(date) + ':' + String.getMinute(date);
            return '';
        },
        getDayName: function (date) {
            var new_date = new Date(date);
            var daysOfWeek = new Array('Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi');
            return daysOfWeek[new_date.getDay()];
        },
        getDay: function (date) {
            var new_date = new Date(date);
            return ('0' + new_date.getDate()).slice(-2);
        },
        toLocaleString: function (date) {
            var new_date = new Date(date);
            return new_date.getFullYear() + '-' + ('0' + (new_date.getMonth() + 1)).slice(-2) + '-' + ('0' + new_date.getDate()).slice(-2);
        },
        compareNowEvent: function (date, a, b, options) {
            if (date != null) {
                var now = new Date();
                var date1 = new Date(date);
                date1.setHours(date1.getHours() - 2);
                if (now >= date1 && a == b) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            } else {
                return options.inverse(this);
            }
        },
        dateEq: function (date, date2, options) {
            var date = new Date(date);
            var date2 = new Date(date2);
            if (date != null && date2 != null) {
                if (date.getFullYear() === date2.getFullYear() && date.getMonth() === date2.getMonth() && date.getDate() === date2.getDate()) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            } else {
                return options.inverse(this);
            }
        },
        getMonthName: function (date) {
            var datenew = new Date(date);
            var monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            return monthNames[datenew.getMonth()];
        },
        getYear: function (date) {
            var datenew = new Date(date);
            return datenew.getFullYear();
        },
        getCalenderMonth: function (date) {
            return date.substring(0, 4) + '-' + date.substring(5, 7);
        }, 
        option: function (value, label, selectedValue) {
            var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
            if (checkHandleBars(Handlebars)) return new Handlebars.SafeString('<option value="' + Handlebars.Utils.escapeExpression(value) + '"' + selectedProperty + '>' + Handlebars.Utils.escapeExpression(label) + "</option>");
            return '<option value="' + value + '"' + selectedProperty + '>' + label + "</option>";
        },
        optionText: function (value, label, selectedText) {
            var selectedProperty = label == selectedText ? 'selected="selected"' : '';
            if (checkHandleBars(Handlebars)) return new Handlebars.SafeString('<option value="' + Handlebars.Utils.escapeExpression(value) + '"' + selectedProperty + '>' + Handlebars.Utils.escapeExpression(label) + "</option>");
            return '<option value="' + value + '"' + selectedProperty + '>' + label + "</option>";
        },
        link: function (id, label) {
            if (checkHandleBars(Handlebars)) {
                try {
                    var text = Handlebars.Utils.escapeExpression(label);
                    var url = Handlebars.Utils.escapeExpression(String.format(objectLinkPrefix[id.substring(0, 3)], id));
                    return new Handlebars.SafeString('<a href="' + url + '">' + text + '</a>');
                } catch (e) {
                    return Handlebars.Utils.escapeExpression(label);
                }
            }
            else {
                try {
                    var text = label;
                    var url = String.format(objectLinkPrefix[id.substring(0, 3)], id);
                    return '<a href="' + url + '">' + text + '</a>';
                } catch (e) {
                    return label;
                }
            }
        },
        times: function (n, block) {
            var accum = '';
            for (var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        },
        checkbox: function (id, text, checked, readOnly) {
            var checked = Boolean(checked) ? ' checked ' : '';
            var readOnly = Boolean(readOnly) ? ' disabled ' : '';
            var html = '<input type="checkbox" id="' + id + '" ' + checked + readOnly + ' /><label for="' + id + '">' + text + '</label>';
            if (checkHandleBars(Handlebars)) return new Handlebars.SafeString(html);
            return html;
        },
        textRadio: function (id, index, value, text, selectedValue) {
            var checked = value == selectedValue ?   ' checked ' : '';
            var name = id;
            id = id + '_' + index;
            var html = '<input type="radio" id="' + id + '" name="' + name + '"  ' + checked + ' value="' + value + '" class="textRadio"/><label for="' + id + '">' + text + '</label>';
            if (checkHandleBars(Handlebars)) return new Handlebars.SafeString(html);
            return html;
        },
        radio: function (id, index, value, text, selectedValue) {
            var checked = value == selectedValue ?   ' checked ' : '';
            id = id + '_' + index;
            var html = '<input type="radio" id="' + id + '" name="' + name + '"  ' + checked + ' value="' + value + '" /><label for="' + id + '">' + text + '</label>';
            if (checkHandleBars(Handlebars)) return new Handlebars.SafeString(html);
            return html;
        },
        for: function (from, to, incr, block) {
            var accum = '';
            for (var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        },
        json: function (str) {
            return JSON.stringify(str);
        }
    };
    
    if (checkHandleBars(Handlebars)) {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

// client
if (typeof window !== "undefined") {
    registerHB(Handlebars);
}
// server
else {
    module.exports.register = registerHB;
    //module.exports.helpers = registerHB(null);
    module.exports.helpers = function (handlebars) {
        registerHB(handlebars);
    };
}