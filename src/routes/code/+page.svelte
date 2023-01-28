<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Timer from "$lib/components/Timer.svelte";

  let inputValue: number;
  let buttonDisabled = true;
  let freezeTime = 5;

  const MAX_LENGTH = 4;

  $: {
    if (inputValue === null) {
      inputValue = undefined;
    } else {
      const inputValueLength = Math.log(inputValue) * Math.LOG10E + 1 | 0;
      if (inputValueLength > MAX_LENGTH) {
        inputValue = Math.floor(inputValue / 10);
      }
      buttonDisabled = inputValueLength < MAX_LENGTH;
    }
  }

</script>

<div class="w-full flex flex-col h-screen items-center justify-center p-4">
  <h1 class="font-medium text-xxl mb-6 text-center">
    Введите код из СМС
  </h1>
  <input type="number"
         min="0"
         bind:value={inputValue}
         placeholder="XXXX"
         class="rounded bg-bg-gray dark:bg-dark-black2 w-full py-4 px-5 text-center
										text-xxl placeholder:text-black3 dark:placeholder:text-dark-gray
										focus:outline-none dark:text-white block">
  {#if (freezeTime > 0)}
    <Timer decrementer={() => --freezeTime}>
      <div class="text-black3 text-m mt-4">
        Перезапросить код можно через {freezeTime} сек
      </div>
    </Timer>
    {:else}
    <div class="text-m mt-4 cursor-pointer text-blue">Отправить код заново</div>
  {/if}
  <Button type={buttonDisabled ? 'disabled' : 'action'} classes="w-full block h-[60px] mt-6">
    Подтвердить
  </Button>
</div>