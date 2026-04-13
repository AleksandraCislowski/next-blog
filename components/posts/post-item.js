import Link from "next/link";
import Image from "next/image";
import classes from "../../styles/post-item.module.css";

function PostItem(props) {
  const { title, image, imagePath, excerpt, date, slug, location, readingTime, tags, tripType } =
    props.post;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const postImagePath = imagePath || `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;
  const place = [location?.city, location?.country].filter(Boolean).join(", ");
  const visibleTags = tags?.slice(0, 3) || [];

  return (
    <li className={classes.post}>
      <Link href={linkPath} className={classes.link}>
        <div className={classes.image}>
          <Image
            src={postImagePath}
            alt={title}
            fill
            sizes='(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 100vw'
          />
        </div>
        <div className={classes.content}>
          <div className={classes.eyebrow}>
            {place && <span>{place}</span>}
            {tripType && <span>{tripType}</span>}
          </div>
          <h3>{title}</h3>
          <div className={classes.meta}>
            <time>{formattedDate}</time>
            {readingTime && <span>{readingTime} min read</span>}
          </div>
          <p>{excerpt}</p>
          {visibleTags.length > 0 && (
            <ul className={classes.tags} aria-label={`Tags for ${title}`}>
              {visibleTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
