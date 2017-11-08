const fs = require('fs');
const readline = require('readline');

const csvPattern = /\.csv$/

fs.readdir('./', (err, files) => {
	files.forEach(filename => {
		if (csvPattern.test(filename)) {
			parseCSV(`./${filename}`);
		}
	});
})
function parseCSV(filename) {
	const lr = readline.createInterface({
		input: fs.createReadStream(filename)
	});

	const lines = [];

	lr.on('line', line => {
		lines.push(line);
	});

	lr.on('close', () => {
		const jsonData = process(lines);
		fs.writeFile(filename.replace('.csv', '.json'), JSON.stringify(jsonData, null, 2) , 'utf-8', err => {
			if (err) throw err;
			console.log(filename + ' Done');
		});
	});
}

function process(lines) {
	const fieldNames = lines[0].split(',');
	const fieldTypes = lines[1].split(',');
	const result = [];
	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		const obj = {};
		const fieldValues = lines[i].split(',');
		fieldValues.forEach((value, index) => {
			obj[fieldNames[index]] = parse(value, fieldTypes[index]);
		});
		result.push(obj);
	}
	return result;
}

function parse(value, type) {
	switch (type) {
		case 'String':
			return value;
		case 'int':
			return parseInt(value, 10);
		case 'float':
			return parseFloat(value);
		default:
			return value;
	}
}