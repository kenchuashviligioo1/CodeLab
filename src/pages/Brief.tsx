import { useLang } from '../i18n'
import SEO from '../components/SEO'
import Section from '../components/Section'
import BriefCalculator from '../components/BriefCalculator'
export default function Brief() {
  const { t } = useLang()
  return (<><SEO page="brief" /><Section title={t('brief.title')} sub={t('brief.sub')}><BriefCalculator /></Section></>)
}
