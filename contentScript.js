// Variable to hold all the messages
let alertMessages = [];
let totalChecksPerformed = 0;
let totalIssuesFound = 0;


// Check for Missing Meta Description
const metaDescriptionMissing = document.querySelector('meta[name="description"]') === null;
if (metaDescriptionMissing) {
  totalChecksPerformed++;
  alertMessages.push('The meta description tag is missing.');
  totalIssuesFound++;
}
// Check for Empty Links
const emptyLinks = [...document.querySelectorAll('a')].filter(a => !a.href || a.href.trim() === '');
if (emptyLinks.length > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${emptyLinks.length} empty link(s).`);
  totalIssuesFound=totalIssuesFound+emptyLinks.length;
}

// Check for Missing Image Titles
const imagesWithoutTitles = [...document.images].filter(img => !img.title);
if (imagesWithoutTitles.length > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${imagesWithoutTitles.length} images without title attributes.`);
  totalIssuesFound=totalIssuesFound+imagesWithoutTitles.length;
}

// Adding the new tests to the performAllChecks function
function performAllChecks() {
  // Existing checks
  scanForBadWords();
  // New checks
  if (metaDescriptionMissing) {
    totalChecksPerformed++;
    alertMessages.push('The meta description tag is missing.');
  }
  const emptyLinkCount = emptyLinks.length;
  if (emptyLinkCount > 0) {
    totalChecksPerformed++;
    alertMessages.push(`Found ${emptyLinkCount} empty link(s).`);
  }
  const imagesWithoutTitleCount = imagesWithoutTitles.length;
  if (imagesWithoutTitleCount > 0) {
    totalChecksPerformed++;
    alertMessages.push(`Found ${imagesWithoutTitleCount} images without title attributes.`);
  }
  // Include other checks here if needed
}



// Example test: Check for images without alt attributes
const imagesWithoutAlt = [...document.images].filter(img => !img.alt);
if (imagesWithoutAlt.length > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${imagesWithoutAlt.length} images without alt attributes.`);
  totalIssuesFound=totalIssuesFound+imagesWithoutAlt.length;
}
// Check for missing 'lang' attribute in <html> tag
const htmlLangMissing = !document.documentElement.hasAttribute('lang');
if (htmlLangMissing) {
  totalChecksPerformed++;
  alertMessages.push('The lang attribute on the <html> tag is missing.');
  totalIssuesFound++;
}


// Detect deprecated HTML elements

const deprecatedElements = ['font', 'center', 'marquee'];
const foundDeprecatedElements = deprecatedElements.map(element => 
  document.getElementsByTagName(element).length
).reduce((total, count) => total + count, 0);
if (foundDeprecatedElements > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${foundDeprecatedElements} deprecated HTML element(s).`);
  totalIssuesFound=totalIssuesFound+foundDeprecatedElements;
}

// Scan the text content of the body for any bad words
function scanForBadWords() {
  totalChecksPerformed++;
  const badWords = ['bitch', 'motherfucker', 'fuck', 'f\\*ck']; // Note the escape for *
  // Creating a regular expression pattern to match the bad words
  // The adjusted pattern ensures * is treated as a literal character where intended
  const badWordsPattern = new RegExp('\\b(' + badWords.join('|').replace(/\*/g, '\\*').replace(/(\w)/g, '$1[\\s\\-\'"]*') + ')\\b', 'gi');

  const pageText = document.body.innerText;
  const badWordsFound = [];
  let match;

  while ((match = badWordsPattern.exec(pageText)) !== null) {
      if (!badWordsFound.includes(match[0].toLowerCase())) {
          badWordsFound.push(match[0].toLowerCase());
      }
  }

  if (badWordsFound.length > 0) {
    alertMessages.push(`Warning: Found inappropriate language on this page. Words: ${badWordsFound.join(', ')}`);
  }
}


// Enhanced example usage
document.addEventListener('DOMContentLoaded', () => {
  scanForBadWords();
});


// This function will find all elements with an inline style attribute
function findInlineStyles() {
  const elementsWithInlineStyles = Array.from(document.querySelectorAll('[style]'));
  return elementsWithInlineStyles.map(el => el.tagName).length;
}

// Example usage
const inlineStyleCount = findInlineStyles();
if (inlineStyleCount > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${inlineStyleCount} elements with inline styles.`);
  totalIssuesFound=totalIssuesFound+inlineStyleCount;
}

// This function will check for images with dimensions larger than a set threshold
function findLargeImages() {
  const largeImages = Array.from(document.images).filter(img => {
    // You would replace 1920 and 1080 with your own width and height thresholds
    return img.naturalWidth > 1920 || img.naturalHeight > 1080;
  });
  return largeImages.length;
}

// Example usage
const largeImageCount = findLargeImages();
if (largeImageCount > 0) {
  totalChecksPerformed++;
  alertMessages.push(`Found ${largeImageCount} large images.`);
  totalIssuesFound = totalIssuesFound + largeImageCount;
}



// This function will find non-semantic elements used for layout by checking common class names
function findNonSemanticLayoutElements() {
  totalChecksPerformed++;
  const layoutClassNames = ['container', 'wrapper', 'grid', 'row']; // Add more based on common practices
  const nonSemanticElements = layoutClassNames.flatMap(className =>
    Array.from(document.querySelectorAll(`div.${className}, span.${className}`))
  );
  return nonSemanticElements.length;
}

// Example usage
const nonSemanticLayoutCount = findNonSemanticLayoutElements();
if (nonSemanticLayoutCount > 0) {
  alertMessages.push(`Found ${nonSemanticLayoutCount} non-semantic elements used for layout.`);
  totalIssuesFound = totalIssuesFound + nonSemanticLayoutCount;
}


// This function will find audio or video elements that autoplay
function findAutoplayingMedia() {
  totalChecksPerformed++;
  const autoplayingMedia = Array.from(document.querySelectorAll('audio[autoplay], video[autoplay]'));
  return autoplayingMedia.length;

}


// Example usage
const autoplayMediaCount = findAutoplayingMedia();
if (autoplayMediaCount > 0) {
  alertMessages.push(`Found ${autoplayMediaCount} autoplaying audio or video elements.`);
  totalIssuesFound = totalIssuesFound + autoplayMediaCount;

}

setTimeout(() => {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = "Dynamic content added!";
  document.body.appendChild(newDiv);
}, 3000); // Adds a new div after 5 seconds


// Perform all checks, including 'scanForBadWords'
function performAllChecks() {
  // Call each check function here
  // For each check, ensure you increment `totalChecksPerformed` and conditionally `totalIssuesFound`
  scanForBadWords(); // Example, make sure this function updates totalChecksPerformed and totalIssuesFound accordingly
  // Include all other checks similarly
}

// Setting up the MutationObserver
const observer = new MutationObserver((mutations) => {
  performAllChecks();
  scanForBadWords(); // This now includes scanning for bad words on each DOM mutation
});

// Configuration: observing for child additions and subtree modifications
const config = { childList: true, subtree: true };

// Start observing the document body for changes
observer.observe(document.body, config);

// Perform checks on initial load
// Perform checks on initial load
document.addEventListener('DOMContentLoaded', () => {
  performAllChecks();

  // Now add the summary of total checks and issues found to the alertMessages
  alertMessages.push(`\nTotal Checks Performed: ${totalChecksPerformed}`);
  alertMessages.push(`Total Issues Found: ${totalIssuesFound}`);

  // Display all collected messages in one alert
  if (alertMessages.length > 0) {
    alert(alertMessages.join('\n'));
  } else {
    alert(`All checks passed!\nTotal Checks Performed: ${totalChecksPerformed}`);
  }
});


// Display all collected messages in one alert
if (alertMessages.length > 0) {
  alertMessages.push(`\nTotal Checks Performed: ${totalChecksPerformed}`);
  alertMessages.push(`Total Issues Found: ${totalIssuesFound}`);
  alert(alertMessages.join('\n'));
  scanForBadWords();
}
