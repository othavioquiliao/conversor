const valoresRomanos: RomanNumeral[] = [
	{ valor: 1000, numeral: 'M' },
	{ valor: 900, numeral: 'CM' },
	{ valor: 500, numeral: 'D' },
	{ valor: 400, numeral: 'CD' },
	{ valor: 100, numeral: 'C' },
	{ valor: 90, numeral: 'XC' },
	{ valor: 50, numeral: 'L' },
	{ valor: 40, numeral: 'XL' },
	{ valor: 10, numeral: 'X' },
	{ valor: 9, numeral: 'IX' },
	{ valor: 5, numeral: 'V' },
	{ valor: 4, numeral: 'IV' },
	{ valor: 1, numeral: 'I' }
];

function inteiroParaRomano(numero: number): string {
	if (numero <= 0) return 'Número não pode ser representado em numeração romana';

	let numeroRomano = '';

	valoresRomanos.forEach((item) => {
		while (numero >= item.valor) {
			numeroRomano += item.numeral;
			numero -= item.valor;
		}
	});

	return numeroRomano;
}

function romanoParaInteiro(romano: string): number {
	let resultado = 0;

	for (let i = 0; i < romano.length; i++) {
		const valorAtual = valoresRomanos.find((item) => item.numeral === romano[i])?.valor || 0;
		const proximoValor = valoresRomanos.find((item) => item.numeral === romano[i + 1])?.valor || 0;

		if (valorAtual < proximoValor) {
			resultado += proximoValor - valorAtual;
			i++;
		} else {
			resultado += valorAtual;
		}
	}

	return resultado;
}

// Exemplo de uso:
const numeroParaConverter = 3549;
const numeroRomanoConvertido = inteiroParaRomano(numeroParaConverter);
console.log(`O número ${numeroParaConverter} em romano é: ${numeroRomanoConvertido}`);

const romanoParaConverter = 'MMMCML';
const numeroConvertido = romanoParaInteiro(romanoParaConverter);
console.log(`O número romano ${romanoParaConverter} em decimal é: ${numeroConvertido}`);
