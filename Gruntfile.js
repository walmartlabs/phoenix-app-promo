module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        report: 'gzip'
      },
      build: {
        files: {
          'build/<%= pkg.name %>.min.js': 'src/app-promo.js'
        }
      }
    },

    stylusImages: {
      options: {
        baseDir: 'src',
        imports: ['import/global']
      },
      hdpi: {
        options: { resolution: '2' },
        files: {
          'build/<%= pkg.name %>@2x.css': ['src/app-promo.styl']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerMultiTask('stylusImages', function() {
    var self = this,
        options = this.options({
          urlSizeLimit: 1500,
          resolution: '1'
        });

    function compile(stylusCode, destFile, callback) {
      var stylusImages = require('stylus-images'),
          compiler = stylusImages(stylusCode, {
            paths: [options.baseDir],
            images: {
              limit: options.urlSizeLimit,
              resolutions: [options.resolution]
            }
          });

      compiler.set('compress', true);
      compiler.use(require('nib')());
      compiler.import('nib');
      options.imports.forEach(function(stylesheet) {
        compiler.import(stylesheet);
      });

      compiler.render(function(err, data) {
        if (err) {
          grunt.log.writeln(err);
          callback(false);
        } else {
          grunt.file.write(destFile, data[options.resolution]);
          callback();
        }
      });
    }

    grunt.util.async.forEachSeries(this.files, function(file, next) {
      var stylusCode = '';
      file.src.forEach(function(fileName) {
        stylusCode += '\n' + grunt.file.read(fileName);
      });

      compile(stylusCode, file.dest, next);
    });

  });

  grunt.registerTask('default', ['uglify', 'stylusImages']);
};
