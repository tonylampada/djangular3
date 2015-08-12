This is a couple of components that facilitates building a documentation website with a bunch of sample pages that demonstrate how to use components.

To see an example, look at the `src/pages/docs.html`, or the generated `dist/docs.html` once you run any build.

For DOCS to work, there are a few settings (global js variables) that need to be in place:

* DOCS.SAMPLE_BASE_URL: points to where DOCS should look for code samples (should not be cached with $templateCache!)
* DOCS.BASE_URL: where docs should look for its own templates (can be cached)

