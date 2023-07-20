import {
  ActionIcon,
  DraggablePanel,
  DraggablePanelBody,
  DraggablePanelContainer,
} from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { LucideEdit, LucideX } from 'lucide-react';
import Router from 'next/router';
import { rgba } from 'polished';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { shallow } from 'zustand/shallow';

import { CHAT_SIDEBAR_WIDTH } from '@/const/layoutTokens';
import HeaderSpacing from '@/features/HeaderSpacing';
import { useSessionStore } from '@/store/session';

import ReadMode from './ReadMode';

const useStyles = createStyles(({ cx, css, token, stylish }) => ({
  drawer: cx(
    stylish.blurStrong,
    css`
      background: ${rgba(token.colorBgLayout, 0.4)};
    `,
  ),
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Config = () => {
  const { t } = useTranslation('common');
  const { styles } = useStyles();
  const [showAgentSettings, toggleConfig, id] = useSessionStore(
    (s) => [s.showAgentSettings, s.toggleConfig, s.activeId],
    shallow,
  );

  return (
    <DraggablePanel
      className={styles.drawer}
      expand={showAgentSettings}
      maxWidth={CHAT_SIDEBAR_WIDTH}
      minWidth={CHAT_SIDEBAR_WIDTH}
      onExpandChange={toggleConfig}
      placement={'right'}
      resize={false}
    >
      <HeaderSpacing />
      <DraggablePanelContainer style={{ flex: 'none', minWidth: CHAT_SIDEBAR_WIDTH }}>
        <Flexbox
          align={'center'}
          className={styles.header}
          distribution={'space-between'}
          horizontal
          padding={12}
          paddingInline={16}
        >
          <Flexbox>{t('agentProfile')}</Flexbox>
          <Flexbox gap={4} horizontal>
            <ActionIcon
              icon={LucideEdit}
              onClick={() => {
                Router.push(`/chat/${id}/edit`);
              }}
              size={{ blockSize: 32, fontSize: 20 }}
              title={t('edit')}
            />
            <ActionIcon
              icon={LucideX}
              onClick={() => {
                toggleConfig(false);
              }}
              size={{ blockSize: 32, fontSize: 20 }}
              title={t('close')}
            />
          </Flexbox>
        </Flexbox>
        <DraggablePanelBody>
          <ReadMode />
        </DraggablePanelBody>
      </DraggablePanelContainer>
    </DraggablePanel>
  );
};

export default Config;