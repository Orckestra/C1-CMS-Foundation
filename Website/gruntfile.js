/// <vs BeforeBuild='less' AfterBuild='less, cssmin' />
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            less: {
                files: ["Composite/styles/default/*.less"],
                tasks: ["less"],
                options: {
                    livereload: true

                }
            }
        },
        less: {
            options: {
                paths: ["Composite/styles"],
                sourceMap: true,
                sourceMapFileInline: true
            },

            default: {
                files: {
                    'Composite/styles/styles.css': 'Composite/styles/styles.less'
                }
            }
        },
        cssmin: {
            options: {
                advanced: false,
                shorthandCompacting: false,
                roundingPrecision: -1,
                sourceMap: false
            },

            default: {
                files: {
                    'Composite/styles/styles.min.css': 'Composite/styles/styles.css'
                }
            }
        },
    });
    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    //grunt.loadNpmTasks('grunt-svg-sprite');
    // Register the default tasks.
    grunt.registerTask('build', ['less', 'cssmin']);
};