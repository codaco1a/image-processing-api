// Back-end with node.js runtime environment
// Import packages
import e from 'express'; // express packages
import routes from './routes/router'; // import router from routes folder
import process from 'process'; // global process packages, node's core modules

// Build an application object using express
const smellyCat = e();

// App uses routes as it's router
smellyCat.use('/', routes);

// App listens for 3152 port
smellyCat.listen(3152, () => {
  // This method does not force new line, '\n' at the end does so
  process.stdout.write('SmellyCatApp is running on localhost:3152\n');
});

// export modules and app object, to apply unit testing with jasmine frame-work
export default {
  smellyCat,
};
