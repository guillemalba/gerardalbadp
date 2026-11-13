<template>
  <main class="home">
    <HeroReel @play="playReel" />
    <ChapterIndex @pick="pickChapter" />
    <WorkGrid v-model="filter" />
    <FilmStrip />
    <AboutBlock />
    <ContactBlock />
  </main>
</template>

<script>
import HeroReel from '@/components/home/HeroReel.vue';
import ChapterIndex from '@/components/home/ChapterIndex.vue';
import WorkGrid from '@/components/home/WorkGrid.vue';
import FilmStrip from '@/components/home/FilmStrip.vue';
import AboutBlock from '@/components/home/AboutBlock.vue';
import ContactBlock from '@/components/home/ContactBlock.vue';
import { REEL_ID, CATEGORIES } from '@/data/projects';

// remembered across visits to a project and back
let lastFilter = '';

export default {
  name: 'HomeView',
  components: { HeroReel, ChapterIndex, WorkGrid, FilmStrip, AboutBlock, ContactBlock },
  data() {
    const q = this.$route.query.c;
    return { filter: CATEGORIES.some(c => c.slug === q) ? q : lastFilter };
  },
  watch: {
    filter(v) { lastFilter = v; },
  },
  methods: {
    playReel() {
      this.$router.push({ name: 'Project', params: { id: REEL_ID } });
    },
    pickChapter(slug) {
      this.filter = slug;
      this.$nextTick(() => {
        const el = document.getElementById('work');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
      });
    },
  },
};
</script>
