<script lang="ts">
  import { slide } from "svelte/transition";
  import cart from "$lib/stores/cart";
  import CartButton from "$lib/components/CartButton.svelte";
  import type { Cart } from "$lib/types";
  import IMask from "imask";

  let phoneNumberInput;
  const maskOptions = {
    mask: "+{7} (000) 000-00-00"
  };
  $: if (phoneNumberInput) {
    IMask(phoneNumberInput, maskOptions);
  }

  const inputValues = {
    city: '',
    street: '',
    house: '',
    floor: '',
    flat: '',
    name: '',
    phone: '',
  };
  $: buttonType = Object.values(inputValues).every(val => val.length > 0) ? 'action' : 'disabled';

  const makeOrder = async () => {
    console.log(inputValues);
    await window.Telegram?.WebApp?.sendData(JSON.stringify({
      event: "payOrder",
      data: {
        items: ($cart as Cart).items.map(({ product_id, count, product }) => ({
          product_id,
          count,
          price: product.price,
          name: product.name,
          sale_price: product.sale_price
        })),
        totalAmount: ($cart as Cart).totalAmount,
      }
    }));
  };

</script>

<svelte:head>
  <title>Оформление заказа</title>
</svelte:head>

<div class="px-4" out:slide>
  <div class="flex pt-[22px] pb-[42px] items-center">
    <a href="/cart" class="dark:invert mr-4 w-[30px] h-[30px] flex items-center justify-center" sveltekit:noscroll>
      <img src="arrow.svg" alt="Назад" class="w-[25px] h-[25px]" />
    </a>
    <h1 class="text-xxl font-semibold dark:text-white">Доставка</h1>
  </div>
  <section class="w-full mb-6">
    <h3 class="dark:text-white pb-5">Адрес</h3>
    <div class="gap-4 grid w-full">
      <input type="text" placeholder="Город" bind:value={inputValues.city} 
             class="block rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
      <input type="text" placeholder="Улица" bind:value={inputValues.street} 
             class="block rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
      <input type="text" placeholder="Дом" bind:value={inputValues.house} 
             class="block rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
      <div class="flex flex-row justify-between">
        <input type="text" placeholder="Этаж" bind:value={inputValues.floor} 
               class="block mr-4 w-full rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
        <input type="text" placeholder="Квартира" bind:value={inputValues.flat} 
               class="block w-full rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
      </div>
    </div>
  </section>
  <section class="w-full mb-10">
    <h3 class="dark:text-white pb-5">Получатель</h3>
    <div class="gap-4 grid w-full">
      <input type="text" placeholder="Имя" bind:value={inputValues.name} 
             class="block rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
      <input type="tel" placeholder="Номер телефона" bind:this={phoneNumberInput} bind:value={inputValues.phone} 
             class="block rounded text-xbase placeholder:text-black3 dark:placeholder:text-dark-gray bg-bg-gray dark:bg-dark-black2 dark:text-white py-4 px-5">
    </div>
  </section>
  <div class="fixed bottom-0 left-0 right-0">
    <CartButton
      actionText="Оплатить"
      totalAmount={$cart.totalAmount}
      link=""
      buttonType={buttonType}
      action={makeOrder}
    />
  </div>
</div>