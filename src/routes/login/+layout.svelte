<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
    <a href="/login" class="step step-primary"> Sign In </a>
    <a
      href="/login/username"
      class="step step-primary"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
    >
      Choose Username
    </a>
    <a
      href="/login/photo"
      class="step"
      class:step-primary={$page.route.id?.includes("photo")}
    >
      Upload Photo
    </a>
  </ul>
</nav>

<AnimatedRoute>
  <main class="card md:w-[500px] bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center shadow-lg rounded-xl">
      <slot />
    </div>
  </main>
</AnimatedRoute>
