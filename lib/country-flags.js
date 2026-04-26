const COUNTRY_FLAGS = {
  Morocco: "🇲🇦",
  Poland: "🇵🇱",
  Portugal: "🇵🇹",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
};

const COUNTRY_FLAG_BACKGROUNDS = {
  Morocco: "/images/flags/morocco.png",
  Poland: "/images/flags/poland.png",
  Portugal: "/images/flags/portugal.png",
  Spain: "/images/flags/spain.png",
  Sweden: "/images/flags/sweden.png",
};

export function getCountryFlag(country) {
  return COUNTRY_FLAGS[country] || "🏳️";
}

export function getCountryFlagBackground(country) {
  return COUNTRY_FLAG_BACKGROUNDS[country] || "";
}
