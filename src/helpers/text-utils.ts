/**
 * Strips HTML tags from a string and returns plain text
 * @param html - The HTML string to strip
 * @returns Plain text without HTML tags
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return '';

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Get the text content (this automatically strips HTML tags)
  return tempDiv.textContent || tempDiv.innerText || '';
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Strips HTML tags and truncates text in one operation
 * @param html - The HTML string to process
 * @param maxLength - Maximum length before truncation
 * @returns Plain text, truncated with ellipsis if needed
 */
export const stripAndTruncate = (html: string, maxLength: number): string => {
  const plainText = stripHtmlTags(html);
  return truncateText(plainText, maxLength);
};
