const postImagePositions = {
  "goteborg/goteborg7.jpg": "center 65%",
  "wroclaw/wroclaw4.JPG": "center 20%",
};

export function getPostImagePosition(postSlug, imageSrc) {
  return postImagePositions[`${postSlug}/${imageSrc}`];
}
