function genRange(source, placement) {
	let count = source.length ** placement;
	let length = source.length;
	return {
		*[Symbol.iterator]() {
			
			for(let i=0; i<count; i++) {
				let arr = Array(placement);
				
				let patchs = Array(placement);
				
				let resid = i;
				let index = 0;
				do {
					patchs[index] = resid % length;
					resid = Math.floor(resid / length);
					index++;
				} while(resid > 0);
				
				patchs.map((index, i) => {
					arr[i] = source[index || 0];
				});
				
				yield arr;
			}
		}
	}
}

function newStr(str, args) {
	let newStr = '';
	
	for(let i=0, size=str.length; i<size; i++) {
		newStr += str[i]+(args[i]?args[i]:'');
	}
	
	return newStr;
}

function main(str) {
	str += '';
	let placementSize = str.length - 1;
	
	let res = [];
	for(let gen of genRange(['', '.'], placementSize)) {
		res.push(newStr(str, gen));
	}
	
	return res;
}

console.log(main('qwerty'));
