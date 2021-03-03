'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

var CompletedAreaSettingTab = /** @class */ (function (_super) {
    __extends(CompletedAreaSettingTab, _super);
    function CompletedAreaSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.defaultHeaderLevel = "2";
        _this.defaultHeaderName = "Completed";
        _this.plugin = plugin;
        return _this;
    }
    CompletedAreaSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Header level")
            .setDesc("number of `#`s in the header.")
            .addText(function (text) {
            return text
                .setPlaceholder(_this.defaultHeaderLevel)
                .setValue(_this.plugin.setting.completedAreaHierarchy)
                .onChange(function (value) {
                if (_this.isHierarchyValid(value)) {
                    _this.plugin.setting.completedAreaHierarchy =
                        value || _this.defaultHeaderLevel;
                    _this.plugin.saveData(_this.plugin.setting).then(function () {
                        text.setValue(value);
                    });
                }
                else {
                    new obsidian.Notice("Header level's number not valid!");
                }
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Header name")
            .setDesc("where the completed items be extracted to.")
            .addText(function (text) {
            return text
                .setPlaceholder(_this.defaultHeaderName)
                .setValue(_this.plugin.setting.completedAreaName)
                .onChange(function (value) {
                _this.plugin.setting.completedAreaName =
                    value || _this.defaultHeaderName;
                _this.plugin.saveData(_this.plugin.setting);
                text.setValue(value);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Show icon on left sidebar")
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.setting.showIcon).onChange(function (value) {
                _this.plugin.setting.showIcon = value;
                _this.plugin.saveData(_this.plugin.setting);
                new obsidian.Notice("Reload the app to see icon " + (value ? "added" : "removed") + ".");
            });
        });
    };
    CompletedAreaSettingTab.prototype.isHierarchyValid = function (hierarchyLevel) {
        var e_1, _a;
        var validLevels = [1, 2, 3, 4, 5, 6];
        try {
            for (var validLevels_1 = __values(validLevels), validLevels_1_1 = validLevels_1.next(); !validLevels_1_1.done; validLevels_1_1 = validLevels_1.next()) {
                var validNum = validLevels_1_1.value;
                if (Number(hierarchyLevel) === validNum || hierarchyLevel === "") {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (validLevels_1_1 && !validLevels_1_1.done && (_a = validLevels_1.return)) _a.call(validLevels_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    return CompletedAreaSettingTab;
}(obsidian.PluginSettingTab));

var CompletedAreaSetting = /** @class */ (function () {
    function CompletedAreaSetting() {
        this.completedAreaHierarchy = "2";
        this.completedAreaName = "Completed";
        this.todoAreaName = "Todo";
        this.showIcon = true;
        this.sortedBy = "Asc";
    }
    return CompletedAreaSetting;
}());

obsidian.addIcon("completed-area", '<g id="icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="Rectangle" stroke="currentColor" stroke-width="8" x="20" y="20" width="60" height="60" rx="10"></rect><path d="M68.7153857,33.5033079 L72.0903697,35.8858648 C72.5415551,36.2043773 72.6491076,36.8283407 72.3305951,37.2795261 L72.2641586,37.3636708 L48.720426,64.1010398 C46.5305195,66.5880005 42.7391695,66.8288105 40.2522088,64.638904 C40.1258491,64.5276373 40.0042287,64.4111011 39.8876706,64.2896051 L28.6056533,52.5296259 C28.258873,52.1681543 28.2330404,51.6058741 28.5452158,51.2141283 L31.9837559,46.899139 C32.3279438,46.467221 32.9571019,46.3961018 33.3890199,46.7402897 C33.4274056,46.7708786 33.4634871,46.8042521 33.4969719,46.8401396 L42.8381754,56.8516325 C43.5917202,57.6592488 44.8572913,57.7030825 45.6649076,56.9495377 L45.7632746,56.8511374 L67.4072774,33.6382921 C67.7482521,33.2726022 68.3069198,33.2149531 68.7153857,33.5033079 Z" id="Path" fill="currentColor" fill-rule="nonzero"></path></g>');
var CompletedAreaPlugin = /** @class */ (function (_super) {
    __extends(CompletedAreaPlugin, _super);
    function CompletedAreaPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.completedItemRegx = /(\n?- \[x\] .*)/g;
        return _this;
    }
    CompletedAreaPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setting = new CompletedAreaSetting();
                        return [4 /*yield*/, this.loadSetting()];
                    case 1:
                        _a.sent();
                        if (this.setting.showIcon) {
                            this.addRibbonIcon("completed-area", "Completed Area", function () {
                                _this.editSource();
                            });
                        }
                        this.addCommand({
                            id: "completed-area-shortcut",
                            name: "Extracted completed items.",
                            hotkeys: [{ modifiers: ["Ctrl"], key: "Enter" }],
                            callback: function () {
                                _this.editSource();
                            },
                        });
                        this.addSettingTab(new CompletedAreaSettingTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    CompletedAreaPlugin.prototype.loadSetting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadedSetting;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSetting = _a.sent();
                        if (loadedSetting) {
                            this.setting.completedAreaHierarchy =
                                loadedSetting.completedAreaHierarchy;
                            this.setting.completedAreaName = loadedSetting.completedAreaName;
                            this.setting.todoAreaName = loadedSetting.todoAreaName;
                            this.setting.showIcon = loadedSetting.showIcon;
                        }
                        else {
                            this.saveData(this.setting);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CompletedAreaPlugin.prototype.editSource = function () {
        var _a, _b;
        var activeLeaf = (_a = this.app.workspace.activeLeaf) !== null && _a !== void 0 ? _a : null;
        if (activeLeaf) {
            var source = activeLeaf.view.sourceMode;
            var sourceText = source.get();
            var todoRegx = /-\s\[[\sx]\]\s/gi;
            var toggledText = this.toggleElement(todoRegx, this.replaceTodo);
            var completedItems = (_b = this.extractCompletedItems(toggledText)) !== null && _b !== void 0 ? _b : null;
            if (completedItems) {
                var newText = this.refactorContent(toggledText, completedItems);
                source.set(newText, false);
            }
        }
        else {
            new obsidian.Notice("Please active a leaf first.");
        }
    };
    CompletedAreaPlugin.prototype.replaceTodo = function (startWith) {
        return startWith === "- [ ] " ? "- [x] " : "- [ ] ";
    };
    CompletedAreaPlugin.prototype.extractCompletedItems = function (text) {
        var completedItems = [];
        if (text) {
            completedItems = text.match(this.completedItemRegx);
            if (!completedItems) {
                new obsidian.Notice("No completed todos found.");
                return;
            }
            return completedItems;
        }
    };
    CompletedAreaPlugin.prototype.refactorContent = function (content, items) {
        var completedArea = this.formatItems(items, content);
        console.log(completedArea);
        var header = this.completedAreaHeader.trimStart();
        var newContent = content
            .replace(this.completedItemRegx, "") // Remove completed items in main text
            .trimStart()
            .trimEnd();
        return this.isCompletedAreaExisted(content)
            ? newContent.replace(header, "" + header + completedArea)
            : newContent + completedArea;
    };
    CompletedAreaPlugin.prototype.formatItems = function (items, content) {
        var completedArea = "";
        var header = this.makeCompletedHeader(content);
        items[0] = (items[0][0] === "\n" ? "" : "\n") + items[0];
        completedArea = items.reduce(function (prev, current) {
            return prev + current;
        }, header);
        return completedArea;
    };
    CompletedAreaPlugin.prototype.makeCompletedHeader = function (content) {
        this.completedAreaHeader =
            "\n" +
                "#".repeat(Number(this.setting.completedAreaHierarchy)) +
                (" " + this.setting.completedAreaName);
        return this.isCompletedAreaExisted(content)
            ? "" // if completed header already exists
            : this.completedAreaHeader;
    };
    CompletedAreaPlugin.prototype.isCompletedAreaExisted = function (content) {
        return !!content.match(RegExp(this.completedAreaHeader));
    };
    CompletedAreaPlugin.prototype.toggleElement = function (re, subst) {
        var activeLeaf = this.app.workspace.activeLeaf;
        var editor = activeLeaf.view.sourceMode.cmEditor;
        var selection = editor.somethingSelected();
        var selectedText = this.getSelectedText(editor);
        var newString = selectedText.content.replace(re, subst);
        editor.replaceRange(newString, selectedText.start, selectedText.end);
        // Keep cursor in the same place
        if (selection) {
            editor.setSelection(selectedText.start, {
                line: selectedText.end.line,
                ch: editor.getLine(selectedText.end.line).length,
            });
        }
        return activeLeaf.view.sourceMode.get();
    };
    CompletedAreaPlugin.prototype.getSelectedText = function (editor) {
        if (editor.somethingSelected()) {
            // Toggle to-dos under the selection
            var cursorStart = editor.getCursor(true);
            var cursorEnd = editor.getCursor(false);
            var content = editor.getRange({ line: cursorStart.line, ch: 0 }, { line: cursorEnd.line, ch: editor.getLine(cursorEnd.line).length });
            return {
                start: { line: cursorStart.line, ch: 0 },
                end: {
                    line: cursorEnd.line,
                    ch: editor.getLine(cursorEnd.line).length,
                },
                content: content,
            };
        }
        else {
            // Toggle the todo in the line
            var lineNr = editor.getCursor().line;
            var contents = editor.getDoc().getLine(lineNr);
            var cursorStart = {
                line: lineNr,
                ch: 0,
            };
            var cursorEnd = {
                line: lineNr,
                ch: contents.length,
            };
            var content = editor.getRange(cursorStart, cursorEnd);
            return { start: cursorStart, end: cursorEnd, content: content };
        }
    };
    return CompletedAreaPlugin;
}(obsidian.Plugin));

module.exports = CompletedAreaPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9Db21wbGV0ZWRBcmVhU2V0dGluZ1RhYi50cyIsInNyYy9Db21wbGV0ZWRBcmVhU2V0dGluZy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7XG5cdEFwcCxcblx0UGx1Z2luU2V0dGluZ1RhYixcblx0U2V0dGluZyxcblx0Tm90aWNlLFxuXHREcm9wZG93bkNvbXBvbmVudCxcbn0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgQ29tcGxldGVkQXJlYVBsdWdpbiBmcm9tIFwiLi9tYWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsZXRlZEFyZWFTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBDb21wbGV0ZWRBcmVhUGx1Z2luO1xuXHRwdWJsaWMgZGVmYXVsdEhlYWRlckxldmVsID0gXCIyXCI7XG5cdHB1YmxpYyBkZWZhdWx0SGVhZGVyTmFtZSA9IFwiQ29tcGxldGVkXCI7XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ29tcGxldGVkQXJlYVBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0bGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJIZWFkZXIgbGV2ZWxcIilcblx0XHRcdC5zZXREZXNjKFwibnVtYmVyIG9mIGAjYHMgaW4gdGhlIGhlYWRlci5cIilcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKHRoaXMuZGVmYXVsdEhlYWRlckxldmVsKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5nLmNvbXBsZXRlZEFyZWFIaWVyYXJjaHkpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuaXNIaWVyYXJjaHlWYWxpZCh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZy5jb21wbGV0ZWRBcmVhSGllcmFyY2h5ID1cblx0XHRcdFx0XHRcdFx0XHR2YWx1ZSB8fCB0aGlzLmRlZmF1bHRIZWFkZXJMZXZlbDtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZykudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0dGV4dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0bmV3IE5vdGljZShcIkhlYWRlciBsZXZlbCdzIG51bWJlciBub3QgdmFsaWQhXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIkhlYWRlciBuYW1lXCIpXG5cdFx0XHQuc2V0RGVzYyhcIndoZXJlIHRoZSBjb21wbGV0ZWQgaXRlbXMgYmUgZXh0cmFjdGVkIHRvLlwiKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIodGhpcy5kZWZhdWx0SGVhZGVyTmFtZSlcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZy5jb21wbGV0ZWRBcmVhTmFtZSlcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5nLmNvbXBsZXRlZEFyZWFOYW1lID1cblx0XHRcdFx0XHRcdFx0dmFsdWUgfHwgdGhpcy5kZWZhdWx0SGVhZGVyTmFtZTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmcpO1xuXHRcdFx0XHRcdFx0dGV4dC5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiU2hvdyBpY29uIG9uIGxlZnQgc2lkZWJhclwiKVxuXHRcdFx0LmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5nLnNob3dJY29uKS5vbkNoYW5nZSgodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5nLnNob3dJY29uID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZyk7XG5cdFx0XHRcdFx0bmV3IE5vdGljZShcblx0XHRcdFx0XHRcdGBSZWxvYWQgdGhlIGFwcCB0byBzZWUgaWNvbiAke3ZhbHVlID8gXCJhZGRlZFwiIDogXCJyZW1vdmVkXCJ9LmBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHR9XG5cblx0aXNIaWVyYXJjaHlWYWxpZChoaWVyYXJjaHlMZXZlbDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgdmFsaWRMZXZlbHMgPSBbMSwgMiwgMywgNCwgNSwgNl07XG5cdFx0Zm9yIChsZXQgdmFsaWROdW0gb2YgdmFsaWRMZXZlbHMpIHtcblx0XHRcdGlmIChOdW1iZXIoaGllcmFyY2h5TGV2ZWwpID09PSB2YWxpZE51bSB8fCBoaWVyYXJjaHlMZXZlbCA9PT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGV0ZWRBcmVhU2V0dGluZyB7XG5cdHB1YmxpYyBjb21wbGV0ZWRBcmVhSGllcmFyY2h5OiBzdHJpbmc7XG5cdHB1YmxpYyBjb21wbGV0ZWRBcmVhTmFtZTogc3RyaW5nO1xuXHRwdWJsaWMgdG9kb0FyZWFOYW1lOiBzdHJpbmc7XG5cdHB1YmxpYyBzaG93SWNvbjogYm9vbGVhbjtcblx0cHVibGljIHNvcnRlZEJ5OiBzdHJpbmc7XG5cdHB1YmxpYyBob3RrZXk6IHsgZmlyc3Q6IHN0cmluZzsgc2Vjb25kOiBzdHJpbmc7IHRoaXJkOiBzdHJpbmcgfTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNvbXBsZXRlZEFyZWFIaWVyYXJjaHkgPSBcIjJcIjtcblx0XHR0aGlzLmNvbXBsZXRlZEFyZWFOYW1lID0gXCJDb21wbGV0ZWRcIjtcblx0XHR0aGlzLnRvZG9BcmVhTmFtZSA9IFwiVG9kb1wiO1xuXHRcdHRoaXMuc2hvd0ljb24gPSB0cnVlO1xuXHRcdHRoaXMuc29ydGVkQnkgPSBcIkFzY1wiO1xuXHR9XG59XG4iLCJpbXBvcnQgQ29tcGxldGVkQXJlYVNldHRpbmdUYWIgZnJvbSBcIi4vQ29tcGxldGVkQXJlYVNldHRpbmdUYWJcIjtcbmltcG9ydCBDb21wbGV0ZWRBcmVhU2V0dGluZyBmcm9tIFwiLi9Db21wbGV0ZWRBcmVhU2V0dGluZ1wiO1xuaW1wb3J0IHsgUGx1Z2luLCBOb3RpY2UsIGFkZEljb24gfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuYWRkSWNvbihcblx0XCJjb21wbGV0ZWQtYXJlYVwiLFxuXHQnPGcgaWQ9XCJpY29uXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj48cmVjdCBpZD1cIlJlY3RhbmdsZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjhcIiB4PVwiMjBcIiB5PVwiMjBcIiB3aWR0aD1cIjYwXCIgaGVpZ2h0PVwiNjBcIiByeD1cIjEwXCI+PC9yZWN0PjxwYXRoIGQ9XCJNNjguNzE1Mzg1NywzMy41MDMzMDc5IEw3Mi4wOTAzNjk3LDM1Ljg4NTg2NDggQzcyLjU0MTU1NTEsMzYuMjA0Mzc3MyA3Mi42NDkxMDc2LDM2LjgyODM0MDcgNzIuMzMwNTk1MSwzNy4yNzk1MjYxIEw3Mi4yNjQxNTg2LDM3LjM2MzY3MDggTDQ4LjcyMDQyNiw2NC4xMDEwMzk4IEM0Ni41MzA1MTk1LDY2LjU4ODAwMDUgNDIuNzM5MTY5NSw2Ni44Mjg4MTA1IDQwLjI1MjIwODgsNjQuNjM4OTA0IEM0MC4xMjU4NDkxLDY0LjUyNzYzNzMgNDAuMDA0MjI4Nyw2NC40MTExMDExIDM5Ljg4NzY3MDYsNjQuMjg5NjA1MSBMMjguNjA1NjUzMyw1Mi41Mjk2MjU5IEMyOC4yNTg4NzMsNTIuMTY4MTU0MyAyOC4yMzMwNDA0LDUxLjYwNTg3NDEgMjguNTQ1MjE1OCw1MS4yMTQxMjgzIEwzMS45ODM3NTU5LDQ2Ljg5OTEzOSBDMzIuMzI3OTQzOCw0Ni40NjcyMjEgMzIuOTU3MTAxOSw0Ni4zOTYxMDE4IDMzLjM4OTAxOTksNDYuNzQwMjg5NyBDMzMuNDI3NDA1Niw0Ni43NzA4Nzg2IDMzLjQ2MzQ4NzEsNDYuODA0MjUyMSAzMy40OTY5NzE5LDQ2Ljg0MDEzOTYgTDQyLjgzODE3NTQsNTYuODUxNjMyNSBDNDMuNTkxNzIwMiw1Ny42NTkyNDg4IDQ0Ljg1NzI5MTMsNTcuNzAzMDgyNSA0NS42NjQ5MDc2LDU2Ljk0OTUzNzcgTDQ1Ljc2MzI3NDYsNTYuODUxMTM3NCBMNjcuNDA3Mjc3NCwzMy42MzgyOTIxIEM2Ny43NDgyNTIxLDMzLjI3MjYwMjIgNjguMzA2OTE5OCwzMy4yMTQ5NTMxIDY4LjcxNTM4NTcsMzMuNTAzMzA3OSBaXCIgaWQ9XCJQYXRoXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIj48L3BhdGg+PC9nPidcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsZXRlZEFyZWFQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRwdWJsaWMgc2V0dGluZzogQ29tcGxldGVkQXJlYVNldHRpbmc7XG5cdHB1YmxpYyBjb21wbGV0ZWRJdGVtUmVneDogUmVnRXhwID0gLyhcXG4/LSBcXFt4XFxdIC4qKS9nO1xuXHRwdWJsaWMgY29tcGxldGVkQXJlYUhlYWRlcjogc3RyaW5nO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHR0aGlzLnNldHRpbmcgPSBuZXcgQ29tcGxldGVkQXJlYVNldHRpbmcoKTtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5nKCk7XG5cblx0XHRpZiAodGhpcy5zZXR0aW5nLnNob3dJY29uKSB7XG5cdFx0XHR0aGlzLmFkZFJpYmJvbkljb24oXCJjb21wbGV0ZWQtYXJlYVwiLCBcIkNvbXBsZXRlZCBBcmVhXCIsICgpID0+IHtcblx0XHRcdFx0dGhpcy5lZGl0U291cmNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwiY29tcGxldGVkLWFyZWEtc2hvcnRjdXRcIixcblx0XHRcdG5hbWU6IFwiRXh0cmFjdGVkIGNvbXBsZXRlZCBpdGVtcy5cIixcblx0XHRcdGhvdGtleXM6IFt7IG1vZGlmaWVyczogW1wiQ3RybFwiXSwga2V5OiBcIkVudGVyXCIgfV0sXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVkaXRTb3VyY2UoKTtcblx0XHRcdH0sXG5cdFx0fSk7XG5cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IENvbXBsZXRlZEFyZWFTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cdH1cblxuXHRhc3luYyBsb2FkU2V0dGluZygpIHtcblx0XHRjb25zdCBsb2FkZWRTZXR0aW5nID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpO1xuXHRcdGlmIChsb2FkZWRTZXR0aW5nKSB7XG5cdFx0XHR0aGlzLnNldHRpbmcuY29tcGxldGVkQXJlYUhpZXJhcmNoeSA9XG5cdFx0XHRcdGxvYWRlZFNldHRpbmcuY29tcGxldGVkQXJlYUhpZXJhcmNoeTtcblx0XHRcdHRoaXMuc2V0dGluZy5jb21wbGV0ZWRBcmVhTmFtZSA9IGxvYWRlZFNldHRpbmcuY29tcGxldGVkQXJlYU5hbWU7XG5cdFx0XHR0aGlzLnNldHRpbmcudG9kb0FyZWFOYW1lID0gbG9hZGVkU2V0dGluZy50b2RvQXJlYU5hbWU7XG5cdFx0XHR0aGlzLnNldHRpbmcuc2hvd0ljb24gPSBsb2FkZWRTZXR0aW5nLnNob3dJY29uO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZyk7XG5cdFx0fVxuXHR9XG5cblx0ZWRpdFNvdXJjZSgpIHtcblx0XHRjb25zdCBhY3RpdmVMZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPz8gbnVsbDtcblx0XHRpZiAoYWN0aXZlTGVhZikge1xuXHRcdFx0Y29uc3Qgc291cmNlID0gYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGU7XG5cdFx0XHRjb25zdCBzb3VyY2VUZXh0ID0gc291cmNlLmdldCgpO1xuXG5cdFx0XHRjb25zdCB0b2RvUmVneCA9IC8tXFxzXFxbW1xcc3hdXFxdXFxzL2dpO1xuXHRcdFx0Y29uc3QgdG9nZ2xlZFRleHQgPSB0aGlzLnRvZ2dsZUVsZW1lbnQodG9kb1JlZ3gsIHRoaXMucmVwbGFjZVRvZG8pO1xuXHRcdFx0Y29uc3QgY29tcGxldGVkSXRlbXMgPSB0aGlzLmV4dHJhY3RDb21wbGV0ZWRJdGVtcyh0b2dnbGVkVGV4dCkgPz8gbnVsbDtcblx0XHRcdGlmIChjb21wbGV0ZWRJdGVtcykge1xuXHRcdFx0XHRjb25zdCBuZXdUZXh0ID0gdGhpcy5yZWZhY3RvckNvbnRlbnQodG9nZ2xlZFRleHQsIGNvbXBsZXRlZEl0ZW1zKTtcblx0XHRcdFx0c291cmNlLnNldChuZXdUZXh0LCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5ldyBOb3RpY2UoXCJQbGVhc2UgYWN0aXZlIGEgbGVhZiBmaXJzdC5cIik7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVRvZG8oc3RhcnRXaXRoOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RhcnRXaXRoID09PSBcIi0gWyBdIFwiID8gXCItIFt4XSBcIiA6IFwiLSBbIF0gXCI7XG5cdH1cblxuXHRleHRyYWN0Q29tcGxldGVkSXRlbXModGV4dDogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB8IHZvaWQge1xuXHRcdGxldCBjb21wbGV0ZWRJdGVtczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG5cdFx0aWYgKHRleHQpIHtcblx0XHRcdGNvbXBsZXRlZEl0ZW1zID0gdGV4dC5tYXRjaCh0aGlzLmNvbXBsZXRlZEl0ZW1SZWd4KTtcblxuXHRcdFx0aWYgKCFjb21wbGV0ZWRJdGVtcykge1xuXHRcdFx0XHRuZXcgTm90aWNlKFwiTm8gY29tcGxldGVkIHRvZG9zIGZvdW5kLlwiKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY29tcGxldGVkSXRlbXM7XG5cdFx0fVxuXHR9XG5cblx0cmVmYWN0b3JDb250ZW50KGNvbnRlbnQ6IHN0cmluZywgaXRlbXM6IEFycmF5PHN0cmluZz4pOiBzdHJpbmcge1xuXHRcdGNvbnN0IGNvbXBsZXRlZEFyZWEgPSB0aGlzLmZvcm1hdEl0ZW1zKGl0ZW1zLCBjb250ZW50KTtcblx0XHRjb25zb2xlLmxvZyhjb21wbGV0ZWRBcmVhKTtcblx0XHRjb25zdCBoZWFkZXIgPSB0aGlzLmNvbXBsZXRlZEFyZWFIZWFkZXIudHJpbVN0YXJ0KCk7XG5cdFx0bGV0IG5ld0NvbnRlbnQgPSBjb250ZW50XG5cdFx0XHQucmVwbGFjZSh0aGlzLmNvbXBsZXRlZEl0ZW1SZWd4LCBcIlwiKSAvLyBSZW1vdmUgY29tcGxldGVkIGl0ZW1zIGluIG1haW4gdGV4dFxuXHRcdFx0LnRyaW1TdGFydCgpXG5cdFx0XHQudHJpbUVuZCgpO1xuXHRcdHJldHVybiB0aGlzLmlzQ29tcGxldGVkQXJlYUV4aXN0ZWQoY29udGVudClcblx0XHRcdD8gbmV3Q29udGVudC5yZXBsYWNlKGhlYWRlciwgYCR7aGVhZGVyfSR7Y29tcGxldGVkQXJlYX1gKVxuXHRcdFx0OiBuZXdDb250ZW50ICsgY29tcGxldGVkQXJlYTtcblx0fVxuXG5cdGZvcm1hdEl0ZW1zKGl0ZW1zOiBBcnJheTxzdHJpbmc+LCBjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGxldCBjb21wbGV0ZWRBcmVhID0gXCJcIjtcblx0XHRjb25zdCBoZWFkZXIgPSB0aGlzLm1ha2VDb21wbGV0ZWRIZWFkZXIoY29udGVudCk7XG5cdFx0aXRlbXNbMF0gPSAoaXRlbXNbMF1bMF0gPT09IFwiXFxuXCIgPyBcIlwiIDogXCJcXG5cIikgKyBpdGVtc1swXTtcblxuXHRcdGNvbXBsZXRlZEFyZWEgPSBpdGVtcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHtcblx0XHRcdHJldHVybiBwcmV2ICsgY3VycmVudDtcblx0XHR9LCBoZWFkZXIpO1xuXG5cdFx0cmV0dXJuIGNvbXBsZXRlZEFyZWE7XG5cdH1cblxuXHRtYWtlQ29tcGxldGVkSGVhZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0dGhpcy5jb21wbGV0ZWRBcmVhSGVhZGVyID1cblx0XHRcdFwiXFxuXCIgK1xuXHRcdFx0XCIjXCIucmVwZWF0KE51bWJlcih0aGlzLnNldHRpbmcuY29tcGxldGVkQXJlYUhpZXJhcmNoeSkpICtcblx0XHRcdGAgJHt0aGlzLnNldHRpbmcuY29tcGxldGVkQXJlYU5hbWV9YDtcblxuXHRcdHJldHVybiB0aGlzLmlzQ29tcGxldGVkQXJlYUV4aXN0ZWQoY29udGVudClcblx0XHRcdD8gXCJcIiAvLyBpZiBjb21wbGV0ZWQgaGVhZGVyIGFscmVhZHkgZXhpc3RzXG5cdFx0XHQ6IHRoaXMuY29tcGxldGVkQXJlYUhlYWRlcjtcblx0fVxuXG5cdGlzQ29tcGxldGVkQXJlYUV4aXN0ZWQoY29udGVudDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhY29udGVudC5tYXRjaChSZWdFeHAodGhpcy5jb21wbGV0ZWRBcmVhSGVhZGVyKSk7XG5cdH1cblxuXHR0b2dnbGVFbGVtZW50KHJlOiBSZWdFeHAsIHN1YnN0OiBhbnkpOiBzdHJpbmcge1xuXHRcdHZhciBhY3RpdmVMZWFmOiBhbnkgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcblx0XHR2YXIgZWRpdG9yID0gYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XG5cdFx0dmFyIHNlbGVjdGlvbiA9IGVkaXRvci5zb21ldGhpbmdTZWxlY3RlZCgpO1xuXHRcdHZhciBzZWxlY3RlZFRleHQgPSB0aGlzLmdldFNlbGVjdGVkVGV4dChlZGl0b3IpO1xuXG5cdFx0dmFyIG5ld1N0cmluZyA9IHNlbGVjdGVkVGV4dC5jb250ZW50LnJlcGxhY2UocmUsIHN1YnN0KTtcblx0XHRlZGl0b3IucmVwbGFjZVJhbmdlKG5ld1N0cmluZywgc2VsZWN0ZWRUZXh0LnN0YXJ0LCBzZWxlY3RlZFRleHQuZW5kKTtcblxuXHRcdC8vIEtlZXAgY3Vyc29yIGluIHRoZSBzYW1lIHBsYWNlXG5cdFx0aWYgKHNlbGVjdGlvbikge1xuXHRcdFx0ZWRpdG9yLnNldFNlbGVjdGlvbihzZWxlY3RlZFRleHQuc3RhcnQsIHtcblx0XHRcdFx0bGluZTogc2VsZWN0ZWRUZXh0LmVuZC5saW5lLFxuXHRcdFx0XHRjaDogZWRpdG9yLmdldExpbmUoc2VsZWN0ZWRUZXh0LmVuZC5saW5lKS5sZW5ndGgsXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuZ2V0KCk7XG5cdH1cblxuXHRnZXRTZWxlY3RlZFRleHQoZWRpdG9yOiBhbnkpIHtcblx0XHRpZiAoZWRpdG9yLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcblx0XHRcdC8vIFRvZ2dsZSB0by1kb3MgdW5kZXIgdGhlIHNlbGVjdGlvblxuXHRcdFx0bGV0IGN1cnNvclN0YXJ0ID0gZWRpdG9yLmdldEN1cnNvcih0cnVlKTtcblx0XHRcdGxldCBjdXJzb3JFbmQgPSBlZGl0b3IuZ2V0Q3Vyc29yKGZhbHNlKTtcblx0XHRcdGxldCBjb250ZW50ID0gZWRpdG9yLmdldFJhbmdlKFxuXHRcdFx0XHR7IGxpbmU6IGN1cnNvclN0YXJ0LmxpbmUsIGNoOiAwIH0sXG5cdFx0XHRcdHsgbGluZTogY3Vyc29yRW5kLmxpbmUsIGNoOiBlZGl0b3IuZ2V0TGluZShjdXJzb3JFbmQubGluZSkubGVuZ3RoIH1cblx0XHRcdCk7XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN0YXJ0OiB7IGxpbmU6IGN1cnNvclN0YXJ0LmxpbmUsIGNoOiAwIH0sXG5cdFx0XHRcdGVuZDoge1xuXHRcdFx0XHRcdGxpbmU6IGN1cnNvckVuZC5saW5lLFxuXHRcdFx0XHRcdGNoOiBlZGl0b3IuZ2V0TGluZShjdXJzb3JFbmQubGluZSkubGVuZ3RoLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjb250ZW50OiBjb250ZW50LFxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVG9nZ2xlIHRoZSB0b2RvIGluIHRoZSBsaW5lXG5cdFx0XHR2YXIgbGluZU5yID0gZWRpdG9yLmdldEN1cnNvcigpLmxpbmU7XG5cdFx0XHR2YXIgY29udGVudHMgPSBlZGl0b3IuZ2V0RG9jKCkuZ2V0TGluZShsaW5lTnIpO1xuXHRcdFx0bGV0IGN1cnNvclN0YXJ0ID0ge1xuXHRcdFx0XHRsaW5lOiBsaW5lTnIsXG5cdFx0XHRcdGNoOiAwLFxuXHRcdFx0fTtcblx0XHRcdGxldCBjdXJzb3JFbmQgPSB7XG5cdFx0XHRcdGxpbmU6IGxpbmVOcixcblx0XHRcdFx0Y2g6IGNvbnRlbnRzLmxlbmd0aCxcblx0XHRcdH07XG5cdFx0XHRsZXQgY29udGVudCA9IGVkaXRvci5nZXRSYW5nZShjdXJzb3JTdGFydCwgY3Vyc29yRW5kKTtcblx0XHRcdHJldHVybiB7IHN0YXJ0OiBjdXJzb3JTdGFydCwgZW5kOiBjdXJzb3JFbmQsIGNvbnRlbnQ6IGNvbnRlbnQgfTtcblx0XHR9XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiTm90aWNlIiwiUGx1Z2luU2V0dGluZ1RhYiIsImFkZEljb24iLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekss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
