import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../translations';

export const useLanguage = () => {
  const { state } = useAppContext();
  const t = useTranslation(state.language);
  
  return { t, language: state.language };
};