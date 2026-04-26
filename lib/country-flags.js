const COUNTRY_FLAGS = {
  Morocco: "🇲🇦",
  Poland: "🇵🇱",
  Portugal: "🇵🇹",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
};

const COUNTRY_FLAG_BACKGROUNDS = {
  Morocco: "/images/flags/morocco.jpg",
  Poland: "/images/flags/poland.jpg",
  Portugal: "/images/flags/portugal.jpg",
  Spain: "/images/flags/spain.jpg",
  Sweden: "/images/flags/sweden.jpg",
};

export function getCountryFlag(country) {
  return COUNTRY_FLAGS[country] || "🏳️";
}

export function getCountryFlagBackground(country) {
  return COUNTRY_FLAG_BACKGROUNDS[country] || "";
}
