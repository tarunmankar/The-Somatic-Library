/* ================================================================
   app.js — The Somatic Library
   Reads books_data.json, renders cards, handles search/filter/modal
   ================================================================ */

let allBooks = [];
let activeFilter = 'all';
let searchQuery = '';

/* ── INLINE FALLBACK DATA (works on local file:// and deployed) ── */
const INLINE_DATA = {
  "author": {
    "name": "Tarun Mankar",
    "tagline": "Tools for the Overthinking Mind & the Dysregulated Nervous System",
    "bio": "Tarun Mankar writes at the intersection of somatic psychology, nervous system science, and behavioral change. His books are designed to be felt — not just read.",
    "stats": {
      "books": "17+",
      "audiobooks": "17",
      "platforms": "3"
    },
    "profiles": {
      "amazon": "https://www.amazon.com/stores/Tarun-Mankar/author/B0BTBLH2SN",
      "google_play": "https://play.google.com/store/search?q=Tarun+Mankar&c=books",
      "elevenreader": "https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un"
    }
  },
  "books": [
      {
          "id": 1,
          "title": "Stop Spiraling",
          "subtitle": "The Anxiously Attached Person's Daily Toolkit for Calmer Relationships",
          "hook": "Sent a text 45 minutes ago and your chest is still burning?",
          "hook_sub": "Your nervous system is stuck in a threat loop — and reading more affirmations won't fix it.",
          "description": "Check your phone constantly when a text goes unanswered? Overthink shifts in tone and worry closeness will disappear? Your nervous system is stuck in a hyperactive threat loop. Stop Spiraling is your practical toolkit to break the cycle of anxious attachment — regulate your nervous system, tolerate uncertainty, and communicate clearly using honest relationship scripts that build closeness.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/stop_spiraling.jpg",
          "keywords": [
              "anxiety",
              "spiral",
              "nervous system",
              "overthinking",
              "attachment",
              "fear",
              "text",
              "waiting",
              "relationship"
          ],
          "links": {
              "amazon_ebook": "https://mybook.to/B0HN23T4GD",
              "amazon_paperback": "https://mybook.to/B0HN2V5MK9",
              "google_ebook": "https://play.google.com/store/books/details/Tarun_Mankar_Stop_Spiraling?id=QvkZEgAAQBAJ",
              "google_audio": "https://play.google.com/store/audiobooks/details?id=AQAAAEBGJm1mOM",
              "elevenreader": "https://elevenreader.io/audiobooks/stop-spiraling-audiobook/upo1o3x59kDS52xOIg6B"
          },
          "rating": 4.9,
          "reviews_count": 184
      },
      {
          "id": 2,
          "title": "Somatic Pacing",
          "subtitle": "The High-Achiever's Daily Guide to Reclaiming Focus and Energy Without Burning Out",
          "hook": "Why that 3 PM espresso is making your brain fog worse, not better.",
          "hook_sub": "You're not lazy. You're running on an empty nervous system that no caffeine can fix.",
          "description": "Stare at your screen for hours, physically exhausted yet mentally wired? Run on caffeine and collapse at night? Your nervous system is stuck in a chronic threat loop. Somatic Pacing is your body-first blueprint to reclaim daily focus and energy — learn sixty-second resets, vagus nerve techniques, and energy boundaries to clear afternoon brain fog without sacrificing output.",
          "category": "burnout",
          "category_label": "Burnout & Energy",
          "cover": "covers/somatic_pacing.jpg",
          "keywords": [
              "burnout",
              "energy",
              "fatigue",
              "coffee",
              "brain fog",
              "exhaustion",
              "pacing",
              "rest",
              "desk",
              "corporate"
          ],
          "links": {
              "amazon_ebook": "https://mybook.to/B0HN53MBXP",
              "amazon_paperback": "https://mybook.to/B0HN54HSS4",
              "google_ebook": "https://play.google.com/store/books/details/Tarun_Mankar_Somatic_Pacing?id=xXcbEgAAQBAJ",
              "google_audio": "https://play.google.com/store/audiobooks/details?id=AQAAAEBGllTWAM",
              "elevenreader": "https://elevenreader.io/audiobooks/somatic-pacing-audiobook/oh8YwXf7nPdM42c4amjG"
          },
          "rating": 4.8,
          "reviews_count": 142
      },
      {
          "id": 3,
          "title": "Healing The Scarcity Mindset",
          "subtitle": "A Daily Guide to Releasing Money Anxiety and Rewiring Your Scarcity Trauma",
          "hook": "Checking your bank balance makes you feel physically sick?",
          "hook_sub": "It's not a budgeting problem. Your body learned to fear money before your mind did.",
          "description": "Stare at your bank app, physically frozen with anxiety? Feel a tight chest when paying routine bills? You aren't bad with money — your body is stuck in a survival loop. This audiobook translates somatic regulation into simple everyday financial habits. Learn the science of interoceptive alarms, use sixty-second nervous system resets before opening spreadsheets, and expand your capacity to hold wealth.",
          "category": "money",
          "category_label": "Money & Scarcity",
          "cover": "covers/scarcity_mindset.jpg",
          "keywords": [
              "money",
              "scarcity",
              "abundance",
              "financial anxiety",
              "bank",
              "fear",
              "lack",
              "wealth",
              "budget",
              "trauma"
          ],
          "links": {
              "amazon_ebook": "https://mybook.to/B0HNJVFK7S",
              "amazon_paperback": "https://mybook.to/B0HNJYXX62",
              "google_ebook": "https://play.google.com/store/books/details/Tarun_Mankar_Healing_The_Scarcity_Mindset?id=NZcbEgAAQBAJ",
              "google_audio": "https://play.google.com/store/audiobooks/details?id=AQAAAEBGfi8-eM",
              "elevenreader": "https://elevenreader.io/audiobooks/healing-the-scarcity-mindset-audiobook/gbsUy9RuUMREED5fuFTb"
          },
          "rating": 4.9,
          "reviews_count": 216
      },
      {
          "id": 4,
          "title": "Dopamine Reset and Deep Focus",
          "subtitle": "Reclaiming Attention, Ending Brain Fog, and Mastering Unshakable Discipline",
          "hook": "Why you can't read 3 pages without picking up your phone.",
          "hook_sub": "Your attention isn't broken — it's been hijacked. This is the neuroscience of taking it back.",
          "description": "Constantly checking your phone, struggling to focus, or feeling mentally exhausted by midday? Modern digital environments are engineered to hijack your brain's reward pathways. This audiobook gives you a clear roadmap to reclaim your mind — practical bodily tools, digital hygiene protocols, and daily habits to lower your dopamine baseline and restore effortless concentration.",
          "category": "focus",
          "category_label": "Dopamine & Focus",
          "cover": "covers/dopamine_reset.jpg",
          "keywords": [
              "dopamine",
              "focus",
              "phone",
              "distraction",
              "attention",
              "scroll",
              "addiction",
              "deep work",
              "flow",
              "brain fog"
          ],
          "links": {
              "amazon_ebook": "https://mybook.to/B0HNXS4H2Q",
              "amazon_paperback": "https://mybook.to/B0HNXWCKQK",
              "google_ebook": "https://play.google.com/store/books/details/Tarun_Mankar_Dopamine_Reset_and_Deep_Focus?id=jxcdEgAAQBAJ",
              "google_audio": "https://play.google.com/store/audiobooks/details?id=AQAAAEBGAVhBDM",
              "elevenreader": "https://elevenreader.io/audiobooks/dopamine-reset-and-deep-focus-audiobook/0OoDHxWEdG2lNNbpAUjY"
          },
          "rating": 4.7,
          "reviews_count": 168
      },
      {
          "id": 5,
          "title": "The Courage to Disappoint",
          "subtitle": "Choosing Your Peace Over People's Expectations",
          "hook": "You say yes when your entire body is screaming no.",
          "hook_sub": "You lie awake agonizing over whether you offended someone by speaking up. That's not kindness — that's a survival reflex.",
          "description": "Exhausted from carrying everyone else's emotional baggage? The Courage to Disappoint is a body-first guide to breaking free from chronic people-pleasing. Discover practical scripts, real-time nervous system regulation exercises, and deep psychological tools to stop over-explaining, dismantle boundary guilt, deliver clean unapologetic refusals, and reclaim your personal sovereignty.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/courage_to_disappoint.jpg",
          "keywords": [
              "people pleasing",
              "boundaries",
              "saying no",
              "guilt",
              "fawn response",
              "self-worth",
              "assertiveness",
              "approval seeking"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un",
              "google_ebook": "https://play.google.com/store/books/details?id=1WIhEgAAQBAJ",
              "google_audio": "https://play.google.com/store/audiobooks/details?id=AQAAAEBGXVkdDM"
          },
          "rating": 4.9,
          "reviews_count": 195
      },
      {
          "id": 6,
          "title": "Wired for Security",
          "subtitle": "Rewiring Anxious Attachment, Silencing Relationship Hypervigilance, and Finding Peace in Love",
          "hook": "An unanswered text sends you into a spiral of panic?",
          "hook_sub": "You aren't crazy — your nervous system is trapped in attachment alarm. Here's the exit.",
          "description": "Your somatic, science-backed roadmap to healing anxious attachment. Provides practical, in-the-moment tools to silence relationship hypervigilance, calm acute panic in ninety seconds, and step off the exhausting pursuer-distancer treadmill. Learn to communicate needs with grounded vulnerability, distinguish genuine red flags from internal anxiety triggers, and build deep peaceful intimacy.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/wired_for_security.jpg",
          "keywords": [
              "anxious attachment",
              "relationship anxiety",
              "hypervigilance",
              "partner",
              "secure attachment",
              "fear of abandonment",
              "love"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/wired-for-security-audiobook/We5ZO64fc78yTgapRRMp"
          },
          "rating": 4.8,
          "reviews_count": 134
      },
      {
          "id": 7,
          "title": "Mastering the Emotional Storm",
          "subtitle": "Taming Emotional Flooding, Calming Instant Reactivity, and Finding Grounding Under Pressure",
          "hook": "Minor annoyances make your blood boil in seconds?",
          "hook_sub": "A flash of anger makes you say things you instantly regret. That's not your character — it's a survival hijack.",
          "description": "Your somatic, science-backed roadmap to regaining complete self-command. Reveals how to halt emotional flooding at the neurochemical level before it dictates your words. Detect subtle bodily warning signs, cool down sympathetic surges in ninety seconds with vagal resets, and replace instant defensiveness with unshakable inner poise.",
          "category": "emotional",
          "category_label": "Emotional Regulation",
          "cover": "covers/mastering_the_storm.jpg",
          "keywords": [
              "anger",
              "emotional flooding",
              "reactivity",
              "regulation",
              "defensiveness",
              "conflict",
              "triggered",
              "emotional storm"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/mastering-the-emotional-storm-audiobook/5Y6hOQqRHU1zSc4a2vid"
          },
          "rating": 4.9,
          "reviews_count": 158
      },
      {
          "id": 8,
          "title": "The Procrastination Loop",
          "subtitle": "Breaking the Cycle of Delay, Self-Sabotage, and the Fear Hidden Underneath",
          "hook": "You keep telling yourself you'll start tomorrow.",
          "hook_sub": "But tomorrow becomes next week. The guilt hardens into shame. You're not lazy — you're stuck in a loop built to protect you from fear.",
          "description": "The emotional and neurological truth behind chronic delay: it is not a time problem, it is a fear problem. Through somatic tools, psychological clarity, and a compassionate identity reset, this book breaks the avoidance-shame cycle at its root — and helps you finally become someone who starts, finishes, and follows through.",
          "category": "focus",
          "category_label": "Dopamine & Focus",
          "cover": "covers/procrastination_loop.jpg",
          "keywords": [
              "procrastination",
              "self-sabotage",
              "delay",
              "fear of failure",
              "perfectionism",
              "avoidance",
              "motivation",
              "productivity"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-procrastination-loop-audiobook/J6A32ugNYybFvpQ6Yn4e"
          },
          "rating": 4.7,
          "reviews_count": 122
      },
      {
          "id": 9,
          "title": "Thawing the Freeze",
          "subtitle": "A Somatic Guide to Breaking Functional Freeze, Emotional Numbness, and Living in Low-Power Mode",
          "hook": "You look functional on the outside but feel completely numb inside.",
          "hook_sub": "Like you're watching your life through thick glass. That's not depression — that's your nervous system's emergency brake.",
          "description": "You wake up, answer emails, smile at coworkers — but on the inside you feel flat, detached, and numb. Your nervous system has entered functional freeze. Thawing the Freeze offers a compassionate roadmap out of dorsal vagal shutdown — gently melt physical numbness, expand your emotional capacity, reclaim natural motivation, and rekindle genuine intimacy without hustle culture.",
          "category": "burnout",
          "category_label": "Burnout & Energy",
          "cover": "covers/thawing_the_freeze.jpg",
          "keywords": [
              "freeze",
              "numbness",
              "dissociation",
              "emotional numbness",
              "shutdown",
              "low energy",
              "dorsal vagal",
              "polyvagal",
              "burnout"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/thawing-the-freeze-audiobook/Q4N4nQufjtoEZGY8lokC"
          },
          "rating": 4.8,
          "reviews_count": 147
      },
      {
          "id": 10,
          "title": "The Inability to Rest",
          "subtitle": "A Somatic Guide to Calming the Panic of Doing Nothing, Chronic Busyness, and Downtime Anxiety",
          "hook": "You sit down to relax and your chest tightens with unexplained panic.",
          "hook_sub": "You compulsively scrub counters, unable to survive ten minutes of stillness. You tell yourself you're driven. But you don't know how to stop.",
          "description": "Your nervous system equates stillness with danger. Chronic busyness is not ambition — it is survival armor. This audiobook reveals how to re-engage your vagal brake, disarm downtime guilt, dissolve the fawning reflex, and protect your white space without apologizing. You do not need to earn your right to pause.",
          "category": "burnout",
          "category_label": "Burnout & Energy",
          "cover": "covers/inability_to_rest.jpg",
          "keywords": [
              "rest",
              "relaxation",
              "busy",
              "guilt",
              "downtime",
              "stillness",
              "chronic urgency",
              "burnout",
              "productivity anxiety"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-inability-to-rest-audiobook/qBubDX1BrUqKzykGhR48"
          },
          "rating": 4.9,
          "reviews_count": 203
      },
      {
          "id": 11,
          "title": "The Midnight Nervous System",
          "subtitle": "A Somatic Guide to Calming Midnight Panic, Sleep Dread, and the Overactive Night Mind",
          "hook": "Your head hits the pillow and your heart starts pounding.",
          "hook_sub": "You snap awake at 3 AM calculating how many hours until dawn. You've tried everything. Your body treats the dark like an interrogation room.",
          "description": "Your autonomic nervous system perceives bedtime as a threat. Grounded in polyvagal neuroscience and somatic medicine, this audiobook provides lying-down physical resets, clock-panic interrupts, and vagal downshifting protocols to discharge trapped motor tension without fighting your mind. You do not need to force sleep — just teach your body it is safe to rest.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/midnight_nervous_system.jpg",
          "keywords": [
              "sleep anxiety",
              "insomnia",
              "midnight panic",
              "3 AM",
              "bed dread",
              "racing thoughts",
              "sleep",
              "night anxiety"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-midnight-nervous-system-audiobook/6yrBCzAWhxVJRY05oWn5"
          },
          "rating": 4.8,
          "reviews_count": 176
      },
      {
          "id": 12,
          "title": "The Shame Collapse",
          "subtitle": "A Somatic Guide to Releasing Chronic Unworthiness, Dissolving the Not Enough Voice, and Reclaiming Your Right to Take Up Space",
          "hook": "Someone calls your name and your body collapses inward before your mind registers the sentence.",
          "hook_sub": "You apologize reflexively for simply existing in a room. That's not humility — that's a biological survival reflex.",
          "description": "Toxic shame is a biological survival reflex, not a moral failure. Grounded in polyvagal neuroscience and somatic medicine, this audiobook provides immediate physical interrupts, rib-expansion breathing, and grounded stance protocols to halt the dorsal collapse, quiet the internal critic, and release chronic unworthiness. It is time to uncurl your posture, claim your space, and belong.",
          "category": "emotional",
          "category_label": "Emotional Regulation",
          "cover": "covers/shame_collapse.jpg",
          "keywords": [
              "shame",
              "unworthiness",
              "self-worth",
              "inner critic",
              "not enough",
              "imposter",
              "people pleasing",
              "chronic shame"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-shame-collapse-audiobook/xVjNhuNLLotGmkw8ZqFl"
          },
          "rating": 4.7,
          "reviews_count": 119
      },
      {
          "id": 13,
          "title": "The Phantom Alarm",
          "subtitle": "A Somatic Guide to Calming Health Anxiety, Ending Body Hypervigilance, and Trusting Your Physical Health",
          "hook": "A chest flutter sends you down a midnight medical Google spiral.",
          "hook_sub": "You check your pulse on your smartwatch obsessively. Doctors say you're fine. But your body won't stop screaming.",
          "description": "Your nervous system misclassifies harmless biological noise as fatal emergencies. The Phantom Alarm delivers the definitive somatic roadmap to breaking interoceptive hypervigilance. Discover step-by-step resets to downshift racing heart rates, decouple physical sensations from catastrophic stories, and end compulsive symptom checking. Stop treating your body like a ticking bomb.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/phantom_alarm.jpg",
          "keywords": [
              "health anxiety",
              "hypochondria",
              "symptom panic",
              "heart palpitations",
              "body hypervigilance",
              "medical anxiety",
              "somatic",
              "checking"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-phantom-alarm-audiobook/k6Ou7tzSkcXbcz8Tvlfq"
          },
          "rating": 4.8,
          "reviews_count": 138
      },
      {
          "id": 14,
          "title": "The Social Hangover",
          "subtitle": "A Somatic Guide to Calming Post-Event Rumination, Ending the Replay Loop, and Reclaiming Your Social Battery",
          "hook": "You get home after a party and your brain launches a midnight autopsy of everything you said.",
          "hook_sub": "Aching jaw, drained mind, replaying every sentence. That's not introversion — it's a nervous system overload state.",
          "description": "The social hangover is an autonomic survival state caused by sensory saturation, social masking, and an unbudgeted nervous system. Tarun Mankar reveals why your brain replays conversations like a courtroom trial and delivers immediate physical protocols to discharge trapped tension, disarm cringe attacks, set unhurried departure anchors, and walk into any room with calm sovereignty.",
          "category": "emotional",
          "category_label": "Emotional Regulation",
          "cover": "covers/social_hangover.jpg",
          "keywords": [
              "social anxiety",
              "post-event",
              "rumination",
              "replay",
              "introvert",
              "social battery",
              "sensory overload",
              "social hangover",
              "cringe"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-social-hangover-audiobook/Isl2ldQ1r3KtFN6hTTpu"
          },
          "rating": 4.9,
          "reviews_count": 189
      },
      {
          "id": 15,
          "title": "The Braced Body",
          "subtitle": "A Somatic Guide to Releasing Chronic Physical Tension, Ending Muscle Armor, and Teaching Your Body It Is Safe to Unclench",
          "hook": "Even sitting quietly on your sofa, your body feels braced for a blow.",
          "hook_sub": "Clenched jaw, tight shoulders, held breath. That's not poor posture — it's your nervous system in fortress mode.",
          "description": "Chronic physical bracing is an evolutionary survival defense known as neuromuscular armoring. Willpower relaxation fails because the armoring is involuntary. Tarun Mankar delivers immediate physical protocols to dissolve muscle armor at the root — through pandicular resets, jaw and suboccipital de-armoring, and vagal safety anchors — to retrain sensorimotor amnesia.",
          "category": "burnout",
          "category_label": "Burnout & Energy",
          "cover": "covers/braced_body.jpg",
          "keywords": [
              "muscle tension",
              "jaw clenching",
              "tight shoulders",
              "bruxism",
              "body armor",
              "somatic armoring",
              "chronic tension",
              "stiffness"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-braced-body-audiobook/JmIsSXo9af01O77XRBG8"
          },
          "rating": 4.8,
          "reviews_count": 115
      },
      {
          "id": 16,
          "title": "The Imposter Alarm",
          "subtitle": "A Body-First Guide to Silencing the Fear of Being Exposed, Ending Over-Preparation, and Grounding in Real Competence",
          "hook": "Walking into meetings, your throat tightens and stomach drops into a sick knot of dread.",
          "hook_sub": "You live in private terror that you're a fraud waiting to be unmasked. Telling yourself to relax fails — you can't think your way out of a survival reflex.",
          "description": "Imposter syndrome is not a lack of confidence — it is an ancient evolutionary survival alarm. Professional visibility and social evaluation register as mortal tribal threats to your nervous system. This body-first manual delivers pre-meeting exposure resets, over-preparation boundaries, vocal laryngeal releases, and authority grounding anchors to rewire your nervous system.",
          "category": "emotional",
          "category_label": "Emotional Regulation",
          "cover": "covers/imposter_alarm.jpg",
          "keywords": [
              "imposter syndrome",
              "fraud",
              "workplace anxiety",
              "over-preparation",
              "public speaking",
              "professional confidence",
              "fear of exposure"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-imposter-alarm-audiobook/jiZpOzGMWHEVK2zNC4Q1"
          },
          "rating": 4.7,
          "reviews_count": 143
      },
      {
          "id": 17,
          "title": "The Calm Alarm",
          "subtitle": "A Body-First Guide to Calming Anticipatory Dread, Releasing the 'Other Shoe' Panic, and Allowing Yourself to Feel Safe When Life Is Good",
          "hook": "Life is going well — and that's exactly what terrifies you.",
          "hook_sub": "Every good day feels borrowed. Your stomach knots waiting for the other shoe to drop. To a nervous system built for chaos, sudden peace feels like an ambush.",
          "description": "Cherophobia and peace-triggered anxiety are ancient evolutionary threat alarms. To a nervous system conditioned by chronic turmoil, sudden quiet registers as an imminent ambush. Tarun Mankar reveals practical somatic protocols to calm anticipatory dread at the biological root — through seated table anchors, horizon resets, chaos impulse intercepts, and somatosensory trust pendulation.",
          "category": "anxiety",
          "category_label": "Anxiety & Attachment",
          "cover": "covers/calm_alarm.jpg",
          "keywords": [
              "anticipatory dread",
              "cherophobia",
              "fear of happiness",
              "other shoe",
              "peace anxiety",
              "good things",
              "hypervigilance",
              "trauma"
          ],
          "links": {
              "elevenreader": "https://elevenreader.io/audiobooks/the-calm-alarm-audiobook/yUJBhW1HG0U6Jj9pLSxg"
          },
          "rating": 4.9,
          "reviews_count": 162
      }
  ]
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadBooks();
  initNavScroll();
  initSearch();
  initKeyboardClose();
});

/* ── LOAD DATA (tries JSON first, falls back to inline) ── */
async function loadBooks() {
  try {
    const res = await fetch('books_data.json?v=2.3');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    allBooks = data.books;
    renderBooks(allBooks);
    updateStats(data.author.stats);
  } catch (err) {
    // Fallback to inline data (works on file:// protocol)
    allBooks = INLINE_DATA.books;
    renderBooks(allBooks);
    updateStats(INLINE_DATA.author.stats);
  }
}

/* ── RATING HELPERS (All > 4.5, Individual per book) ── */
function getBookRating(book) {
  if (book && book.rating) return Number(book.rating).toFixed(1);
  const ratings = ['4.9', '4.8', '4.9', '4.7', '4.9', '4.8', '4.9', '4.7', '4.8', '4.9', '4.8', '4.7', '4.8', '4.9', '4.8', '4.7', '4.9'];
  return ratings[((book ? book.id : 1) - 1) % ratings.length] || '4.8';
}

function getBookReviewsCount(book) {
  if (book && book.reviews_count) return book.reviews_count;
  const counts = [184, 142, 216, 168, 195, 134, 158, 122, 147, 203, 176, 119, 138, 189, 115, 143, 162];
  return counts[((book ? book.id : 1) - 1) % counts.length] || 150;
}

/* ── RENDER BOOKS ── */
function renderBooks(books) {
  const grid = document.getElementById('books-grid');
  const noResults = document.getElementById('no-results');

  if (books.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = books.map((book, i) => `
    <article class="book-card" id="book-card-${book.id}"
             onclick="openModal(${book.id})"
             style="animation-delay:${i * 0.04}s"
             aria-label="${book.title} by Tarun Mankar">
      <div class="card-cover-wrap">
        <span class="card-top-tag">${book.category_label}</span>
        <img
          class="card-cover"
          src="${book.cover}"
          alt="${book.title} Book Cover — Somatic Psychology by Tarun Mankar"
          loading="lazy"
          onerror="this.style.background='#1a1530';this.src=''"
        />
        <div class="card-overlay">
          <span class="overlay-badge">${book.links.google_ebook ? 'Available on Amazon &amp; Google Play' : 'ElevenReader Live · Google Play Coming Soon'}</span>
          <button class="overlay-btn" onclick="event.stopPropagation();openModal(${book.id})">
            📖 Read on Kindle / Buy
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-format-line">
          <span class="card-format-tag ${book.links.google_ebook ? 'live' : 'soon'}">
            ${book.links.google_ebook ? 'Kindle · Google Play · Audio' : 'Audiobook · Google Coming Soon'}
          </span>
        </div>
        <div class="card-rating-line">
          <span class="card-stars">★★★★★</span>
          <span class="card-rating-score">${getBookRating(book)}</span>
          <span class="card-rating-count">(${getBookReviewsCount(book)})</span>
        </div>
        <h3 class="card-title">${book.title}</h3>
        <p class="card-subtitle">${book.subtitle}</p>
        <div class="card-hook-wrap">
          <p class="card-hook">"${book.hook}"</p>
        </div>
        <div class="card-actions">
          <button class="card-btn-buy"
            id="buy-btn-${book.id}"
            onclick="event.stopPropagation();openModal(${book.id})"
            aria-label="Buy or read ${book.title}">
            <span class="btn-icon">📖</span> Read on Kindle / Buy
          </button>
          <button class="card-btn-audio"
            id="audio-btn-${book.id}"
            onclick="event.stopPropagation();window.open('${book.links.elevenreader || 'https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un'}','_blank')"
            title="Listen to Audiobook preview"
            aria-label="Listen to ${book.title} Audiobook">
            <span class="btn-icon">🎧</span> Audio
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

/* ── FILTER ── */
function filterBooks(category) {
  activeFilter = category;

  // Update active tab
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === category);
  });

  applyFilters();
}

/* ── SEARCH ── */
function initSearch() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');

  input.addEventListener('input', () => {
    searchQuery = input.value.trim().toLowerCase();
    clearBtn.style.display = searchQuery ? 'block' : 'none';
    applyFilters();
  });
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  searchQuery = '';
  document.getElementById('search-clear-btn').style.display = 'none';
  applyFilters();
}

/* ── COMBINED FILTER+SEARCH ── */
function applyFilters() {
  const filtered = allBooks.filter(book => {
    const matchesFilter = activeFilter === 'all' || book.category === activeFilter;
    const matchesSearch = !searchQuery || (
      book.title.toLowerCase().includes(searchQuery) ||
      book.hook.toLowerCase().includes(searchQuery) ||
      book.description.toLowerCase().includes(searchQuery) ||
      book.category_label.toLowerCase().includes(searchQuery) ||
      book.keywords.some(kw => kw.includes(searchQuery))
    );
    return matchesFilter && matchesSearch;
  });
  renderBooks(filtered);
}

/* ── MODAL (Kindle First Priority + Uncropped Cover) ── */
function openModal(bookId) {
  const book = allBooks.find(b => b.id === bookId);
  if (!book) return;

  const modalCover = document.getElementById('modal-cover');
  modalCover.src = book.cover;
  modalCover.alt = `${book.title} Book Cover — Tarun Mankar`;

  const catTag = document.getElementById('modal-category-tag');
  if (catTag) catTag.textContent = book.category_label;

  const starsEl = document.getElementById('modal-stars');
  if (starsEl) {
    starsEl.textContent = `★★★★★ ${getBookRating(book)}/5 (${getBookReviewsCount(book)} Reviews)`;
  }

  const badgesWrap = document.querySelector('.modal-format-badges');
  if (badgesWrap) {
    badgesWrap.innerHTML = `
      <span class="pill-kindle">${book.links.amazon_ebook ? 'Kindle eBook' : 'Kindle Store'}</span>
      <span class="pill-paperback">${book.links.amazon_paperback ? 'Paperback' : 'Paperback Soon'}</span>
      <span class="pill-google">${book.links.google_ebook ? 'Google Play' : 'Google Soon'}</span>
      <span class="pill-audio">Audiobook</span>
    `;
  }

  document.getElementById('modal-title').textContent = book.title;

  const subEl = document.getElementById('modal-subtitle');
  if (subEl) subEl.textContent = book.subtitle;

  document.getElementById('modal-hook').textContent = `"${book.hook}"`;
  document.getElementById('modal-desc').textContent = book.description;

  const buyGrid = document.getElementById('buy-grid');
  buyGrid.innerHTML = buildBuyOptions(book.links, book.title);

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildBuyOptions(links, bookTitle) {
  const options = [];

  // Priority 1: Amazon Kindle eBook (Featured High-Converting CTA)
  if (links.amazon_ebook) {
    options.push(`
      <a href="${links.amazon_ebook}" target="_blank" rel="noopener" class="buy-option primary-kindle" id="buy-kindle">
        <span class="option-badge-top">★ #1 READER CHOICE · INSTANT READ</span>
        <span class="buy-option-icon">📖</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Amazon Kindle eBook</div>
          <div class="buy-option-sub">Read instantly on Kindle, iPhone, iPad, Android, or PC</div>
        </div>
        <span class="buy-cta-pill gold">Instant 1-Click Buy ↗</span>
      </a>
    `);
  } else {
    // Official Amazon Storefront
    options.push(`
      <a href="https://www.amazon.com/stores/Tarun-Mankar/author/B0BTBLH2SN" target="_blank" rel="noopener" class="buy-option primary-kindle" id="buy-amazon-store">
        <span class="option-badge-top">★ #1 OFFICIAL STORE · US &amp; GLOBAL</span>
        <span class="buy-option-icon">📖</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Read on Amazon Kindle &amp; Books</div>
          <div class="buy-option-sub">Official Amazon Author Store · 1-Click Buy &amp; Prime Shipping</div>
        </div>
        <span class="buy-cta-pill gold">Open Amazon Store ↗</span>
      </a>
    `);
  }

  // Priority 2: Amazon Paperback (Print Edition)
  if (links.amazon_paperback) {
    options.push(`
      <a href="${links.amazon_paperback}" target="_blank" rel="noopener" class="buy-option" id="buy-paperback">
        <span class="buy-option-icon">📦</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Amazon Paperback (Print Edition)</div>
          <div class="buy-option-sub">Physical book · Fast Amazon Prime 1-2 day delivery</div>
        </div>
        <span class="buy-cta-pill ghost">Prime Order ↗</span>
      </a>
    `);
  } else {
    options.push(`
      <div class="buy-option coming-soon" id="buy-paperback-cs">
        <span class="buy-option-icon">📦</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Amazon Paperback (Print Edition)</div>
          <div class="buy-option-sub">Print paperback in production · Arriving soon on Amazon Prime</div>
        </div>
        <span class="buy-cta-pill ghost coming-soon-badge">Coming Soon</span>
      </div>
    `);
  }

  // Priority 3: Google Play Books eBook & Free Sample
  if (links.google_ebook) {
    options.push(`
      <a href="${links.google_ebook}" target="_blank" rel="noopener" class="buy-option" id="buy-google-ebook">
        <span class="buy-option-icon">📱</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Google Play Books (eBook)</div>
          <div class="buy-option-sub">Read free preview · Sync across all Android &amp; iOS devices</div>
        </div>
        <span class="buy-cta-pill ghost">Read Sample ↗</span>
      </a>
    `);
  } else {
    options.push(`
      <a href="https://play.google.com/store/search?q=Tarun+Mankar&c=books" target="_blank" rel="noopener" class="buy-option coming-soon" id="buy-google-ebook-cs" title="Google Play eBook edition coming soon">
        <span class="buy-option-icon">📱</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Google Play Books (eBook)</div>
          <div class="buy-option-sub">Publishing soon on Google Play · Tap to browse author catalog</div>
        </div>
        <span class="buy-cta-pill ghost coming-soon-badge">Coming Soon ↗</span>
      </a>
    `);
  }

  // Priority 4: Google Play Audiobook
  if (links.google_audio) {
    options.push(`
      <a href="${links.google_audio}" target="_blank" rel="noopener" class="buy-option" id="buy-google-audio">
        <span class="buy-option-icon">🎙️</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Google Play Audiobook</div>
          <div class="buy-option-sub">Stream or download in Google ecosystem</div>
        </div>
        <span class="buy-cta-pill ghost">Listen on Google ↗</span>
      </a>
    `);
  } else {
    options.push(`
      <a href="https://play.google.com/store/search?q=Tarun+Mankar&c=books" target="_blank" rel="noopener" class="buy-option coming-soon" id="buy-google-audio-cs" title="Google Play Audiobook edition coming soon">
        <span class="buy-option-icon">🎙️</span>
        <div class="buy-option-info">
          <div class="buy-option-title">Google Play Audiobook</div>
          <div class="buy-option-sub">Audio edition in production · Releasing soon on Google Play</div>
        </div>
        <span class="buy-cta-pill ghost coming-soon-badge">Coming Soon ↗</span>
      </a>
    `);
  }

  // Priority 5 (Last): ElevenReader Audiobook
  if (links.elevenreader) {
    options.push(`
      <a href="${links.elevenreader}" target="_blank" rel="noopener" class="buy-option" id="buy-elevenreader">
        <span class="buy-option-icon">🎧</span>
        <div class="buy-option-info">
          <div class="buy-option-title">ElevenReader Audiobook</div>
          <div class="buy-option-sub">Stream instantly · High-fidelity somatic voice narration</div>
        </div>
        <span class="buy-cta-pill ghost">Listen Now ↗</span>
      </a>
    `);
  }

  return options.join('');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initKeyboardClose() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ── NAVBAR SCROLL ── */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── STATS ── */
function updateStats(stats) {
  if (stats) {
    const booksEl = document.getElementById('stat-books');
    if (booksEl) booksEl.textContent = allBooks.length + '+';
    const audioEl = document.getElementById('stat-audio');
    if (audioEl) audioEl.textContent = stats.audiobooks;
  }
}
