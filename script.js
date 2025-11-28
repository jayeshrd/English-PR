// --- THE PLAN DATA (Add more weeks here) ---
const planData = [
    {
        day: 1,
        title: "Setup & Foundation",
        content: `
            <ul>
                <li><strong>Morning (10m):</strong> Change Phone/PC/IDE language to English.</li>
                <li><strong>Evening (20m):</strong> Read "What is DevOps?" on AWS Blog.</li>
                <li><strong>Task:</strong> Write 3 sentences in English about DevOps.</li>
                <li><strong>Vocab:</strong> Write down 5 new words.</li>
            </ul>
        `,
        tip: "Coding karte waqt English mein socho! (Start thinking in English while coding!)"
    },
    {
        day: 2,
        title: "Docker Day",
        content: `
            <ul>
                <li><strong>Morning (15m):</strong> Read Docker "Get Started" docs. Read aloud 3 times.</li>
                <li><strong>Focus:</strong> Pronounce 'th', 'v', 'w' correctly.</li>
                <li><strong>Evening (20m):</strong> Write "What is Docker?" (5 sentences).</li>
                <li><strong>Watch:</strong> Docker video with English subtitles.</li>
            </ul>
        `,
        tip: "Don't write 'Docker is a container' ❌. Write 'Docker is a containerization platform' ✅."
    },
    {
        day: 3,
        title: "Kubernetes & Listening",
        content: `
            <ul>
                <li><strong>Morning:</strong> Read "What is Kubernetes?". Practice: "THE cluster", "A pod".</li>
                <li><strong>Evening:</strong> Write daily journal about work (5 sentences).</li>
                <li><strong>Listen:</strong> DevOps podcast (15 min). Note 3 phrases.</li>
            </ul>
        `,
        tip: "Avoid: 'I am having one doubt'. Say: 'I have a question' ✅."
    },
    {
        day: 4,
        title: "Active Writing",
        content: `
            <ul>
                <li><strong>Morning:</strong> Read dev.to article. Circle unknown words.</li>
                <li><strong>Evening:</strong> Comment YOUR code in English today.</li>
                <li><strong>Task:</strong> Write "What problem did I solve?" (7 sentences).</li>
            </ul>
        `,
        tip: "Not 'Server is not giving response' ❌. Say 'Server is not responding' ✅."
    },
    {
        day: 5,
        title: "Weekly Review",
        content: `
            <ul>
                <li><strong>Morning:</strong> Read AWS blog. Explain it aloud to yourself.</li>
                <li><strong>Evening:</strong> Write Weekly Summary (10 sentences).</li>
                <li><strong>Review:</strong> Check all vocabulary from the week.</li>
            </ul>
        `,
        tip: "Prepositions: 'Working ON this issue', 'Deployed TO server'."
    },
    {
        day: 6,
        title: "Weekend Light Practice",
        content: `
            <ul>
                <li><strong>Watch:</strong> DevOps conference talk (YouTube) - 25 min.</li>
                <li><strong>Write:</strong> 5 key points you understood.</li>
                <li><strong>Fun:</strong> Read Tech memes in English.</li>
            </ul>
        `,
        tip: "Watch an English movie with subtitles this weekend!"
    },
    {
        day: 7,
        title: "Reflection Sunday",
        content: `
            <ul>
                <li><strong>Read:</strong> All your Week 1 writing.</li>
                <li><strong>Fix:</strong> Rewrite 2-3 sentences correctly.</li>
                <li><strong>Plan:</strong> Topics for Week 2.</li>
            </ul>
        `,
        tip: "Celebrate! You completed Week 1! 🎉"
    }
];

// --- APP LOGIC ---

let currentDayIndex = 0;
const totalDays = 90; // The full goal

// DOM Elements
const dayTitle = document.getElementById('dayTitle');
const scheduleContent = document.getElementById('scheduleContent');
const tipContent = document.getElementById('tipContent');
const journalInput = document.getElementById('dailyJournal');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const completeBtn = document.getElementById('completeBtn');
const notifyBtn = document.getElementById('notifyBtn');

// Load Data on Startup
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderDay();
    checkNotificationPermission();
});

// Navigation
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentDayIndex < planData.length - 1) {
        currentDayIndex++;
        renderDay();
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        renderDay();
    }
});

// Mark as Complete
completeBtn.addEventListener('click', () => {
    const completedDays = getCompletedDays();
    if (!completedDays.includes(currentDayIndex)) {
        completedDays.push(currentDayIndex);
        localStorage.setItem('devops_english_completed', JSON.stringify(completedDays));
        renderDay(); // Update UI
        updateProgress();
        alert("Great job! Day marked as complete. 🎉");
    }
});

// Save Journal automatically
journalInput.addEventListener('input', () => {
    const noteKey = `devops_note_day_${currentDayIndex}`;
    localStorage.setItem(noteKey, journalInput.value);
});

// Functions
function renderDay() {
    const dayData = planData[currentDayIndex];
    
    // Text Content
    dayTitle.innerText = `Day ${dayData.day}: ${dayData.title}`;
    scheduleContent.innerHTML = dayData.content;
    tipContent.innerText = dayData.tip;
    
    // Load Journal for this day
    const noteKey = `devops_note_day_${currentDayIndex}`;
    journalInput.value = localStorage.getItem(noteKey) || "";

    // Button State
    const completedDays = getCompletedDays();
    if (completedDays.includes(currentDayIndex)) {
        completeBtn.innerHTML = "Completed ✅";
        completeBtn.style.backgroundColor = "#238636";
        completeBtn.disabled = true;
    } else {
        completeBtn.innerHTML = "Mark Day as Complete <i class='fas fa-check'></i>";
        completeBtn.style.backgroundColor = "#1f6feb";
        completeBtn.disabled = false;
    }

    updateProgress();
}

function getCompletedDays() {
    const stored = localStorage.getItem('devops_english_completed');
    return stored ? JSON.parse(stored) : [];
}

function updateProgress() {
    const completedCount = getCompletedDays().length;
    const percentage = Math.round((completedCount / totalDays) * 100);
    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `${percentage}% Fluency Goal Completed (${completedCount}/${totalDays} days)`;
}

function saveState() {
    // Current day index is meant for navigation, not strict tracking
    // We don't save current index so user always sees where they left off or starts fresh? 
    // Let's save the last viewed day.
    localStorage.setItem('devops_last_viewed', currentDayIndex);
}

function loadState() {
    const lastViewed = localStorage.getItem('devops_last_viewed');
    if (lastViewed) {
        currentDayIndex = parseInt(lastViewed);
    }
}

// Save navigation state when page unloads
window.onbeforeunload = function() {
    saveState();
};

// --- NOTIFICATIONS ---
notifyBtn.addEventListener('click', () => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification("Reminders are already on! 🚀");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification("Awesome! We will remind you to practice.");
                // Here you would typically use a Service Worker for real background push
                // For a static site, we can only remind if the tab is open, 
                // OR we rely on the user's phone calendar (which is better for static sites).
                alert("Browser notifications enabled! Tip: Keep this tab open pinned.");
            }
        });
    }
});

function checkNotificationPermission() {
    if (Notification.permission === "granted") {
        notifyBtn.style.display = 'none';
    }
}
