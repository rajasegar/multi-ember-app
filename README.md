# multi-ember-app
This is a sample repo for testing out multiple [Ember.js](https://emberjs.com) apps in a single html page.

This is inspired by the [single-spa](https://single-spa.js.org/) library of how we can dynamically mount and unmount Ember.js apps in a page.

I have recreated all the lifecycle hooks of single-spa like
- bootstrap
- mount
- unmount

The sample Ember.js apps are built with `no-conflict` settings for the [loader.js](https://github.com/ember-cli/loader.js/) library for Ember. But there are still some issues with the no-config mode and I have used my forks to address the same.

You can view the changes here:
- [loader.js](https://github.com/rajasegar/loader.js/commit/dc25de293a9fb8e3b4d621ddbe7db0630c376b46)
- [ember-resolver](https://github.com/rajasegar/ember-resolver/commit/e8e67c7449f61f0d4f41941d490f06dd75de0abe)

**WARNING:** Only one Ember app can be mounted at a single point of time, otherwise it won't work.

## Usage
Start an HTTP server in the current folder and play with it by mounting and unmounting different Ember apps.

```
servor .
```

## Things to do
- Host the planets and people app somewhere, or if possible reuse the existing ones from [Ember MicroFrontends](https://github.com/ember-micro-frontends).
- Use Different Ember versions to mimic real-world scenarios. At present both the Ember apps are using the same version: 3.19
