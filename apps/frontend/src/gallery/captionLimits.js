/** @constant {number} Maximum caption length per Lexicon / SRS-F-005.1. */
export const CAPTION_MAX_LENGTH = 2000;

/** @constant {number} Maximum keyword count per Lexicon. */
export const KEYWORDS_MAX_COUNT = 50;

/** @constant {number} Maximum length per keyword. */
export const KEYWORD_MAX_LENGTH = 64;

/**
 * Validate caption length before persisting to PDS.
 *
 * @param {string} caption - Caption text to validate.
 * @returns {{ valid: boolean, message?: string }} Validation result.
 */
export function validateCaptionLength(caption) {
  if (caption.length > CAPTION_MAX_LENGTH) {
    return {
      valid: false,
      message: `Caption must be ${CAPTION_MAX_LENGTH} characters or fewer.`,
    };
  }

  return { valid: true };
}