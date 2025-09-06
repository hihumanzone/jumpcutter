# Jump Cutter Extension Installation Guide

This guide explains how to install the Jump Cutter browser extension from the packaged files.

## Getting the Extension Packages

The Jump Cutter extension is available as ready-to-install packages:

- `dist-chromium.zip` - For Chromium-based browsers (Chrome, Edge, Brave, Opera, etc.)
- `dist-gecko.zip` - For Firefox and other Gecko-based browsers

To build these packages yourself:

```bash
# Install dependencies
yarn install

# Initialize translation files (required)
git submodule update --init

# Build extension packages for both browsers
yarn package
```

This will create:
- `dist-chromium.zip` - Ready to install in Chrome/Edge/Brave/Opera
- `dist-gecko.zip` - Ready to install in Firefox

Alternative commands:
- `yarn build-and-package:all` - Same as `yarn package` 
- `yarn build-and-package:chromium` - Create only `dist-chromium.zip`
- `yarn build-and-package:gecko` - Create only `dist-gecko.zip`

## Installation Instructions

### Chrome/Chromium/Edge/Brave

1. Download `dist-chromium.zip`
2. Extract the zip file to a folder on your computer
3. Open your browser and navigate to the extensions page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
   - **Opera**: `opera://extensions/`
4. Enable "Developer mode" (toggle in the top-right corner)
5. Click "Load unpacked" button
6. Select the folder where you extracted the zip file
7. The Jump Cutter extension should now be installed and visible in your extensions list

### Firefox

1. Download `dist-gecko.zip`
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..." button
5. Navigate to and select the `dist-gecko.zip` file (you don't need to extract it)
6. The extension will be loaded temporarily

**Note**: For permanent installation in Firefox, the extension needs to be signed by Mozilla or you need to use Firefox Developer Edition/Nightly with `xpinstall.signatures.required` set to `false` in `about:config`.

### Alternative: Firefox Developer Installation

For development or permanent installation without signing:

1. Extract `dist-gecko.zip` to a folder
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on..."
5. Navigate to the extracted folder and select the `manifest.json` file

## What's Included

Each extension package contains:

- **Manifest file** (`manifest.json`) - Extension configuration
- **Background scripts** - Core extension logic
- **Content scripts** - Scripts that run on web pages to detect and modify video playback
- **Popup interface** - Extension settings and controls
- **Options page** - Detailed configuration options
- **Icons** - Extension icons for browser toolbar
- **Localization** - Support for multiple languages
- **Audio processors** - Web Audio API processors for silence detection and volume filtering

## Features

Jump Cutter automatically:

- Detects silent portions in videos
- Speeds up or skips silent parts
- Maintains audio quality during playback speed changes
- Works on most video platforms (YouTube, Netflix, etc.)
- Provides customizable settings for silence detection sensitivity
- Supports hotkeys for quick control

## Troubleshooting

- **Extension not working**: Make sure you've enabled it in your browser's extension settings
- **No effect on videos**: Try refreshing the page after installing the extension
- **Firefox temporary loading**: The extension will be removed when you restart Firefox unless permanently installed
- **Permissions**: The extension requires access to all websites to work on video platforms

## Development

To modify or contribute to the extension:

1. Clone the repository
2. Make your changes to the source code in `src/`
3. Build and test using the commands above
4. The extension will be rebuilt in the `dist-chromium/` or `dist-gecko/` directories

For more information, see the main [README.md](README.md) file.