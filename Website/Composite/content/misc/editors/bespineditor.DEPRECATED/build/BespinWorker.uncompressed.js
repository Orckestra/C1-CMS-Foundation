;bespin.tiki.register("::cs_syntax", {
    name: "cs_syntax",
    dependencies: { "standard_syntax": "0.0.0" }
});
bespin.tiki.module("cs_syntax:index",function(require,exports,module) {

/*
Modified from Bespin java_syntax.
Contribuitor: Marc McIntyre ( marchaos@gmail.com )
*/
"define metadata";
({
    "description": "C# syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cs",
            "pointer": "#CSSyntax",
            "fileexts": [ "cs"]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
    start: [
        {
            regex:  /^(?:abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)(?![a-zA-Z0-9_])/,
            tag:    'keyword'
        },
        {
        	// Generics
            regex:  /^<[A-Za-z_][A-Za-z0-9_]*>/,
        	tag:    'operator'
        },
        {
      	    regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
      	    tag:    'identifier'
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
        	// This should pick up on // and /// style comments.
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

exports.CSSyntax = new StandardSyntax(states);


});
;bespin.tiki.register("::sql_syntax", {
    name: "sql_syntax",
    dependencies: { "syntax_manager": "0.0.0" }
});
bespin.tiki.module("sql_syntax:index",function(require,exports,module) {
/*
Modified from Bespin python_syntax.
Contribuitor: Marc McIntyre ( marchaos@gmail.com )
*/
"define metadata";
({
    "description": "Python syntax highlighter",
    "dependencies": { "syntax_manager": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "sql",
            "pointer": "#SQLSyntax",
            "fileexts": [ "sql" ]
        }
    ]
});
"end";

var StandardSyntax = require('standard_syntax').StandardSyntax;

var states = {
  start: [
      {
      // SQL 2003 Keywords (can be uppercase of lowercase)
	  regex:  /^(?:ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASENSITIVE|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BEGIN|BETWEEN|BIGINT|BINARY|BLOB|BOOLEAN|BOTH|BY|CALL|CALLED|CASCADED|CASE|CAST|CHAR|CHARACTER|CHECK|CLOB|CLOSE|COLLATE|COLUMN|COMMIT|CONDITION|CONNECT|CONSTRAINT|CONTINUE|CORRESPONDING|CREATE|CROSS|CUBE|CURRENT|CURRENT_DATE|CURRENT_DEFAULT_TRANSFORM_GROUP|CURRENT_PATH|CURRENT_ROLE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_TRANSFORM_GROUP_FOR_TYPE|CURRENT_USER|CURSOR|CYCLE|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DELETE|DEREF|DESCRIBE|DETERMINISTIC|DISCONNECT|DISTINCT|DO|DOUBLE|DROP|DYNAMIC|EACH|ELEMENT|ELSE|ELSEIF|END|ESCAPE|EXCEPT|EXEC|EXECUTE|EXISTS|EXIT|EXTERNAL|FALSE|FETCH|FILTER|FLOAT|FOR|FOREIGN|FREE|FROM|FULL|FUNCTION|GET|GLOBAL|GRANT|GROUP|GROUPING|HANDLER|HAVING|HOLD|HOUR|IDENTITY|IF|IMMEDIATE|IN|INDICATOR|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ITERATE|JOIN|LANGUAGE|LARGE|LATERAL|LEADING|LEAVE|LEFT|LIKE|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOOP|MATCH|MEMBER|MERGE|METHOD|MINUTE|MODIFIES|MODULE|MONTH|MULTISET|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NO|NONE|NOT|NULL|NUMERIC|OF|OLD|ON|ONLY|OPEN|OR|ORDER|OUT|OUTER|OUTPUT|OVER|OVERLAPS|PARAMETER|PARTITION|PRECISION|PREPARE|PRIMARY|PROCEDURE|RANGE|READS|REAL|RECURSIVE|REF|REFERENCES|REFERENCING|RELEASE|REPEAT|RESIGNAL|RESULT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROLLUP|ROW|ROWS|SAVEPOINT|SCOPE|SCROLL|SEARCH|SECOND|SELECT|SENSITIVE|SESSION_USER|SET|SIGNAL|SIMILAR|SMALLINT|SOME|SPECIFIC|SPECIFICTYPE|SQL|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATIC|SUBMULTISET|SYMMETRIC|SYSTEM|SYSTEM_USER|TABLE|TABLESAMPLE|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSLATION|TREAT|TRIGGER|TRUE|UNDO|UNION|UNIQUE|UNKNOWN|UNNEST|UNTIL|UPDATE|USER|USING|VALUE|VALUES|VARCHAR|VARYING|WHEN|WHENEVER|WHERE|WHILE|WINDOW|WITH|WITHIN|WITHOUT|YEAR)(?![a-zA-Z0-9_])/i,
	  tag:    'keyword'
      },
      {
	  regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
	  tag:    'identifier'
      },
      {
	  regex:  /^[^'"-\/ \tA-Za-z0-9_]+/,
	  tag:    'plain'
      },
      {
	  regex:  /^[ \t]+/,
	  tag:    'plain'
      },
      {
      // Oracle style quoting.
	  regex:  /^''/,
	  tag:    'string',
	  then:   'qqqstring'
      },
      {
      // Oracle style quoting.
	  regex:  /^'''/,
	  tag:    'string',
	  then:   'qqqqstring'
      },
      {
	  regex:  /^'/,
	  tag:    'string',
	  then:   'qstring'
      },
      {
	  regex:  /^"/,
	  tag:    'string',
	  then:   'qqstring'
      },
      {
	  regex:  /^--.*/,
	  tag:    'comment'
      },
      {
      // PostgreSQL supports C style comments.
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
	  regex:  /^'/,
	  tag:    'string',
	  then:   'start'
      },
      {
	  regex:  /^(?:\\.|[^'\\])+/,
	  tag:    'string'
      }
  ],
  
  qqstring: [
        {
  	  regex:  /^"/,
  	  tag:    'string',
  	  then:   'start'
        },
        {
  	  regex:  /^(?:\\.|[^"\\])+/,
  	  tag:    'string'
        }
    ],

  qqqstring: [
      {
	  regex:  /^''/,
	  tag:    'string',
	  then:   'start'
      },
      {
    	  regex:  /^(?:\\.|[^'\\])*''?/,
	  tag:    'string'
      }
  ],

  qqqqstring: [
      {
	  regex:  /^'''/,
	  tag:    'string',
	  then:   'start'
      },
      {
      regex:  /^(?:\\.|[^'\\])*'''?/,
	  tag:    'string'
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

exports.SQLSyntax = new StandardSyntax(states);

});
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
    settings: {},

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

            if (info.settings != null) {
                engine.settings = {};
                info.settings.forEach(function(name) {
                    engine.settings[name] = this.settings[name];
                }, this);
            }

            var subsyntaxes = engine.subsyntaxes;
            if (subsyntaxes == null) {
                pr.resolve();
                return;
            }

            var pr2 = promise.group(_(subsyntaxes).map(this.loadSyntax, this));
            pr2.then(_(pr.resolve).bind(pr));
        }.bind(this));

        return pr;
    },

    setSyntaxSetting: function(name, value) {
        this.settings[name] = value;
        return true;
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
;bespin.tiki.register("::c1_html", {
    name: "c1_html",
    dependencies: { "standard_syntax": "0.0.0" }
});
bespin.tiki.module("c1_html:index",function(require,exports,module) {
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
    "description": "C1 HTML syntax highlighter",
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
    
    states['composite_beforeAttrName'] = [
	      {
	          regex:  /^\s+/,
	          tag:    'plain'
	      },
	      {
	          regex:  /^\//,
	          tag:    'composite',
	          then:   'composite_selfClosingStartTag'
	      },
	      {
	          regex:  /^>/,
	          tag:    'composite',
	          then:   interiorActions
	      },
	      {
	          regex:  /^./,
	          tag:    'composite',
	          then:   'composite_attrName'
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
    
    // Composite!
    states[ 'composite_attrName' ] = [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'composite_afterAttrName'
        },
        {
            regex:  /^\//,
            tag:    'composite',
            then:   'composite_selfClosingStartTag'
        },
        {
            regex:  /^=/,
            tag:    'composite',
            then:   'composite_beforeAttrValue'
        },
        {
            regex:  /^>/,
            tag:    'composite',
            then:   interiorActions
        },
        {
            regex:  /^["'<]+/,
            tag:    'error'
        },
        {
            regex:  /^[^ \t\n\/=>"'<]+/,
            tag:    'composite'
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
    
    states[ 'composite_afterAttrName'] = [
         {
             regex:  /^\s+/,
             tag:    'plain'
         },
         {
             regex:  /^\//,
             tag:    'composite',
             then:   'composite_selfClosingStartTag'
         },
         {
             regex:  /^=/,
             tag:    'composite',
             then:   'composite_beforeAttrValue'
         },
         {
             regex:  /^>/,
             tag:    'composite',
             then:   interiorActions
         },
         {
             regex:  /^./,
             tag:    'keyword',
             then:   'composite_attrName'
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
    
    states['composite_beforeAttrValue'] = [
       {
           regex:  /^\s+/,
           tag:    'plain'
       },
       {
           regex:  /^"/,
           tag:    'string',
           then:   'composite_attrValueQQ'
       },
       {
           regex:  /^(?=&)/,
           tag:    'plain',
           then:   'composite_attrValueU'
       },
       {
           regex:  /^'/,
           tag:    'string',
           then:   'composite_attrValueQ'
       },
       {
           regex:  /^>/,
           tag:    'error',
           then:   interiorActions
       },
       {
           regex:  /^./,
           tag:    'string',
           then:   'composite_attrValueU'
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
    
    states['composite_attrValueQQ'] = [
           {
               regex:  /^"/,
               tag:    'string',
               then:   'composite_afterAttrValueQ'
           },
           {
               regex:  /^[^"]+/,
               tag:    'string'
           }
       ];

       states['composite_attrValueQ'] = [
           {
               regex:  /^'/,
               tag:    'string',
               then:   'composite_afterAttrValueQ'
           },
           {
               regex:  /^[^']+/,
               tag:    'string'
           }
       ];

       states['composite_attrValueU'] = [
           {
               regex:  /^\s/,
               tag:    'string',
               then:   'composite_beforeAttrName'
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
    
    states['composite_afterAttrValueQ'] = [
       {
           regex:  /^\s/,
           tag:    'plain',
           then:   'composite_beforeAttrName'
       },
       {
           regex:  /^\//,
           tag:    'composite',
           then:   'composite_selfClosingStartTag'
       },
       {
           regex:  /^>/,
           tag:    'composite',
           then:   interiorActions
       },
       {
           regex:  /^(?=.)/,
           tag:    'operator',
           then:   'composite_beforeAttrName'
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
    
    // Composite added this!
    states[ 'composite_selfClosingStartTag' ] = [
        {
            regex:  /^>/,
            tag:    'composite',
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
        	regex : /^<f:|^<lang:|^<rendering:|^<asp:/,
        	tag : 'composite',
        	then: 'tagOpenComposite'
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
    
    // HEY!
    tagOpenComposite: [
        {
            regex:  /^\//,
            tag:    'operator',
            then:   'endTagOpen'
        },
        {
            regex:  /^[a-zA-Z]/,
            tag:    'composite',
            then:   'tagNameComposite'
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
    
    tagNameComposite: [
        {
            regex:  /^\s+/,
            tag:    'plain',
            then:   'composite_beforeAttrName'
        },
        {
            regex:  /^\//,
            tag:    'composite',
            then:   'composite_selfClosingStartTag'
        },
        {
            regex:  /^>/,
            tag:    'composite',
            then:   'start'
        },
        {
            regex:  /^[^ \t\n\/>]+/,
            tag:    'composite'
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
    dependencies: { "standard_syntax": "0.0.0", "settings": "0.0.0" }
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
    "dependencies": { "settings": "0.0.0", "standard_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "js",
            "pointer": "#JSSyntax",
            "fileexts": [ "js", "json" ],
            "settings": [ "specialmodules" ]
        },
        {
            "ep": "setting",
            "name": "specialmodules",
            "description": "Regex that matches special modules",
            "type": "text",
            "defaultValue": "^jetpack\\.[^\"']+"
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
            regex:  /^require/,
            tag:    'builtin',
            then:   'require'
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
    ],

    /* Special handling for "require" */

    require: [
        {
            regex:  /^\(["']/,
            tag:    'plain',
            then:   'requireBody'
        },
        {
            regex:  /^/,
            tag:    'plain',
            then:   'start'
        }
    ],

    requireBody: [
        {
            regexSetting:   'specialmodules',
            tag:            'specialmodule',
            then:           'requireEnd'
        },
        {
            regex:  /^[^"']+/,
            tag:    'module',
            then:   'requireEnd'
        }
    ],

    requireEnd: [
        {
            regex:  /^["']?/,
            tag:    'plain',
            then:   'start'
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

    this.settings = {};
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
            var regex;
            if (alt.regexSetting != null) {
                regex = new RegExp(this.settings[alt.regexSetting]);
            } else {
                regex = alt.regex;
            }

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
        }, this);

        return result;
    }
};


});
bespin.metadata = {"cs_syntax": {"resourceURL": "resources/cs_syntax/", "name": "cs_syntax", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#CSSyntax", "ep": "syntax", "fileexts": ["cs"], "name": "cs"}], "type": "plugins\\thirdparty", "description": "C# syntax highlighter"}, "sql_syntax": {"resourceURL": "resources/sql_syntax/", "name": "sql_syntax", "environments": {"worker": true}, "dependencies": {"syntax_manager": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#SQLSyntax", "ep": "syntax", "fileexts": ["sql"], "name": "sql"}], "type": "plugins\\thirdparty", "description": "Python syntax highlighter"}, "syntax_worker": {"resourceURL": "resources/syntax_worker/", "description": "Coordinates multiple syntax engines", "environments": {"worker": true}, "dependencies": {"syntax_directory": "0.0.0", "underscore": "0.0.0"}, "testmodules": [], "type": "plugins\\supported", "name": "syntax_worker"}, "stylesheet": {"resourceURL": "resources/stylesheet/", "name": "stylesheet", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#CSSSyntax", "ep": "syntax", "fileexts": ["css", "less"], "name": "css"}], "type": "plugins\\supported", "description": "CSS syntax highlighter"}, "c1_html": {"resourceURL": "resources/c1_html/", "name": "c1_html", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0"}, "testmodules": [], "provides": [{"pointer": "#HTMLSyntax", "ep": "syntax", "fileexts": ["htm", "html"], "name": "html"}], "type": "plugins\\supported", "description": "C1 HTML syntax highlighter"}, "js_syntax": {"resourceURL": "resources/js_syntax/", "name": "js_syntax", "environments": {"worker": true}, "dependencies": {"standard_syntax": "0.0.0", "settings": "0.0.0"}, "testmodules": [], "provides": [{"settings": ["specialmodules"], "pointer": "#JSSyntax", "ep": "syntax", "fileexts": ["js", "json"], "name": "js"}, {"description": "Regex that matches special modules", "defaultValue": "^jetpack\\.[^\"']+", "type": "text", "ep": "setting", "name": "specialmodules"}], "type": "plugins\\supported", "description": "JavaScript syntax highlighter"}, "standard_syntax": {"resourceURL": "resources/standard_syntax/", "description": "Easy-to-use basis for syntax engines", "environments": {"worker": true}, "dependencies": {"syntax_worker": "0.0.0", "syntax_directory": "0.0.0", "underscore": "0.0.0"}, "testmodules": [], "type": "plugins\\supported", "name": "standard_syntax"}};/* ***** BEGIN LICENSE BLOCK *****
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

