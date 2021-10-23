function genRange(source, placement) {
	let count = source.length ** placement;
	let length = source.length;
	return {
		*[Symbol.iterator]() {
			
			for(let i=0; i<count; i++) {
				let patchs = Array(placement);
				
				let resid = i;
				let index = 0;
				do {
					patchs[index] = resid % length;
					resid = Math.floor(resid / length);
					index++;
				} while(resid > 0);
				
				yield patchs.map((index, i) => {
					return source[index || 0];
				});
			}
		}
	}
}

function newStr(astr, args) {
	return astr.reduce((acm, value, index) => {
		return acm + value + (args[index]?args[index]:'')
	}, '');
}

function main(str) {
	str += '';
	let astr = Object.assign([], str);
	let placementSize = str.length - 1;
	
	let res = [];
	for(let gen of genRange(['', '.'], placementSize)) {
		res.push(newStr(astr, gen));
	}
	
	return res;
}

console.log(main('qwerty'));
