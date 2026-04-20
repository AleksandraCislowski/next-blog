import Link from 'next/link';
import classes from '../../styles/field-notes.module.css';

function FieldNotes(props) {
  const { posts } = props;
  const countries = new Set(
    posts.map((post) => post.location?.country).filter(Boolean),
  );
  const cities = new Set(
    posts.map((post) => post.location?.city).filter(Boolean),
  );
  const latestPost = posts.reduce((latestPostSoFar, post) => {
    if (!latestPostSoFar) {
      return post;
    }

    const latestAddedDate = latestPostSoFar.addedDate || latestPostSoFar.date;
    const postAddedDate = post.addedDate || post.date;

    return postAddedDate > latestAddedDate ? post : latestPostSoFar;
  }, null);

  return (
    <section className={classes.notes} aria-labelledby='field-notes-heading'>
      <div className={classes.copy}>
        <p>All notes</p>
        <h2 id='field-notes-heading'>A quick read on the archive so far.</h2>
      </div>
      <dl className={classes.stats}>
        <div>
          <dt>Notes</dt>
          <dd>{posts.length}</dd>
        </div>
        <div>
          <dt>Countries</dt>
          <dd>{countries.size}</dd>
        </div>
        <div>
          <dt>Cities</dt>
          <dd>{cities.size}</dd>
        </div>
      </dl>
      <div className={classes.latest}>
        <span>Most recent</span>
        {latestPost && (
          <Link href={`/posts/${latestPost.slug}`}>{latestPost.title}</Link>
        )}
      </div>
    </section>
  );
}

export default FieldNotes;
