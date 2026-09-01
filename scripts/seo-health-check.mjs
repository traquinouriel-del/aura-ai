#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const distDir = join(root, 'dist');

const warnings = [];
const errors = [];

function check(label, condition, detail) {
  if (!condition) {
    errors.push(`${label}: ${detail ?? 'FAILED'}`);
  } else {
    console.log(`  ✓ ${label}`);
  }
}

function checkWarn(label, condition, detail) {
  if (!condition) {
    warnings.push(`${label}: ${detail ?? 'WARNING'}`);
    } else {
    console.log(`  ✓ ${label}`);
  }
}

function readFile(path) {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return null;
  }
}

console.log('\n=== Aura AI SEO Health Check ===\n');

// 1. index.html
console.log('Checking index.html...');
const indexHtml = readFile(join(root, 'index.html'));
check('index.html exists', !!indexHtml);
if (indexHtml) {
  check('html lang attribute', /<html\s+lang="[^"]+"/.test(indexHtml), 'missing lang attribute');
  check('<title> tag', /<title>[^<]+<\/title>/.test(indexHtml), 'missing title');
  check('meta description', /<meta\s+name="description"/.test(indexHtml), 'missing description');
  check('meta theme-color', /<meta\s+name="theme-color"/.test(indexHtml), 'missing theme-color');
  check('meta robots', /<meta\s+name="robots"/.test(indexHtml), 'missing robots');
  check('canonical link', /<link\s+rel="canonical"/.test(indexHtml), 'missing canonical');
  check('og:site_name', /og:site_name/.test(indexHtml));
  check('og:title', /og:title/.test(indexHtml));
  check('og:description', /og:description/.test(indexHtml));
  check('og:type', /og:type/.test(indexHtml));
  check('og:url', /og:url/.test(indexHtml));
  check('og:locale', /og:locale/.test(indexHtml));
  check('og:image', /og:image/.test(indexHtml));
  check('twitter:card', /twitter:card/.test(indexHtml));
  check('twitter:creator', /twitter:creator/.test(indexHtml));
  check('twitter:title', /twitter:title/.test(indexHtml));
  check('twitter:image', /twitter:image/.test(indexHtml));
  check('hreflang pt-PT', /hreflang="pt-PT"/.test(indexHtml));
  check('hreflang en', /hreflang="en"/.test(indexHtml));
  check('hreflang es', /hreflang="es"/.test(indexHtml));
  check('hreflang fr', /hreflang="fr"/.test(indexHtml));
  check('hreflang de', /hreflang="de"/.test(indexHtml));
  check('hreflang x-default', /hreflang="x-default"/.test(indexHtml));
  check('JSON-LD schema', /application\/ld\+json/.test(indexHtml), 'missing JSON-LD');
  check('JSON-LD SoftwareApplication', /SoftwareApplication/.test(indexHtml));
  check('CSP header', /Content-Security-Policy/.test(indexHtml));
  check('X-Content-Type-Options', /X-Content-Type-Options/.test(indexHtml));
  check('Referrer-Policy', /Referrer-Policy/.test(indexHtml));
  check('preconnect fonts', /preconnect.*fonts\.googleapis/.test(indexHtml));
  check('preconnect supabase', /preconnect.*supabase/.test(indexHtml));
  check('preconnect ipapi', /preconnect.*ipapi/.test(indexHtml));
}

// 2. PWA Manifest
console.log('\nChecking PWA manifest...');
const manifest = readFile(join(publicDir, 'manifest.webmanifest'));
check('manifest.webmanifest exists', !!manifest);
if (manifest) {
  try {
    const m = JSON.parse(manifest);
    check('manifest name', !!m.name);
    check('manifest short_name', !!m.short_name);
    check('manifest display standalone', m.display === 'standalone');
    check('manifest theme_color', !!m.theme_color);
    check('manifest background_color', !!m.background_color);
    check('manifest icons array', Array.isArray(m.icons) && m.icons.length > 0);
    check('manifest start_url', !!m.start_url);
  } catch {
    errors.push('manifest.webmanifest: invalid JSON');
  }
}

// 3. Favicons
console.log('\nChecking favicons...');
check('aura.svg exists', existsSync(join(publicDir, 'aura.svg')));
checkWarn('favicon-32x32.png exists', existsSync(join(publicDir, 'favicon-32x32.png')), 'generate with: npx svg2png aura.svg');
checkWarn('apple-touch-icon.png exists', existsSync(join(publicDir, 'apple-touch-icon.png')), 'generate with: npx svg2png aura.svg');
checkWarn('og-banner.png exists', existsSync(join(publicDir, 'og-banner.png')), 'social banner not generated yet');

// 4. robots.txt & sitemap.xml
console.log('\nChecking robots.txt & sitemap.xml...');
const robots = readFile(join(publicDir, 'robots.txt'));
check('robots.txt exists', !!robots);
if (robots) {
  check('robots.txt has User-agent', /User-agent:\s*\*/.test(robots));
  check('robots.txt has Sitemap', /Sitemap:/.test(robots));
  check('robots.txt disallows /perfil', /Disallow:\s*\/perfil/.test(robots));
}

const sitemap = readFile(join(publicDir, 'sitemap.xml'));
check('sitemap.xml exists', !!sitemap);
if (sitemap) {
  check('sitemap.xml has urlset', /<urlset/.test(sitemap));
  check('sitemap.xml has <loc>', /<loc>/.test(sitemap));
  check('sitemap.xml has hreflang', /xhtml:link/.test(sitemap));
}

// 5. SEO module
console.log('\nChecking SEO module...');
const seoModule = readFile(join(root, 'src/lib/seo.ts'));
check('seo.ts exists', !!seoModule);
if (seoModule) {
  check('seo.ts has updateSEO', /export function updateSEO/.test(seoModule));
  check('seo.ts has 5 languages', /pt.*en.*es.*fr.*de/s.test(seoModule));
  check('seo.ts has JSON-LD', /SoftwareApplication/.test(seoModule));
  check('seo.ts has hreflang', /hreflang|alternate/.test(seoModule));
  check('seo.ts has robots control', /noindex|robots/.test(seoModule));
}

// 6. Language detection
console.log('\nChecking language detection...');
const settings = readFile(join(root, 'src/lib/settings.tsx'));
check('settings.tsx exists', !!settings);
if (settings) {
  check('detectInitialLanguage export', /export async function detectInitialLanguage/.test(settings));
  check('detectBrowserLanguageSync export', /export function detectBrowserLanguageSync/.test(settings));
  check('navigator.language used', /navigator\.language/.test(settings));
  check('IP geolocation used', /ipapi\.co/.test(settings));
  check('country-to-language map', /COUNTRY_LANG_MAP/.test(settings));
}

// 7. Build output (if dist exists)
console.log('\nChecking build output...');
if (existsSync(distDir)) {
  const distIndex = readFile(join(distDir, 'index.html'));
  check('dist/index.html exists', !!distIndex);
  if (distIndex) {
    check('dist has manifest link', /manifest\.webmanifest/.test(distIndex));
    check('dist has JSON-LD', /application\/ld\+json/.test(distIndex));
  }
  check('dist has robots.txt', existsSync(join(distDir, 'robots.txt')));
  check('dist has sitemap.xml', existsSync(join(distDir, 'sitemap.xml')));
  check('dist has manifest.webmanifest', existsSync(join(distDir, 'manifest.webmanifest')));
} else {
  console.log('  (skipped — dist not built yet)');
}

// Summary
console.log('\n=== Summary ===');
if (warnings.length > 0) {
  console.log(`\n⚠️  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`   ⚠ ${w}`));
}
if (errors.length > 0) {
  console.error(`\n❌ ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`   ✗ ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ All critical SEO checks passed!');
  if (warnings.length > 0) {
    console.log(`   (${warnings.length} non-blocking warning(s))`);
  }
  process.exit(0);
}
