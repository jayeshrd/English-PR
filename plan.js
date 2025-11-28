// plan.js - contains FULL_PLAN array (length 90). Each index 0 => Day 1.
const FULL_PLAN = [
  // Day 1-14 taken from your detailed plan
  `Day 1 - Your First Day\nMorning (10): Change computer/phone/IDE to English.\nEvening (20): Create vocabulary notebook; read 'What is DevOps?' (AWS); write 3 sentences; note 5 words with Hindi meaning.`,
  `Day 2 - Docker Day\nMorning (15): Read Docker 'Get Started'; read one paragraph aloud 3 times; practice 'th','v','w'.\nEvening (20): Write 'What is Docker?' (5 sentences); watch Docker video with subtitles; add 5 tech words.`,
  `Day 3 - Kubernetes + Listening\nMorning (15): Read 'What is Kubernetes?'; practice articles - THE cluster, A pod, AN instance.\nEvening (25): Daily journal (5 sentences); listen to DevOps podcast (15 minutes); note 3 phrases.`,
  `Day 4 - Active Writing\nMorning (15): Read dev.to article; circle unknown words.\nEvening (25): Comment your code in English; write problem you solved (7 sentences); practice tenses.`,
  `Day 5 - Weekly Review\nMorning (15): Read AWS blog and explain aloud.\nEvening (25): Write weekly summary (10 sentences); review vocabulary and articles.`,
  `Day 6 - Weekend Light Practice\nAnytime: Watch a DevOps talk (25 min); write 5 key points; read tech memes; watch movie with English subtitles (bonus).`,
  `Day 7 - Reflection Sunday\nRead all Week 1 writing; notice mistakes; rewrite 2-3 sentences; plan Week 2.`,
  `Day 8 - Community Participation\nRead Terraform docs; write 5 differences between Terraform and manual setup; join r/devops; reply to one post in clear English.`,
  `Day 9 - CI/CD Focus\nRead Medium article about CI/CD; read aloud and record; write about your company's CI/CD pipeline.`,
  `Day 10 - Mid-Week Practice\nRead Kubernetes networking basics; journal (7 sentences); listen to podcast and note 3 things.`,
  `Day 11 - Documentation Day\nRead Docker/Kubernetes release notes; write README.md for your project; use imperative mood and active voice.`,
  `Day 12 - Friday Wrap-up\nRead article about monitoring/observability; write 2 paragraphs on how you monitor systems; review vocabulary.`,
  `Day 13 - Saturday Practice\nWatch a tech conference talk (30 min); take notes in English; write a detailed summary; practice explaining the talk.`,
  `Day 14 - Week 2 Review\nRead all Week 2 writing; compare progress vs Week 1; list 3 improvements and set Week 3 goals.`,
  // Days 15-28: Weeks 3-4 pattern (repeat daily with focus variations)
];

// Fill remaining days (15..90) with variations based on the Monday-Friday pattern and milestones.
(function fillRemaining(){
  const base = [];
  // create a 14-day pattern for weeks 3-4 and then rotate
  for(let i=15;i<=90;i++){
    let dayText = `Day ${i} - Practice Routine\nMorning: Read technical documentation (20-25 min) and practice pronunciation.\nEvening: Write daily work journal (30-40 min).`;
    // add specifics for certain milestone days
    if(i===21) dayText += `\nMilestone: Write a 400-600 word blog draft.`;
    if(i===28) dayText += `\nMilestone: Edit blog and read 2-3 long articles.`;
    if(i===56) dayText += `\nMilestone (Week 8): Attend an online meetup and ask one question in English.`;
    if(i===84) dayText += `\nMilestone (Week 12): Prepare your first technical blog post for publishing.`;
    base.push(dayText);
  }
  // append to FULL_PLAN
  for(let txt of base) FULL_PLAN.push(txt);
})();

// ensure length 90
if(FULL_PLAN.length < 90){
  while(FULL_PLAN.length < 90) FULL_PLAN.push(`Day ${FULL_PLAN.length+1} - Continue practice using the Week 3-4 routine. Morning reading and evening journal.`);
}
