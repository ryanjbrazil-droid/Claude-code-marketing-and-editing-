export interface LegalDoc {
  title: string;
  updated: string;
  body: string;
}

const UPDATED = 'July 2026';

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: UPDATED,
    body: `LevelUp is built to keep your data on your device.

**What's stored, and where**
Your profile, quests, habits, meals, workouts, weight log, and chat history are stored locally on your phone using on-device storage. There is no account, no login, and no LevelUp server that holds a copy of your data.

**What leaves your device**
When you use an AI feature — the Coach, AI photo/voice meal estimation, or AI meal planning — the specific information needed to generate that response is sent to Anthropic (the maker of Claude, our AI provider) to process your request. Depending on the feature, this can include: your first name, fitness goal, level, streak, character stats, today's quests/habits, macro totals, your chat messages, or a photo/voice description of a meal. This data is sent only to generate that one response and is not sold or shared for advertising. See Anthropic's own privacy policy at anthropic.com/privacy for how they handle API data.

**What we don't do**
We don't have advertising, trackers, or analytics SDKs in this app. We don't sell data, because we don't collect or hold any on a server in the first place.

**Deleting your data**
Since everything lives on your device, uninstalling the app deletes all of it. You can also wipe your local data from Profile → "Delete My Data" without uninstalling.

**Camera, microphone, and photo library**
LevelUp requests these permissions only to power barcode scanning, photo meal estimation, and voice meal logging. Nothing captured is uploaded anywhere except the specific image or transcript you submit for an AI estimate, sent directly to Anthropic as described above.

**Children**
LevelUp is not directed at children under 13 and does not knowingly collect data from them.

**Contact**
Questions about this policy: ryanjbrazil@gmail.com`,
  },
  terms: {
    title: 'Terms of Use',
    updated: UPDATED,
    body: `By using LevelUp, you agree to the following.

**The app**
LevelUp is a self-improvement and fitness tracking tool. It provides gamified tracking, workout templates, nutrition logging, and an AI coach for motivation and general guidance. It is provided "as is," without warranty of any kind.

**Not professional advice**
Nothing in LevelUp — including AI Coach messages, workout templates, or nutrition estimates — constitutes medical, dietary, or professional advice. See the Health Disclaimer and AI Coach Disclaimer for details.

**Your responsibility**
You're responsible for exercising safely, entering accurate information, and consulting a qualified professional before starting a new fitness or nutrition program, especially if you have any pre-existing condition.

**Acceptable use**
Don't use LevelUp for unlawful purposes or attempt to disrupt, reverse-engineer, or abuse the AI features beyond normal personal use.

**Changes**
We may update the app and these terms over time. Continued use after an update means you accept the revised terms.

**Limitation of liability**
To the fullest extent permitted by law, LevelUp and its developer are not liable for any injury, loss, or damage arising from use of the app, including reliance on AI-generated content or workout/nutrition guidance.

**Contact**
ryanjbrazil@gmail.com`,
  },
  health: {
    title: 'Health Disclaimer',
    updated: UPDATED,
    body: `LevelUp is for general fitness and self-improvement purposes only.

It is not medical advice, and nothing in the app — including workout plans, nutrition targets, macro suggestions, or AI Coach messages — should be treated as a substitute for professional medical guidance.

Please consult a healthcare professional before starting any new fitness, diet, or weight-loss plan, especially if you are pregnant, have an existing medical condition, or are taking medication.

LevelUp does not diagnose, treat, cure, or prevent any disease or medical condition.

If you experience pain, dizziness, shortness of breath, chest discomfort, or any other concerning symptom during exercise, stop immediately and seek medical attention if needed.

Workout suggestions in this app are general templates, not a personalized medical or physical-therapy program. Progress at a pace appropriate for your own fitness level and listen to your body.`,
  },
  'ai-coach': {
    title: 'AI Coach Disclaimer',
    updated: UPDATED,
    body: `The Coach in LevelUp is powered by an AI model (Claude, by Anthropic).

Coaching messages are motivational and educational only. They are not medical, nutritional, mental health, or professional advice of any kind.

AI-generated content can be wrong, outdated, or misinterpret your situation — even when it sounds confident. Use your own judgment before acting on anything the Coach says, especially around nutrition, training intensity, or injury.

For medical, mental health, nutrition, or safety concerns, please consult a qualified professional rather than relying on the Coach.

If a Coach message ever encourages something that feels unsafe, extreme, or inconsistent with guidance from a real professional, disregard it and use your own judgment — or reach out to us so we can review it.`,
  },
};
