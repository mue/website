import Link from 'next/link';

import { BsCodeSlash } from 'react-icons/bs';
import { MdWidgets, MdOutlineWeb } from 'react-icons/md';

import { useTranslation } from 'next-i18next';

const getIcon = (name) => {
  switch (name) {
    case 'website':
      return <MdOutlineWeb />;
    case 'api':
      return <BsCodeSlash />;
    case 'extension':
      return <MdWidgets />;
    default:
      break;
  }
};

export default function SourceCard({ name, title, version, url }) {
  const { t } = useTranslation('download');

  return (
    <div className="card">
      <div className="circle">{getIcon(name)}</div>
      <span className="card-title">{title}</span>
      <span className="card-desc">
        {t('version')} {version}
      </span>
      <Link href={url}>
        <a target="_blank">
          <button className={'filled umami--click--source-' + name.toLowerCase()} type="button">
            {t('title')}
          </button>
        </a>
      </Link>
    </div>
  );
}
