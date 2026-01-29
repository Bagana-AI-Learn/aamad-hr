"""
Verify OpenRouter setup: env vars, llm config, and optional chat test.
Run from backend/: python verify_openrouter.py
Set OPENAI_API_KEY, OPENAI_BASE_URL, OPENAI_MODEL before running, or use .env.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def main():
    from dotenv import load_dotenv
    load_dotenv()

    api_key = os.getenv("OPENAI_API_KEY", "")
    base_url = os.getenv("OPENAI_BASE_URL") or os.getenv("OPENAI_API_BASE") or ""
    model = os.getenv("OPENAI_MODEL", "openai/gpt-3.5-turbo")

    print("Environment:")
    print(f"  OPENAI_API_KEY: {'SET' if api_key else 'NOT SET'}")
    print(f"  OPENAI_BASE_URL: {base_url or '(not set)'}")
    print(f"  OPENAI_MODEL: {model}")
    print()

    if not api_key:
        print("Set OPENAI_API_KEY (OpenRouter key) and retry.")
        sys.exit(1)

    print("Initializing crew manager (loads agents, LLM)...")
    try:
        from services.crew_manager import OnboardingCrewManager
        mgr = OnboardingCrewManager()
    except Exception as e:
        print(f"Crew manager init failed: {e}")
        sys.exit(1)

    st = mgr.get_agent_status()
    llm = st.get("llm")
    if not llm:
        print("get_agent_status() OK but 'llm' missing.")
        print("Keys:", list(st.keys()))
        sys.exit(1)

    print("get_agent_status() -> llm:")
    print(f"  provider: {llm.get('provider')}")
    print(f"  base_url: {llm.get('base_url')}")
    print(f"  model: {llm.get('model')}")
    print(f"  api_key_set: {llm.get('api_key_set')}")
    print()

    if llm.get("provider") != "openrouter":
        print("Expected llm.provider 'openrouter'.")
        sys.exit(1)
    if not llm.get("api_key_set"):
        print("Expected llm.api_key_set true.")
        sys.exit(1)

    print("OpenRouter verification passed.")
    print()
    print("Optional: test chat (one short question)...")
    try:
        import asyncio
        async def run():
            buf = []
            async for ch in mgr.process_chat_message("What documents do I need for onboarding? One sentence only."):
                buf.append(ch)
            return "".join(buf)
        out = asyncio.run(run())
        print("  Chat response (preview):", (out[:200] + "..." if len(out) > 200 else out))
    except Exception as e:
        print("  Chat test error:", e)
    print("Done.")

if __name__ == "__main__":
    main()
