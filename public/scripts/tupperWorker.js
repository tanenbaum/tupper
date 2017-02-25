// web worker to calculate tupper grid in background

importScripts('../lib/big-integer/BigInteger.min.js');
importScripts('../lib/lodash/dist/lodash.min.js');

onmessage = function (message) {
	let data = message.data;

	let config = data.config;

	runTupper(config);
}

function runTupper(config) {
	const c = config.height;
	const height = c;
	const width = config.width;

	// strip spaces from incoming k value - it's large
	const kInt = bigInt(config.k.replace(/ /g,''));

	// post render points back to host
	let postBack = function (points) {
		postMessage(points);
	};

	for (let y = 0; y < height; y++) {
	  let bigY = kInt.add(y);
	  let points = [];
	  for (let x = 0; x < width; x++) {
	    if (tupper(x, bigY)) {
	    	points.push({
	    		x,
	    		y
	    	});
	    }
  	}

  	postBack(points);
	}

	// 1/2 < floor(mod(floor(y/17)*2^(-17*floor(x)-mod(floor(y), 17)),2))
	function tupper(x, y) {
	  // -c*floor(x)-mod(floor(y), c)
	  let p = bigInt(-c).multiply(x).subtract(y.mod(c));

	  // p value should be something small
	  let dv = Math.abs(p.value);

	  // y/c
	  let ydivc = y.divide(c);

	  // y/c*2^p
	  ydivc = ydivc.divide(bigInt(2).pow(dv));

	  // 1/2 < floor(mod(floor(y/c)*2^p,2))
	  return 0.5 < ydivc.mod(2).value;
	}
}

