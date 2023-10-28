import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

type SelectFormLanguageProps = {
    changLanguage: (langCode: 'en' | 'fr') => void
}

/**
 * Component for selecting the application language using flags.
 * @returns {JSX.Element} The SelectLanguage component.
 */
const SelectFormLanguage = ({ changLanguage }: SelectFormLanguageProps): JSX.Element => {

    const [selected, setSelected] = useState<string | "US" | "FR">("US");
    /**
     * Handles language change when a flag is selected.
     * @param {string} langCode - The language code to switch to.
     */
    const changeLanguageHandler = (langCode: string) => {
        setSelected(langCode);

        if (["US", "FR"].includes(langCode)) {

            let languageCode: "en" | "fr" = langCode === 'US' ? 'en' : 'fr'

            // Change the form's language using changLanguage handler.
            changLanguage(languageCode);
        }
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

export default SelectFormLanguage;
