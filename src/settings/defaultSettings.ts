/**
 * @license
 * Copyright (C) 2021, 2022  WofWca <wofwca@protonmail.com>
 *
 * This file is part of Jump Cutter Browser Extension.
 *
 * Jump Cutter Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jump Cutter Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Jump Cutter Browser Extension.  If not, see <https://www.gnu.org/licenses/>.
 */

import { enabledSettingDefaultValue, OppositeDayMode } from './';
import type { Settings } from './';
import { ControllerKind } from './ControllerKind';
import { getGeckoLikelyMaxNonMutedPlaybackRate } from '@/helpers';
import { browserHasAudioDesyncBug } from '@/helpers/browserHasAudioDesyncBug';

// Start with a below-middle value to let the user get a feel
// for how the extension behaves without being too disruptive,
// and then let them crank it up if they feel like it.
// The value of 50 should be optimal for most users (based on my feeling).
const simpleSliderDefaultVal = 33;

const ElementPlaybackControllerStretchingSpecificDefaults = {
  // If you decide to change these values,
  // remember to also update them in `popup/App.svelte`.
  volumeThreshold: 0.001 + simpleSliderDefaultVal * 0.00015,
  marginBefore: 0,
  marginAfter: 0.03 + 0.0020 * (100 - simpleSliderDefaultVal),
} as const;

export const defaultSettings: Readonly<Settings> = {
  volumeThreshold: ElementPlaybackControllerStretchingSpecificDefaults.volumeThreshold,
  previousVolumeThreshold:  ElementPlaybackControllerStretchingSpecificDefaults.volumeThreshold,
  silenceSpeedSpecificationMethod: 'relativeToSoundedSpeed',
  // If you decide to change these values,
  // remember to also update them in `popup/App.svelte`.
  silenceSpeedRaw:         1.5 + simpleSliderDefaultVal * 0.020,
  previousSilenceSpeedRaw: 1.5 + simpleSliderDefaultVal * 0.020,
  // Argument for `soundedSpeed !== 1`:
  // * It reminds the user that the extension is enabled, so he's not confused by media getting seeked seemingly
  // randomly.
  // * It shows the user that there is such functionality.
  // * People who have installed this extension are expected to prefer a faster `soundedSpeed`.
  // Arguments agains:
  // * At a first glance you may think that if videos are being playing at a faster speed then it means
  // that the extension thinks that the whole video is silent and is trying to skip silence this way.
  // * It's better to start simple and not force the user to go to settings if they don't like
  // `soundedSpeed !== 1`.
  soundedSpeed:         1,
  previousSoundedSpeed: 1,
  enabled: enabledSettingDefaultValue,
  // Seems like new users get immediately scared by the sound distortion the extension causes, so let's let users
  // enable marginBefore manually IF they start noticing that they need it.
  marginBefore:         ElementPlaybackControllerStretchingSpecificDefaults.marginBefore,
  previousMarginBefore: ElementPlaybackControllerStretchingSpecificDefaults.marginBefore,
  marginAfter:          ElementPlaybackControllerStretchingSpecificDefaults.marginAfter,
  previousMarginAfter:  ElementPlaybackControllerStretchingSpecificDefaults.marginAfter,

  experimentalControllerType: ControllerKind.STRETCHING,
  useSeparateMarginSettingsForDifferentAlgorithms: true,
  algorithmSpecificSettings: {
    [ControllerKind.CLONING]: {
      volumeThreshold: 0.010,
      marginBefore: 0.050,
      marginAfter: 0.030,
    },
    [ControllerKind.STRETCHING]: {
      ...ElementPlaybackControllerStretchingSpecificDefaults,
    },
  },

  applyTo: 'videoOnly',

  omitMutedElements: true,

  dontAttachToCrossOriginMedia: true,

  enableHotkeys: false,  // Disable hotkeys for simplified extension
  hotkeys: [],

  popupDisableHotkeysWhileInputFocused: true,
  popupAutofocusEnabledInput: false,
  popupChartWidthPx: 400,
  popupChartHeightPx: 50,
  popupChartLengthInSeconds: 8,
  // TODO maybe even if `popupChartSpeed === 'intrinsicTime'` the period still should be in real time?
  // At least as an option? But we're now expressing it as a fraction of chart length.
  popupChartJumpPeriod: 0,
  popupChartSpeed: 'soundedSpeedTime',
  popupAlwaysShowOpenLocalFileLink: true,

  // Remember that "step" also controls what the input does when you control it with the keyboard,
  // aside from the mouse.
  popupVolumeThresholdMin: 0,
  popupVolumeThresholdMax: 0.050,
  popupVolumeThresholdStep: 0.0001,

  popupSoundedSpeedMin: 0.25,
  popupSoundedSpeedMax: 4, // BUILD_DEFINITIONS.BROWSER === 'gecko' ? getGeckoLikelyMaxNonMutedPlaybackRate()
  // YouTube has a slider where they use a step of 0.05,
  // let's keep this in line so that people feel at home.
  popupSoundedSpeedStep: 0.05,

  popupSilenceSpeedRawMin: 1,
  // See the comment in `getAbsoluteClampedSilenceSpeed` definition on why `max` is different
  // for different browsers.
  popupSilenceSpeedRawMax: BUILD_DEFINITIONS.BROWSER === 'gecko'
    // But if the browser gets upgraded, this will remain at 4. Doesn't matter?
    ? Math.min(8, getGeckoLikelyMaxNonMutedPlaybackRate())
    : 8,
  popupSilenceSpeedRawStep: 0.05,

  popupMarginBeforeMin: 0,
  popupMarginBeforeMax: 0.5,
  popupMarginBeforeStep: 0.010,

  popupMarginAfterMin: 0,
  popupMarginAfterMax: 0.5,
  popupMarginAfterStep: 0.010,

  popupSpecificHotkeys: [],

  timeSavedAveragingMethod: 'exponential',
  timeSavedAveragingWindowLength: 600,
  timeSavedExponentialAveragingLatestDataWeight: 0.95,

  badgeWhatSettingToDisplayByDefault: 'soundedSpeed',

  enableDesyncCorrection: browserHasAudioDesyncBug,

  onPlaybackRateChangeFromOtherScripts: 'updateSoundedSpeed',

  advancedMode: false,  // Always disable advanced mode for simplified UI
  simpleSlider: simpleSliderDefaultVal,

  oppositeDayMode: OppositeDayMode.UNDISCOVERED,
};
