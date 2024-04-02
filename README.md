# Koinos Documentation

This repo contains the Koinos documentation site. This site is built using [MkDocs](https://www.mkdocs.org/).

MkDocs is a Python utility to generate a simple website from Markdown content. All Koinos documentation is done in Markdown, so no web development experience is required to contribute to the documentation.

### Installation

#### Setup Virtual Environment

Newer versions of Python now require use of Python virtual environments (in addition to them being best practices for a while now). Start by creating a new virtual environment. It can located anywhere called anything you want, but `docs-venv` is ignored by git for this project.

```
python3 -m venv docs-venv
```

This will create a new venv in the directory docs-venv. To use the venv, you must first activate it.

```
source docs-venv/bin/activate
```

When you are done with the venv, you can deactivate it.

```
deactivate
```

#### Run Koinos Docs

With the created venv active...

1. Install dependencies.

```
pip install -r requirements.txt
```

2. Run MkDocs.

```
mkdocs serve
```

This will serve a local version of the site to `http://localhost:8000/`. Changes you make to the site will be automatically reflected here allowing for instant feedback.

#### Build Koinos Docs

MkDocs can also build Koinos Docs as a static site that can be served using Apache.

```
mkdocs build
```
