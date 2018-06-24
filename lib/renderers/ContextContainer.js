"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_hot_loader_1 = require("react-hot-loader");
var PropTypes = require('prop-types');
var ContextContainer = /** @class */ (function (_super) {
    __extends(ContextContainer, _super);
    function ContextContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextContainer.prototype.getChildContext = function () {
        var _a = this.props, paramorph = _a.paramorph, page = _a.page, history = _a.history;
        return { paramorph: paramorph, page: page, history: history };
    };
    ContextContainer.prototype.render = function () {
        return (React.createElement(react_hot_loader_1.AppContainer, null, React.Children.only(this.props.children)));
    };
    ContextContainer.contextTypes = {
        paramorph: PropTypes.shape({
            layouts: PropTypes.object.isRequired,
            includes: PropTypes.object.isRequired,
            pages: PropTypes.object.isRequired,
            categories: PropTypes.object.isRequired,
            tags: PropTypes.object.isRequired,
        }).isRequired,
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
            replace: PropTypes.func.isRequired,
            listen: PropTypes.func.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        page: PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string,
            collection: PropTypes.string.isRequired,
            layout: PropTypes.string.isRequired,
            source: PropTypes.string.isRequired,
            output: PropTypes.bool.isRequired,
            feed: PropTypes.bool.isRequired,
            category: PropTypes.array.isRequired,
            tags: PropTypes.array.isRequired,
            timestamp: PropTypes.number.isRequired,
        }).isRequired,
    };
    return ContextContainer;
}(React.Component));
exports.ContextContainer = ContextContainer;
exports.default = ContextContainer;
//# sourceMappingURL=ContextContainer.js.map