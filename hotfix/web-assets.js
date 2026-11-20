/* Tiên Đạo Gia Tộc — H5 asset hotfix
   Resolve image references against the site root, not the CSS file directory.
   This file runs after the asset registry and scene helpers. */
(function () {
  'use strict';
  const root = document.documentElement;
  const absoluteAsset = function (path) {
    return new URL(path, document.baseURI).href;
  };
  const urlVars = [
    '--asset-family-bg', '--asset-battle-bg', '--asset-estate-bg', '--asset-peach-bg',
    '--asset-ui-sheet', '--asset-cultivator-male', '--asset-cultivator-female',
    '--asset-treasure-sheet', '--asset-monster-sheet',
    '--asset-estate-map-concept', '--asset-meditation-male', '--asset-meditation-female'
  ];
  for (const name of urlVars) {
    const raw = root.style.getPropertyValue(name);
    const found = raw && raw.match(/url\(\s*["']?(assets\/images\/[^"'\s)]+)["']?\s*\)/i);
    if (found) root.style.setProperty(name, 'url("' + absoluteAsset(found[1]) + '")');
  }
  // Where CSS sprites have failed before, show a readable icon on load failure.
  // The assets are still loaded normally; the fallback is only a last resort.
  const registry = window.TDGT_ASSETS;
  if (registry) {
    for (const [key, path] of Object.entries(registry)) {
      if (!path || !path.startsWith('assets/')) continue;
      const varName = ({
        familyBg:'--asset-family-bg', battleBg:'--asset-battle-bg',
        estateBg:'--asset-estate-bg', peachBg:'--asset-peach-bg',
        uiSheet:'--asset-ui-sheet', cultivatorMale:'--asset-cultivator-male',
        cultivatorFemale:'--asset-cultivator-female',
        treasureSheet:'--asset-treasure-sheet', monsterSheet:'--asset-monster-sheet'
      })[key];
      if (varName) root.style.setProperty(varName, 'url("' + absoluteAsset(path) + '")');
    }
  }
  root.dataset.h5AssetFix = '2026-11-20';
})();
