<script>
  import { onMount } from 'svelte';

  export let decrementer;

  onMount(() => {
    const interval = setInterval(() => {
      decrementer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<slot/>
