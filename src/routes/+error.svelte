<script>
  import { page } from '$app/stores'
  import Button from '$lib/components/button.svelte'
  function reloadPage() {
    globalThis.window.location.reload()
  }
</script>

<div class="grid place-content-center min-h-[70vh] justify-center items-center gap-2">
  <div class="flex gap-2 justify-center text-xl font-semibold">
    <h1 class="text-center">{$page?.error?.message}</h1>
    <span>{$page?.status}</span>
  </div>
  <div class="w-full flex justify-center">
    <Button on:click={reloadPage} variant="gradient" class="w-fit">Reload page</Button>
  </div>
</div>
