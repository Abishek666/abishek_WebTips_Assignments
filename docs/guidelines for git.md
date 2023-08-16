#
# 🔆 Guidelines for Branch Name & Commit Messages 
⬇️The guidelines that must be followed while creating new branches and committing changes in git are given below.

#
## 🌠 Naming Convention for Git Branches
▶️ Each branch name should be in the format given below: 

&nbsp; &nbsp; &nbsp; &nbsp; (**Type of branch**)-(**Module Name**)-(**Specification like Task1/Task2 etc**) 

▶️ The **main** branch and **develop** branch are exceptions to the branch naming rule. 

### 💠 Types of Branches:
- _`feature`_ or _`feat`_- Created when we are developing a new feature from the develop branch.

- _`bugfix`_ or _`fix`_ - Created when we need to make the minimum set of changes to a released build required to fix a bug.

- _`improvement`_ - Created when we need to improve on the code quality, performance optimizations, Documentation Enhancements, User Interface Enhancements etc.

- _`library`_ - It is rarely used in the case of Library Integration, Library Updates, Custom Modifications, Version Control.

- _`prerelease`_ - It allows to publish releases with a pre-release version.

- _`release`_ - Represent a complete feature set. (The only commits on the release branch are for bug fixes and important chores.)

- _`hotfix`_ - Created when we need to quickly patch production releases.

### 💠 Module Name:
This refers to the name of the language used such as:
- _`HTML`_ 
- _`CSS`_ 
- _`JavaScript`_

### 💠 Task Specification:
This refers to the name of the task such as: *T1001*, *T1002* etc 

### 💠 Example:
Name of branch for first task in HTML : _`feat-html-t1001`_   \
Name of branch to correct some bugs in first task in HTML: _`bugfix-html-t1001`_

#
## 🌠 Commit Message Format
▶️ Each commit message should be in the format given below: 

&nbsp; &nbsp; &nbsp; &nbsp; (**Type of Commit**) : **Commit Message Description** 

### 💠 Types of Commits:
- _`feat`_-  adding a functionality
  
- _`fix`_ - bug fix commit  

- _`refactor`_ - refactor the existing working code  

- _`docs`_ -  changes to documentation 

- _`style`_ - formatting, missing semi colons, etc; no code change 

- _`test`_ - adding missing tests, refactoring tests; no production code change
  
- _`chore`_ -  updating grunt tasks etc; no production code change

- _`perf`_ - for performance improvements. Such commit will trigger a release bumping a PATCH version.

- _`ci`_ - changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 

- _`build`_ - for updating build configuration, development tools or other changes irrelevant to the user 

- _`revert`_ - reverts a previous commit 

### 💠 Commit Message Description:
Uses the imperative, present tense: “change” not “changed” nor “changes” 

### 💠 Example:
Example: _`feat`_ : Add animations to buttons 




