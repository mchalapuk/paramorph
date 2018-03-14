"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(url, title, description, image, layout, source, output, feed, categories, tags, timestamp) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.image = image;
        this.layout = layout;
        this.source = source;
        this.output = output;
        this.feed = feed;
        this.categories = categories;
        this.tags = tags;
        this.timestamp = timestamp;
    }
    Page.prototype.compareTo = function (another) {
        if (this.timestamp === another.timestamp) {
            if (this.title === another.title) {
                return this.url > another.url ? 1 : -1;
            }
            return this.title > another.title ? 1 : -1;
        }
        return this.timestamp > another.timestamp ? 1 : -1;
    };
    return Page;
}());
exports.Page = Page;
