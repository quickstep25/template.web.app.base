[![Build Status](https://travis-ci.org/quickstep25/template.web.app.base.svg?branch=master)](https://travis-ci.org/quickstep25/template.web.app.base)
##<i class="icon-file"></i> Web Application Template - Baseline Model
This project is built with Node.js and incorporates the usage of a variety of modules and plugins to form an application file / directory structure and process streaming workflow as a starting point for a new web application.
###<i class="icon-star"></i> Features
This template model is designed with the ideal that tightly coupled, change resistant, brittle code causes all sorts of long-term maintenance issues that ultimately result in adverse client satisfaction when software is deployed and  delivered. A clean separation between application logic and the UI will make an application easier to test, maintain, and evolve. It improves code re-use opportunities and enables the developer-designer workflow as well as the implementation of re-usable components.

Core development technologies (but not limited to):

 - [JADE][JADE] - a preprocessing language which speeds up the creation, formatting and debugging of markup (HTML).
 - [LESS][LESS] - a preprocessing language which rapidly speeds the development of stylesheets (CSS) with the usage of functions and variables.
 - [KNOCKOUT][KO] - primarily is utilized for organizing script functions and events through Knockout components. Which are designed to be reused through the application and even other application because they are so loosely coupled with the application core engine.

#### Important!
The master branch of this template is a growing evolution of this template.  More importantly, this template was designed to be used by cloning the branches of this project.  The branches are "stages", like points in time, and were never meant to merge back in to the master branch.  Furthermore, a branch can be cloned and have its repository removed making it a brand new project and already have the files as a starting point. 

###<i class="icon-briefcase"></i> Components
Some of the major components included in this template:

 - [GULP][GULP] - In one big swallow, Gulp takes all development assets, streams them, compiles them, shrinks them, combines them and spits them out production ready. A quick insight to what GULP can do is packed into this [GULP Presentation][GULPPRESENTATION] by Eric Schoffstall.
 - [KNOCKOUT][KO] - a JavaScript library which focuses on assisting in creating rich, responsive displays and editor user interfaces while providing  a clean underlying data model. Based on the [MVVC][MVVC] software architectural pattern, sections of UI requiring dynamic updates, like changes that depend on the user’s actions or when an external data source changes, Knockout assists the developer in implement these features more efficiently. In the [Knockout documentation][KODOC], extremely helpful tutorials and examples are provided to jump start the learning process.
 - [REQUIREJS][REQUIRE] - is simply put as a JavaScript library file loader for application modules and components. It features an optimizer script (usually executed in Node.js) that optimizes modules by declaring their dependencies which improves the speed and quality of the entire application code. 
 - [JQUERY][JQUERY] - a feature rich JavaScript library which focuses on document traversal and manipulation.
 - [VELOCITY][VELOCITY] - the alternate animation library to jQuery's animation module.  Velocity is faster, lighter and virtually memory leak free (in the correct usage)
 - [FONTAWESOME][FONTAWESOME] - using images for web development is nearly a thing of the past, especially when it comes to icons.  Font Awesome provides an outstanding source for most all your web design needs without the bloat of images hogging up bandwidth.

###<i class="icon-attention-circled"></i> Install Requirements
This application template is built in Node.js, so you must have an installation of Node.js which can be downloaded on the [Node.js site][NODEJS]. Additional modules that are required and used by Node.js will also need to be installed (globally) by Node Package Manger (npm):

####Install Global Packages
This allows gulp and bower commands to be run from the command line in any directory.  The `sudo` command is added but may not be necessary, depending on the local machine user permission configuration.  
```bash
# Install Gulp globally

sudo npm install -g gulp
```
```bash
# Install Bower globally

sudo npm install -g bower
```
#### Local Packages
Local packages are automatically installed when the command for building the entire template's assets and components, so there is no need to install them individually.   The dependencies and versions of each are listed in the `package.json` file.


###<i class="icon-flag-checkered"></i> Build Instructions
#### Create  Project Folder and Navigate Command Line Prompt
```bash
# Make a new directory for project

mkdir projectname
```
```
# Navigate to the newly created project folder

cd path/projectname
```
#### Clone the Project / Project Branch
```
git clone -b branchname https://git@github.com/quickstep25/myproject.git
```
#### Install Local Package Dependencies and DevDependencies and Stream Files via Gulp
All tasks are done and preconfigured in the `gulpfile.js` script.
```bash
# Using the SUDO command here should not be necessary.

npm install
```
#### Web Server Configuration
Two directories are contained in the `frontend` section, `src` and `dist`.  The files contained within the `dist` folder have been compiled and minified, so when setting up a web server, use this path for a more production ready environment.  The `src` folder can be the document root as well, but should be considered as the testing platform, where the files are not combined nor minified, viewing the web pages from this directory is more desirable and helpful when debugging any issues.

###<i class="icon-cog"></i> API

#### Editing Files
All of the files outside of the `_assets` folder are either post-processed files or pre-existing files (like documents and images).  This means, normally, you shouldn't and should have no need to change any of those files (images and documents being an exception) because when the compiler is run again, those files will be overwritten after the compilation process completes.  

You will want to make any and mostly all edits to the template by accessing the files inside the `_assets` folder.

#### Processing Edits
After the initial install of the global and local packages through npm, there is not a necessity to re-run the `npm install` command again unless local packages need updates or issues have occurred within.  

After edits are made to the code base in the `_assets` folder you will need to compile and process the edited files.  In the `gulpfile.js` file, each compile and process action is a `gulp.task` but you won't have to worry about figuring out which task does what process.   

A catch all `gulp.task` is defined in the script and is what is used to recompile and reprocess the code each time edits are made. It is the default task in the `gulpfile.js` and is executed simply by:
```
gulp
```

#### Monitoring File Modifications
After installing the template successfully, re-compiling and reprocessing code is even easier than mentioned above.  No need to worry about what tasks are running nor do you have to process all files each edit.  Special `gulp.task` were created to monitor all the asset files and run the appropriate task and any dependencies that task might have each time a file is edited and saved.
```
gulp watch
```
#### Advanced
In the event you find yourself needing to process specific tasks within the `gulpfile.js`, first use any of these commands with caution and the knowledge that the flow of what tasks should run and in what order is already implemented into the default task.  However, the tasks that directly execute and roll-up to be the default task can be run with little fear.
##### Processing Images
```
gulp build_images
```
##### Processing HTML from JADE files
```
gulp build_html
```
##### Processing Style Sheets from LESS files
```
gulp build_css
```
##### Processing and Optimizing JavaScript files
```
gulp build_js
```
###<i class="icon-fork"></i> Contributing
Since this project template is very specific to the author's methods, habits, preferences, programming style and the initial intended purpose was uniquely directed at the author's needs, contributions are not really a good fit for this project.  However, that does not mean constructive suggestions on improvements would not be appreciated, they are always encouraged and welcome.

With that being said, `cloning` this project, rather than `forking`, is the ideal method when using this project as a template for your own projects.  

Hence, `pull requests` would probably never take place on this project.   

<i class="icon-heart"></i> Please, feel free to download this project and make it your own, fitting it into your  plan as a starting point for your next project. 

###<i class="icon-user"></i> Author
[Doug A. Hill][DOUG] : [quickstep25][DOUG]

###<i class="icon-hammer"></i> License
Copyright &copy; 2013-2015  [DHTS][DHTS] [www.dhtechnicalsolutions.com][DHTS] Doug A. Hill

These application software files (the "Software") are licensed under the Open Source [MIT License][MIT] Initiative (the "License"). By using this Software, you agree to the same terms, in the License, expressed by the Software author (the "Author"). Additionally, this Software includes software files supplied by other authors, (the "Third-Party Software"). This Software is providing the Third-Party Software to you by permission of the respective licensors and/or copyright holders on the terms provided by such parties, including those terms required in any Third-Party Software End User License and Agreements. The Author expressly disclaims any warranty, liability or other assurance to you regarding the Third-Party Software.

[GULP]: http://gulpjs.com/
[GULPPRESENTATION]: http://slides.com/contra/gulp#
[KO]: http://knockoutjs.com/
[KODOC]: http://learn.knockoutjs.com/
[REQUIRE]: http://requirejs.org/
[MVVC]: https://msdn.microsoft.com/en-us/library/hh848246.aspx
[JQUERY]: https://jquery.com/
[VELOCITY]: http://julian.com/research/velocity/
[FONTAWESOME]: http://fortawesome.github.io/Font-Awesome/
[NODEJS]: https://nodejs.org/en/
[LESS]: http://lesscss.org/
[JADE]: http://jade-lang.com/

[MIT]: https://opensource.org/licenses/MIT
[DHTS]: http://www.dhtechnicalsolutions.com
[DOUG]: quickstep25@users.noreply.github.com
