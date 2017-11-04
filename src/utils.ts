
export function stripTags(htmlText : string) {
	let uIndentionChar = "-";
	let oIndentionChar = "-";

	// removel all \n linebreaks
	let tmp = String(htmlText).replace(/\n|\r/g, " ");

	// remove everything before and after <body> tags including the tag itself
	tmp = tmp.replace(/<\/body>.*/i, "");
	tmp = tmp.replace(/.*<body[^>]*>/i, "");

	// remove inbody scripts and styles
	tmp = tmp.replace(/<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi, "");

	// remove all tags except that are being handled separately
	tmp = tmp.replace(/<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^>]*>/gi, "");

	// remove or replace images - replacement texts with <> tags will be removed also, if not intentional, try to use other notation
	tmp = tmp.replace(/<img([^>]*)>/gi, function(str : string, imAttrs : string) {
		let imSrc = "";
		let imAlt = "";
		const imSrcResult = (/src="([^"]*)"/i).exec(imAttrs);
		const imAltResult = (/alt="([^"]*)"/i).exec(imAttrs);
		if(imSrcResult !== null){
			imSrc = imSrcResult[1];
		}
		if(imAltResult !== null){
			imAlt = imAltResult[1];
		}
		return imAlt;
	});


	function createListReplaceCb() {
		return (match : string, listType : string, listAttributes : string | null, listBody : string) => {
			let liIndex = 0;
			let startMatch : string[] | null;
			if(listAttributes && (startMatch = /start="([0-9]+)"/i.exec(listAttributes)) !== null) {
				liIndex = parseInt(startMatch[1]) - 1;
			}
			const plainListItem = "<p>" + listBody.replace(
				/<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi,
				(str, listItem) => {
  				let actSubIndex = 0;
  				const plainListLine = listItem.replace(/(^|(<br \/>))(?!<p>)/gi, function(){
  					if(listType === "o" && actSubIndex === 0){
  						liIndex += 1;
  						actSubIndex += 1;
  						return "<br />" + liIndex + oIndentionChar;
  					}
  					return "<br />";
  				});
  				return plainListLine;
  			}
			) +"</p>";
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
	tmp = tmp.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi, function(str, href, linkText) {
		return " " + linkText +" ";
	});

	// remove duplicated spaces including non braking spaces
	tmp = tmp.replace(/( |&nbsp;|\t)+/gi, " ");

	// remove line starter spaces
	tmp = tmp.replace(/\n +/gi, "");

	// remove content starter spaces
	tmp = tmp.replace(/^ +/gi, "");

	return tmp;
}

