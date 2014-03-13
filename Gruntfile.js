module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // =watch
    watch: {
      react: {
        files: ['app/**/*.js'],
        tasks: ['react'],
        options: { interrupt: true}
      },
      browserify: {
        files: ['build/**/*.js'],
        tasks: ['browserify'],
        options: { interrupt: true}
      }
    },

    react: {
      files: {
        expand: true,
        cwd: './app',
        src: ['**/*.js'],
        dest: './build',
        ext: '.js'
      }
    },

    browserify: {
      all: {
        src:  'build/main.js',
        dest: 'public/js/cssarrowplease.js'
      }
    }
  });

  grunt.registerTask('build', ['react', 'browserify']);
  grunt.registerTask('default', 'build');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-react');
};
