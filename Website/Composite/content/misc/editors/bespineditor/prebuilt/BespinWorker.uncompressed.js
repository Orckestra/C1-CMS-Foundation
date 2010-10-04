;bespin.tiki.register("::syntax_worker", {
    name: "syntax_worker",
    dependencies: { "syntax_directory": "0.0.0", "underscore": "0.0.0" }
});
bespin.tiki.module("syntax_worker:index",function(require,exports,module) {
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "Coordinates multiple syntax engines",
    "environments": { "worker": true },
    "dependencies": { "syntax_directory": "0.0.0", "underscore": "0.0.0" }
});
"end";

var promise = require('bespin:promise');
var _ = require('underscore')._;
var console = require('bespin:console').console;
var syntaxDirectory = require('syntax_directory').syntaxDirectory;

var syntaxWorker = {
    engines: {},

    annotate: function(state, lines, range) {
        function splitParts(str) { return str.split(":"); }
        function saveState() {
            states.push(_(stateStack).invoke('join', ":").join(" "));
        }

        var engines = this.engines;
        var states = [], attrs = [], symbols = [];
        var stateStack = _(state.split(" ")).map(splitParts);

        _(lines).each(function(line, offset) {
            saveState();

            var lineAttrs = [], lineSymbols = {};
            var col = 0;
            while (col < line.length) {
                // Check for the terminator string.
                // FIXME: This is wrong. It should check *inside* the token
                // that was just parsed as well.
                var curState;
                while (true) {
                    curState = _(stateStack).last();
                    if (curState.length < 3) {
                        break;
                    }

                    var term = curState[2];
                    if (line.substring(col, col + term.length) !== term) {
                        break;
                    }

                    stateStack.pop();
                }

                var context = curState[0];
                var result = engines[context].get(curState, line, col);
                var token;
                if (result == null) {
                    token = {
                        state: 'plain',
                        tag: 'plain',
                        start: col,
                        end: line.length
                    };
                } else {
                    stateStack[stateStack.length - 1] = result.state;
                    if (result.hasOwnProperty('newContext')) {
                        stateStack.push(result.newContext);
                    }

                    token = result.token;

                    var sym = result.symbol;
                    if (sym != null) {
                        lineSymbols["-" + sym[0]] = sym[1];
                    }
                }

                lineAttrs.push(token);
                col = token.end;
            }

            attrs.push(lineAttrs);
            symbols.push(lineSymbols);
        });

        saveState();

        return { states: states, attrs: attrs, symbols: symbols };
    },

    loadSyntax: function(syntaxName) {
        var pr = new promise.Promise;

        var engines = this.engines;
        if (engines.hasOwnProperty(syntaxName)) {
            pr.resolve();
            return pr;
        }

        var info = syntaxDirectory.get(syntaxName);
        if (info == null) {
            throw new Error('No syntax engine installed for syntax "' +
                syntaxName + '".');
        }

        info.extension.load().then(function(engine) {
            engines[syntaxName] = engine;

            var subsyntaxes = engine.subsyntaxes;
            if (subsyntaxes == null) {
                pr.resolve();
                return;
            }

            var pr2 = promise.group(_(subsyntaxes).map(this.loadSyntax, this));
            pr2.then(_(pr.resolve).bind(pr));
        }.bind(this));

        return pr;
    }
};

exports.syntaxWorker = syntaxWorker;


});
;bespin.tiki.register("::stylesheet", {
    name: "stylesheet",
    dependencies: { "standard_syntax": "0.0.0" }
});
bespin.tiki.module("stylesheet:index",function(require,exports,module) {
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "CSS syntax highlighter",
    "dependencies": {
        "standard_syntax": "0.0.0"
    },
    "environments": {
        "worker": true
    },
    "provides": [
        {
            "ep": "syntax",
            "name": "css",
            "pointer": "#CSSSyntax",
            "fileexts": [ "css", "less" ]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var StandardSyntax = require('standard_syntax').StandardSyntax;

var COMMENT_REGEXP = {
    regex:  /^\/\/.*/,
    tag:    'comment'
};

var createCommentState = function(jumpBackState) {
    return [
        {
            regex:  /^[^*\/]+/,
            tag:    'comment'
        },
        {
            regex:  /^\*\//,
            tag:    'comment',
            then:   jumpBackState
        },
        {
            regex:  /^[*\/]/,
            tag:    'comment'
        }
    ];
};

var states = {
    start: [
        {
            //style names
            regex:  /^([a-zA-Z-\s]*)(?:\:)/,
            tag:    'identifier',
            then:   'style'
        },
        {
            //tags
            regex:  /^([\w]+)(?![a-zA-Z0-9_:])([,|{]*?)(?!;)(?!(;|%))/,
            tag:    'keyword',
            then:   'header'
        },
        {
            //id
            regex:  /^#([a-zA-Z]*)(?=.*{*?)/,
            tag:    'keyword',
            then:   'header'
        },
        {
            //classes
            regex:  /^\.([a-zA-Z]*)(?=.*{*?)/,
            tag:    'keyword',
            then:   'header'
        },
            COMMENT_REGEXP,
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment'
        },
        {
            regex:  /^./,
            tag:    'plain'
        }
    ],

    header: [
        {
            regex:  /^[^{|\/\/|\/\*]*/,
            tag:    'keyword',
            then:   'start'
        },
            COMMENT_REGEXP,
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment_header'
        }
    ],

    style: [
        {
            regex:  /^[^;|}|\/\/|\/\*]+/,
            tag:    'plain'
        },
        {
            regex:  /^;|}/,
            tag:    'plain',
            then:   'start'
        },
            COMMENT_REGEXP,
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment_style'
        }
    ],

    comment:        createCommentState('start'),
    comment_header: createCommentState('header'),
    comment_style:  createCommentState('style')
};

exports.CSSSyntax = new StandardSyntax(states);

});
;bespin.tiki.register("::html", {
    name: "html",
    dependencies: { "standard_syntax": "0.0.0" }
});
bespin.tiki.module("html:index",function(require,exports,module) {
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "HTML syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "html",
            "pointer": "#HTMLSyntax",
            "fileexts": [ "htm", "html" ]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {};

//
// This parser is modeled on the WHATWG HTML 5 specification, with some
// simplifications to improve performance. See the relevant spec here:
//
//     http://www.whatwg.org/specs/web-apps/current-work/
//

var createTagStates = function(prefix, interiorActions) {
    states[prefix + '_beforeAttrName'] = [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^\//,
            tag:    'operator',
            then:   prefix + '_selfClosingStartTag'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   interiorActions
        },
        {
            regex:  /^./,
            tag:    'keyword',
            then:   prefix + '_attrName'
        }
    ];

    // 10.2.4.35 Attribute name state
    states[prefix + '_attrName'] = [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   prefix + '_afterAttrName'
        },
        {
            regex:  /^\//,
            tag:    'operator',
            then:   prefix + '_selfClosingStartTag'
        },
        {
            regex:  /^=/,
            tag:    'operator',
            then:   prefix + '_beforeAttrValue'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   interiorActions
        },
        {
            regex:  /^["'<]+/,
            tag:    'error'
        },
        {
            regex:  /^[^ \t\n\/=>"'<]+/,
            tag:    'keyword'
        }
    ];

    states[prefix + '_afterAttrName'] = [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^\//,
            tag:    'operator',
            then:   prefix + '_selfClosingStartTag'
        },
        {
            regex:  /^=/,
            tag:    'operator',
            then:   prefix + '_beforeAttrValue'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   interiorActions
        },
        {
            regex:  /^./,
            tag:    'keyword',
            then:   prefix + '_attrName'
        }
    ];

    states[prefix + '_beforeAttrValue'] = [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^"/,
            tag:    'string',
            then:   prefix + '_attrValueQQ'
        },
        {
            regex:  /^(?=&)/,
            tag:    'plain',
            then:   prefix + '_attrValueU'
        },
        {
            regex:  /^'/,
            tag:    'string',
            then:   prefix + '_attrValueQ'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   interiorActions
        },
        {
            regex:  /^./,
            tag:    'string',
            then:   prefix + '_attrValueU'
        }
    ];

    states[prefix + '_attrValueQQ'] = [
        {
            regex:  /^"/,
            tag:    'string',
            then:   prefix + '_afterAttrValueQ'
        },
        {
            regex:  /^[^"]+/,
            tag:    'string'
        }
    ];

    states[prefix + '_attrValueQ'] = [
        {
            regex:  /^'/,
            tag:    'string',
            then:   prefix + '_afterAttrValueQ'
        },
        {
            regex:  /^[^']+/,
            tag:    'string'
        }
    ];

    states[prefix + '_attrValueU'] = [
        {
            regex:  /^\s/,
            tag:    'string',
            then:   prefix + '_beforeAttrName'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   interiorActions
        },
        {
            regex:  /[^ \t\n>]+/,
            tag:    'string'
        }
    ];

    states[prefix + '_afterAttrValueQ'] = [
        {
            regex:  /^\s/,
            tag:    'plain',
            then:   prefix + '_beforeAttrName'
        },
        {
            regex:  /^\//,
            tag:    'operator',
            then:   prefix + '_selfClosingStartTag'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   interiorActions
        },
        {
            regex:  /^(?=.)/,
            tag:    'operator',
            then:   prefix + '_beforeAttrName'
        }
    ];

    // 10.2.4.43 Self-closing start tag state
    states[prefix + '_selfClosingStartTag'] = [
        {
            regex:  /^>/,
            tag:    'operator',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   prefix + '_beforeAttrName'
        }
    ];
};

states = {
    // 10.2.4.1 Data state
    start: [
        {
            regex:  /^[^<]+/,
            tag:    'plain'
        },
        {
            regex:  /^<!--/,
            tag:    'comment',
            then:   'commentStart'
        },
        {
            regex:  /^<!/,
            tag:    'directive',
            then:   'markupDeclarationOpen'
        },
        {
            regex:  /^<\?/,
            tag:    'comment',
            then:   'bogusComment'
        },
        {
            regex:  /^</,
            tag:    'operator',
            then:   'tagOpen'
        }
    ],

    // 10.2.4.8 Tag open state
    tagOpen: [
        {
            regex:  /^\//,
            tag:    'operator',
            then:   'endTagOpen'
        },
        {
            regex:  /^script/i,
            tag:    'keyword',
            then:   'script_beforeAttrName'
        },
        {
            regex:  /^[a-zA-Z]/,
            tag:    'keyword',
            then:   'tagName'
        },
        {
            regex:  /^(?=.)/,
            tag:    'plain',
            then:   'start'
        }
    ],

    // 10.2.4.6 Script data state
    scriptData: [
        {
            regex:  /^<(?=\/script>)/i,
            tag:    'operator',
            then:   'tagOpen'
        },
        {
            regex:  /^[^<]+/,
            tag:    'plain'
        }
    ],

    // 10.2.4.9 End tag open state
    endTagOpen: [
        {
            regex:  /^[a-zA-Z]/,
            tag:    'keyword',
            then:   'tagName'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusComment'
        }
    ],

    // 10.2.4.10 Tag name state
    tagName: [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'normal_beforeAttrName'
        },
        {
            regex:  /^\//,
            tag:    'operator',
            then:   'normal_selfClosingStartTag'
        },
        {
            regex:  /^>/,
            tag:    'operator',
            then:   'start'
        },
        {
            regex:  /^[^ \t\n\/>]+/,
            tag:    'keyword'
        }
    ],

    // 10.2.4.44 Bogus comment state
    bogusComment: [
        {
            regex:  /^[^>]+/,
            tag:    'comment'
        },
        {
            regex:  /^>/,
            tag:    'comment',
            then:   'start'
        }
    ],

    // 10.2.4.45 Markup declaration open state
    markupDeclarationOpen: [
        {
            regex:  /^doctype/i,
            tag:    'directive',
            then:   'doctype'
        },
        {
            regex:  /^(?=.)/,
            tag:    'comment',
            then:   'bogusComment'
        }
    ],

    // 10.2.4.46 Comment start state
    commentStart: [
        {
            regex:  /^-->/,
            tag:    'comment',
            then:   'start'
        },
        {
            regex:  /^[^-]+/,
            tag:    'comment'
        }
    ],

    // 10.2.4.53 DOCTYPE state
    doctype: [
        {
            regex:  /^\s/,
            tag:    'plain',
            then:   'beforeDoctypeName'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'beforeDoctypeName'
        }
    ],

    // 10.2.4.54 Before DOCTYPE name state
    beforeDoctypeName: [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'directive',
            then:   'doctypeName'
        }
    ],

    // 10.2.4.55 DOCTYPE name state
    doctypeName: [
        {
            regex:  /^\s/,
            tag:    'plain',
            then:   'afterDoctypeName'
        },
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^[^ \t\n>]+/,
            tag:    'directive'
        }
    ],

    // 10.2.4.56 After DOCTYPE name state
    afterDoctypeName: [
        {
            regex:  /^\s+/,
            tag:    'directive'
        },
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^public/i,
            tag:    'directive',
            then:   'afterDoctypePublicKeyword'
        },
        {
            regex:  /^system/i,
            tag:    'directive',
            then:   'afterDoctypeSystemKeyword'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.57 After DOCTYPE public keyword state
    afterDoctypePublicKeyword: [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'beforeDoctypePublicId'
        },
        {
            regex:  /^"/,
            tag:    'error',
            then:   'doctypePublicIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'error',
            then:   'doctypePublicIdQ'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.58 Before DOCTYPE public identifier
    beforeDoctypePublicId: [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^"/,
            tag:    'string',
            then:   'doctypePublicIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'string',
            then:   'doctypePublicIdQ'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.59 DOCTYPE public identifier (double-quoted) state
    doctypePublicIdQQ: [
        {
            regex:  /^"/,
            tag:    'string',
            then:   'afterDoctypePublicId'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^[^>"]+/,
            tag:    'string'
        }
    ],

    // 10.2.4.60 DOCTYPE public identifier (single-quoted) state
    doctypePublicIdQ: [
        {
            regex:  /^'/,
            tag:    'string',
            then:   'afterDoctypePublicId'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^[^>']+/,
            tag:    'string'
        }
    ],

    // 10.2.4.61 After DOCTYPE public identifier state
    afterDoctypePublicId: [
        {
            regex:  /^\s/,
            tag:    'plain',
            then:   'betweenDoctypePublicAndSystemIds'
        },
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^"/,
            tag:    'error',
            then:   'doctypeSystemIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'error',
            then:   'doctypeSystemIdQ'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.62 Between DOCTYPE public and system identifiers state
    betweenDoctypePublicAndSystemIds: [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'betweenDoctypePublicAndSystemIds'
        },
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^"/,
            tag:    'string',
            then:   'doctypeSystemIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'string',
            then:   'doctypeSystemIdQ'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.63 After DOCTYPE system keyword state
    afterDoctypeSystemKeyword: [
        {
            regex:  /^\s/,
            tag:    'plain',
            then:   'beforeDoctypeSystemId'
        },
        {
            regex:  /^"/,
            tag:    'error',
            then:   'doctypeSystemIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'error',
            then:   'doctypeSystemIdQ'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.64 Before DOCTYPE system identifier state
    beforeDoctypeSystemId: [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'beforeDoctypeSystemId'
        },
        {
            regex:  /^"/,
            tag:    'string',
            then:   'doctypeSystemIdQQ'
        },
        {
            regex:  /^'/,
            tag:    'string',
            then:   'doctypeSystemIdQ'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.65 DOCTYPE system identifier (double-quoted) state
    doctypeSystemIdQQ: [
        {
            regex:  /^"/,
            tag:    'string',
            then:   'afterDoctypeSystemId'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^[^">]+/,
            tag:    'string'
        }
    ],

    // 10.2.4.66 DOCTYPE system identifier (single-quoted) state
    doctypeSystemIdQ: [
        {
            regex:  /^'/,
            tag:    'string',
            then:   'afterDoctypeSystemId'
        },
        {
            regex:  /^>/,
            tag:    'error',
            then:   'start'
        },
        {
            regex:  /^[^'>]+/,
            tag:    'string'
        }
    ],

    // 10.2.4.67 After DOCTYPE system identifier state
    afterDoctypeSystemId: [
        {
            regex:  /^\s+/,
            tag:    'plain'
        },
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^./,
            tag:    'error',
            then:   'bogusDoctype'
        }
    ],

    // 10.2.4.68 Bogus DOCTYPE state
    bogusDoctype: [
        {
            regex:  /^>/,
            tag:    'directive',
            then:   'start'
        },
        {
            regex:  /^[^>]+/,
            tag:    'directive'
        }
    ]
};

createTagStates('normal', 'start');
createTagStates('script', 'start js:start:</script>');

/**
 * This syntax engine exposes an HTML parser modeled on the WHATWG HTML 5
 * specification.
 */
exports.HTMLSyntax = new StandardSyntax(states, [ 'js' ]);


});
;bespin.tiki.register("::js_syntax", {
    name: "js_syntax",
    dependencies: { "standard_syntax": "0.0.0" }
});
bespin.tiki.module("js_syntax:index",function(require,exports,module) {
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "JavaScript syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "js",
            "pointer": "#JSSyntax",
            "fileexts": [ "js", "json" ]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
    start: [
        {
            regex:  /^var(?=\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*require\s*\(\s*['"]([^'"]*)['"]\s*\)\s*[;,])/,
            tag:    'keyword',
            symbol: '$1:$2'
        },
        {
            regex:  /^(?:break|case|catch|continue|default|delete|do|else|false|finally|for|function|if|in|instanceof|let|new|null|return|switch|this|throw|true|try|typeof|var|void|while|with)(?![a-zA-Z0-9_])/,
            tag:    'keyword'
        },
        {
            regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
            tag:    'plain'
        },
        {
            regex:  /^[^'"\/ \tA-Za-z0-9_]+/,
            tag:    'plain'
        },
        {
            regex:  /^[ \t]+/,
            tag:    'plain'
        },
        {
            regex:  /^'(?=.)/,
            tag:    'string',
            then:   'qstring'
        },
        {
            regex:  /^"(?=.)/,
            tag:    'string',
            then:   'qqstring'
        },
        {
            regex:  /^\/\/.*/,
            tag:    'comment'
        },
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment'
        },
        {
            regex:  /^./,
            tag:    'plain'
        }
    ],

    qstring: [
        {
            regex:  /^(?:\\.|[^'\\])*'?/,
            tag:    'string',
            then:   'start'
        }
    ],

    qqstring: [
        {
            regex:  /^(?:\\.|[^"\\])*"?/,
            tag:    'string',
            then:   'start'
        }
    ],

    comment: [
        {
            regex:  /^[^*\/]+/,
            tag:    'comment'
        },
        {
            regex:  /^\*\//,
            tag:    'comment',
            then:   'start'
        },
        {
            regex:  /^[*\/]/,
            tag:    'comment'
        }
    ]
};

exports.JSSyntax = new StandardSyntax(states);

});
;bespin.tiki.register("::standard_syntax", {
    name: "standard_syntax",
    dependencies: { "syntax_worker": "0.0.0", "syntax_directory": "0.0.0", "underscore": "0.0.0" }
});
bespin.tiki.module("standard_syntax:index",function(require,exports,module) {
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "Easy-to-use basis for syntax engines",
    "environments": { "worker": true },
    "dependencies": { 
        "syntax_directory": "0.0.0", 
        "underscore": "0.0.0",
        "syntax_worker": "0.0.0"
    }
});
"end";

var promise = require('bespin:promise');
var _ = require('underscore')._;
var console = require('bespin:console').console;
var syntaxDirectory = require('syntax_directory').syntaxDirectory;

exports.StandardSyntax = function(states, subsyntaxes) {
    this.states = states;
    this.subsyntaxes = subsyntaxes;
};

/** This syntax controller exposes a simple regex- and line-based parser. */
exports.StandardSyntax.prototype = {
    get: function(fullState, line, col) {
        var context = fullState[0], state = fullState[1];

        if (!this.states.hasOwnProperty(state)) {
            throw new Error('StandardSyntax: no such state "' + state + '"');
        }

        var str = line.substring(col);  // TODO: sticky flag where available
        var token = { start: col, state: fullState };

        var result = null;
        _(this.states[state]).each(function(alt) {
            var regex = alt.regex;
            var match = regex.exec(str);
            if (match == null) {
                return;
            }

            var len = match[0].length;
            token.end = col + len;
            token.tag = alt.tag;

            var newSymbol = null;
            if (alt.hasOwnProperty('symbol')) {
                var replace = function(_, n) { return match[n]; };
                var symspec = alt.symbol.replace(/\$([0-9]+)/g, replace);
                var symMatch = /^([^:]+):(.*)/.exec(symspec);
                newSymbol = [ symMatch[1], symMatch[2] ];
            }

            var nextState, newContext = null;
            if (alt.hasOwnProperty('then')) {
                var then = alt.then.split(" ");
                nextState = [ context, then[0] ];
                if (then.length > 1) {
                    newContext = then[1].split(":");
                }
            } else if (len === 0) {
                throw new Error("StandardSyntax: Infinite loop detected: " +
                    "zero-length match that didn't change state");
            } else {
                nextState = fullState;
            }

            result = { state: nextState, token: token, symbol: newSymbol };
            if (newContext != null) {
                result.newContext = newContext;
            }

            _.breakLoop();
        });

        return result;
    }
};


});
bespin.metadata = {"js_syntax": {"resourceURL": "resources/js_syntax/", "name": "js_syntax", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#JSSyntax", "ep": "syntax", "fileexts": ["js", "json"], "name": "js"}], "type": "plugins/supported", "description": "JavaScript syntax highlighter"}, "stylesheet": {"resourceURL": "resources/stylesheet/", "name": "stylesheet", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#CSSSyntax", "ep": "syntax", "fileexts": ["css", "less"], "name": "css"}], "type": "plugins/supported", "description": "CSS syntax highlighter"}, "syntax_worker": {"resourceURL": "resources/syntax_worker/", "description": "Coordinates multiple syntax engines", "environments": {"worker": true}, "dependencies": {"syntax_directory": "0.0.0", "underscore": "0.0.0"}, "testmodules": [], "type": "plugins/supported", "name": "syntax_worker"}, "standard_syntax": {"resourceURL": "resources/standard_syntax/", "description": "Easy-to-use basis for syntax engines", "environments": {"worker": true}, "dependencies": {"syntax_worker": "0.0.0", "syntax_directory": "0.0.0", "underscore": "0.0.0"}, "testmodules": [], "type": "plugins/supported", "name": "standard_syntax"}, "html": {"resourceURL": "resources/html/", "name": "html", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#HTMLSyntax", "ep": "syntax", "fileexts": ["htm", "html"], "name": "html"}], "type": "plugins/supported", "description": "HTML syntax highlighter"}};/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

if (typeof(window) !== 'undefined') {
    throw new Error('"worker.js can only be loaded in a web worker. Use the ' +
        '"worker_manager" plugin to instantiate web workers.');
}

var messageQueue = [];
var target = null;

if (typeof(bespin) === 'undefined') {
    bespin = {};
}

function pump() {
    if (messageQueue.length === 0) {
        return;
    }

    var msg = messageQueue[0];
    switch (msg.op) {
    case 'load':
        var base = msg.base;
        bespin.base = base;
        if (!bespin.hasOwnProperty('tiki')) {
            importScripts(base + "tiki.js");
        }
        if (!bespin.bootLoaded) {
            importScripts(base + "plugin/register/boot");
            bespin.bootLoaded = true;
        }

        var require = bespin.tiki.require;
        require.loader.sources[0].xhr = true;
        require.ensurePackage('::bespin', function() {
            var catalog = require('bespin:plugins').catalog;
            var Promise = require('bespin:promise').Promise;

            var pr;
            if (!bespin.hasOwnProperty('metadata')) {
                pr = catalog.loadMetadataFromURL("plugin/register/worker");
            } else {
                catalog.registerMetadata(bespin.metadata);
                pr = new Promise();
                pr.resolve();
            }

            pr.then(function() {
                require.ensurePackage(msg.pkg, function() {
                    var module = require(msg.module);
                    target = module[msg.target];
                    messageQueue.shift();
                    pump();
                });
            });
        });
        break;

    case 'invoke':
        function finish(result) {
            var resp = { op: 'finish', id: msg.id, result: result };
            postMessage(JSON.stringify(resp));
            messageQueue.shift();
            pump();
        }

        if (!target.hasOwnProperty(msg.method)) {
            throw new Error("No such method: " + msg.method);
        }

        var rv = target[msg.method].apply(target, msg.args);
        if (typeof(rv) === 'object' && rv.isPromise) {
            rv.then(finish, function(e) { throw e; });
        } else {
            finish(rv);
        }

        break;
    }
}

onmessage = function(ev) {
    messageQueue.push(JSON.parse(ev.data));
    if (messageQueue.length === 1) {
        pump();
    }
};

