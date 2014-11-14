# nagios-phantomjs-domcomplete

## How to install
- Install Node.js and npm
- Run:

  ```
  git clone https://github.com/branneman/nagios-phantomjs-domcomplete.git
  cd nagios-phantomjs-domcomplete
  npm install
  ```

## How to run

`node index.js --url=http://google.com/`

`node index.js --url=http://google.com/ -w 3000 -c 10000`

`node index.js --url=http://google.com/ --warning=3000 --critical=10000`
