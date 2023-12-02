<script lang="ts">
  export let icon: { src: string; class: string };
</script>

<img height="15px" src={icon.src} class={icon.class} alt="something" />

<style>
  .check {
    color: green;
  }
  .xmark {
    color: red;
  }
</style>
