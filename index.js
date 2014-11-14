/**
 * How to install:
 *  - Install Node.js and npm
 *  - Run:
 *      cd nagios-phantomjs-domcomplete
 *      npm install
 *
 * How to run:
 *  node index.js --url=http://google.com/
 *  node index.js --url=http://google.com/ -w 3000 -c 10000
 *  node index.js --url=http://google.com/ --warning=3000 --critical=10000
 */

// Dependencies
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));

if (!argv.url) {
    console.log('UNKNOWN: No url specified.');
    process.exit(3);
}

// Timeouts
var timeouts = {
    warning: parseInt(argv.w, 10) || parseInt(argv.warning, 10) || 1e4,
    critical: parseInt(argv.c, 10) || parseInt(argv.critical, 10) || 3e4
};

var command =
    process.execPath + ' ' +                                   // Path to Node.js executable
    __dirname + '/node_modules/phantomas/bin/phantomas.js ' +  // Path to Phantomas entry-point file
    argv.url + ' ' +                                           // URL
    '--reporter=json';                                         // Output JSON

exec(command, {maxBuffer: 1e7}, function(err, stdout, stderr) {

    if (err) {
        console.log('UNKNOWN: Phantomas returned an error:', err, stderr);
        process.exit(3);
    }

    try {
        var domComplete = JSON.parse(stdout).metrics.domComplete;
    } catch (e) {
        console.log('UNKNOWN: Could not parse JSON');
        process.exit(3);
    }

    if (domComplete >= timeouts.critical) {
        console.log('CRITICAL: domComplete event took', domComplete);
        process.exit(2);
    }

    if (domComplete >= timeouts.warning) {
        console.log('WARNING: domComplete event took', domComplete);
        process.exit(1);
    }

    console.log('OK: domComplete event took', domComplete);
    //console.log(stdout);
    process.exit(0);
});
