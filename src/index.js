'use strict';
const args = process.argv.slice(2);
const cmd = args[0];

if (args.length < 2 || cmd !== 'crawl' && cmd !== 'viz') {
  console.log(process.argv);
  console.error([
    "Example usage: ./bin/hypermapper cmd config.js", 
    "Where cmd is [crawl] or [viz] and config is the relative location of your config file"
  ].join('\n'));
  process.exit();
}
const configPath = require('path').join(process.cwd(), args[1]);

const Crawl = require('./crawl');
const Viz = require('./viz');
const Gaze = require('gaze').Gaze;
const Config = require('./config');
const options = new Config(configPath);


if( cmd === 'crawl') {
  const crawl = new Crawl(options);
  crawl.start();
  
} else {
  const gaze = new Gaze([configPath, `${__dirname}/*.js`]);
  const viz = new Viz(options);
  viz.start();

  gaze.on('all', function(event, filepath) {
    console.log('%s has changed, reloading server', filepath);
    viz.restart();
  });
};
 
