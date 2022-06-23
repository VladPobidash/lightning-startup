# Lightning startup
Lightning is a (TV) app development framework that offers great **portability** and **performance**.

## About repo
Every branch has an uniq README file with implemented features description, code snippets, useful links, tricks & tips. Look below for the brief branch description.
- `blank-template` contains an empty application ready for development
- `router/`
	- `setup` basic router setup example (preparation for `rtk/setup`)
	- `with-rtk` advanced router setup with Redux ToolKit features
		(only after `rtk/setup` & `rtk/advanced-setup`)
- `rtk/`
	- `setup` RTK usage on trivial counter app example
	- `advanced-setup` close to real-life RTK setup

### Useful links
- [Official site](https://lightningjs.io/)
- [Official docs](https://lightningjs.io/docs)
	Includes:
	- [Getting Started Guide](https://lightningjs.io/docs/#/getting-started/index?id=getting-started-guide)
	- [Lightning Core Reference](https://lightningjs.io/docs/#/lightning-core-reference/index?id=lightning-core-reference)
	- [Lightning SDK Reference](https://lightningjs.io/docs/#/lightning-sdk-reference/index?id=lightning-sdk-reference)
	- [Lightning CLI Reference](https://lightningjs.io/docs/#/lightning-cli-reference/index?id=lightning-cli-reference)
	- [Lightning UI Reference](https://lightningjs.io/docs/#/lightning-ui-reference/index?id=lightning-ui-reference)
- [Additional core docs](https://rdkcentral.github.io/Lightning/docs/introduction/introduction)
- [Lightning-SDK docs](https://rdkcentral.github.io/Lightning-SDK) helps you build great Lightning-based TV apps.
	Includes such plugins as [Router](https://rdkcentral.github.io/Lightning-SDK/#/plugins/router/index?id=router), [VideoPlayer](https://rdkcentral.github.io/Lightning-SDK/#/plugins/videoplayer?id=videoplayer), etc)
- [LightningJS Forum](https://forum.lightningjs.io/) discuss everything related to LightningJS


### Getting started

> Before you follow the steps below, make sure you have
[NodeJS](https://nodejs.org/en/download) and [Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.
