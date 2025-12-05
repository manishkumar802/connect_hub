// ...existing code...
// BAD: router.get('/api/:*/messages', handler);

// GOOD — named param
router.get('/api/:id/messages', handler);

// OR if you want a wildcard capture (path-to-regexp v6)
router.get('/files/:path(*)', (req,res) => {
  // req.params.path contains the rest of the path
});

// OR use plain wildcard (no named param)
router.get('/api/*', handler); // req.params is empty; use req.path or req.url
// ...existing code...