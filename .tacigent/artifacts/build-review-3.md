# Build Review 3

Focus: architecture realism

- auth persistence was upgraded from memory to SQLite because the first version was not stable under real verification
- this was the smallest architecture change that converted the demo into a defensible local product
- domain state is still demo-local and should remain explicitly labeled as such in later stages

Decision: architecture is acceptable with stated debt
