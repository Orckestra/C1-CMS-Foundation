/// <vs BeforeBuild='less' AfterBuild='less, cssmin' />
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        svg_sprite: {

            basic: {
                // Target-specific file lists and/or options go here. 
                src: ['Composite/images/icons/svg/*.svg'],
                dest: 'Composite/images/icons/svg-sprite',
                options: {
                    shape: {
                        id: {
                            generator: function(name) {
                                var fileName = name.replace(/^.*[\\\/]/, '');
                                return fileName.replace('.svg', '');
                            }
                        },
                        dimension: {
                            maxWidth: 32,
                            maxHeight: 32
                        }
                    },
                        mode: {
                            symbol: {
                                inline: true,
                                example: true,
                                sprite: "sprite.svg"
                            }
                        }
                    }
                },
            }
        });
    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    //grunt.loadNpmTasks('grunt-svg-sprite');
    // Register the default tasks.
    grunt.registerTask('build', ['less', 'cssmin']);
    grunt.registerTask('default', ['build']);
};