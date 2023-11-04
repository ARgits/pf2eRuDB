<script lang="ts">
  export let numOfElems:number
  function formatResult(val:number) {
    if (!val) return "Ничего не найдено";
    const tempval = val % 100;
    const num = tempval % 10;
    if (tempval > 10 && tempval < 20) return `Найдено ${val} элементов`;
    if (num > 1 && num < 5) return `Найдено ${val} элемента`;
    if (num === 1) return `Найден ${val} элемент`;
    return `Найдено ${val} элементов`;
  }
</script>

<span>{formatResult(numOfElems)}</span>
