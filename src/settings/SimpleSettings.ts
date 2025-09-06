/**
 * @license
 * Copyright (C) 2020, 2021, 2022  WofWca <wofwca@protonmail.com>
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

import { ControllerKind } from './ControllerKind';

/**
 * Simplified settings interface for the stripped-down extension.
 * Only includes essential settings for basic functionality.
 */
export interface SimpleSettings {
  // Core functionality
  enabled: boolean,
  
  // Essential audio settings
  volumeThreshold: number,
  soundedSpeed: number,
  marginBefore: number,
  marginAfter: number,
  
  // Fixed algorithm - always use stretching (experimental)
  experimentalControllerType: ControllerKind.STRETCHING,
  
  // UI settings for popup
  popupChartWidthPx: number,
  popupChartHeightPx: number,
  popupChartLengthInSeconds: number,
  popupChartJumpPeriod: number,
  popupChartSpeed: 'realTime' | 'intrinsicTime' | 'soundedSpeedTime',
  
  // Slider ranges for UI
  popupVolumeThresholdMin: number,
  popupVolumeThresholdMax: number,
  popupVolumeThresholdStep: number,
  
  popupSoundedSpeedMin: number,
  popupSoundedSpeedMax: number,
  popupSoundedSpeedStep: number,
  
  popupMarginBeforeMin: number,
  popupMarginBeforeMax: number,
  popupMarginBeforeStep: number,
  
  popupMarginAfterMin: number,
  popupMarginAfterMax: number,
  popupMarginAfterStep: number,
}