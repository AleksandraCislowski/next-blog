import { useEffect, useMemo, useState } from "react";
import classes from "../../styles/all-posts.module.css";
import PostsGrid from "./posts-grid";

const ALL_FILTER = "all";

const SORT_OPTIONS = [
  { value: "newest", label: "Latest trip first" },
  { value: "oldest", label: "Earliest trip first" },
  { value: "place", label: "Place A-Z" },
  { value: "reading-time", label: "Shortest read" },
  { value: "reading-time-desc", label: "Longest read" },
];

function getUniqueOptions(posts, getValue) {
  return [...new Set(posts.map(getValue).filter(Boolean))].sort();
}

function getUniqueTags(posts) {
  return [...new Set(posts.flatMap((post) => post.tags || []))].sort();
}

function getMatchingPosts(posts, filters) {
  const { country = ALL_FILTER, tripType = ALL_FILTER, tag = ALL_FILTER } = filters;

  return posts.filter((post) => {
    const countryMatches = country === ALL_FILTER || post.location?.country === country;
    const tripTypeMatches = tripType === ALL_FILTER || post.tripType === tripType;
    const tagMatches = tag === ALL_FILTER || post.tags?.includes(tag);

    return countryMatches && tripTypeMatches && tagMatches;
  });
}

function getSearchableText(post) {
  return [
    post.title,
    post.excerpt,
    post.tripType,
    post.location?.city,
    post.location?.country,
    post.location?.region,
    ...(post.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getSearchedPosts(posts, searchTerm) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (!normalizedSearchTerm) {
    return posts;
  }

  return posts.filter((post) => getSearchableText(post).includes(normalizedSearchTerm));
}

function FilterDropdown(props) {
  const {
    id,
    label,
    value,
    defaultLabel,
    options,
    isOpen,
    onToggle,
    onChange,
    showDefaultOption = true,
  } = props;
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label || defaultLabel;

  function selectOption(nextValue) {
    onChange(nextValue);
    onToggle(null);
  }

  function keyDownHandler(event) {
    if (event.key === "Escape") {
      onToggle(null);
    }
  }

  return (
    <div
      className={classes.dropdown}
      onKeyDown={keyDownHandler}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onToggle(null);
        }
      }}
    >
      <span id={`${id}-label`} className={classes.dropdownLabel}>
        {label}
      </span>
      <button
        type='button'
        className={classes.dropdownTrigger}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        aria-label={`${label}: ${selectedLabel}`}
        onClick={() => onToggle(isOpen ? null : id)}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <div
          id={`${id}-options`}
          className={classes.dropdownMenu}
          role='menu'
          aria-labelledby={`${id}-label`}
        >
          {showDefaultOption && (
            <button
              type='button'
              role='menuitemradio'
              aria-checked={value === ALL_FILTER}
              className={value === ALL_FILTER ? classes.activeOption : ""}
              onClick={() => selectOption(ALL_FILTER)}
            >
              {defaultLabel}
            </button>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              type='button'
              role='menuitemradio'
              aria-checked={value === option.value}
              className={value === option.value ? classes.activeOption : ""}
              onClick={() => selectOption(option.value)}
            >
              {option.label}
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
  const [selectedSort, setSelectedSort] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(null);

  const availableCountries = useMemo(() => {
    return getUniqueOptions(
      getMatchingPosts(posts, {
        tripType: selectedTripType,
        tag: selectedTag,
      }),
      (post) => post.location?.country
    );
  }, [posts, selectedTag, selectedTripType]);
  const availableTripTypes = useMemo(() => {
    return getUniqueOptions(
      getMatchingPosts(posts, {
        country: selectedCountry,
        tag: selectedTag,
      }),
      (post) => post.tripType
    );
  }, [posts, selectedCountry, selectedTag]);
  const availableTags = useMemo(() => {
    return getUniqueTags(
      getMatchingPosts(posts, {
        country: selectedCountry,
        tripType: selectedTripType,
      })
    );
  }, [posts, selectedCountry, selectedTripType]);
  const countryOptions = useMemo(
    () => availableCountries.map((country) => ({ value: country, label: country })),
    [availableCountries]
  );
  const tripTypeOptions = useMemo(
    () => availableTripTypes.map((tripType) => ({ value: tripType, label: tripType })),
    [availableTripTypes]
  );
  const tagOptions = useMemo(
    () => availableTags.map((tag) => ({ value: tag, label: tag })),
    [availableTags]
  );
  const filteredPosts = useMemo(() => {
    const matchingPosts = getSearchedPosts(
      getMatchingPosts(posts, {
        country: selectedCountry,
        tripType: selectedTripType,
        tag: selectedTag,
      }),
      searchTerm
    );

    return [...matchingPosts].sort((firstPost, secondPost) => {
      if (selectedSort === "oldest") {
        return firstPost.date > secondPost.date ? 1 : -1;
      }

      if (selectedSort === "place") {
        const firstPlace = [
          firstPost.location?.city,
          firstPost.location?.country,
          firstPost.title,
        ]
          .filter(Boolean)
          .join(" ");
        const secondPlace = [
          secondPost.location?.city,
          secondPost.location?.country,
          secondPost.title,
        ]
          .filter(Boolean)
          .join(" ");

        return firstPlace.localeCompare(secondPlace, "en", { sensitivity: "base" });
      }

      if (selectedSort === "reading-time") {
        return (firstPost.readingTime || 0) - (secondPost.readingTime || 0);
      }

      if (selectedSort === "reading-time-desc") {
        return (secondPost.readingTime || 0) - (firstPost.readingTime || 0);
      }

      return firstPost.date > secondPost.date ? -1 : 1;
    });
  }, [posts, searchTerm, selectedCountry, selectedSort, selectedTag, selectedTripType]);

  useEffect(() => {
    if (selectedCountry !== ALL_FILTER && !availableCountries.includes(selectedCountry)) {
      setSelectedCountry(ALL_FILTER);
    }

    if (selectedTripType !== ALL_FILTER && !availableTripTypes.includes(selectedTripType)) {
      setSelectedTripType(ALL_FILTER);
    }

    if (selectedTag !== ALL_FILTER && !availableTags.includes(selectedTag)) {
      setSelectedTag(ALL_FILTER);
    }
  }, [
    availableCountries,
    availableTags,
    availableTripTypes,
    selectedCountry,
    selectedTag,
    selectedTripType,
  ]);

  const stats = useMemo(() => {
    const filteredCountries = new Set(
      filteredPosts.map((post) => post.location?.country).filter(Boolean)
    );
    const filteredCities = new Set(
      filteredPosts.map((post) => post.location?.city).filter(Boolean)
    );
    const filteredTags = new Set(filteredPosts.flatMap((post) => post.tags || []));

    return [
      { label: "Notes", value: filteredPosts.length },
      { label: "Countries", value: filteredCountries.size },
      { label: "Cities", value: filteredCities.size },
      { label: "Tags", value: filteredTags.size },
    ];
  }, [filteredPosts]);

  const activeFilters = [
    {
      id: "search",
      label: "Search",
      value: searchTerm.trim(),
      reset: () => setSearchTerm(""),
    },
    {
      id: "country",
      label: "Country",
      value: selectedCountry,
      reset: () => setSelectedCountry(ALL_FILTER),
    },
    {
      id: "trip-type",
      label: "Trip type",
      value: selectedTripType,
      reset: () => setSelectedTripType(ALL_FILTER),
    },
    {
      id: "tag",
      label: "Tag",
      value: selectedTag,
      reset: () => setSelectedTag(ALL_FILTER),
    },
  ].filter((filter) => filter.value && filter.value !== ALL_FILTER);

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCountry !== ALL_FILTER ||
    selectedTripType !== ALL_FILTER ||
    selectedTag !== ALL_FILTER;
  const activeFilterSummary = activeFilters
    .map((filter) => `${filter.label.toLowerCase()} "${filter.value}"`)
    .join(", ");

  function clearFilters() {
    setSearchTerm("");
    setSelectedCountry(ALL_FILTER);
    setSelectedTripType(ALL_FILTER);
    setSelectedTag(ALL_FILTER);
    setOpenFilter(null);
  }

  return (
    <section className={classes.posts}>
      <div className={classes.archiveHero}>
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
          <div className={classes.searchControl}>
            <label htmlFor='post-search'>Search notes</label>
            <input
              id='post-search'
              type='search'
              value={searchTerm}
              placeholder='Try Sweden, cathedral, coastline...'
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className={classes.filterControls}>
            <FilterDropdown
              id='country-filter'
              label='Country'
              value={selectedCountry}
              defaultLabel='All countries'
              options={countryOptions}
              isOpen={openFilter === "country-filter"}
              onToggle={setOpenFilter}
              onChange={setSelectedCountry}
            />

            <FilterDropdown
              id='trip-type-filter'
              label='Trip type'
              value={selectedTripType}
              defaultLabel='All trip types'
              options={tripTypeOptions}
              isOpen={openFilter === "trip-type-filter"}
              onToggle={setOpenFilter}
              onChange={setSelectedTripType}
            />

            <FilterDropdown
              id='tag-filter'
              label='Tag'
              value={selectedTag}
              defaultLabel='All tags'
              options={tagOptions}
              isOpen={openFilter === "tag-filter"}
              onToggle={setOpenFilter}
              onChange={setSelectedTag}
            />

            <FilterDropdown
              id='sort-filter'
              label='Sort by'
              value={selectedSort}
              defaultLabel='Latest trip first'
              options={SORT_OPTIONS}
              isOpen={openFilter === "sort-filter"}
              onToggle={setOpenFilter}
              onChange={setSelectedSort}
              showDefaultOption={false}
            />

            <button type='button' onClick={clearFilters} disabled={!hasActiveFilters}>
              Clear filters
            </button>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <ul className={classes.activeFilters} aria-label='Active filters'>
            {activeFilters.map((filter) => (
              <li key={filter.id}>
                <button
                  type='button'
                  onClick={filter.reset}
                  aria-label={`Remove ${filter.label} filter: ${filter.value}`}
                >
                  <span>{filter.label}:</span>
                  <strong>{filter.value}</strong>
                </button>
              </li>
            ))}
          </ul>
        )}
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
          <p className={classes.emptyKicker}>No route found</p>
          <h2>No notes match this path.</h2>
          <p>
            {activeFilterSummary
              ? `Nothing matched ${activeFilterSummary}. Try removing one stop from the route.`
              : "Try widening the route or clearing the archive filters."}
          </p>
          {activeFilters.length > 0 && (
            <ul className={classes.emptyHints} aria-label='Filters currently blocking results'>
              {activeFilters.map((filter) => (
                <li key={filter.id}>{filter.label}</li>
              ))}
            </ul>
          )}
          <button type='button' onClick={clearFilters}>
            Show all notes
          </button>
        </div>
      )}
    </section>
  );
}

export default AllPosts;
