import { useMemo, useState } from "react";
import classes from "../../styles/all-posts.module.css";
import PostsGrid from "./posts-grid";

const ALL_FILTER = "all";

function getUniqueOptions(posts, getValue) {
  return [...new Set(posts.map(getValue).filter(Boolean))].sort();
}

function getUniqueTags(posts) {
  return [...new Set(posts.flatMap((post) => post.tags || []))].sort();
}

function FilterDropdown(props) {
  const { id, label, value, defaultLabel, options, isOpen, onToggle, onChange } = props;
  const selectedLabel = value === ALL_FILTER ? defaultLabel : value;

  function selectOption(nextValue) {
    onChange(nextValue);
    onToggle(null);
  }

  return (
    <div
      className={classes.dropdown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onToggle(null);
        }
      }}
    >
      <span className={classes.dropdownLabel}>{label}</span>
      <button
        type='button'
        className={classes.dropdownTrigger}
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        onClick={() => onToggle(isOpen ? null : id)}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <div id={`${id}-options`} className={classes.dropdownMenu}>
          <button
            type='button'
            className={value === ALL_FILTER ? classes.activeOption : ""}
            onClick={() => selectOption(ALL_FILTER)}
          >
            {defaultLabel}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type='button'
              className={value === option ? classes.activeOption : ""}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AllPosts(props) {
  const { posts } = props;
  const [selectedCountry, setSelectedCountry] = useState(ALL_FILTER);
  const [selectedTripType, setSelectedTripType] = useState(ALL_FILTER);
  const [selectedTag, setSelectedTag] = useState(ALL_FILTER);
  const [openFilter, setOpenFilter] = useState(null);

  const countries = useMemo(
    () => getUniqueOptions(posts, (post) => post.location?.country),
    [posts]
  );
  const tripTypes = useMemo(
    () => getUniqueOptions(posts, (post) => post.tripType),
    [posts]
  );
  const tags = useMemo(() => getUniqueTags(posts), [posts]);
  const stats = useMemo(() => {
    const cities = new Set(posts.map((post) => post.location?.city).filter(Boolean));

    return [
      { label: "Notes", value: posts.length },
      { label: "Countries", value: countries.length },
      { label: "Cities", value: cities.size },
      { label: "Tags", value: tags.length },
    ];
  }, [countries.length, posts, tags.length]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const countryMatches =
        selectedCountry === ALL_FILTER || post.location?.country === selectedCountry;
      const tripTypeMatches =
        selectedTripType === ALL_FILTER || post.tripType === selectedTripType;
      const tagMatches = selectedTag === ALL_FILTER || post.tags?.includes(selectedTag);

      return countryMatches && tripTypeMatches && tagMatches;
    });
  }, [posts, selectedCountry, selectedTag, selectedTripType]);

  const hasActiveFilters =
    selectedCountry !== ALL_FILTER ||
    selectedTripType !== ALL_FILTER ||
    selectedTag !== ALL_FILTER;

  function clearFilters() {
    setSelectedCountry(ALL_FILTER);
    setSelectedTripType(ALL_FILTER);
    setSelectedTag(ALL_FILTER);
    setOpenFilter(null);
  }

  return (
    <section className={classes.posts}>
      <div className={classes.header}>
        <p className={classes.kicker}>Travel Archive</p>
        <h1>Find the note that matches the next mood.</h1>
        <p>
          Browse the places, weekends, cities, coastlines, and quiet corners gathered so
          far.
        </p>
      </div>

      <dl className={classes.stats} aria-label='Travel archive stats'>
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className={classes.filters} aria-label='Filter travel notes'>
        <div className={classes.filterIntro}>
          <p>Filter notes</p>
        </div>
        <div className={classes.filterControls}>
          <FilterDropdown
            id='country-filter'
            label='Country'
            value={selectedCountry}
            defaultLabel='All countries'
            options={countries}
            isOpen={openFilter === "country-filter"}
            onToggle={setOpenFilter}
            onChange={setSelectedCountry}
          />

          <FilterDropdown
            id='trip-type-filter'
            label='Trip type'
            value={selectedTripType}
            defaultLabel='All trip types'
            options={tripTypes}
            isOpen={openFilter === "trip-type-filter"}
            onToggle={setOpenFilter}
            onChange={setSelectedTripType}
          />

          <FilterDropdown
            id='tag-filter'
            label='Tag'
            value={selectedTag}
            defaultLabel='All tags'
            options={tags}
            isOpen={openFilter === "tag-filter"}
            onToggle={setOpenFilter}
            onChange={setSelectedTag}
          />

          <button type='button' onClick={clearFilters} disabled={!hasActiveFilters}>
            Clear
          </button>
        </div>
      </div>

      <div className={classes.resultsHeader}>
        <p>
          {filteredPosts.length} {filteredPosts.length === 1 ? "note" : "notes"} found
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <PostsGrid posts={filteredPosts} />
      ) : (
        <div className={classes.emptyState}>
          <h2>No notes match these filters.</h2>
          <p>Reset the archive and start from a wider route.</p>
          <button type='button' onClick={clearFilters}>
            Show all notes
          </button>
        </div>
      )}
    </section>
  );
}

export default AllPosts;
