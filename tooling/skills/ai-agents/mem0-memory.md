# Mem0 Intelligent Universal Memory Layer

> **Source**: `tooling/sources/github/mem0/`
> **License**: Apache 2.0
> **Use when**: Implementing user preference tracking, personalized agent memory, self-improving long-term knowledge profiles, or cross-session memory logs.
> **Verified:** mem0ai>=2.0.6

## Overview
Mem0 (pronounced "mem-zero") is an intelligent, self-improving memory layer for AI agents. It extracts and stores facts, user preferences, and evolving context over time to deliver personalized agent experiences.

---

## Configuration and Setup Options

You can implement Mem0 either via the managed platform API or by self-hosting it.

### Option A: Managed Platform API (mem0.ai)
The easiest setup using Mem0's managed cloud service:
1. Sign up at [mem0.ai](https://mem0.ai) and generate an API key.
2. Store your key in the `.env` file as `MEM0_API_KEY`.
3. Use the `MemoryClient` in your code:
   ```python
   from mem0 import MemoryClient
   
   client = MemoryClient(api_key="your_api_key_here")
   
   # Add a memory
   client.add("User prefers writing code in Python and uses VS Code.", user_id="user_1")
   
   # Search memories: In mem0ai>=2.0.6, user_id is passed inside the filters dict.
   results = client.search("What language does the user prefer?", filters={"user_id": "user_1"})
   print(results)
   ```

---

### Option B: Self-Hosted (Open Source)
You can run Mem0 locally as a library or deploy it as a server.

#### B1: Running locally as a Python SDK Library
Install the library:
```bash
pip install mem0ai
```
Configure your memory instance using custom LLMs and vector stores (e.g., local Ollama + Qdrant database):
```python
from mem0 import Memory

config = {
    "vector_store": {
        "provider": "qdrant",
        "config": {
            "host": "localhost",
            "port": 6333,
        }
    },
    "llm": {
        "provider": "ollama",
        "config": {
            "model": "llama3.1:latest",
            "ollama_base_url": "http://localhost:11434"
        }
    },
    "embedder": {
        "provider": "ollama",
        "config": {
            "model": "nomic-embed-text:latest",
        }
    }
}

memory = Memory.from_config(config)

# Add memory locally
memory.add("User prefers dark mode and uses tabs.", user_id="user_1")

# Retrieve memory
memories = memory.get_all(user_id="user_1")
```

#### B2: Deploying a Self-Hosted Server via Docker Compose
To deploy the full server stack (FastAPI server + pgvector + Neo4j):
1. Navigate to the cloned repo: `tooling/sources/github/mem0/`
2. Follow the Docker configuration details in `server/README.md`.
3. Spin up the server using Docker Compose:
   ```bash
   docker compose up -d
   ```
4. Access the API at `http://localhost:8888` and view the API documentation at `/docs`.

---

## Integrating as an MCP Server (Claude Code / Cursor)

To allow agents like Claude Code to automatically add, search, and update memories, you can run the Mem0 Model Context Protocol (MCP) server.

1. **Install and run the Mem0 MCP Server**:
   Refer to the configuration guide at: `tooling/sources/github/mem0/` or follow the community server settings.
2. **Add MCP Config to Claude Code**:
   Register the server in your MCP config file (e.g. `mcp-config.json`):
   ```json
   {
     "mcpServers": {
       "mem0": {
         "command": "npx",
         "args": ["-y", "mem0-mcp-server"],
         "env": {
           "MEM0_API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```
   Now, your coding agents can call tools such as `add_memory`, `search_memory`, and `delete_memory` autonomously.

---

## API Nuances and Return Values

### Search Client Parameters
In `mem0ai>=2.0.6`, passing `user_id` directly as a top-level keyword parameter to `client.search()` will raise a `ValueError`:
```
ValueError: Top-level entity parameters frozenset({'user_id'}) are not supported in search(). Use filters={'user_id': '...'} instead.
```
Always specify target entities via `filters`:
```python
results = client.search("query text", filters={"user_id": "agentos_test"})
```

### Search Result Type & Indexing
The return value of `client.search()` in modern versions is a dict-like response object rather than a plain Python `list`. Accessing items using an integer index directly (e.g. `results[0]`) might raise `KeyError: 0`.
To safely access results by index, convert the response to a list first, or iterate through it:
```python
# Safe integer indexing
first_result = results[0] if isinstance(results, list) else list(results)[0]
```

### Minimal Client Example
```python
import os
from mem0 import MemoryClient

def run_mem0_demo():
    api_key = os.getenv("MEM0_API_KEY")
    if not api_key:
        print("[FAIL] MEM0_API_KEY env var not set")
        return
        
    client = MemoryClient(api_key=api_key)
    
    # Add preference
    print("Adding memory...")
    client.add("I am testing AgentOS on a Windows machine.", user_id="agentos_test")
    
    # Search preference with filter
    print("Searching memory...")
    results = client.search("What platform is being tested?", filters={"user_id": "agentos_test"})
    
    # Safely index results
    results_list = results if isinstance(results, list) else list(results)
    if results_list:
        first = results_list[0]
        memory_text = first.get("memory") if isinstance(first, dict) else getattr(first, "memory", str(first))
        print(f"[PASS] Found memory: {memory_text}")
    else:
        print("[FAIL] No memories found")

if __name__ == "__main__":
    run_mem0_demo()
```
