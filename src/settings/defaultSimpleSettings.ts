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

import { ControllerKind } from './ControllerKind';
import { SimpleSettings } from './SimpleSettings';

// Simple defaults focused on core functionality
export const defaultSimpleSettings: Readonly<SimpleSettings> = {
  // Core functionality - extension starts enabled
  enabled: true,
  
  // Essential audio settings with sensible defaults
  volumeThreshold: 0.006, // Good balance for detecting speech vs silence
  soundedSpeed: 1.0,      // Normal speed for sounded parts
  marginBefore: 0,        // No margin before by default (less audio distortion)
  marginAfter: 0.1,       // Small margin after to avoid cutting off word endings
  
  // Always use stretching algorithm (experimental)
  experimentalControllerType: ControllerKind.STRETCHING,
  
  // Chart settings for sound visualization
  popupChartWidthPx: 400,
  popupChartHeightPx: 50,
  popupChartLengthInSeconds: 8,
  popupChartJumpPeriod: 0,
  popupChartSpeed: 'soundedSpeedTime',
  
  // Slider ranges
  popupVolumeThresholdMin: 0,
  popupVolumeThresholdMax: 0.050,
  popupVolumeThresholdStep: 0.001,
  
  popupSoundedSpeedMin: 0.25,
  popupSoundedSpeedMax: 4,
  popupSoundedSpeedStep: 0.05,
  
  popupMarginBeforeMin: 0,
  popupMarginBeforeMax: 0.5,
  popupMarginBeforeStep: 0.010,
  
  popupMarginAfterMin: 0,
  popupMarginAfterMax: 0.5,
  popupMarginAfterStep: 0.010,
};