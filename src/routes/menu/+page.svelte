<script lang="ts">
  import pkg from "scroll-lock";
  import { slide } from "svelte/transition";
  import animateScrollTo from "animated-scroll-to";
  import CartButton from "$lib/components/CartButton.svelte";
  import CategoryCarousel from "$lib/components/CategoryCarousel.svelte";
  import CategoryBlock from "$lib/components/CategoryBlock.svelte";
  import Visibility from "$lib/components/Visibility.svelte";
  import { MENU_EVENT_TYPES } from "$lib/constants";
  import AsyncQueue from "$lib/utils/asyncQueue";
  import debounce from "$lib/utils/debounce";
  import ProductComponent from "$lib/components/Product.svelte";
  import type { Category, Product } from "$lib/types";
  import Swipable from "$lib/components/Swipable.svelte";
  import cart from "$lib/stores/cart";
  import { onMount } from "svelte";

  const { disablePageScroll, enablePageScroll } = pkg;

  export let data: { categories: Record<string, Category> } = { categories: {} };

  let openedProduct: Product | null = null;
  const carouselItems: { [category: string]: HTMLElement } = {};
  let carouselXPadding: number;
  let scrollBar: HTMLElement;
  let bubble: HTMLElement;

  /** сдвиг и ресайз бабла */
  const moveBubble = async (category: string) => {
    if (bubble && scrollBar && carouselItems[category]) {
      const width = carouselItems[category].clientWidth;
      const scrollLeft = scrollBar.scrollLeft;
      const left = carouselItems[category].getBoundingClientRect().left;
      bubble.style.width = `${width}px`;
      bubble.style.transform = `translateX(${left + scrollLeft - carouselXPadding}px)`;
    }
  };

  /** скролл менюшки */
  const DELTA = 2; // погрешность скролла карусели
  const moveScrollBar = async (category: string) => {
    if (scrollBar && carouselItems[category]) {
      const left = carouselItems[category].getBoundingClientRect().left;
      const scrollLeft = scrollBar.scrollLeft;
      await animateScrollTo([scrollLeft + left - carouselXPadding + DELTA, 0], {
        maxDuration: 300,
        minDuration: 200,
        elementToScroll: scrollBar,
        cancelOnUserAction: false
      });
    }
  };

  /** скролл к блоку с категорией */
  const scrollTo = async (category: string) => {
    const categoryBlockEl = document.getElementById(category);
    await animateScrollTo(categoryBlockEl, { maxDuration: 300, minDuration: 100, verticalOffset: -30 });
  };

  const styleCarouselItemsText = (category: string) => {
    Object.keys(carouselItems).forEach((key) => {
      if (key === category) {
        carouselItems[key].classList.replace("text-black3", "text-black2");
        carouselItems[key].classList.replace("dark:text-dark-gray", "dark:text-dark-black");
      } else {
        carouselItems[key].classList.replace("text-black2", "text-black3");
        carouselItems[key].classList.replace("dark:text-dark-black", "dark:text-dark-gray");
      }
    });
  };

  /** обработчик всех событий в очереди */
  const eventsHandler = async ({ category, type }, { lock, unlock }) => {
    switch (type) {
      case MENU_EVENT_TYPES.CAROUSEL_CLICK:
        lock();
        await Promise.all([moveScrollBar(category), moveBubble(category)]);
        styleCarouselItemsText(category);
        await scrollTo(category);
        unlock();
        return;
      case MENU_EVENT_TYPES.CATEGORY_VISIBLE:
        await moveScrollBar(category);
        await moveBubble(category);
        styleCarouselItemsText(category);
        return;
      default:
        return;
    }
  };

  const eventsQueue = AsyncQueue
    .channels(1)
    .process(eventsHandler)
    .failure((err, task) => console.error(`failure: ${err} ${task.category}`));

  let first = true;
  const categoryVisibleEventHandler = debounce(({ detail }) => {
    const { category } = detail;
    const event = {
      category,
      type: MENU_EVENT_TYPES.CATEGORY_VISIBLE
    };

    /** костыль, чтобы избежать некорректного размера бабла при первом событии */
    if (first) {
      setTimeout(() => {
        eventsQueue.add(event);
        first = false;
      }, 100);
    } else {
      eventsQueue.add(event);
    }
  }, 75, false);

  const carouselClickEventHandler = ({ detail }) => {
    const { category } = detail;
    const event = {
      category,
      type: MENU_EVENT_TYPES.CAROUSEL_CLICK
    };
    eventsQueue.add(event);
  };

  // добавляет &product_id=12312 в конец урла
  const goToProduct = (product: Product) => {
    const url = new URL(window.location.href);
    url.searchParams.append('product_id', String(product.id));
    history.pushState({product}, null, url);
  }

  // стирает &product_id=12312 и пушит в стейт history null, чтобы сработала proxy на pushState
  const backToMenu = () => {
    history.back();
  };

  const openProductCard = (product) => {
    disablePageScroll();
    openedProduct = product;
  };

  const closeProductCard = () => {
    enablePageScroll();
    openedProduct = null;
  };

  onMount(() => {
    // proxy для того, чтоб открывать/закрывать продукт на изменение в window.history
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, args) => {
        const product = args && args.length > 0 ? args[0]?.product : null;
        if (product) {
          openProductCard(product);
        } else {
          closeProductCard();
        }
        return target.apply(thisArg, args);
      },
    });
  });

  onMount(() => {
    const onPopState = () => {
      console.log('popstates');
      history.pushState(null, null, null);
    }
    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  })

  // костыль, чтобы веб вью телеграма не закрывалась при закрытии шторки первых продуктов
  onMount(() => {
    window.Telegram?.WebApp.ready();
    window.Telegram?.WebApp.expand();
    setTimeout(() => {
      window.scroll({top: 1});
    }, 10)
    const onScroll = () => {
      if (window.scrollY === 0) {
        window.scroll({top: 1});
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll);
  })

  const MIN_SNIPPET_HEIGHT = 384;
  const VISIBILITY_PERCENT = MIN_SNIPPET_HEIGHT / window.innerHeight * 100;
  const LOAD_DATA_PERCENT = 10;

</script>

<svelte:head>
  <title>Меню</title>
</svelte:head>

<div class="relative">
  <CategoryCarousel
    categories={Object.keys(data.categories)}
    bind:scrollBar={scrollBar}
    bind:bubble={bubble}
    bind:carouselXPadding={carouselXPadding}
    carouselItems={carouselItems}
    on:carousel-click={carouselClickEventHandler}
  />
  <div class="mt-[42px] pb-[40px]">
    {#each Object.keys(data.categories) as categoryName}
      <Visibility steps={100} let:percent let:unobserve name={categoryName}>
        <CategoryBlock
          category={categoryName}
          productsCount={data.categories[categoryName].count}
          categoryId={data.categories[categoryName].id}
          isVisible={percent > VISIBILITY_PERCENT}
          shouldLoadData={percent > LOAD_DATA_PERCENT}
          unobserve={unobserve}
          openProductCard={goToProduct}
          on:category-visible={categoryVisibleEventHandler}
        />
      </Visibility>
    {/each}
  </div>
  {#if ($cart.totalAmount > 0)}
    <div class="h-[80px]" in:slide out:slide></div>
    <div class="fixed bottom-0 left-0 right-0">
      <CartButton actionText="Далее" totalAmount={$cart.totalAmount} />
    </div>
  {/if}
</div>

{#if (openedProduct)}
  <div
    class="fixed bg-black1 opacity-25 h-screen w-full z-10 top-0 touch-none"
    on:click={backToMenu}
  ></div>
{/if}

{#if (openedProduct)}
  <Swipable classes="fixed bottom-0 z-20" onClose={backToMenu}>
    <div>
      <div class="w-[50px] h-[5px] mb-2 bg-white rounded-sm mx-auto"></div>
      <ProductComponent product={openedProduct} closeProductCard={backToMenu} />
    </div>
  </Swipable>
{/if}
