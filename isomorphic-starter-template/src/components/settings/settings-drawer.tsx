'use client';

import { Button } from 'rizzui';
import SimpleBar from '@/components/ui/simplebar';
import EnvatoIcon from '@/components/icons/envato';
import ColorOptions from '@/components/settings/color-options';
import ThemeSwitcher from '@/components/settings/theme-switcher';
import I18nOptions from '@/components/settings/i18n-options';
export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <I18nOptions/>
          <ThemeSwitcher />
          <ColorOptions />

        </div>
      </SimpleBar>
     
      <SettingsFooterButton />
    </>
  );
}

function SettingsFooterButton() {
  return (
    <a
      href="https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam"
      target="_blank"
      className="grid grid-cols-1 border-t border-muted px-6 pt-4"
    >
      <Button size="lg" as="span" className={'text-base font-semibold'}>
        <EnvatoIcon className="me-2 h-5 w-5" />
        <span className="">Purchase for $24</span>
      </Button>
    </a>
  );
}
