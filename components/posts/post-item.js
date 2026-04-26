import Link from "next/link";
import LoadingImage from "../ui/loading-image";
import { getBlurDataURL } from "../../lib/image-placeholder";
import classes from "../../styles/post-item.module.css";

function PostItem(props) {
  const { priority = false } = props;
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
          <LoadingImage
            src={postImagePath}
            alt={title}
            fill
            priority={priority}
            placeholder='blur'
            blurDataURL={getBlurDataURL()}
            quality={72}
            sizes='(min-width: 1100px) 24rem, (min-width: 640px) 43vw, 90vw'
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
