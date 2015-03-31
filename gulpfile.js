var gulp = require('gulp'),
    minimist = require('minimist'),
    imageOp = require('gulp-image-optimization'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename');

var knownOptions = {
    string: ['width', 'output', 'height', 'optimizationLevel'],
    boolean: ['crop', 'upscale', 'progressive', 'interlaced'],
    default: {
        width: '1200',
        output: './resized',
        crop: false,
        upscale: false,
        height: null,
        optimizationLevel: '5',
        progessive: true,
        interlaced: true
    }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('resize', function() {
    var resizeOpts = {
        width: parseInt(options.width),
        height: parseInt(options.height) || null,
        crop: options.crop,
        upscale: options.upscale
    };
    var optimizationOpts ={
        optimizationLevel: parseInt(options.optimizationLevel),
        progressive: options.progressive,
        interlaced: options.interlaced
    };

    var extensions = ['jpg', 'jpeg', 'png', 'gif'];

    var src = [];

    for (var i = 0; i < extensions.length; i++) {
        src.push('original/**/*.' + extensions[i]);
        src.push('original/**/*.' + extensions[i].toUpperCase());
    }

    return gulp
        .src(src)
        .pipe(imageResize(resizeOpts))

        // imageop doesn't recognize files with uppercase exentions
        .pipe(rename(function(path) {
            path.extname = path.extname.toLowerCase();
        }))

        .pipe(imageOp(optimizationOpts))
        .pipe(gulp.dest(options.output));
});

gulp.task('default', ['resize']);
