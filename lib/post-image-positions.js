const postImagePositions = {
  'essaouira/essaouira18.jpg': 'center bottom',
  'goteborg/goteborg7.jpg': 'center 65%',
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

export function getPostImagePosition(postSlug, imageSrc) {
  return postImagePositions[`${postSlug}/${imageSrc}`];
}
