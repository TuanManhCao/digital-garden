Bu yöntemi Stackoverflow'da [[blindfish|https://stackoverflow.com/a/61979865/9351362]] yazmış.

```html
// LibLoader.svelte

<svelte:head>
  <script bind:this={script} src={url} />
</svelte:head>

<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let url;
  let script;

  onMount(async () => {
    script.addEventListener('load', () => {
      dispatch('loaded');
    })

    script.addEventListener('error', (event) => {
      console.error("something went wrong", event);
      dispatch('error');
    });
  });
</script>
```

<br/>

```html
// MyComponent.svelte

<LibLoader url="myExternalLib.js"
on:loaded="{onLoaded}" />


<script>
  import LibLoader from './LibLoader.svelte';


  function onLoaded() {
    myExternalLib.doStuff();
  }
</script>
```