# CocoIndex RAG Pipeline

> **Source**: `tooling/sources/github/cocoindex/skills/cocoindex/SKILL.md`
> **License**: Apache 2.0
> **Use when**: Building RAG pipelines, data indexing, semantic search infrastructure
> **Verified:** cocoindex>=1.0.10 (v1 API)

> [!NOTE]
> CocoIndex is a runtime library. Using it requires: `pip install cocoindex[embeddings]` + PostgreSQL with pgvector.
> See init requirements in `setup.ps1` output.

## Overview
Teaches the agent how to build incremental data indexing pipelines with CocoIndex for RAG (Retrieval-Augmented Generation) applications.

## Key Concepts
- **Mental model**: Declarative data pipelines where target states are defined as a function of sources, and CocoIndex automatically handles change detection and incremental updates.
- **Core APIs**: `coco.App`, `@coco.fn` (with optional `memo=True` for memoization), `coco.mount_each`, `coco.mount`, `coco.use_mount`, `coco.map`, `coco.ContextKey`, `@coco.lifespan`.
- **Component Path**: Stable identifier (e.g. `coco.component_subpath("process", name)`) used by the engine to map components to previous runs.
- **Targets**: `DirTarget` (localfs), `TableTarget` (postgres/databases).
- **Incremental processing**: Only processes modified or new items, and cleans up deleted items automatically.

## Init Requirements
```bash
pip install -U "cocoindex[embeddings]"
# Set environment variable:
# COCOINDEX_DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
# COCOINDEX_DB=path/to/lmdb_state_database (required for local storage state)
# First run: cocoindex update main.py
```

## Known Constraints
- **pgvector ivfflat Index Dimension Limit**: pgvector's `ivfflat` index type supports a maximum of 2000 dimensions by default. If using high-dimensional embedding models (such as `gemini/gemini-embedding-2-preview` which outputs 3072 dimensions), calling `target_table.declare_vector_index(column="embedding")` will raise a `ProgramLimitExceededError`. 
  - **Workarounds**: Store the embedding vector in pgvector without creating a vector similarity index, reduce the embedding model's output dimension (e.g., `dimensions=768` if supported), or use a different index type if possible.

## Windows Notes
- Set environment variable `PYTHONIOENCODING=utf-8` to avoid console print encoding crashes (e.g., character map encoding errors with non-ASCII characters).
- Use forward slashes or raw strings for path definitions.
- Refer to [Windows Platform Compatibility Notes](file:///c:/.USER FOLDER/Projects/Project-skill-setup/templates/skills/shared/windows-platform-notes.md) for detailed configuration guide.

## Minimal v1 API Example
Below is a runnable minimal example showing how to mount a file-processing pipeline that indexes files to a postgres database:

```python
import os
import pathlib
import asyncpg
import cocoindex as coco
from cocoindex.connectors import localfs, postgres
from cocoindex.resources.file import FileLike, PatternFilePathMatcher
from dataclasses import dataclass
from typing import AsyncIterator, Annotated
from numpy.typing import NDArray

DATABASE_URL = os.getenv("POSTGRES_URL", "postgresql://user:pass@localhost/dbname")
PG_DB = coco.ContextKey[asyncpg.Pool]("postgres_pool")

@coco.lifespan
async def app_lifespan(builder: coco.EnvironmentBuilder) -> AsyncIterator[None]:
    async with asyncpg.create_pool(DATABASE_URL) as pool:
        builder.provide(PG_DB, pool)
        yield

@dataclass
class DocRow:
    id: str
    filename: str
    text: str

@coco.fn(memo=True)
async def process_file(file: FileLike, table: postgres.TableTarget[DocRow]) -> None:
    text = await file.read_text()
    table.declare_row(
        row=DocRow(
            id=str(file.file_path.path),
            filename=file.file_path.name,
            text=text,
        )
    )

@coco.fn
async def app_main(sourcedir: pathlib.Path) -> None:
    target_table = await postgres.mount_table_target(
        PG_DB,
        table_name="documents",
        table_schema=await postgres.TableSchema.from_class(DocRow, primary_key=["id"]),
    )
    files = localfs.walk_dir(
        sourcedir,
        recursive=True,
        path_matcher=PatternFilePathMatcher(included_patterns=["**/*.md"]),
    )
    await coco.mount_each(process_file, files.items(), target_table)

app = coco.App(
    coco.AppConfig(name="DocIndexer", lifespan=app_lifespan),
    app_main,
    sourcedir=pathlib.Path("./docs"),
)

if __name__ == "__main__":
    app.update_blocking(report_to_stdout=True)
```

## Full Instructions
Read the complete skill file at: `tooling/sources/github/cocoindex/skills/cocoindex/SKILL.md`
