# Koinos Documentation

  

This repo contains the Koinos documentation site. The site is built using the [Sphinx](https://www.sphinx-doc.org/en/master/index.html) documentation generator.

  

## Installation

To run the generator locally, clone the repo and follow the instructions below using Python 3. 

  

1. Install the dependenices listed in requirements.txt
```
pip install -r requirements.txt
```
2. Run the sphinx-build command to build the site serve it on localhost:8000 (autobuild will live-reload when changes are made)
```
sphinx-autobuild docs docs/_build/html
```
