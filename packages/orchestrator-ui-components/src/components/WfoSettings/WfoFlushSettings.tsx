import React, { FunctionComponent, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
    EuiButton,
    EuiComboBox,
    EuiPanel,
    EuiSpacer,
    EuiText,
} from '@elastic/eui';
import { EuiComboBoxOptionOption } from '@elastic/eui/src/components/combo_box/types';

import { useCacheNames, useShowToastMessage } from '@/hooks';
import { useClearCacheMutation } from '@/rtk';
import { ToastTypes } from '@/types';

export const WfoFlushSettings: FunctionComponent = () => {
    const [clearCache] = useClearCacheMutation();

    const t = useTranslations('settings.page');
    const [selectedOptions, setSelected] = useState<EuiComboBoxOptionOption[]>(
        [],
    );
    const { showToastMessage } = useShowToastMessage();

    const onChange = (selectedOptions: EuiComboBoxOptionOption[]) => {
        setSelected(selectedOptions);
    };
    const { data } = useCacheNames();

    const options: EuiComboBoxOptionOption[] =
        data && Object.entries(data).length > 0
            ? Object.entries(data).map(([key, value]) => ({
                  key,
                  label: value,
              }))
            : [{ key: 'loading', label: 'Loading...' }];

    const flushCache = () => {
        if (selectedOptions.length < 1) {
            return;
        }
        const cacheKey = selectedOptions.map((obj) => obj.key).join(', ');
        clearCache(cacheKey)
            .then(() => {
                showToastMessage(
                    ToastTypes.SUCCESS,
                    `Cache for cache key ${cacheKey} flushed successfully`,
                    'Cache cleared',
                );
            })
            .catch(() => {
                showToastMessage(
                    ToastTypes.ERROR,
                    `Flush for cache key ${cacheKey} failed`,
                    'Flush failed',
                );
            });
    };

    return (
        <EuiPanel
            hasShadow={false}
            color="subdued"
            paddingSize="l"
            style={{ width: '50%' }}
        >
            <EuiText size="s">
                <h4>{t('flushCacheSettingsTitle')}</h4>
            </EuiText>
            <EuiSpacer size="m" />
            <EuiComboBox
                aria-label="Flush settings"
                placeholder={t('selectSettings')}
                singleSelection={{ asPlainText: true }}
                options={options}
                selectedOptions={selectedOptions}
                onChange={onChange}
                fullWidth
            />
            <EuiSpacer size="m" />
            <EuiButton onClick={flushCache} iconType="refresh">
                {t('flushButton')}
            </EuiButton>
        </EuiPanel>
    );
};
