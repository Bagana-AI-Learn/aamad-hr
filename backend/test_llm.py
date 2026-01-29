"""
Manual LLM API Test Script

Tests the LLM configuration (OpenRouter / OpenAI-compatible) to verify API key and connection.
"""

import sys
import os
from utils.config import get_settings
from langchain_openai import ChatOpenAI


def test_config():
    """Test configuration loading."""
    print("=" * 60)
    print("Testing Configuration...")
    print("=" * 60)

    try:
        settings = get_settings()
        print(f"[OK] OPENAI_BASE_URL: {settings.OPENAI_BASE_URL or settings.OPENAI_API_BASE or '(not set)'}")
        print(f"[OK] OPENAI_MODEL: {settings.OPENAI_MODEL}")
        print(f"[OK] OPENAI_API_KEY: {'SET' if settings.OPENAI_API_KEY else 'NOT SET'}")
        print(f"[OK] OPENAI_TEMPERATURE: {settings.OPENAI_TEMPERATURE}")
        print()
        return settings
    except Exception as e:
        print(f"[FAIL] Configuration Error: {e}")
        return None


def test_llm_creation(settings):
    """Test LLM instance creation (OpenRouter)."""
    print("=" * 60)
    print("Testing LLM Creation (OpenRouter)...")
    print("=" * 60)

    try:
        base_url = settings.OPENAI_BASE_URL or settings.OPENAI_API_BASE or None
        print(f"  Base URL: {base_url or 'default'}")
        print(f"  Model: {settings.OPENAI_MODEL}")
        print(f"  API Key: {'SET' if settings.OPENAI_API_KEY else 'NOT SET'}")

        llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=settings.OPENAI_TEMPERATURE,
            api_key=settings.OPENAI_API_KEY,
            base_url=base_url,
        )
        print("[OK] LLM instance created successfully")
        return llm
    except Exception as e:
        print(f"[FAIL] LLM Creation Error: {e}")
        import traceback
        traceback.print_exc()
        return None


def test_llm_call(llm):
    """Test actual LLM API call."""
    print("=" * 60)
    print("Testing LLM API Call...")
    print("=" * 60)

    try:
        test_message = "Say 'Hello, LLM test successful!' in one sentence."
        print(f"Sending test message: {test_message}")
        print("Waiting for response...")
        print()

        response = llm.invoke(test_message)
        print("[OK] Response received:")
        print("-" * 60)
        print(response.content)
        print("-" * 60)
        print()
        return True
    except Exception as e:
        print(f"[FAIL] LLM API Call Error: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Main test function."""
    print("\n" + "=" * 60)
    print("LLM API Test Script (OpenRouter)")
    print("=" * 60)
    print()

    settings = test_config()
    if not settings:
        print("\n[FAIL] Configuration test failed. Exiting.")
        sys.exit(1)

    llm = test_llm_creation(settings)
    if not llm:
        print("\n[FAIL] LLM creation test failed. Exiting.")
        sys.exit(1)

    success = test_llm_call(llm)

    print("=" * 60)
    if success:
        print("[OK] ALL TESTS PASSED!")
        print("Your OpenRouter LLM configuration is working correctly.")
    else:
        print("[FAIL] LLM API call failed.")
        print("Check OPENAI_API_KEY, OPENAI_BASE_URL, and network.")
    print("=" * 60)
    print()


if __name__ == "__main__":
    main()
