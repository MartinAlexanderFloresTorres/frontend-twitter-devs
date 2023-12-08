const share = async ({ title, text, url }, callback = () => {}) => {
  if (navigator.share) {
    await navigator.share({
      title,
      text,
      url,
    });
    callback();
  } else {
    console.error('La API de compartir no es compatible con este navegador');
  }
};

export default share;
