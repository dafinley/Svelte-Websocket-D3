<script>
	import { onMount } from 'svelte';
	import store from './store.js';
	import * as d3 from 'd3';
	import Message from './message.svelte';
	let message;
	let messages = [];
	let el;

	onMount(() => {
		store.subscribe(currentMessage => {
				messages = [...messages, currentMessage];
		})

		redrawD3();
	})

	$: if(messages.length > 0){
	  console.log('runing in joint');
	  redrawD3();
	}
	
	function onSendMessage() {
		 if (message.length > 0) {
			 store.sendMessage(message);
			 message = "";
		 }
	}

	function redrawD3() {
	  d3.select(el).selectAll("div").remove();
	  d3.select(el)
			.selectAll("div")
			.data([messages.length])
			.enter()
			.append("div")
			.style("width", function(d) {
				return d + "px";
			})
			.text(function(d) {
				return d;
			});
	}
</script>

<div class='pure-u-1'>

<h1 class='center'>Actual.ly Poll</h1>
<div class="pure-u-1-2 padding-space">
<div bind:this={el} class="chart center"></div>
</div>
<div class="pure-u-1-2 padding-space">
{#each messages as message, i} <Message {message} /> {/each}
</div>

</div>


