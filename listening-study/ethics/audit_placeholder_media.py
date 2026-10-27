import json
import wave
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(__file__).parent / "test-evidence" / "placeholder-media-audit.json"


def probe(path: Path) -> dict:
    record = {
        "bytes": path.stat().st_size,
        "suffix": path.suffix.lower(),
    }
    if path.suffix.lower() == ".wav":
        with wave.open(str(path), "rb") as source:
            frames = source.getnframes()
            sample_rate = source.getframerate()
            record.update({
                "channels": source.getnchannels(),
                "sampleRate": sample_rate,
                "sampleWidthBytes": source.getsampwidth(),
                "frames": frames,
                "durationSeconds": frames / sample_rate,
            })
    else:
        record["note"] = "Decode, duration, and dimensions are checked in the browser lifecycle test."
    return record


def main() -> None:
    media = sorted((ROOT / "assets").rglob("*"))
    media = [path for path in media if path.is_file()]
    records = {}
    for path in media:
        relative = path.relative_to(ROOT).as_posix()
        records[relative] = probe(path)

    report = {
        "status": "PLACEHOLDER MEDIA ONLY - not the final 40 method-specific stimuli",
        "checkedFiles": len(records),
        "files": records,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(OUTPUT)
    print(f"checked {len(records)} files")


if __name__ == "__main__":
    main()
