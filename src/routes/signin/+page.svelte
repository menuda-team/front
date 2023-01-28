<script lang="ts">
  import IMask from "imask";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";

  let inputElement;
  let inputValue = '';
  let buttonDisabled = true;

  const maskOptions = {
    mask: "+{7} (000) 000-00-00"
  };
  $: if (inputElement) {
    IMask(inputElement, maskOptions);
  }

  const MAX_LENGTH = 18;
  $: {
    if (inputValue.length > MAX_LENGTH) {
      inputValue = inputValue.slice(0, -1);
    }
    buttonDisabled = inputValue.length !== MAX_LENGTH;
  }

  const onClickButton = () => {
    goto('/code')
  }

</script>

<div class="w-full flex flex-col h-screen items-center justify-center p-4">
  <h1 class="font-medium text-xxl mb-6 text-center">
    Введите номер телефона
  </h1>
  <input type="tel"
         bind:this={inputElement}
         bind:value={inputValue}
         placeholder="+7 (999) 999-99-99"
         class="rounded bg-bg-gray dark:bg-dark-black2 w-full py-4 px-5
										text-xxl placeholder:text-black3 dark:placeholder:text-dark-gray
										focus:outline-none dark:text-white block mb-6">
  <Button type={buttonDisabled ? 'disabled' : 'action'}
          onClick={onClickButton}
          classes="w-full block h-[60px]">
    Продолжить
  </Button>
</div>