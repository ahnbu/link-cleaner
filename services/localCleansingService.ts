import { CleansingConfig } from "../types";

/**
 * Regex for Citation Links like [blog.naver](https://...)
 */
const CITATION_LINK_REGEX = /\[[^\]]+\]\(https?:\/\/[^\)]+\)/g;

/**
 * Regex for Footnote Markers like [1], [1, 2], [1-3]
 * Added optional space before the bracket to clean up sentence endings.
 */
const FOOTNOTE_MARKER_REGEX = /\s?\[\d+(?:[\s,.-]*\d+)*\]/g;

/**
 * Regex for Decorative Symbols like ⭐
 */
const DECORATIVE_SYMBOL_REGEX = /[⭐]/g;

/**
 * Regex for Unescaping Markdown characters like \*\* or \*
 */
const UNESCAPE_REGEX = /\\(?=[*#_\[\]])/g;

/**
 * Regex for Escaped Dot like \.
 */
const ESCAPED_DOT_REGEX = /\\\./g;

/**
 * Regex for Escaped Dashes like \----
 */
const ESCAPED_DASH_REGEX = /\\(-{3,})/g;

/**
 * Cleanses text using Regex for fast processing.
 */
export const cleanseTextLocally = (text: string, config: CleansingConfig): string => {
  let result = text;

  // 1. Unescape characters first so other regex can match easily
  if (config.simplifyFormatting) {
    result = result.replace(UNESCAPE_REGEX, "");
    result = result.replace(ESCAPED_DOT_REGEX, ".");
    result = result.replace(ESCAPED_DASH_REGEX, "$1");
  }

  // 2. Remove decorative symbols
  if (config.simplifyFormatting) {
    result = result.replace(DECORATIVE_SYMBOL_REGEX, "");
  }

  // 3. Remove Citation Links
  if (config.removeCitationLinks) {
    result = result.replace(CITATION_LINK_REGEX, "");
  }

  // 4. Remove Footnote Markers
  if (config.removeFootnoteMarkers) {
    result = result.replace(FOOTNOTE_MARKER_REGEX, "");
  }

  // Final cleanup: Remove trailing whitespaces in lines and normalize multiple newlines
  result = result
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');

  return result.trim();
};