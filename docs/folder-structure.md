# Folder Structure
Vape is designed for ease of development. Everything you need to find or do should be in a sensibly named folder, so you can find it easily and just worry about your work. Top-level folders have auto-generated index files, so you don't have to worry about how your components, pages or plugins get into your app. Just write your files in the right folder, and they will get built in with the next build.

## Components
The `components` folder contains your vuejs components. It has an auto generated index file. Just write single-page [https://vuejs.org/v2/guide/components.html](vue.js components) and drop them in here. They will be picked up with the next build (and the index regenerated). When running the dev server, any changes you make to existing files will be hot-swapped when you save (or when the watch process notices the changes). If you want a custom index for some reason, instructions are in the comments at the top of the autogenerated one.
<pre>

|--<strong>components</strong>
   |--ContactForm.vue
   |--NavBar.vue
   |--ProgressBar.vue
|--config
|--dist
|--extensions
|--layouts
|--pages
|--plugins
|--public
|--styles
|--vape
|--vendor

</pre>

## Config
The `config` folder contains your application config files that were generated when the app was initialized. There are two - client and server - for a reason. With any ssr application, it can be too easy to leak config values to the client. It makes the mistake more obvious when you are making it, as you must import `'config/server'`. If you need to change any values (i.e. passwords and secrets), this is the place.
<pre>

|--components
|--<strong>config</strong>
   |--client.js
   |--server.js
|--dist
|--extensions
|--layouts
|--pages
|--plugins
|--public
|--styles
|--vape
|--vendor

</pre>

## Dist
The `dist` folder is the output of the build process. This is not created when running the dev server (or rather the dev server creates it in an in-memory file-system).
<pre>

|--components
|--config
|--dist
|--extensions
|--layouts
|--pages
|--plugins
|--public
|--styles
|--vape
|--vendor

</pre>

## Extensions
The `extensions` folder is for any functionality you want to add to express or the graphql api.
<pre>

|--components
|--config
|--dist
|--<strong>extensions</strong>
   |--index.js
   |--register.js
|--layouts
|--pages
|--plugins
|--public
|--styles
|--vape
|--vendor

</pre>

## Layouts
The `layouts` folder is for application layouts, and the default layout is provided for you. This folder also has an auto-generated index file. Layouts are just vuejs components that contain any components you want to show globally, like the slot for the router.
<pre>

|--components
|--config
|--dist
|--extensions
|--<strong>layouts</strong>
   |--Default.vue
   |--index.js
|--pages
|--plugins
|--public
|--styles
|--vape
|--vendor

</pre>

## Pages
The `pages` folder contains your application's pages. 

## Plugins

## Public

## Styles

## Vape

## Vendor
