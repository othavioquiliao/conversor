<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	import pontos from '$lib/pontos.svg';
	import { ArrowDownUp, ArrowLeftRight } from 'lucide-svelte';
	let opcaoConversao: number = 1;
	let resultadoIntToRomano: string = '';
	let resultadoRomanoToInt: string = '';
	let resultado1: string = '';
	let resultado2: string = '';
	const regex1: RegExp = /^(?:[1-9]|[1-9]\d{0,2}|[1-4]\d{3}|5000)$/;
	const regex2: RegExp = /^(M{0,10})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
	const listaNumeros: number[] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const romanos: string[] = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

	function converter() {
		if (opcaoConversao === 1) {
			if (regex1.test(resultado1)) {
				resultadoIntToRomano = intToRomano(parseInt(resultado1));
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

	function intToRomano(numero: number): string {
		let romano: string = '';
		for (let i = 0; i < listaNumeros.length; i++) {
			while (listaNumeros[i] <= numero) {
				romano += romanos[i];
				numero -= listaNumeros[i];
			}
		}
		return romano;
	}

	function romanToInt(romano: string): number {
		let int: number = 0;
		for (let i = 0; i < listaNumeros.length; i++) {
			while (romano.indexOf(romanos[i]) === 0) {
				int += listaNumeros[i];
				romano = romano.replace(romanos[i], '');
			}
		}
		return int;
	}
	let isFocused: boolean = true;
</script>

<h1 class="h3 sm:h2 pb-14">Conversor</h1>

<div
	class="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center w-1/2 h-35 text-center"
>
	{#if opcaoConversao === 1}
		<div
			class="card p-4 w-1/2 min-w-min border border-primary-500 h-full space-y-1"
			use:focusTrap={isFocused}
		>
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
