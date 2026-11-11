<template>
  <footer class="footer">
    <div class="inner">
      <p class="label kicker">Contact</p>
      <h2 class="headline">Let's create</h2>

      <a class="email" :href="'mailto:' + email">{{ email }}</a>

      <div class="meta">
        <span>Gerard Alba Payá</span>
        <a :href="'tel:' + phoneHref">{{ phone }}</a>
      </div>

      <div class="social-icons">
        <a class="btn-round" :href="'https://instagram.com/' + instagramUsername" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img :src="instagramIcon" alt="" class="social-icon">
        </a>
        <a class="btn-round" :href="'https://vimeo.com/' + vimeoUsername" target="_blank" rel="noopener noreferrer" aria-label="Vimeo">
          <img :src="vimeoIcon" alt="" class="social-icon">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import vimeoIcon from '@/assets/icons/vimeo.svg';
import instagramIcon from '@/assets/icons/instagram.svg';

export default {
  name: 'FooterPage',
  data() {
    return {
      email: 'gerardalbadp@gmail.com',
      phone: '+34 628 235 110',
      phoneHref: '+34628235110',
      instagramUsername: 'gerardalbadp',
      vimeoUsername: 'gerardalba',
      vimeoIcon: vimeoIcon,
      instagramIcon: instagramIcon
    };
  }
};
</script>

<style scoped>
.footer {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 96px calc(var(--rail) + var(--gutter));
  background: var(--bg);
  border-top: 1px solid var(--line);
  text-align: center;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  max-width: 100%;
}

.kicker { color: var(--ink-dim); margin: 0; }

.headline {
  font-size: clamp(44px, 9vw, 140px);
  line-height: 1;
  text-transform: uppercase;
}

.email {
  font-family: var(--font-text);
  font-size: clamp(18px, 2.4vw, 30px);
  color: var(--ink);
  text-decoration: none;
  overflow-wrap: anywhere;
  background: linear-gradient(var(--accent), var(--accent)) left bottom / 0 1px no-repeat;
  padding-bottom: 6px;
  transition: background-size 0.4s var(--ease), color var(--t);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
  color: var(--ink-dim);
  font-family: var(--font-text);
  font-size: 15px;
}
.meta a { color: inherit; text-decoration: none; transition: color var(--t); min-height: 24px; }

.social-icons { display: flex; gap: 14px; margin-top: 8px; }
.social-icon { width: 20px; height: 20px; display: block; }

@media (hover: hover) {
  .email:hover { background-size: 100% 1px; color: var(--accent); }
  .meta a:hover { color: var(--ink); }
}

@media (max-width: 1000px) {
  .footer { padding: 96px var(--gutter); }
}
</style>
