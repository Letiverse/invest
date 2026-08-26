"""
Generate per-slide investor narration MP3s using edge-tts (Microsoft Neural TTS).
Four UK voices for variety and expression:
  Sonia  (warm, professional female) — slides 1, 7, 9, 12, 14, 16, 19
  Ryan   (authoritative male)        — slides 2, 4, 6, 8, 10, 13, 15, 17
  Libby  (energetic, friendly female)— slides 3, 5, 11
  Thomas (calm, measured male)       — slide 18
Output: public/audio/narration/slide-01.mp3 through slide-19.mp3
Usage:  python scripts/generate-narration.py
"""
import asyncio
import os
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "narration")

# (voice, rate, pitch, script)
SCRIPTS: dict[int, tuple[str, str, str, str]] = {
    1: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Letiverse AI. Turning physical venues into immersive digital worlds. "
        "We're raising nine hundred and ninety-five thousand pounds. "
        "Minimum investment one thousand pounds. "
        "Let's show you why."
    ),
    2: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "The AI era isn't coming. It's here. "
        "The businesses building infrastructure for this shift will own the next decade. "
        "Letiverse is that infrastructure — with real customers, and real revenue, right now."
    ),
    3: (
        "en-GB-LibbyNeural", "+5%", "+3Hz",
        "The web is flat. The world isn't. "
        "Spatial computing is the next platform shift — and Letiverse was purpose-built for it before most companies knew to look. "
        "Being first is the advantage."
    ),
    4: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "In twenty twenty-six, an independent global panel awarded Letiverse best Digital Twin on the planet. "
        "Not marketing — third-party technical validation. "
        "The due diligence, done for you."
    ),
    5: (
        "en-GB-LibbyNeural", "+5%", "+3Hz",
        "Before the business, we built something meaningful. "
        "Children with life-limiting conditions, given world-class immersive experiences — free of charge. "
        "When your technology works in that context, the commercial applications become very clear."
    ),
    6: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "Forty percent year-on-year growth. Five hundred billion dollars by twenty-thirty. "
        "We don't need all of it. "
        "A fraction of hospitality, sport, and entertainment makes this a very large business — and we already have the head start."
    ),
    7: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "We give venues the platform for free. That's the moat — not the compromise. "
        "Revenue comes from the audience, not the venue. "
        "Faster adoption. Zero friction. Zero churn."
    ),
    8: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "Free means every venue becomes an advocate, a case study, and a distribution channel. "
        "We're building the table first. "
        "Then monetising the entire surface once it's large enough to matter."
    ),
    9: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Brands want reach inside venues at peak attention. We sit exactly there. "
        "Fifty-fifty revenue split with the host. "
        "Two parties win on every deal. That's why the model holds."
    ),
    10: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "We hold exclusive UK rights to holographic LED technology from Holoconnects. "
        "Physical hardware, digital intelligence, sponsorship activation — one ecosystem. "
        "No UK competitor can replicate it."
    ),
    11: (
        "en-GB-LibbyNeural", "+5%", "+3Hz",
        "Phase One proven. Fourteen venues. One point two million in earned media value. World award. "
        "Phase Two is pure scale. "
        "The foundation's done. Now we build on it."
    ),
    12: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Phase Two puts commerce inside the experience. "
        "Browse, book, buy — without leaving. A transaction fee on every sale. "
        "The experience becomes the shop floor. Always open."
    ),
    13: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "Fourteen confirmed venues. Not pilots, not promises — live, signed partners. "
        "Sport, hospitality, entertainment. "
        "Every one validates the model from a different angle."
    ),
    14: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Over one point two-six million pounds in earned media value. "
        "Organic impressions from partners who weren't paid to promote us — they did it because the platform delivers. "
        "Every new venue grows that number."
    ),
    15: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "Year three revenue: seven point four million pounds. "
        "Built bottom-up from confirmed venue numbers and conservative assumptions. "
        "Not aspirational — the natural output of scaling what already works."
    ),
    16: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Nine-hundred-and-ninety-five thousand pounds. Eighteen months of runway. "
        "Every pound mapped to a specific outcome. "
        "A clear path to Series A."
    ),
    17: (
        "en-GB-RyanNeural", "+0%", "+0Hz",
        "Run the numbers yourself. Minimum one thousand pounds. "
        "Three scenarios from conservative to bull case. "
        "The upside is real — and it depends on execution, not luck."
    ),
    18: (
        "en-GB-ThomasNeural", "-3%", "-2Hz",
        "Every investment carries risk. What matters is structural defence. "
        "Letiverse has five: exclusive hardware rights, proprietary AI, network effects, first-mover advantage, and a model venues have no reason to leave. "
        "Difficult to replicate any one. Impossible to replicate all five."
    ),
    19: (
        "en-GB-SoniaNeural", "+3%", "+2Hz",
        "Shares are fifty pounds each, with a minimum investment of one thousand pounds. "
        "If you believe in what you've seen — now is the moment. Join the Letiverse."
    ),
}


async def generate_one(slide_id: int, voice: str, rate: str, pitch: str, text: str) -> None:
    output_path = os.path.join(OUTPUT_DIR, f"slide-{slide_id:02d}.mp3")
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    await communicate.save(output_path)
    size_kb = os.path.getsize(output_path) // 1024
    voice_short = voice.replace("en-GB-", "").replace("Neural", "")
    print(f"  ok  slide-{slide_id:02d}.mp3  [{voice_short}]  ({size_kb} KB)")


async def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Generating {len(SCRIPTS)} narration clips -> {OUTPUT_DIR}\n")
    for slide_id in sorted(SCRIPTS):
        voice, rate, pitch, text = SCRIPTS[slide_id]
        await generate_one(slide_id, voice, rate, pitch, text)
    print("\nDone.")


if __name__ == "__main__":
    asyncio.run(main())
