<script>
  export let text;
  export let onClick;
  let height;
</script>

<div class="greyOut" on:click={onClick}></div>
<div class="message" bind:clientHeight={height} style="top:calc(50% - {height}px)">
  {text}
</div>

<style>
  .greyOut {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5);
  }
  .message {
    font-size: 100%;
    border: 2px solid black;
    box-shadow: 1px 1px 1px #ddd;
    background: #565656;
    border-radius: 4px;
    padding: 4px;
    position: absolute;
    margin: 0 1rem;
    color: white;
    top: 50%;
  }
</style>
