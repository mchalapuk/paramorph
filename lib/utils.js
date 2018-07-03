"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stripTags(htmlText) {
    var uIndentionChar = "-";
    var oIndentionChar = "-";
    // removel all \n linebreaks
    var tmp = String(htmlText).replace(/\n|\r/g, " ");
    // remove everything before and after <body> tags including the tag itself
    tmp = tmp.replace(/<\/body>.*/i, "");
    tmp = tmp.replace(/.*<body[^>]*>/i, "");
    // remove inbody scripts and styles
    tmp = tmp.replace(/<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi, "");
    // remove all tags except that are being handled separately
    tmp = tmp.replace(/<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^>]*>/gi, "");
    // remove images
    tmp = tmp.replace(/<img([^>]*)>/gi, '');
    function createListReplaceCb() {
        return function (match, listType, listAttributes, listBody) {
            var liIndex = 0;
            var startMatch;
            if (listAttributes && (startMatch = /start="([0-9]+)"/i.exec(listAttributes)) !== null) {
                liIndex = parseInt(startMatch[1]) - 1;
            }
            var plainListItem = "<p>" + listBody.replace(/<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi, function (str, listItem) {
                var actSubIndex = 0;
                var plainListLine = listItem.replace(/(^|(<br \/>))(?!<p>)/gi, function () {
                    if (listType === "o" && actSubIndex === 0) {
                        liIndex += 1;
                        actSubIndex += 1;
                        return "<br />" + liIndex + oIndentionChar;
                    }
                    return "<br />";
                });
                return plainListLine;
            }) + "</p>";
            return plainListItem;
        };
    }
    // handle lists
    tmp = tmp.replace(/<\/?ul[^>]*>|<\/?ol[^>]*>|<\/?li[^>]*>/gi, "");
    // handle headings
    tmp = tmp.replace(/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, " $2 ");
    // replace <br>s, <td>s, <divs> and <p>s with linebreaks
    tmp = tmp.replace(/<br( [^>]*)*>|<p( [^>]*)*>|<\/p( [^>]*)*>|<div( [^>]*)*>|<\/div( [^>]*)*>|<td( [^>]*)*>|<\/td( [^>]*)*>/gi, "");
    // replace <a href>b<a> links with b (href)
    tmp = tmp.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi, function (str, href, linkText) {
        return " " + linkText + " ";
    });
    // remove duplicated spaces including non braking spaces
    tmp = tmp.replace(/( |&nbsp;|\t)+/gi, " ");
    // remove line starter spaces
    tmp = tmp.replace(/\n +/gi, "");
    // remove content starter spaces
    tmp = tmp.replace(/^ +/gi, "");
    return tmp;
}
exports.stripTags = stripTags;
function removeEntities(str) {
    return str
        .replace(/&nbsp;/g, ' ')
        .replace(/&[^\s;]+;/g, '');
}
exports.removeEntities = removeEntities;
//# sourceMappingURL=utils.js.map