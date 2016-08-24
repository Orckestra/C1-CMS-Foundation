SystemJS.config({
  paths: {
    "console/": "Composite/console/",
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "local:": "jspm_packages/local/"
  },
  meta: {
    "console/*": {
      "format": "esm"
    }
  },
  browserConfig: {
    "baseURL": "/",
    "paths": {
      "CompositeC1/": "src/"
    }
  },
  nodeConfig: {
    "paths": {
      "CompositeC1/": ""
    }
  },
  devConfig: {
    "paths": {
      "unittest/": "test/unit/"
    },
    "meta": {
      "unittest/*": {
        "format": "esm"
      }
    },
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.7",
      "glob": "npm:glob@7.0.5",
      "react-addons-test-utils": "npm:react-addons-test-utils@15.3.0",
      "sinon": "npm:sinon@1.17.5",
      "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.6.0",
      "systemjs-hot-reloader-store": "github:peteruithoven/systemjs-hot-reloader-store@1.0.0",
      "unexpected-dom": "npm:unexpected-dom@3.1.0",
      "unexpected-react": "npm:unexpected-react@3.2.3",
      "unexpected-sinon": "npm:unexpected-sinon@10.2.1",
      "source-map": "npm:source-map@0.2.0",
      "jsbn": "npm:jsbn@0.1.0",
      "tweetnacl": "npm:tweetnacl@0.13.3",
      "jodid25519": "npm:jodid25519@1.0.2",
      "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
      "module": "github:jspm/nodelibs-module@0.2.0-alpha",
      "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
      "dns": "github:jspm/nodelibs-dns@0.2.0-alpha",
      "dgram": "github:jspm/nodelibs-dgram@0.2.0-alpha",
      "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.8.0",
      "unexpected-mitm": "npm:unexpected-mitm@9.1.6",
      "zurvan": "npm:zurvan@0.3.2",
      "unexpected-zurvan": "npm:unexpected-zurvan@0.1.0"
    },
    "packages": {
      "github:capaj/systemjs-hot-reloader@0.6.0": {
        "map": {
          "debug": "npm:debug@2.2.0",
          "socket.io-client": "github:socketio/socket.io-client@1.4.8",
          "weakee": "npm:weakee@1.0.0"
        }
      },
      "npm:amdefine@1.0.0": {
        "map": {}
      },
      "npm:array-changes-async@2.2.0": {
        "map": {
          "arraydiff-async": "npm:arraydiff-async@0.2.0"
        }
      },
      "npm:array-changes@1.3.0": {
        "map": {
          "arraydiff-papandreou": "npm:arraydiff-papandreou@0.1.1-patch1"
        }
      },
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:brace-expansion@1.1.6": {
        "map": {
          "balanced-match": "npm:balanced-match@0.4.2",
          "concat-map": "npm:concat-map@0.0.1"
        }
      },
      "npm:chalk@1.1.3": {
        "map": {
          "ansi-styles": "npm:ansi-styles@2.2.1",
          "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
          "has-ansi": "npm:has-ansi@2.0.0",
          "strip-ansi": "npm:strip-ansi@3.0.1",
          "supports-color": "npm:supports-color@2.0.0"
        }
      },
      "npm:debug@2.2.0": {
        "map": {
          "ms": "npm:ms@0.7.1"
        }
      },
      "npm:ecc-jsbn@0.1.1": {
        "map": {
          "jsbn": "npm:jsbn@0.1.0"
        }
      },
      "npm:formatio@1.1.1": {
        "map": {
          "samsam": "npm:samsam@1.1.3"
        }
      },
      "npm:fs.realpath@1.0.0": {
        "map": {}
      },
      "npm:glob@7.0.5": {
        "map": {
          "fs.realpath": "npm:fs.realpath@1.0.0",
          "inflight": "npm:inflight@1.0.5",
          "inherits": "npm:inherits@2.0.1",
          "minimatch": "npm:minimatch@3.0.2",
          "once": "npm:once@1.3.3",
          "path-is-absolute": "npm:path-is-absolute@1.0.0"
        }
      },
      "npm:has-ansi@2.0.0": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      },
      "npm:inflight@1.0.5": {
        "map": {
          "once": "npm:once@1.3.3",
          "wrappy": "npm:wrappy@1.0.2"
        }
      },
      "npm:jodid25519@1.0.2": {
        "map": {
          "jsbn": "npm:jsbn@0.1.0"
        }
      },
      "npm:magicpen-prism@2.2.1": {
        "map": {}
      },
      "npm:minimatch@3.0.2": {
        "map": {
          "brace-expansion": "npm:brace-expansion@1.1.6"
        }
      },
      "npm:once@1.3.3": {
        "map": {
          "wrappy": "npm:wrappy@1.0.2"
        }
      },
      "npm:path-is-absolute@1.0.0": {
        "map": {}
      },
      "npm:react-addons-test-utils@15.3.0": {
        "map": {}
      },
      "npm:sinon@1.17.5": {
        "map": {
          "formatio": "npm:formatio@1.1.1",
          "lolex": "npm:lolex@1.3.2",
          "samsam": "npm:samsam@1.1.2",
          "util": "npm:util@0.10.3"
        }
      },
      "npm:source-map@0.2.0": {
        "map": {
          "amdefine": "npm:amdefine@1.0.0"
        }
      },
      "npm:strip-ansi@3.0.1": {
        "map": {
          "ansi-regex": "npm:ansi-regex@2.0.0"
        }
      },
      "npm:supports-color@2.0.0": {
        "map": {}
      },
      "npm:unexpected-dom@3.1.0": {
        "map": {
          "extend": "npm:extend@3.0.0",
          "magicpen-prism": "npm:magicpen-prism@2.2.1"
        }
      },
      "npm:unexpected-htmllike-jsx-adapter@1.0.0": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0"
        }
      },
      "npm:unexpected-htmllike-reactrendered-adapter@2.0.1": {
        "map": {
          "object-assign": "npm:object-assign@4.1.0",
          "react-render-hook": "npm:react-render-hook@0.1.4"
        }
      },
      "npm:unexpected-htmllike@2.1.1": {
        "map": {
          "array-changes": "npm:array-changes@1.3.0",
          "array-changes-async": "npm:array-changes-async@2.2.0",
          "object-assign": "npm:object-assign@4.1.0"
        }
      },
      "npm:unexpected-react@3.2.3": {
        "map": {
          "magicpen-prism": "npm:magicpen-prism@2.2.1",
          "react-render-hook": "npm:react-render-hook@0.1.4",
          "unexpected-htmllike": "npm:unexpected-htmllike@2.1.1",
          "unexpected-htmllike-jsx-adapter": "npm:unexpected-htmllike-jsx-adapter@1.0.0",
          "unexpected-htmllike-reactrendered-adapter": "npm:unexpected-htmllike-reactrendered-adapter@2.0.1"
        }
      },
      "npm:unexpected-sinon@10.2.1": {
        "map": {}
      },
      "npm:util@0.10.3": {
        "map": {
          "inherits": "npm:inherits@2.0.1"
        }
      },
      "npm:babel-plugin-transform-react-jsx@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.13.0",
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.9.0"
        }
      },
      "npm:babel-runtime@6.11.6": {
        "map": {
          "core-js": "npm:core-js@2.4.1",
          "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.9.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "esutils": "npm:esutils@2.0.2",
          "babel-types": "npm:babel-types@6.13.0",
          "lodash": "npm:lodash@4.14.1"
        }
      },
      "npm:babel-code-frame@6.11.0": {
        "map": {
          "esutils": "npm:esutils@2.0.2",
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "js-tokens": "npm:js-tokens@2.0.0",
          "chalk": "npm:chalk@1.1.3"
        }
      },
      "npm:babel-messages@6.8.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6"
        }
      },
      "npm:babylon@6.8.4": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6"
        }
      },
      "npm:babel-types@6.13.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "esutils": "npm:esutils@2.0.2",
          "lodash": "npm:lodash@4.14.1",
          "to-fast-properties": "npm:to-fast-properties@1.0.2",
          "babel-traverse": "npm:babel-traverse@6.13.0"
        }
      },
      "npm:babel-traverse@6.13.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.11.6",
          "debug": "npm:debug@2.2.0",
          "invariant": "npm:invariant@2.2.1",
          "lodash": "npm:lodash@4.14.1",
          "babel-types": "npm:babel-types@6.13.0",
          "babel-messages": "npm:babel-messages@6.8.0",
          "globals": "npm:globals@8.18.0",
          "babylon": "npm:babylon@6.8.4",
          "babel-code-frame": "npm:babel-code-frame@6.11.0"
        }
      },
      "npm:unexpected-mitm@9.1.6": {
        "map": {
          "callsite": "npm:callsite@1.0.0",
          "detect-indent": "npm:detect-indent@3.0.0",
          "underscore": "npm:underscore@1.7.0",
          "memoizesync": "npm:memoizesync@0.5.0",
          "mitm": "npm:mitm@1.3.0",
          "messy": "npm:messy@6.11.0"
        }
      },
      "npm:detect-indent@3.0.0": {
        "map": {
          "repeating": "npm:repeating@1.1.3",
          "get-stdin": "npm:get-stdin@3.0.2",
          "minimist": "npm:minimist@1.2.0"
        }
      },
      "npm:mitm@1.3.0": {
        "map": {
          "underscore": "npm:underscore@1.5.2"
        }
      },
      "npm:repeating@1.1.3": {
        "map": {
          "is-finite": "npm:is-finite@1.0.1"
        }
      },
      "npm:memoizesync@0.5.0": {
        "map": {
          "lru-cache": "npm:lru-cache@2.3.1"
        }
      },
      "npm:is-finite@1.0.1": {
        "map": {
          "number-is-nan": "npm:number-is-nan@1.0.0"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ],
    "sourceMaps": true,
    "plugins": [
      "babel-plugin-transform-react-jsx"
    ]
  },
  trace: true,
  map: {
    "jsdom": "node_modules/jsdom/lib/jsdom.js"
  },
  packages: {
    "CompositeC1": {
      "main": "console/console.js",
      "format": "esm"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json",
    "local:*.json"
  ],
  map: {
    "github/url-polyfill": "github:github/url-polyfill@0.5.6",
    "bluebird": "npm:bluebird@3.4.1",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.13",
    "magicpen-media": "npm:magicpen-media@1.5.1",
    "messy": "npm:messy@6.11.0",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "punycode": "github:jspm/nodelibs-punycode@0.2.0-alpha",
    "tls": "github:jspm/nodelibs-tls@0.2.0-alpha",
    "unexpected": "npm:unexpected@10.15.1",
    "unexpected-messy": "npm:unexpected-messy@6.1.2",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "normalizr": "npm:normalizr@2.2.1",
    "react": "npm:react@15.3.0",
    "react-dom": "npm:react-dom@15.3.0",
    "react-redux": "npm:react-redux@4.4.5",
    "redux": "npm:redux@3.5.2",
    "redux-thunk": "npm:redux-thunk@2.1.0",
    "scss": "github:mobilexag/plugin-sass@0.4.6",
    "svg": "github:npbenjohnson/plugin-svg@0.1.0",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "url-polyfill": "github:github/url-polyfill@0.5.6",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "whatwg-fetch": "npm:whatwg-fetch@1.0.0",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "github:jspm/nodelibs-path@0.1.0": {
      "map": {
        "path-browserify": "npm:path-browserify@0.0.0"
      }
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "map": {
        "url": "npm:url@0.10.3"
      }
    },
    "github:mobilexag/plugin-sass@0.4.6": {
      "map": {
        "autoprefixer": "npm:autoprefixer@6.4.0",
        "lodash": "npm:lodash@4.14.1",
        "postcss": "npm:postcss@5.1.2",
        "reqwest": "github:ded/reqwest@2.0.5",
        "sass.js": "npm:sass.js@0.9.11",
        "path": "github:jspm/nodelibs-path@0.1.0",
        "fs": "github:jspm/nodelibs-fs@0.1.2",
        "url": "github:jspm/nodelibs-url@0.1.0"
      }
    },
    "npm:asap@2.0.4": {
      "map": {}
    },
    "npm:asn1.js@4.8.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:bn.js@4.11.6": {
      "map": {}
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.3.1",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.9",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "npm:buffer-xor@1.0.3": {
      "map": {}
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:core-js@1.2.7": {
      "map": {}
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.1"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:domain-browser@1.1.7": {
      "map": {}
    },
    "npm:elliptic@6.3.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:fbjs@0.8.3": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "immutable": "npm:immutable@3.8.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0",
        "promise": "npm:promise@7.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10"
      }
    },
    "npm:has-flag@1.0.0": {
      "map": {}
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:iconv-lite@0.4.13": {
      "map": {}
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.6.0",
        "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
      }
    },
    "npm:js-base64@2.1.9": {
      "map": {}
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:node-fetch@1.6.0": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:normalizr@2.2.1": {
      "map": {
        "lodash": "npm:lodash@4.14.1"
      }
    },
    "npm:pako@0.2.9": {
      "map": {}
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.8.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4"
      }
    },
    "npm:path-browserify@0.0.0": {
      "map": {}
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:process-nextick-args@1.0.7": {
      "map": {}
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:randombytes@2.0.3": {
      "map": {}
    },
    "npm:react-dom@15.3.0": {
      "map": {}
    },
    "npm:react-redux@4.4.5": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@4.14.1",
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:react@15.3.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.3",
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:redux@3.5.2": {
      "map": {
        "lodash": "npm:lodash@4.14.1",
        "lodash-es": "npm:lodash-es@4.14.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "symbol-observable": "npm:symbol-observable@0.2.4"
      }
    },
    "npm:ripemd160@1.0.1": {
      "map": {}
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:source-map@0.5.6": {
      "map": {}
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:supports-color@3.1.2": {
      "map": {
        "has-flag": "npm:has-flag@1.0.0"
      }
    },
    "npm:ua-parser-js@0.7.10": {
      "map": {}
    },
    "npm:url@0.10.3": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:util-deprecate@1.0.2": {
      "map": {}
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.5"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.3.1"
      }
    },
    "npm:stream-http@2.3.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.1.5",
        "inherits": "npm:inherits@2.0.1",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-domain@0.2.0-alpha": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "npm:gettemporaryfilepath@0.0.1": {
      "map": {}
    },
    "npm:iconv-lite@0.4.5": {
      "map": {}
    },
    "npm:lodash@3.10.0": {
      "map": {}
    },
    "npm:magicpen-media@1.5.1": {
      "map": {
        "gettemporaryfilepath": "npm:gettemporaryfilepath@0.0.1",
        "lodash": "npm:lodash@3.10.0",
        "mime": "npm:mime@1.3.4"
      }
    },
    "npm:mime@1.3.4": {
      "map": {}
    },
    "npm:quoted-printable@1.0.0": {
      "map": {
        "utf8": "npm:utf8@2.1.1"
      }
    },
    "npm:rfc2047@2.0.0": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.5"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:messy@6.11.0": {
      "map": {
        "underscore": "npm:underscore@1.8.3",
        "iconv-lite": "npm:iconv-lite@0.4.13",
        "rfc2047": "npm:rfc2047@2.0.0",
        "rfc2231": "npm:rfc2231@1.3.0",
        "quoted-printable": "npm:quoted-printable@1.0.0"
      }
    },
    "npm:rfc2231@1.3.0": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.5"
      }
    },
    "npm:unexpected-messy@6.1.2": {
      "map": {
        "underscore": "npm:underscore@1.7.0",
        "minimist": "npm:minimist@1.1.1"
      }
    },
    "npm:postcss@5.1.2": {
      "map": {
        "supports-color": "npm:supports-color@3.1.2",
        "source-map": "npm:source-map@0.5.6",
        "js-base64": "npm:js-base64@2.1.9"
      }
    },
    "npm:autoprefixer@6.4.0": {
      "map": {
        "postcss": "npm:postcss@5.1.2",
        "caniuse-db": "npm:caniuse-db@1.0.30000519",
        "browserslist": "npm:browserslist@1.3.5",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "normalize-range": "npm:normalize-range@0.1.2",
        "num2fraction": "npm:num2fraction@1.2.2"
      }
    },
    "npm:browserslist@1.3.5": {
      "map": {
        "caniuse-db": "npm:caniuse-db@1.0.30000519"
      }
    },
    "github:jspm/nodelibs-punycode@0.2.0-alpha": {
      "map": {
        "punycode-browserify": "npm:punycode@1.4.1"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:readable-stream@2.1.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "core-util-is": "npm:core-util-is@1.0.2"
      }
    }
  }
});
