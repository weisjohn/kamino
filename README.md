kamino
======

a node.js powered cli for cloning all your repos from Git(Hub/Lab)

This will clone all the repos that you have access to based on the Gitlab API.  All projects inside a namespace will be cloned indo `[dir]/[namespace]/[project]`.

> You need to provide your API token to your Gitlab instance. It can be found at http://your_gitlab_ip/profile/account

### usage

`npm install -g kamino`

##### github

Create [an access token](https://github.com/settings/tokens/new). Store that token (`~/.bash_profile`, `~/.extra`, etc.).

```
kamino --host api.github.com --token ddddc5e7e685ede0548b98d98fef99eb --dir ~/mysrc
```

##### gitlab

Find your access token from (e.g. gitlab.mydomain.com/profile/account).

```
kamino --host gitlab.mydomain.com --token QVy1PB7sTxfy4pqfZM1U --dir ~/mysrc
```

Optional flags are: 

 - `-s` for secure access (Gitlab only)
 - `-v` for verbose logging while cloning


### config

You can put your options in a config file `~/.kaminorc`

```bash
host=192.168.1.1
token=pJkyWhDPUXCtnvx6r9cZ
dir=/Users/me/mysrc
```