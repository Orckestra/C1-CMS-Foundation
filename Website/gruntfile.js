/// <vs BeforeBuild='less' AfterBuild='less, cssmin' />
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
	// STYLES
	//************************************************************************************************************************************************
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.config('less', {
		options: {
			paths: ['<%= globalConfig.rootPath %>/styles'],
			sourceMap: true
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
				inline: false,
				prev: false
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
			});
		}
		else {
			console.log(filePath + ' does not exist');
		}
	});

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
	grunt.registerTask('build', ['less', 'postcss', 'uglifyCompileScripts']);
	grunt.registerTask('default', ['build']);
};