// LanguageSwitcher.js
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../Context/Context';
// import { UserContext } from '../path-to-your-UserContextProvider'; // Update the import path

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const { handleChangeLanguage, direction, handleLanguageChange } = useContext(UserContext);

  return (
    <div>
      {/* Add a select element for language selection */}
      <select value={direction} onChange={handleLanguageChange}>
        <option value="ltr">English</option>
        <option value="rtl">Araشاةثيbic</option>
      </select>

      {/* Buttons for testing */}
      <button onClick={() => handleChangeLanguage('en')}>{t('english')} </button>
      <button onClick={() => handleChangeLanguage('ar')}>{t('arabic')}</button>
    </div>
  );
};

export default LanguageSwitcher;
