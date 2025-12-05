import app from './index.js'; // or import your express instance
const routes = [];
app._router.stack.forEach(mw => {
  if (mw.route) {
    const methods = Object.keys(mw.route.methods).join(',').toUpperCase();
    routes.push(`${methods} ${mw.route.path}`);
  } else if (mw.name === 'router') {
    mw.handle.stack.forEach(r => {
      if (r.route) {
        const methods = Object.keys(r.route.methods).join(',').toUpperCase();
        routes.push(`${methods} ${r.route.path}`);
      }
    });
  }
});
console.log(routes.join('\n'));