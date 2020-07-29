<script>
	import { onMount } from 'svelte';
	import store from './store.js';
	import * as d3 from 'd3';
	import Message from './message.svelte';
	let message;
	let messages = [];
	let el;
	let unsubscribe;

	onMount(() => {
		unsubscribe = store.subscribe(m => {
		  if(m){
		    messages = [...messages, m.message];
		  }
		    
		})

		redrawD3();
	})

	$: if(orderedMessages.length > 0){
	  redrawD3();
	}

	$: orderedMessages = Object.entries(messages.reduce((acc, curr) => {
	  if(!acc[curr.toLowerCase()]){
	    acc[curr.toLowerCase()] = 1;
	  } else {
	    acc[curr.toLowerCase()] += 1;
	  }

	  return acc;
	}, {}));
	
	function onSendMessage() {
		 if (message.length > 0) {
			 store.sendMessage(message);
			 message = "";
		 }
	}

	function redrawD3() {
	  console.log('ordered redraw', orderedMessages);
	  d3.select(el).selectAll("div").remove();
	  d3.select(el)
			.selectAll("div")
			.data(orderedMessages)
			.enter()
			.append("div")
			.style("width", function(d) {
				return +d[1] * 20 + "px";
			})
			.text(function(d) {
				return d[0];
			});
	}

</script>

<div class='pure-g'>

<div class="sidebar pure-u-1 pure-u-md-1-4">
  <div class="header">
    <h1 class="brand-title">Actual.ly</h1>
    <h2 class="brand-tagline">Poll</h2>

    <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item">
        <a class="pure-button" href="https://actual.ly/">Actually</a>
      </li>
    </ul>
    </nav>
  </div>
</div>
<div class="content pure-u-1 pure-u-md-3-4">
<div bind:this={el} class="chart center"></div>

<div class="pure-u-1-2 padding-space">
{#each messages as message, i} <Message {message} /> {/each}
</div>

</div>
</div>


