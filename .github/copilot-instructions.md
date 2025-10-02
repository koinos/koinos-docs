# GitHub Copilot Instructions for koinos-docs

## Project Overview

This repository contains the official documentation for the Koinos blockchain platform. The documentation is built using MkDocs with the Material theme and covers validators, developers, exchanges, architecture, and resources.

**Important**: This repository has been deprecated. New documentation contributions should go to https://github.com/koinos/koinos/blob/master/docs.

## Repository Structure

- `/docs/` - All Markdown documentation files organized by topic
  - `overview/` - Blockchain basics, mana, proof-of-burn, tokenomics
  - `developers/` - Developer guides, SDKs, CLI, contract development
  - `validators/` - Node requirements, configuration, management
  - `exchanges/` - Integration guides for exchanges
  - `architecture/` - Technical architecture documentation
  - `resources/` - Additional resources and tools
- `mkdocs.yml` - MkDocs configuration file
- `requirements.txt` - Python dependencies for building documentation
- `CONTRIBUTING.md` - Contribution guidelines

## Technologies Used

- **MkDocs**: Static site generator for project documentation
- **Material for MkDocs**: Modern responsive theme
- **Markdown**: All documentation is written in Markdown format
- **Python**: Required for running MkDocs
- **YAML**: Configuration format for MkDocs

## Build and Test

### Setup

1. Create a Python virtual environment:
   ```bash
   python3 -m venv docs-venv
   source docs-venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Development Server

Run the development server for live preview:
```bash
mkdocs serve
```

This serves the site at `http://localhost:8000/` with auto-reload on file changes.

### Build

Build static site:
```bash
mkdocs build
```

## Coding Standards

### Markdown Style

- Use consistent heading hierarchy (start with h1 `#`)
- Include front matter for metadata when needed (e.g., `icon:` for page icons)
- Use code blocks with language specification for syntax highlighting
- Follow existing formatting patterns in similar documentation files
- Pay attention to spaces, tabs, and line endings

### Documentation Guidelines

- Write clear, concise, and accurate documentation
- Include code examples where appropriate
- Use the MkDocs Material extensions:
  - Admonitions for notes, warnings, tips
  - Tabbed content for multiple options/languages
  - Code annotations for explanations
  - Icons from FontAwesome and Material icons
- Test all code examples before including them
- Update navigation in `mkdocs.yml` when adding new pages

### File Organization

- Place new documentation in the appropriate subdirectory
- Follow the existing naming conventions (lowercase, hyphens for spaces)
- Keep related content together

## Key Concepts

- **Koinos**: A feeless blockchain platform with proof-of-burn consensus
- **Mana**: Resource system for transactions (regenerates over time)
- **Smart Contracts**: Written in AssemblyScript or C++
- **Microservices Architecture**: Koinos uses a modular microservice design
- **Docker**: Used for running Koinos nodes

## Common Tasks

### Adding a New Documentation Page

1. Create a new `.md` file in the appropriate `docs/` subdirectory
2. Add front matter if needed (e.g., icon)
3. Write content following Markdown style guidelines
4. Update the `nav:` section in `mkdocs.yml` to include the new page
5. Test with `mkdocs serve` to verify rendering

### Updating Existing Documentation

1. Locate the relevant `.md` file
2. Make changes following existing style
3. Verify with `mkdocs serve`
4. Ensure all links and code examples still work

### Working with MkDocs Material Features

- Use code blocks with `{ .txt .no-copy }` to prevent copy button
- Use tabbed content with `=== "Tab Name"` syntax
- Use admonitions like `!!! note` or `!!! warning`
- Reference the Material for MkDocs documentation for advanced features

## Testing

Since this is a documentation repository:
- **Visual Testing**: Always preview changes with `mkdocs serve`
- **Link Testing**: Verify all internal and external links work
- **Code Example Testing**: Test any code examples in the appropriate environment
- **Build Testing**: Ensure `mkdocs build` completes without errors

## Contributing

- Follow the guidelines in `CONTRIBUTING.md`
- Use GitHub Flow (feature branches and pull requests)
- Ensure code matches repository style
- All contributions are under the MIT License

## Ignored Files

- `docs-venv/` - Python virtual environment
- `site/` - Built documentation output
- `.DS_Store` - Mac system files
- `__pycache__/` - Python cache
- `.vscode/` - Editor configuration
