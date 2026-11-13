import { reactive } from 'vue';

// Shared, cached Vimeo metadata: one request per video for the whole app.
const store = reactive({});
const pending = {};

function formatDuration(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Vimeo's v2 API returns 640px thumbnails; the CDN serves larger sizes on the same path.
function largerThumb(url) {
  if (!url) return '';
  return url.replace(/_640(\.\w+)?$/, '_1280$1').replace(/-d_640$/, '-d_1280');
}

export function loadVideo(id) {
  if (store[id] || pending[id]) return pending[id];
  store[id] = { id, loaded: false, title: '', duration: '', thumb: '', thumbSmall: '', description: '', author: '' };
  pending[id] = fetch(`https://vimeo.com/api/v2/video/${id}.json`)
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(([d]) => {
      Object.assign(store[id], {
        loaded: true,
        title: d.title,
        duration: formatDuration(d.duration),
        seconds: d.duration,
        thumbSmall: d.thumbnail_large,
        thumb: largerThumb(d.thumbnail_large),
        description: d.description || '',
        author: d.user_name,
        year: d.upload_date ? d.upload_date.slice(0, 4) : '',
      });
    })
    .catch(() => {
      store[id].loaded = true;
    });
  return pending[id];
}

export function useVideo(id) {
  loadVideo(id);
  return store[id];
}

export function loadAll(ids) {
  ids.forEach(loadVideo);
}

export function embedUrl(id, params = {}) {
  const q = new URLSearchParams({ autoplay: 1, title: 0, byline: 0, portrait: 0, color: 'ff4d2e', ...params });
  return `https://player.vimeo.com/video/${id}?${q}`;
}

export default store;
