# Graphiti Temporal Knowledge Graphs

> **Source**: `tooling/sources/github/graphiti/`
> **License**: Apache 2.0
> **Use when**: Building AI agent memory systems, temporal knowledge graphs, long-term context management
> **Verified:** graphiti-core>=0.29.2

> [!NOTE]
> Graphiti is a runtime framework. Using it requires: `pip install graphiti-core` + Neo4j + OpenAI API key.
> See init requirements in `setup.ps1` output.

## Overview
Graphiti builds temporally-aware knowledge graphs from unstructured data, designed as long-term memory for AI agents. It tracks how facts change over time and supports hybrid search.

## Key Concepts
- **Episodes**: Raw source data (conversations, documents, JSON).
- **Entities/Nodes**: People, products, concepts extracted from episodes.
- **Facts/Edges**: Relationships with temporal metadata (valid_from, valid_to).
- **Bi-temporal model**: Tracks both when facts were true (valid time) and when they were recorded (transaction time).
- **Hybrid retrieval**: Semantic similarity + BM25 + graph traversal.

## Architecture
- Python framework (`graphiti-core`)
- Neo4j graph database backend
- LLM-powered entity extraction and resolution
- MCP server for direct agent integration

## Init Requirements
```bash
pip install graphiti-core
docker run -d --name neo4j -p 7474:7474 -p 7687:7687 neo4j
# Set environment variables:
# NEO4J_URI=bolt://localhost:7687
# NEO4J_USERNAME=neo4j
# NEO4J_PASSWORD=your_password
# OPENAI_API_KEY=your_key
```

---

## API Nuances and Method Signatures

### Episode Insertion Requirements
When inserting raw data into Graphiti via `add_episode()`, the method signature requires `reference_time` as a mandatory parameter in `graphiti-core>=0.29.2`. Calling it without `reference_time` will raise `TypeError: Graphiti.add_episode() missing 1 required positional argument: 'reference_time'`.

Always supply a timezone-aware UTC datetime:
```python
from datetime import datetime, timezone

await client.add_episode(
    name="session_1",
    episode_body="User is currently debugging the build setup on Windows.",
    source_description="agent_terminal_log",
    reference_time=datetime.now(timezone.utc),  # MANDATORY
)
```

---

## LLM Provider Compatibility

Graphiti relies heavily on LLM Structured Outputs for extracting nodes, edges, and temporal relationships.

### OpenAI-Compatible Local Proxies (vLLM, Ollama, litellm, Gemini via Local Proxy)
By default, Graphiti's `OpenAIGenericClient` uses `structured_output_mode='json_schema'`. 
- **The Issue**: If you are using a local OpenAI-compatible proxy (like litellm or vLLM) pointing to models like Gemini, the proxy might not enforce the JSON schema server-side during constrained decoding. This can result in the model returning a JSON array instead of the expected object, causing a runtime crash:
  `TypeError: graphiti_core.prompts.extract_nodes.ExtractedEntities() argument after ** must be a mapping, not list`.
- **The Fix**: Switch the client's output mode to `'json_object'`, which injects the schema directly into the prompt instructing the model to output a JSON object, rather than enforcing it at the API grammar level:
  ```python
  from graphiti_core.llm_client import OpenAIGenericClient
  from graphiti_core.llm_client.config import LLMConfig
  
  llm_client = OpenAIGenericClient(
      config=LLMConfig(
          api_key="...",
          model="your-model-name",
          base_url="your-proxy-url",
      ),
      structured_output_mode='json_object',  # Injects schema into prompt
  )
  ```

---

## Minimal Runnable Example
Below is a complete script demonstrating episode insertion and querying with Graphiti:

```python
import asyncio
import os
from datetime import datetime, timezone
from graphiti_core import Graphiti

async def run_graphiti_demo():
    neo4j_uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    neo4j_user = os.getenv("NEO4J_USERNAME", "neo4j")
    neo4j_password = os.getenv("NEO4J_PASSWORD", "password")
    
    # Initialize client
    client = Graphiti(
        neo4j_uri=neo4j_uri,
        neo4j_user=neo4j_user,
        neo4j_password=neo4j_password,
    )
    
    # Clean/Reset DB for test (optional)
    await client.clear()
    
    # Insert episodic data
    print("Adding episode...")
    await client.add_episode(
        name="workspace_setup",
        episode_body="The AgentOS project contains skills templates and a CLI tool in bin/cli.js.",
        source_description="workspace_inspect",
        reference_time=datetime.now(timezone.utc),
    )
    
    # Wait for graph processing/indexing to finish
    await asyncio.sleep(2)
    
    # Retrieve context
    print("Querying graph...")
    results = await client.search("What does the AgentOS project contain?")
    
    for match in results:
        print(f"[PASS] Match: {match}")
        
    await client.close()

if __name__ == "__main__":
    asyncio.run(run_graphiti_demo())
```

## Full Documentation
See README and examples at: `tooling/sources/github/graphiti/`
