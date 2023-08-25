<script>
  import '../app.css'
  import Header from '$lib/components/header.svelte'
  import Footer from '$lib/components/footer.svelte'
</script>

<Header />
<main class="min-h-[90vh] py-6 xl:max-w-screen-content lg:max-w-[80vw] max-w-[95vw] m-auto">
  <slot />
</main>
<Footer />
