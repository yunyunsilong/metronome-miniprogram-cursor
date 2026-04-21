# Metronome WeChat Mini Program

This project has been converted from a website-style app to a WeChat Mini Program structure.

## Mini Program Entry

- `app.js`
- `app.json`
- `app.wxss`
- `pages/index/index.js`
- `pages/index/index.wxml`
- `pages/index/index.wxss`

## Features

- BPM control (`30` to `240`)
- Time signature numerator (`3/4` to `7/4`)
- Start / Stop metronome
- First-beat accent indicator
- Vibration feedback on each beat (long vibration for accented downbeat)
- Visual beat dots for current measure progress

## Run in WeChat DevTools

1. Open WeChat DevTools.
2. Import this folder as a Mini Program project.
3. Use test AppID or replace `appid` in `project.config.json`.
4. Preview the `pages/index/index` page.

## Notes

- Existing React/Vite website files are retained in the repository.
- Current mini program implementation focuses on core metronome behavior and UI.
