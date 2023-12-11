<script setup lang="ts">
  import 'grapick/dist/grapick.min.css';
  // @ts-ignore
  import Grapick from 'grapick';

  const props = defineProps<{
    initialGradient?: {
      angle: number;
      colorStops: {
        color: string;
        position: number;
      }[];
    };
  }>();
  const emit = defineEmits(['change']);

  const gp = new Grapick({el: '#gp'});

  // Handlers are color stops
  gp.addHandler(0, 'red');
  gp.addHandler(100, 'blue');

  // Do stuff on change of the gradient
  gp.on('change', (complete: any) => {
    document.body.style.background = gp.getSafeValue();
  })
</script>

<template>
  <div id="gp"></div>
  <link rel="stylesheet" href="path/to/grapick.min.css">
</template>
