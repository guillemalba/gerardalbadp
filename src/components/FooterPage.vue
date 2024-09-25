<template>
  <footer class="footer">
    <div class="container">
      <div class="contact-info">
        <h2>Contact</h2>
        <p>Gerard Alba Payá</p>
        <p>+34 628235110</p>
        <p><a :href="'mailto:' + email">{{ email }}</a></p>
      </div>
      <div class="social-media">
        <div class="social-icons">
          <a :href="'https://instagram.com/' + instagramUsername" target="_blank" rel="noopener noreferrer">
            <img :src="instagramIcon" alt="Instagram" class="social-icon">
          </a>
          <a :href="'https://vimeo.com/' + vimeoUsername" target="_blank" rel="noopener noreferrer">
            <img :src="vimeoIcon" alt="Vimeo" class="social-icon">
          </a>
        </div>
        <h1>Lets Create!</h1>
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
  background-color: #000000;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  min-height: 500px; /* Altura mínima de 500px */
  height: 100vh; /* Ocupa toda la altura de la ventana gráfica */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente el contenido */
  align-items: center; /* Centra horizontalmente el contenido */
  box-sizing: border-box; /* Incluye el padding en el tamaño total */
}

.footer .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box; /* Incluye el padding en el tamaño total */
}

.footer .contact-info,
.footer .social-media {
  margin-bottom: 20px;
}

.footer h2 {
  margin-bottom: 10px;
}

.footer p {
  margin: 5px 0;
}

.footer a {
  color: #1e90ff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.social-media .social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px; /* Opcional: agregar margen superior para separar de la cabecera */
}

.social-icon {
  width: 24px;
  height: 24px;
}
</style>
