#
# WebTips Starter Repo 🌐💻
This will act as a starter repository for **WebTips** projects

#
# 🔗 Quicklinks
🔹[How to use this template repository?](https://github.com/solitontech/WebTips_Starter_Repo/tree/main#how-to-use-this-template-repository-) \
🔹[How to create a starter repo?](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/documentation.md#how-to-create-a-starter-repo-) \
🔹[How to create a worflow that runs unit tests for your repo?](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/documentation.md#how-to-create-a-worflow-that-runs-unit-tests-for-your-repo-) 

### How to use this template repository? 🏁

👉 Step 1: Create a new repository and choose the webtips_starter_repo as the template repository. \
👉 Step 2: Clone the created repository.\
👉 Step 3: Initialize the repository as a node project using the command: __npm init -y__ . \
👉 Step 4: This starter repo assumes that unit tests are written and run using jest. So, install jest using the command npm i --save-dev jest.\
👉 Step 5: Create all the unit tests inside the unit folder in the tests folder: 

![folder structure for tests](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/WorkflowSpecification/testFolder.png)

👉 Step 6: If your application does not have any jest tests, add this command to your package.json (for the workflow to pass when there are no tests):

![command to make the workflow run when there are no tests](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/WorkflowSpecification/noTests.png)

👉 Step 7: This starter repo assumes that all the end-to-end tests are written using playwright. So, follow the below given steps to initialize the project as a playwright project: \
&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 7.1: Run this command: __npm init playwright@latest__ to initialize the project as a playwright project\
&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 7.2: It will ask whether you want to continue with typescript or javascript. By default, it will take typescript. If your project uses JavaScript, give JavaScript option.  \
&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 7.3: The moment playwright is installed, it will also give some sample tests. It will ask where these tests should be. By default, all the tests will be in tests folder. Specify that the tests must be stored in a folder called acceptance inside the tests folder using this path: __./tests/acceptance/__ \
&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 7.4: When installing playwright, it will ask whether to create a GitHub Actions workflow. Give no for this option because the starter repo already has a workflow to run the playwright tests. 

&nbsp; &nbsp; &nbsp; &nbsp; ![Steps to follow while configuring playwright tests](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/PlaywrightTests/configurationSteps.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 7.5: After installing playwright, it will create a new folder called acceptance and add sample tests to it. So, delete the existing folder called acceptance inside the tests folder (that folder only exists in the template repo to show folder structure). Move the test inside the test-examples folder inside the acceptance folder and delete the folder called test-examples.

&nbsp; &nbsp; &nbsp; &nbsp; ![Image of file to be deleted](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/PlaywrightTests/testExamples.PNG) 

👉 Step 8: The code analyzer pipeline for this repo uses Prettier, EsLint, html-eslint plugin, eslint-plugin-jsdoc and Stylelint. In order to ensure that the pipeline doesn't fail, follow the below steps: \
&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.1: Run the following commands to install them as dev dependencies:

&nbsp; &nbsp; &nbsp; &nbsp; ![Steps to follow to install prettier and eslint](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/PrettierEsLintInstallation.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; ![Steps to follow to install html-eslint plugin](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/HtmlEsLint.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; ![Steps to follow to install stylelint](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/styleLintCSS.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; ![Steps to follow to install eslint-plugin-jsdoc](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintJsdocPlugin.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.2: Configure the eslint config.js file by running the command:

&nbsp; &nbsp; &nbsp; &nbsp; ![Configure the eslint config.js](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/eslintConfig.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.3: Give the following specifications: 

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 1](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep1.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; If your project has babel installed then you definitely need to choose the JavaScript Module option. If you are working on a project such as React, Vue, Angular e.t.c they all use babel so you need choose this option. The CommonJS option is meant for commonJS that has nothing to do with babel, maybe your nodejs project and any other javascript project. 

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 2](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep2.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 3](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep3.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 4](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep4.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 5](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep5.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 6](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep6.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 7](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep7.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 8](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep8.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; <img src="https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep9.PNG" width="650">

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint config step 10](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/esLintConfigStep10.PNG)

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.4: Add the following to the plugin section of the eslint.config.js file: 

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint.config.js](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/pluginsList.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.5: Add the following to the extends section of the eslint.config.js file: 

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint.config.js](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/extendsEslintConfig.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.6: Add the following to the override section of the eslint.config.js file: 

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint.config.js](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/OverridesConfig.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.7: Add the following to the rules section of the eslint.config.js file: 

&nbsp; &nbsp; &nbsp; &nbsp; ![EsLint.config.js](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/rulesEslintConfig.PNG) 

&nbsp; &nbsp; &nbsp; &nbsp; 🛡️ Step 8.8: Add the following to the script section of package.json: 

&nbsp; &nbsp; &nbsp; &nbsp; ![Script specification](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/ScriptSpecification.PNG) \
&nbsp; &nbsp; &nbsp; &nbsp; ![Script specification for CSS](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/assets/Images/CodeAnalyzer/scriptStyleLintCSS.PNG) 

👉 Step 9: After the above steps are complete, push to the main branch. 

## 📎 GitHooks:
Follow the steps in this file to set up githooks in your local repository: [GitHooks](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/gitHooks.md#git-hooks) \
Ensure that your branch names and commit messages follow this syntax: [GuideLines](https://github.com/solitontech/WebTips_Starter_Repo/blob/main/docs/guidelines%20for%20git.md#-guidelines-for-branch-name--commit-messages)

### 🔻 NOTE:
📌 For each assignment, create a new branch from the main branch. \
📌 After you are done working on an assigment, merge to the main branch. \
📌 When merging to the main branch, the code's unit tests and playwright tests will be run, the code will be analyzed for syntax errors and spacing using Prettier, ESLint, html-eslint plugin and stylelint. So, ensure that your code follows these standards for the workflows to pass. \
📌 If any of the tests fail or there is any error in the code, the branch will not merge with the main branch and the workflow will fail. \
📌 Create a new branch for each assignment.

### 🔻 CODE ANALYZER NOTES:
✔️ The HTML Linter used in the code analyzer pipeline here is the html-eslint plugin. There are other options that can be used such as htmlHint. \
✔️ The coding standard specified in the pipeline for Es Linting is "Standard". There are other options such as Google and AirBnb. \
✔️ The JS files variable and function names should follow Camel Casing for the pipeline to pass. The js files should also be properly documented through jsdocs comments.

### 🔌 RECOMMENDED VS CODE PLUGINS:
✨ Prettier (To format your code)\
🅰️ CSS Alphabetize (To arrange properties in alphabetical order in CSS files)\
📖 Document This (To generate documentation for JavaScript files)



