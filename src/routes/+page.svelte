<script lang="ts">
	import InputRomano from '$lib/assets/components/InputRomano.svelte';
	import InputReal from '$lib/assets/components/InputReal.svelte';
	import { ArrowUpDown } from 'lucide-svelte';

	let changeInput: boolean = true;
	let resultado: string = 'Resultado';
	let numberReal: number;

	const changeInputConversor = () => {
		changeInput = !changeInput;
		console.log('dentro', changeInput);
	};

	interface RomanNumeral {
		valor: number;
		numeral: string;
	}
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

	const inteiroParaRomano = (numberReal: number) => {
		if (numberReal <= 0) {
			resultado = 'Número não pode ser representado em numeração romana';
			return;
		}

		let resultadoTemp = '';

		valoresRomanos.forEach((item) => {
			while (numberReal >= item.valor) {
				resultadoTemp += item.numeral;
				numberReal -= item.valor;
			}
		});

		resultado = resultadoTemp;
	};

	let romano: string;
	const romanoParaInteiro = (romano: string) => {
		let resultado = 0;

		for (let i = 0; i < romano.length; i++) {
			const valorAtual = valoresRomanos.find((item) => item.numeral === romano[i])?.valor || 0;
			const proximoValor =
				valoresRomanos.find((item) => item.numeral === romano[i + 1])?.valor || 0;

			if (valorAtual < proximoValor) {
				resultado += proximoValor - valorAtual;
				i++;
			} else {
				resultado += valorAtual;
			}
		}

		return resultado;
	};
</script>

<div class="flex flex-col items-center mt-36 w-full h-full">
	<div class="flex flex-col p-5 gap-4">
		{#if changeInput}
			<label class="card flex flex-col items-center p-4 gap-2">
				<span>NUMERO ROMANO</span>
				<input
					class="input h-10 p-4"
					type="text"
					placeholder="Digite um numero"
					bind:value={numberReal}
				/>
			</label>
		{:else}
			<label class="card flex flex-col items-center p-4 gap-2">
				<span>NUMERO ROMANO</span>
				<input
					class="input h-10 p-4"
					type="text"
					placeholder="Digite um numero"
					bind:value={romano}
				/>
			</label>
		{/if}
		<button class="btn pb-0 items-end" on:click={changeInputConversor}>
			<ArrowUpDown size={35} />
		</button>
		<div class="card flex flex-col items-center p-4 gap-2">
			{#if changeInput}
				<span>NUMERO ROMANO</span>
				<p class="h-10 flex justify-center items-center">{resultado}</p>
			{:else}
				<span>NUMERO REAL</span>
				<p class="h-10 flex justify-center items-center">{resultado}</p>
			{/if}
		</div>
	</div>
	<button
		class="btn variant-ghost-primary font-medium"
		on:click={{ changeInput } ? { inteiroParaRomano } : { romanoParaInteiro }}
	>
		Converter
	</button>
</div>
