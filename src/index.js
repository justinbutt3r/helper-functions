import { parse } from 'qs';

export const loadFont = url => {
  fetch(url).then(function(response) {
    // handle success
    let css = response.data;
    css = css.replace(/}/g, 'font-display: swap; }');

    const head = document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  });
};

export const mapErrors = errors => {
  if (Array.isArray(errors)) {
    return errors.map(i => i);
  } else {
    return Object.keys(errors).map(i => `${i.toUpperCase()} ${errors[i]}`);
  }
};

export const parseQueryParams = params => {
  return parse(params, { ignoreQueryPrefix: true });
};

export const parseObjectToQuery = values => {
  let query = '';
  Object.keys(values).forEach(i => {
    if (values[i]) {
      query =
        query +
        encodeURIComponent(i) +
        '=' +
        encodeURIComponent(values[i]) +
        '&';
    }
  });
  return query;
};

export const filterSerialize = obj => {
  let str = [];
  for (let p in obj)
    str.push(encodeURIComponent(`q[${p}]`) + '=' + encodeURIComponent(obj[p]));
  return str.join('&');
};

export const shareToSocial = e => {
  e.preventDefault();
  const title = e.currentTarget.title;
  const link = e.currentTarget.href;

  //screen settings
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screen.top;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  const left = width / 2 - 550 / 2 + dualScreenLeft;
  const top = height / 2 - 450 / 2 + dualScreenTop;

  window.open(
    link,
    title,
    `left=${left},top=${top},width=550,height=450,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, `
  );
  return false;
};

export const getSocialLink = (type, link, title, image) => {
  switch (type) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    case 'twitter':
      return `https://twitter.com/share?url=${link}`;
    case 'pinterest':
      return `https://pinterest.com/pin/create/button/?url=${link}&media=${image}&description=`;
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}&summary=&source=`;
    default:
      return '';
  }
};
