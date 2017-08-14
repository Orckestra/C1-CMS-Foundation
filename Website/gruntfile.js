/// <vs BeforeBuild='less' AfterBuild='less, postcss' />
module.exports = function (grunt) {

  'use strict';

  // Define global variables here - access them with <%= globalConfig.variableName %>
  var globalConfig = {
    rootPath: 'Composite',
    compileScriptsFilename: "CompileScripts.xml"
  };

  grunt.initConfig({
    // Make sure we can access all packages required
    pkg: grunt.file.readJSON('package.json'),
    // Give all tasks access to our global variables
    globalConfig: globalConfig
  });

  //************************************************************************************************************************************************
  // COPYING FROM BOWER COMPONENTS
  //************************************************************************************************************************************************
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config("copy", {
    codemirror: {
      files: [
        { expand: true, cwd: 'bower_components/codemirror/addon/mode', src: ['*.*'], dest: 'Composite/lib/codemirror/addon/mode' },
        { expand: true, cwd: 'bower_components/codemirror/addon/selection', src: ['*.*'], dest: 'Composite/lib/codemirror/addon/selection' },
        { expand: true, cwd: 'bower_components/codemirror/lib', src: ['*.*'], dest: 'Composite/lib/codemirror/lib' },
        { expand: true, cwd: 'bower_components/codemirror/mode/clike', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/clike' },
        { expand: true, cwd: 'bower_components/codemirror/mode/css', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/css' },
        { expand: true, cwd: 'bower_components/codemirror/mode/htmlembedded', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/htmlembedded' },
        { expand: true, cwd: 'bower_components/codemirror/mode/htmlmixed', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/htmlmixed' },
        { expand: true, cwd: 'bower_components/codemirror/mode/javascript', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/javascript' },
        { expand: true, cwd: 'bower_components/codemirror/mode/sass', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/sass' },
        { expand: true, cwd: 'bower_components/codemirror/mode/sql', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/sql' },
        { expand: true, cwd: 'bower_components/codemirror/mode/xml', src: ['*.*'], dest: 'Composite/lib/codemirror/mode/xml' }
      ]
    },
    autobahnjs: {
      files: [
        { expand: true, cwd: 'bower_components/autobahnjs', src: ['autobahn.js'], dest: 'Composite/lib/autobahnjs' },
      ]
    },
    'promise-polyfill': {
      files: [
        { expand: true, cwd: 'bower_components/promise-polyfill', src: ['promise.js'], dest: 'Composite/lib/promise' },
      ]
    },
    'babel-polyfill': {
      files: [
        { expand: true, cwd: 'bower_components/babel-polyfill', src: ['browser-polyfill.js'], dest: 'Composite/lib/babel' },
      ]
    },
    tinymce: {
        files: function () {
            let tinymceDestFolder = "Composite/content/misc/editors/visualeditor/tinymce";
            let tinymcePlugins = ["autolink", "lists", "paste", "table"];
            let tinymceFiles = [{ expand: true, cwd: 'bower_components/tinymce', src: ['tinymce.min.js'], dest: `${tinymceDestFolder}` }];
            tinymcePlugins.forEach(function (pluginName, index) {
                tinymceFiles.push({ expand: true, cwd: `bower_components/tinymce/plugins/${pluginName}`, src: ['*.min.js'], dest: `${tinymceDestFolder}/plugins/${pluginName}` });
            });
            tinymceFiles.push({ expand: true, cwd: `bower_components/tinymce/skins/lightgray`, src: ['**'], dest: `${tinymceDestFolder}/skins/lightgray` });
            return tinymceFiles;
        }()
    }
  });

  //************************************************************************************************************************************************
  // STYLES
  //************************************************************************************************************************************************
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.config('less', {
    options: {
      paths: ['<%= globalConfig.rootPath %>/styles'],
      sourceMap: true,
      sourceMapFileInline: true
    },

    default: {
      files: {
        '<%= globalConfig.rootPath %>/styles/styles.css': '<%= globalConfig.rootPath %>/styles/styles.less'
      }
    }
  });

  // Autoprefixer (postcss)
  grunt.loadNpmTasks('grunt-postcss');
  grunt.config('postcss', {
    options: {
      map: {
        inline: false
      },
      processors: [
        require('autoprefixer-core')({ browsers: 'last 2 versions' }),
        require('csswring')
      ]
    },
    default: {
      files: {
        '<%= globalConfig.rootPath %>/styles/styles.min.css': '<%= globalConfig.rootPath %>/styles/styles.css'
      }
    }
  });

  //************************************************************************************************************************************************
  // UGLIFY
  //************************************************************************************************************************************************
  var subScripts = [];
  var topScripts = [];
    var topClassNames = [];

  // Default task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    options: {
      beautify: false,
      compress: {},
      mangle: {},
      preserveComments: false,
      screwIE8: true,
      sourceMap: true
    },
    default: {
      files: {
        '<%= globalConfig.rootPath %>/scripts/compressed/top.js': topScripts,
        '<%= globalConfig.rootPath %>/scripts/compressed/sub.js': subScripts
      }
    }
  });

  // Read 'CompileScripts.xml' & call uglify task
  grunt.registerTask('uglifyCompileScripts', 'Parse CompileScripts.xml for dynamic parsing', function () {
    var parser = require('xml2js').Parser({ explicitArray: true, trim: true });
    var filePath = require('path').join(__dirname, globalConfig.rootPath, globalConfig.compileScriptsFilename);
    var exists = grunt.file.exists(filePath);
    if (exists) {
      var jsonpath = require('JSONPath');
      var data = grunt.file.read(filePath);
      parser.parseString(data, function (err, scriptPath) {

        // Get the sub - develop node
        // [..] is a predicate, ? is to run a script with an expression, @. is to access the attribute (which is represented in the xml2js object as $.name).
        var expression = "$.Scripts.Type[?(@.$.name == 'sub')].Mode[?(@.$.name == 'develop')].Script[*].$.filename";
        var scriptPaths = jsonpath.eval(scriptPath, expression, { flatten: true });
        // Replace the '${root}' prefix
        scriptPaths.forEach(function (result) {
          subScripts.push(result.replace('${root}', globalConfig.rootPath));
        });

        // Get the top - develop node
        expression = "$.Scripts.Type[?(@.$.name == 'top')].Mode[?(@.$.name == 'develop')].Script[*].$.filename";
        scriptPaths = jsonpath.eval(scriptPath, expression, { flatten: true });
        // Replace the '${root}' prefix
        scriptPaths.forEach(function (result) {
            topScripts.push(result.replace('${root}', globalConfig.rootPath));
        });

        // Done, run the uglify task
        grunt.task.run(['uglify:default']);


          // Generating "toplevelclassnames.js"
        var topLevelClassNamesTargetFolder = 'Composite/scripts/source';
                var topLevelClassNamesIgnoreFolder = 'Composite/scripts/source/page';

        grunt.file.recurse(topLevelClassNamesTargetFolder, function (filepath) {
            if (filepath.indexOf(topLevelClassNamesIgnoreFolder) >= 0 ||
                        filepath.indexOf(".js") < 0) {
                return;
            }

            var s = filepath;
            var className = s.substring(s.lastIndexOf('/') + 1, s.lastIndexOf('.'));
            topClassNames.push(className);
        });

        grunt.file.write(
                    globalConfig.rootPath + '/scripts/compressed/toplevelclassnames.js',
                    '/* Generated by Grunt */ var topLevelClassNames = ' + JSON.stringify(topClassNames) + ';');
      });
    }
    else {
      console.log(filePath + ' does not exist');
    }
  });


    // ****************************************************************************************************
    //  SVG
    // ****************************************************************************************************
  function stringSplice(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
  }

    // Merging all svg files into one
  grunt.registerTask('mergeSvg', 'Merges all the svg files into one sprite', function () {
      var sourceDir = 'Composite/images/icons/svg';
      var targetFile = 'Composite/images/sprite.svg';

        function GetGTag(xml) {
            var gIdOffset = xml.indexOf('<g id="');

            var viewBox = xml.match(/<(\w+)[^>]*(viewBox="[\d\.]+ [\d\.]+ [\d\.]+ [\d\.]+")/);
            viewBox = viewBox && viewBox[1] === 'svg' && ' ' + viewBox[2] || '';

            var closingTag = '</g>';
            var closeGtag = xml.lastIndexOf(closingTag);

            var ancestorGTagCount = (xml.substring(0, gIdOffset).match(/<g/g) || []).length;

            var i;
            for (i = 0; i < ancestorGTagCount; i++) {
                closeGtag = xml.lastIndexOf(closingTag, closeGtag - 1);
            }

            var gTag = xml.substring(gIdOffset, closeGtag + closingTag.length);
            if (!/viewBox/.test(gTag) && viewBox) {
              gTag = stringSplice(gTag, 2, 0, viewBox);
            }
            return gTag;
        }

        var resultSvg = ['<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="24" height="24"  viewBox="0 0 128 128"><defs>'];

        grunt.file.recurse(sourceDir, function (filepath) {
          var svg = grunt.file.read(filepath);

          resultSvg.push(GetGTag(svg));
        });

      resultSvg.push('</defs></svg>');

      grunt.file.write(targetFile, resultSvg.join(''));
    });

    // Optimize source svgs

    var iconTmpDir = 'iconTmp/';

    grunt.loadNpmTasks('grunt-svgmin');
    grunt.config("svgmin", {
        options: {
            plugins: [
              { removeAttrs: { attrs: [
                'g:width', 'g:height',
                'svg:width', 'svg:height'
              ] } },
              { removeDesc: false },
              { removeUselessDefs: false },
              { removeEmptyAttrs: false },
              { removeHiddenElems: false },
              { removeEmptyText: false },
              { removeEmptyContainers: false },
              { cleanUpEnableBackground: false },
              { minifyStyles: false },
              { convertStyleToAttrs: false },
              { convertColors: false },
              { convertPathData: false },
              { convertTransform: false },
              { removeUnknownsAndDefaults: false },
              { removeNonInheritableGroupAttrs: false },
              { removeUselessStrokeAndFill: false },
              { removeUnusedNS: false },
              { cleanupNumericValues: false },
              { cleanupListOfValues: false },
              { moveElemsAttrsToGroup: false },
              { moveGroupAttrsToElems: false },
              { collapseGroups: false },
              { mergePaths: false },
              { convertShapeToPath: false }
            ]
        },
        dist: {
            files: [{
              expand: true,
              cwd: 'Composite/images/icons/svg/',
              src: ['*.svg'],
              dest: iconTmpDir
            }]
        }
    });

    grunt.registerTask('buildSpriteSheet', function () {
      grunt.task.requires('svgmin');

      var outputFile = 'Composite/console/icons.svg';
      var inputDir = iconTmpDir;
      var outputText = '<svg xmlns="http://www.w3.org/2000/svg">\r\n';
      grunt.file.recurse(inputDir, function (filePath) {
        var fileName = filePath.replace(/^.*\/([^\/]*).svg/, '$1');
        var fileText = grunt.file.read(filePath);

        outputText += fileText
          .replace('<svg', '<symbol id="icon-' + fileName + '"')
          .replace('</svg>', '</symbol>')
          .replace('xlink:href="#', 'xlink:href="#icon-')
          .replace(/(?:stroke|fill)="#(?:([0-9a-eA-E])\1{2,5})"/g, '')
           + '\r\n';
      });
      outputText += '</svg>\r\n';

      grunt.file.write(outputFile, outputText);
      grunt.file.delete(iconTmpDir);
    });

    grunt.registerTask('icons', ['svgmin', 'buildSpriteSheet']);

  //************************************************************************************************************************************************
  // WATCH
  //************************************************************************************************************************************************
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    less: {
      files: [globalConfig.rootPath + '/styles/**/*.less'],
      tasks: ['less', 'postcss'],
      options: {
        livereload: true,
        spawn: false
      }
    },
    uglify: {
      files: [globalConfig.rootPath + '/scripts/source/**/*.js'],
      tasks: ['uglifyCompileScripts'],
      options: {
        spawn: false
      }
    }
  });

  grunt.registerTask('watchAll', ['watch']);
  // Register the default tasks.
  grunt.registerTask('build', ['copy', 'less', 'postcss', 'uglifyCompileScripts', 'mergeSvg', 'icons']);
  grunt.registerTask('default', ['build']);
};
