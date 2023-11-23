<script lang="ts">
	import pontos from '$lib/pontos.svg';
	import { ArrowLeftRight } from 'lucide-svelte';
	let opcaoConversao: number = 1;
	let resultadoIntToRomano: string = '';
	let resultadoRomanoToInt: string = '';
	let resultado1: string = '';
	let resultado2: string = '';
	const regex1: RegExp = /^(?:[1-9]|[1-9]\d{0,2}|[1-4]\d{3}|5000)$/;
	const regex2: RegExp = /^(M|CM|D|CD|C|XC|L|XL|X|IX|V|IV|I)+$/;

	const arabicos: number[] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const romanos: string[] = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

	function converter() {
		if (opcaoConversao === 1) {
			if (regex1.test(resultado1)) {
				resultadoIntToRomano = intToRoman(parseInt(resultado1));
			} else {
				resultadoIntToRomano = 'Apenas numeros entre 1 e 5000';
			}
		} else {
			if (regex2.test(resultado2.toUpperCase())) {
				resultadoRomanoToInt = romanToInt(resultado2.toUpperCase()).toString();
			} else {
				resultadoRomanoToInt = 'Apenas numeros romanos';
			}
		}
	}

	function intToRoman(num: number): string {
		let roman: string = '';
		for (let i = 0; i < arabicos.length; i++) {
			while (arabicos[i] <= num) {
				roman += romanos[i];
				num -= arabicos[i];
			}
		}
		return roman;
	}

	function romanToInt(roman: string): number {
		let int: number = 0;
		for (let i = 0; i < arabicos.length; i++) {
			while (roman.indexOf(romanos[i]) === 0) {
				int += arabicos[i];
				roman = roman.replace(romanos[i], '');
			}
		}
		return int;
	}
</script>

<div
	class="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center w-1/2 h-35 text-center"
>
	{#if opcaoConversao === 1}
		<div class="card p-4 w-1/2 min-w-min border border-primary-500 h-full space-y-1">
			<h3 class="font-bold">Numero inteiro</h3>
			<input
				class="input px-3"
				type="text"
				placeholder="Digite um numero..."
				bind:value={resultado1}
			/>
		</div>
		<button
			type="button"
			class="btn-icon variant-filled-primary h-10 w-10 mx-4"
			on:click={() => {
				opcaoConversao = opcaoConversao === 1 ? 2 : 1;
			}}
		>
			<ArrowLeftRight />
		</button>
		<div
			class="card p-4 w-1/2 min-w-fit flex flex-col h-full border border-primary-500 items-center"
		>
			<h3 class="font-bold">Para romano:</h3>
			{#if resultadoIntToRomano.length > 0}
				<span>{resultadoIntToRomano}</span>
			{:else}
				<img src={pontos} alt="pontos" class="w-1/2" />
			{/if}
		</div>
	{:else}
		<div class="card p-4 w-1/2 border border-primary-500 h-full space-y-1">
			<h3 class="font-bold">Numero romano</h3>
			<input
				class="input px-3"
				type="text"
				placeholder="Digite um numero..."
				bind:value={resultado2}
			/>
		</div>
		<button
			type="button"
			class="btn-icon variant-filled-primary h-10 w-10 mx-4"
			on:click={() => {
				opcaoConversao = opcaoConversao === 1 ? 2 : 1;
			}}
		>
			<ArrowLeftRight />
		</button>
		<div
			class="card p-4 w-1/2 min-w-fit flex flex-col h-full border border-primary-500 items-center"
		>
			<h3 class="font-bold">Para inteiro:</h3>
			{#if resultadoRomanoToInt.length > 0}
				<span>{resultadoRomanoToInt}</span>
			{:else}
				<img src={pontos} alt="pontos" class="w-1/2" />
			{/if}
		</div>
	{/if}
</div>
<button type="button" class="btn variant-filled-primary mt-3" on:click={converter}>Converter</button
>
