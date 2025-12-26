document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const notesInput = document.getElementById('notes-input');
    const notesBackdrop = document.getElementById('notes-backdrop');

    // Default Note
    const DEFAULT_NOTE = "# This is my notes\nThis is a note";
    const STORAGE_KEY = 'apiTesterNotes';

    if (notesInput && notesBackdrop) {
        
        // Highlighting Logic
        function updateHighlight() {
            let text = notesInput.value;
            
            // Handle trailing newline for visual sync
            if (text[text.length - 1] === "\n") {
                text += " ";
            }

            // HTML Escape
            text = text.replace(/&/g, "&amp;")
                       .replace(/</g, "&lt;")
                       .replace(/>/g, "&gt;");

            // Highlight Lines
            // Use regex with 'm' flag or split. Split is often simpler for line-by-line Logic.
            const lines = text.split('\n');
            const highlightedHtml = lines.map(line => {
                // Remove potential escape chars for check (simplified)
                if (line.trim().startsWith('#') || line.trim().startsWith('&num;')) {
                    return `<span class="text-blue-400 font-bold">${line}</span>`;
                }
                return line;
            }).join('<br>');

            notesBackdrop.innerHTML = highlightedHtml;
        }

        // Scroll Sync
        function syncScroll() {
            notesBackdrop.scrollTop = notesInput.scrollTop;
            notesBackdrop.scrollLeft = notesInput.scrollLeft;
        }

        // Initialize
        function init() {
            const savedNote = localStorage.getItem(STORAGE_KEY);
            notesInput.value = savedNote !== null ? savedNote : DEFAULT_NOTE;
            updateHighlight();
        }

        // Event Listeners
        notesInput.addEventListener('input', () => {
            updateHighlight();
            syncScroll(); // Size might change
            localStorage.setItem(STORAGE_KEY, notesInput.value);
        });

        notesInput.addEventListener('scroll', syncScroll);

        // Handle Resize (if possible via observer, but textarea is resize-none)
        
        // Load
        init();
    }
});
