# Gather
Bringing people and data together to solve the urban sanitation crisis. http://gatherhub.org/

# Some technical background for the first year 
* up to 12k points (toilets) 
* data comes from different sources and will be cleaned up and uploaded manually
* up to 20 users
* some other small geo databases
* the app must work on 5 years old computers in areas with limited internet. 

# Architecture
```
TODO: better diagram
```

## Firebase authentication
The app can authenticate users previously created manually by the administrator. Once the user has authenticated, its information is cached in the browser. So the app will see him/her as logged in even if there is not network.

## Firebase Storage
The geo data are saved in GeoJson format in Firebase Storage. Only authenticated users have access to it. The data is cached in the browser so the app will continue to work offline.

## Firebase Hosting
The app is a single page application hosted in Firebase CDNs.

## HTML + JS
The site is in github as it is deployed. IE: it doesn't have a build process. 
The kick off file is `index.js` loaded from the `index.html`. It loads all the dependencies and executes `common\init.js` which initializes some commponets including `ReactJS`

## sw-toolkit
It is used to cache resources via service workers.
