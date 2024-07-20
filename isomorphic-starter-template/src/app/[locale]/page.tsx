
import { Title } from "rizzui";
import {useTranslations} from 'next-intl';

export default function Home({params}:any) {

  const t = useTranslations('Index');
  return (
      <>
          {params.locale}
          <Title>{t('start')}</Title>
          <h1>{t('title')}</h1>
          <h1>{t('text')}</h1>

      </>
  );
}
