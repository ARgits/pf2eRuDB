<script lang="ts">
  import { Draggable } from "gsap/Draggable";
  import { onMount } from "svelte";
  const min = 0;
  const max = 20;
  let minVal = 50;
  let maxVal = 50;
  let minElem: HTMLDivElement;
  let maxElem: HTMLDivElement;
  let bodyElem: HTMLDivElement;
  onMount(() => {
    console.log(bodyElem.clientWidth);
    // console.log(snap);
    const snapArr = [];
    const singleSnap = bodyElem.clientWidth / (max - min);
    console.log(bodyElem.clientWidth);
    const draggableWidth = minElem.getBoundingClientRect().width;
    let j = 0;
    for (let i = min; i <= max; i++) {
      const coords = i === min ? 0 : i === max ? bodyElem.clientWidth : Math.round(singleSnap * j * 10) / 10;
      snapArr.push({ value: i, coords });
      j++;
    }

    const minDraggable = new Draggable(minElem, { type: "left", liveSnap: snapArr.map((v) => v.coords) });
    const maxDraggable = new Draggable(maxElem, { type: "left", liveSnap: snapArr.map((v) => v.coords) });
    minDraggable.applyBounds({
      minX: draggableWidth,
      maxX: bodyElem.getBoundingClientRect().width - draggableWidth,
    });
    maxDraggable.applyBounds({
      minX: minDraggable.x + draggableWidth,
      maxX: bodyElem.getBoundingClientRect().width,
    });
    minDraggable.addEventListener("dragend", function (e) {
      console.log(
        snapArr.find((v) => v.coords === minDraggable.pointerX),
        minDraggable.pointerX,
        snapArr,
      );
      minVal = snapArr.find((v) => v.coords === minDraggable.pointerX).value;
      minDraggable.applyBounds({ minX: snapArr[0].coords, maxX: maxDraggable.pointerX });
    });
    maxDraggable.addEventListener("dragend", function (e) {
      maxDraggable.applyBounds({
        minX: minDraggable.pointerX,
        maxX: snapArr.at(-1).coords,
      });
    });
    // Draggable.create([minElem, maxElem], {
    //   bounds: bodyElem,
    //   type: "x",
    //   liveSnap: {
    //     x: snap,
    //   },
    //   onDrag: function () {
    //     console.log(this);
    //   },
    // });
  });
</script>

<div class="wrapper">
  <div bind:this={bodyElem} class="slider-body"></div>
  <div bind:this={minElem} class="slider-min"></div>
  <div bind:this={maxElem} class="slider-max"></div>
</div>
{minVal}{maxVal}

<!-- <div class="wrapper">
  <input type="range" {min} {max} list="markers" step="1" class="min" bind:value={minVal} />
  <input type="range" {min} {max} list="markers" step="1" class="max" bind:value={maxVal} />
</div>
<datalist id="markers">
  <option value="0" label="0"></option>
  <option value="25" label="25"></option>
  <option value="50" label="50"></option>
  <option value="75" label="75"></option>
  <option value="100" label="100"></option>
</datalist>
{minVal}{100 - maxVal} -->

<style lang="scss">
  .wrapper {
    position: relative;
  }
  .slider-body {
    width: calc(100% - 2rem);
    height: 10px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 1rem;
    background-color: aqua;
  }
  .slider-min,
  .slider-max {
    top: -2.5px;
    left: 15px;
    position: absolute;
    width: 15px;
    aspect-ratio: 1/1;
    border: 2px solid black;
    border-radius: 10px;
    background-color: blue;
  }
  .slider-max {
    right: 15px;
    left: unset;
    background-color: red;
  }
  //   datalist {
  //     display: flex;
  //     justify-content: space-between;
  //     width: 200px;
  //     margin: 0 auto;
  //   }

  //   option {
  //     padding: 0;
  //   }
  //   .max {
  //     direction: rtl;
  //   }
  //   .wrapper {
  //     position: relative;
  //   }
  //   input {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //   }
  //   .max {
  //     z-index: -1;
  //   }
  //   .max::-webkit-slider-thumb {
  //     z-index: 2;
  //   }
</style>
