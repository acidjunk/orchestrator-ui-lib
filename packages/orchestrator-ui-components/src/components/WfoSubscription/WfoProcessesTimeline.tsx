import React from 'react';

import { useTranslations } from 'next-intl';

import { EuiComment, EuiCommentList, EuiSpacer, EuiText } from '@elastic/eui';

import { useWithOrchestratorTheme } from '../../hooks';
import { SubscriptionDetailProcess } from '../../types';
import { parseDate, parseDateToLocaleDateTimeString } from '../../utils';
import { upperCaseFirstChar } from '../../utils';
import { WfoProcessStatusBadge } from '../WfoBadges';
import { WfoLoading } from '../WfoLoading';
import { PATH_TASKS, PATH_WORKFLOWS } from '../WfoPageTemplate';
import { WfoTargetTypeIcon } from './WfoTargetTypeIcon';
import { getStyles } from './styles';

interface WfoProcessCardProps {
    subscriptionDetailProcess: SubscriptionDetailProcess;
}

const WfoProcessCard = ({ subscriptionDetailProcess }: WfoProcessCardProps) => {
    const t = useTranslations('subscriptions.detail.processDetail');
    const {
        tableStyle,
        contentCellStyle,
        headerCellStyle,
        emptyCellStyle,
        lastContentCellStyle,
        lastHeaderCellStyle,
    } = useWithOrchestratorTheme(getStyles);
    const processUrl = subscriptionDetailProcess.isTask
        ? PATH_TASKS
        : PATH_WORKFLOWS;

    return (
        <>
            <table css={tableStyle}>
                <tbody>
                    <tr>
                        <td css={emptyCellStyle}></td>
                        <td css={headerCellStyle}>{t('id')}</td>
                        <td css={contentCellStyle}>
                            <a
                                href={`${processUrl}/${subscriptionDetailProcess.processId}`}
                            >
                                {subscriptionDetailProcess.processId}
                            </a>
                        </td>
                        <td css={emptyCellStyle}></td>
                    </tr>
                    <tr>
                        <td css={emptyCellStyle}></td>
                        <td css={headerCellStyle}>{t('status')}</td>
                        <td css={contentCellStyle}>
                            <WfoProcessStatusBadge
                                processStatus={
                                    subscriptionDetailProcess.lastStatus
                                }
                            />
                        </td>
                        <td css={emptyCellStyle}></td>
                    </tr>
                    <tr>
                        <td css={emptyCellStyle}></td>
                        <td css={headerCellStyle}>{t('startedAt')}</td>
                        <td css={contentCellStyle}>
                            {parseDateToLocaleDateTimeString(
                                parseDate(subscriptionDetailProcess.startedAt),
                            )}
                        </td>
                        <td css={emptyCellStyle}></td>
                    </tr>
                    <tr>
                        <td css={emptyCellStyle}></td>
                        <td css={lastHeaderCellStyle}>{t('startedBy')}</td>
                        <td css={lastContentCellStyle}>
                            {subscriptionDetailProcess.createdBy}
                        </td>
                        <td css={emptyCellStyle}></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

interface WfoRenderSubscriptionProcess {
    subscriptionDetailProcess: SubscriptionDetailProcess;
}
const WfoRenderSubscriptionProcess = ({
    subscriptionDetailProcess,
}: WfoRenderSubscriptionProcess) => {
    const { timeLineStyle, workflowTargetStyle } =
        useWithOrchestratorTheme(getStyles);

    return (
        <EuiComment
            username={subscriptionDetailProcess.workflowTarget ?? ''}
            timelineAvatarAriaLabel={subscriptionDetailProcess.workflowName}
            timelineAvatar={
                <WfoTargetTypeIcon
                    target={subscriptionDetailProcess.workflowTarget}
                />
            }
        >
            <div css={timeLineStyle}>
                <EuiText css={workflowTargetStyle}>
                    {upperCaseFirstChar(
                        subscriptionDetailProcess.workflowTarget,
                    )}
                </EuiText>
                <EuiText>{subscriptionDetailProcess.workflowName}</EuiText>
            </div>

            <WfoProcessCard
                subscriptionDetailProcess={subscriptionDetailProcess}
            />
        </EuiComment>
    );
};

interface WfoProcessesTimelineProps {
    subscriptionDetailProcesses: SubscriptionDetailProcess[];
}

export const WfoProcessesTimeline = ({
    subscriptionDetailProcesses,
}: WfoProcessesTimelineProps) => {
    return (
        <>
            <EuiSpacer size={'m'} />
            {!subscriptionDetailProcesses && <WfoLoading />}
            <EuiCommentList aria-label="Processes">
                {subscriptionDetailProcesses && (
                    <EuiCommentList aria-label="Processes">
                        {subscriptionDetailProcesses.map(
                            (subscriptionDetailProcess, index) => (
                                <WfoRenderSubscriptionProcess
                                    key={index}
                                    subscriptionDetailProcess={
                                        subscriptionDetailProcess
                                    }
                                />
                            ),
                        )}
                    </EuiCommentList>
                )}
            </EuiCommentList>
        </>
    );
};
