const COUNTRY_FLAGS = {
  Canada: "🇨🇦",
  Denmark: "🇩🇰",
  Estonia: "🇪🇪",
  Finland: "🇫🇮",
  Morocco: "🇲🇦",
  Poland: "🇵🇱",
  Portugal: "🇵🇹",
  Romania: "🇷🇴",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
};

const COUNTRY_FLAG_BACKGROUNDS = {
  Canada: "/images/flags/canada.jpg",
  Denmark: "/images/flags/denmark.jpg",
  Estonia: "/images/flags/estonia.jpg",
  Finland: "/images/flags/finland.jpg",
  Morocco: "/images/flags/morocco.jpg",
  Poland: "/images/flags/poland.jpg",
  Portugal: "/images/flags/portugal.jpg",
  Romania: "/images/flags/romania.jpg",
  Spain: "/images/flags/spain.jpg",
  Sweden: "/images/flags/sweden.jpg",
};

export function getCountryFlag(country) {
  return COUNTRY_FLAGS[country] || "🏳️";
}

export function getCountryFlagBackground(country) {
  return COUNTRY_FLAG_BACKGROUNDS[country] || "";
}
