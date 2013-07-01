HN sorted Job Thread
====================
The monthly Who's Hiring thread on Hacker News is an excellent source of job opportunities for like-minded nerds and geeks. Unfortunately, users do not have a choice in how HN sorts the comment threads so its interface is not ideal for job seekers who would rather not miss any comments.This quick hack is an attempt to solve this by displaying these comments in the reversed order of their creation.
  
Additional features to make job hunting easier:  
* Shows only top level comments where the jobs usually, if not always, are  
* Keyword filtering  

You can find it running live on [GitHub](http://nizhu.github.io/hn-jobs/)  

To build it yourself, first install nodejs, grunt and bower.

Install the libraries with bower and npm  
```shell
    npm install
    bower install
```
And run  
```shell
    grunt
```
TODO
====
Some sort of automation to get the thread ID  
Tests if I have too much time or this gets some usage  
Refactor the main controller -_-
