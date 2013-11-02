kamino
======

a node.js powered cli for cloning all your repos from Gitlab

This will clone all the repos that you have access to based on the Gitlab API.  All projects inside a namespace will be cloned indo `[dir]/[namespace]/[project]`.

> You need to provide your API token to your Gitlab instance. It can be found at http://your_gitlab_ip/profile/account

# usage

```
npm install -g kamino 
kamino clone --host 192.168.1.1 --token QVy1PB7sTxfy4pqfZM1U --dir ~/mysrc
```
