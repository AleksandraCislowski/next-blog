const postImagePositions = {
  'essaouira/essaouira18.jpg': 'center bottom',
  'goteborg/goteborg7.jpg': 'center 65%',
  'khajits/khajits1.jpg': 'center 68%',
  'khajits/khajits2.jpg': 'center 18%',
  'khajits/khajits5.jpg': 'center 28%',
  'khajits/khajits10.jpg': 'center 24%',
  'huelva/huelva23.JPG': 'center 12%',
  'huelva/huelva27.JPG': 'center 15%',
  'ouzoud/ouzoud4.jpg': 'center bottom',
  'ouzoud/ouzoud5.jpg': 'center bottom',
  'ouzoud/ouzoud7.jpg': 'center bottom',
  'ouzoud/ouzoud8.jpg': 'center bottom',
  'ouzoud/ouzoud9.jpg': 'center bottom',
  'ouzoud/ouzoud10.jpg': 'center top',
  'ouzoud/ouzoud11.jpg': 'center bottom',
  'ouzoud/ouzoud12.jpg': 'center 35%',
  'ouzoud/ouzoud16.jpg': 'right center',
  'ouzoud/ouzoud17.jpg': 'right center',
  'rocio/rocio10.JPG': 'center 22%',
  'rocio/rocio5.JPG': 'center 58%',
  'stockholm/stockholm14.jpg': 'center 30%',
  'wroclaw/wroclaw4.JPG': 'center 20%',
};

const postImageLayouts = {
  'birka/birka14.jpg': 'portrait',
  'helsinki/helsinki14.jpg': 'portrait',
  'helsinki/helsinki21.jpg': 'portrait',
  'khajits/khajits6.jpg': 'portrait',
  'khajits/khajits19.jpg': 'portrait',
  'marrakesh/marrakesh19.jpg': 'portrait',
};

export function getPostImagePosition(postSlug, imageSrc) {
  return postImagePositions[`${postSlug}/${imageSrc}`];
}

export function getPostImageLayout(postSlug, imageSrc) {
  return postImageLayouts[`${postSlug}/${imageSrc}`];
}
