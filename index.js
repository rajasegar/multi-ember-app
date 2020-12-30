console.log('hello');

let peopleApp, planetsApp;
let peopleOpts, planetsOpts;


const btnBootstrapPeople = document.getElementById('btnBootstrapPeople');
const btnBootstrapPlanets = document.getElementById('btnBootstrapPlanets');
const btnMountPlanets = document.getElementById('btnMountPlanets');
const btnUnmountPlanets = document.getElementById('btnUnmountPlanets');

const btnMountPeople = document.getElementById('btnMountPeople');
const btnUnmountPeople = document.getElementById('btnUnmountPeople');

function mount(opts) {
  return Promise
    .resolve()
    .then(() => {
      opts.applicationInstance = opts.App.create(opts.createOpts);
    })
}

function unmount(opts) {
  return Promise
    .resolve()
    .then(() => {
      opts.applicationInstance.destroy();
      opts.applicationInstance = null;
    });
}
function loadEmberApp(appName, appUrl, vendorUrl = null) {
  return new Promise((resolve, reject) => {
    if (typeof appName !== 'string') {
      reject(new Error(`single-spa-ember requires an appName string as the first argument`));
      return;
    }

    if (typeof appUrl !== 'string') {
      reject(new Error(`single-spa-ember requires an appUrl string as the second argument`));
      return;
    }

    if (vendorUrl && typeof vendorUrl !== 'string') {
      reject(new Error(`single-spa-ember vendorUrl (the third argument) is optional, but must be a string if present`));
      return;
    }

    if (vendorUrl) {
      const scriptVendor = document.createElement('script');
      scriptVendor.src = vendorUrl;
      scriptVendor.async = true;
      scriptVendor.onload = loadApp;
      scriptVendor.onerror = reject;
      document.head.appendChild(scriptVendor);
    } else {
      loadApp();
    }

    function loadApp() {
      const scriptEl = document.createElement('script');
      scriptEl.src = appUrl;
      scriptEl.async = true;
      scriptEl.onload = () => {
        resolve(require(appName+'/app'));
      }
      scriptEl.onerror = reject;
      document.head.appendChild(scriptEl);
    }
  });
}
btnBootstrapPeople.addEventListener('click', (ev) => {
  console.log('Bootstrap People');
  loadEmberApp('people',
    '//localhost:4201/people/assets/people.js',
    '//localhost:4201/people/assets/vendor.js'
  ).then(app => {
    ev.target.disabled = true;
    btnMountPeople.disabled = false;
    console.log(loader.__aliases);
    window.peopleLoader = loader;
    peopleApp = app.default;
  });

});

btnBootstrapPlanets.addEventListener('click', (ev) => {
  console.log('Bootstrap Planets');
  loadEmberApp('planets',
    '//localhost:4202/planets/assets/planets.js',
    '//localhost:4202/planets/assets/vendor.js'
  ).then(app => {
    console.log(loader.__aliases);
    ev.target.disabled = true;
    btnMountPlanets.disabled = false;
    window.planetsLoader = loader;
    planetsApp = app.default;
  });
});

btnMountPeople.addEventListener('click', (ev) => {
  console.log('Mount People');
  peopleOpts = {
    App: peopleApp,
    appName: 'people',
    createOpts: {
      rootElement: '#people',
    }
  };
  window.loader = window.peopleLoader;
  mount(peopleOpts).then(() => {
    ev.target.disabled = true;
    btnUnmountPeople.disabled = false;
  });
});
btnUnmountPeople.addEventListener('click', (ev) => {
  console.log('Unmount People');
  
  unmount(peopleOpts).then(() => {
    ev.target.disabled = true;
    btnMountPeople.disabled = false;
  });
});
btnMountPlanets.addEventListener('click', (ev) => {

planetsOpts = {
  App: planetsApp,
  appName: 'planets',
  createOpts: {
    rootElement: '#planets',
  }
};
  console.log('Mount Planets');
  window.loader = window.planetsLoader;
mount(planetsOpts).then(() => {
  ev.target.disabled = true;
  btnUnmountPlanets.disabled = false;
});
});
btnUnmountPlanets.addEventListener('click', (ev) => {
  console.log('Unmount Planets');
  unmount(planetsOpts).then(() => {
    ev.target.disabled = true;
    btnMountPlanets.disabled = false;
  });
});
