import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import i18next from "i18next";
import Cookies from "js-cookie";

/**
 * Component for selecting the application language using flags.
 * @returns {JSX.Element} The SelectLanguage component.
 */
const SelectLanguage = () => {
  // Get the current language from cookies or default to "en".
  let currentLanguage = Cookies.get("i18next") || "en";

  // Map "en" to "US" and "fr" to "FR".
  const mappedLanguage = currentLanguage === "en" ? "US" : "FR";

  const [selected, setSelected] = useState(mappedLanguage);
  /**
   * Handles language change when a flag is selected.
   * @param {string} langCode - The language code to switch to.
   */
  const changeLanguageHandler = (langCode: string) => {
    setSelected(langCode);

    let languageCode = langCode === 'US' ? 'en' : 'fr'

    // Change the application's language using i18next.
    i18next.changeLanguage(languageCode);
  };

  return (
    <>
      {/* The language selection component with flags. */}
      <ReactFlagsSelect
        className="menu-flags-button border-none"
        countries={["US", "FR"]}
        selected={selected}
        onSelect={changeLanguageHandler}
        customLabels={{
          US: "EN",
          FR: "FR",
        }}
        showSelectedLabel={false}
        showSecondarySelectedLabel={false}
        showOptionLabel={true}
        fullWidth={true}
      />
    </>
  );
};

export default SelectLanguage;
