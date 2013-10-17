module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        report: 'gzip'
      },
      build: {
        src: 'src/app-promo.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    stylus: {
      compile: {
        options: {
          import: ['nib', 'import/global'],
          urlfunc: 'url',
        },
        files: {
          'build/<%= pkg.name %>.css': 'src/app-promo.styl'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.registerTask('default', ['uglify', 'stylus']);
};
