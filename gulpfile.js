// Importing the gulp package. Gulp is a toolkit that helps you automate painful 
//or time-consuming tasks in your development workflow.
var gulp = require('gulp');

// Importing the gulp-jshint package. This is a Gulp plugin for JSHint, a tool that helps to detect errors 
//and potential problems in your JavaScript code.
var jshint = require('gulp-jshint');

// Defining the JavaScript files to be linted. This includes all JavaScript files in the root directory and 
//all JavaScript files in the 'src' directory and its subdirectories.
var jsFiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');

// Defining a Gulp task named 'style'. 
//This task will run JSHint on the specified JavaScript files.
gulp.task('style', function(){
    // The 'src' function takes the files that we want to run through the Gulp pipeline.
    return gulp.src(jsFiles)
           // The 'pipe' function is used to pipe the source file(s) to a plugin. 
           //Here, we're piping the JavaScript files to JSHint.
           .pipe(jshint());
});

// Defining a Gulp task named 'inject'. 
//This task will inject Bower packages into your source code.
gulp.task('inject', function(){
    // Importing the 'wiredep' package and getting its 'stream' function. 
    //Wiredep is a tool to inject Bower packages into your source code.
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    
    // Defining options for Wiredep. These options tell Wiredep where to find the 
    //'bower.json' file and the Bower components, and which path to ignore.
    var options = {
        bowerJson: require('./bower.json'),
        directory: './bower_components',
        ignorePath: '../../bower_components'
    }
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js']);
    var injectOptions = {
        ignorePath: '/public'
    };
    // The 'src' function takes the HTML files that we want to run through the Gulp pipeline.
    return gulp.src('./src/views*.html')
            // The 'pipe' function is used to pipe the source file(s) to a plugin. 
            //Here, we're piping the HTML files to Wiredep, which will inject the Bower packages into these files.
            .pipe(wiredep(options))
            .pipe(inject(injectSrc, injectOptions))
            // The 'dest' function is used to specify the output directory for 
            //the transformed files. Here, we're outputting the transformed HTML files back into the 'src/views' directory.
            .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', gulp.series('style', 'inject', function(done){
    var options = {
        script: 'app.js',
        delayTime: 1,
        watch: jsFiles
    }
    return nodemon(options)
           .on('restart',function(){
             console.log('Restarting server...');
           })
    done();
}));
