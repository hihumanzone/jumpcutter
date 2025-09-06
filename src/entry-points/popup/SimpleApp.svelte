<!--
Copyright (C) 2020, 2021, 2022  WofWca <wofwca@protonmail.com>

This file is part of Jump Cutter Browser Extension.

Jump Cutter Browser Extension is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Jump Cutter Browser Extension is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Jump Cutter Browser Extension.  If not, see <https://www.gnu.org/licenses/>.
-->

<script lang="ts">
  import { browserOrChrome } from '@/webextensions-api-browser-or-chrome';
  import { onDestroy } from 'svelte';
  import {
    addOnStorageChangedListener, getSettings, setSettings, settingsChanges2NewValues,
    ControllerKind_STRETCHING,
  } from '@/settings';
  import { SimpleSettings } from '@/settings/SimpleSettings';
  import { defaultSimpleSettings } from '@/settings/defaultSimpleSettings';
  import RangeSlider from './RangeSlider.svelte';
  import type { TelemetryMessage } from '@/entry-points/content/AllMediaElementsController';
  import { assertDev, getMessage } from '@/helpers';

  let settings: SimpleSettings = { ...defaultSimpleSettings };
  
  const settingsPromise = getSettings().then(fullSettings => {
    // Extract only the simple settings we care about
    settings = {
      enabled: fullSettings.enabled,
      volumeThreshold: fullSettings.volumeThreshold,
      soundedSpeed: fullSettings.soundedSpeed,
      marginBefore: fullSettings.marginBefore,
      marginAfter: fullSettings.marginAfter,
      experimentalControllerType: ControllerKind_STRETCHING,
      popupChartWidthPx: fullSettings.popupChartWidthPx,
      popupChartHeightPx: fullSettings.popupChartHeightPx,
      popupChartLengthInSeconds: fullSettings.popupChartLengthInSeconds,
      popupChartJumpPeriod: fullSettings.popupChartJumpPeriod,
      popupChartSpeed: fullSettings.popupChartSpeed,
      popupVolumeThresholdMin: fullSettings.popupVolumeThresholdMin,
      popupVolumeThresholdMax: fullSettings.popupVolumeThresholdMax,
      popupVolumeThresholdStep: fullSettings.popupVolumeThresholdStep,
      popupSoundedSpeedMin: fullSettings.popupSoundedSpeedMin,
      popupSoundedSpeedMax: fullSettings.popupSoundedSpeedMax,
      popupSoundedSpeedStep: fullSettings.popupSoundedSpeedStep,
      popupMarginBeforeMin: fullSettings.popupMarginBeforeMin,
      popupMarginBeforeMax: fullSettings.popupMarginBeforeMax,
      popupMarginBeforeStep: fullSettings.popupMarginBeforeStep,
      popupMarginAfterMin: fullSettings.popupMarginAfterMin,
      popupMarginAfterMax: fullSettings.popupMarginAfterMax,
      popupMarginAfterStep: fullSettings.popupMarginAfterStep,
    };
    return settings;
  });

  // Telemetry for chart
  let latestTelemetryRecord: TelemetryMessage = {
    kind: 'telemetry',
    element: undefined,
    lastActualPlaybackRateChange: { name: 'SOUNDED', time: 0, value: 1 },
    controllerType: ControllerKind_STRETCHING,
    inputVolume: 0,
    elementVolumeChange: { newValue: 1, oldValue: 1, timestamp: 0 },
    outputVolume: 0,
    maybeCanShowMutedElemInfo: false,
    isErrored: false,
    // ... other required fields with default values
  } as TelemetryMessage;
  
  let connected = false;
  let considerConnectionFailed = false;
  let gotAtLeastOneContentStatusResponse = false;

  // Storage change listener
  const onStorageChanged = addOnStorageChangedListener(changes => {
    const newValues = settingsChanges2NewValues(changes);
    Object.assign(settings, newValues);
  });
  onDestroy(onStorageChanged);

  // Input change handler
  function createOnInputListener<T extends keyof SimpleSettings>(settingName: T) {
    return () => {
      // Update settings in storage
      setSettings({ [settingName]: settings[settingName] });
    };
  }

  // Chart click handler (simplified)
  function onChartClick() {
    // Basic chart interaction - could seek to clicked position
  }

  const telemetryUpdatePeriod = 150; // ms
</script>

{#await settingsPromise then _}
  <!-- Header with toggle -->
  <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
    <label style="display: inline-flex; align-items: center;">
      <input
        bind:checked={settings.enabled}
        on:change={createOnInputListener('enabled')}
        type="checkbox"
        style="margin-right: 0.5rem;"
      >
      <span>{getMessage('enable')}</span>
    </label>
  </div>

  <!-- Sound Chart -->
  <div
    style={
      `--popupChartWidth: ${settings.popupChartWidthPx}px;`
      + `--popupChartHeight: ${settings.popupChartHeightPx}px;`
      + 'min-width: var(--popupChartWidth);'
      + 'min-height: var(--popupChartHeight);'
      + 'display: flex;'
      + 'align-items: center;'
      + 'margin-bottom: 1rem;'
    }
  >
    {#if !connected}
      <div class="chart-placeholder">
        {#if settings.enabled}
          {#if considerConnectionFailed}
            <span>🤷‍♀️ {getMessage('noSuitableElement')}</span>
          {:else}
            <span>⏳ {getMessage('loading')}...</span>
          {/if}
        {:else}
          <span>Extension disabled</span>
        {/if}
      </div>
    {:else}
      {#await import('./Chart.svelte')}
        <div class="chart-placeholder">
          ⏳ {getMessage('loading')}...
        </div>
      {:then { default: Chart }}
        <Chart
          {latestTelemetryRecord}
          volumeThreshold={settings.volumeThreshold}
          loadedPromise={settingsPromise}
          widthPx={settings.popupChartWidthPx}
          heightPx={settings.popupChartHeightPx}
          lengthSeconds={settings.popupChartLengthInSeconds}
          jumpPeriod={settings.popupChartJumpPeriod}
          timeProgressionSpeed={settings.popupChartSpeed}
          soundedSpeed={settings.soundedSpeed}
          on:click={onChartClick}
          {telemetryUpdatePeriod}
        />
      {/await}
    {/if}
  </div>

  <!-- Essential Sliders -->
  <RangeSlider
    label="🔉 {getMessage('volumeThreshold')}"
    min={settings.popupVolumeThresholdMin}
    max={settings.popupVolumeThresholdMax}
    step={settings.popupVolumeThresholdStep}
    bind:value={settings.volumeThreshold}
    on:input={createOnInputListener('volumeThreshold')}
    fractionalDigits={4}
  />

  <RangeSlider
    label="▶️ {getMessage('soundedSpeed')}"
    min={settings.popupSoundedSpeedMin}
    max={settings.popupSoundedSpeedMax}
    step={settings.popupSoundedSpeedStep}
    bind:value={settings.soundedSpeed}
    on:input={createOnInputListener('soundedSpeed')}
    fractionalDigits={2}
  />

  <RangeSlider
    label="⏱️⬅️ {getMessage('marginBefore')}"
    min={settings.popupMarginBeforeMin}
    max={settings.popupMarginBeforeMax}
    step={settings.popupMarginBeforeStep}
    bind:value={settings.marginBefore}
    on:input={createOnInputListener('marginBefore')}
    fractionalDigits={3}
  />

  <RangeSlider
    label="⏱️➡️ {getMessage('marginAfter')}"
    min={settings.popupMarginAfterMin}
    max={settings.popupMarginAfterMax}
    step={settings.popupMarginAfterStep}
    bind:value={settings.marginAfter}
    on:input={createOnInputListener('marginAfter')}
    fractionalDigits={3}
  />
{/await}

<style>
  .chart-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: var(--popupChartWidth);
    min-height: var(--popupChartHeight);
    background: rgb(calc(0.7 * 255), 255, calc(0.7 * 255));
  }
</style>