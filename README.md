# Project Name
> Socaly-Frontend

## Table of contents
* [General info](#general-info)
* [Installation](#installation)
* [Acknowledgements](#acknowledgements)
* [License](#license)

## General info
Socaly-Frontend is the frontend application for Socaly, a Reddit-inspired social media platform. It's developed using Angular and TypeScript.

## Installation
To set up the project locally, follow these steps:
1. Clone the Repository:
```bash
git clone https://github.com/adampawelczyk/Socaly-Frontend.git
```
2. Install Dependencies
* Ensure you have Node.js installed. Then, run:
```bash
npm install
```
3. Firebase Configuration
* Go to [Firebase Console](https://console.firebase.google.com/?_gl=1*15ugp7d*_ga*MTc4NjI4MzgxNi4xNzAxNzE4Njkx*_ga_CW55HF8NVT*MTcwMTcxODY5MS4xLjEuMTcwMTcxODc0NC43LjAuMA..)
* Create a new project
* In the left panel, navigate to Build > Storage
* Select "Get Started"
* Go to Project Settings
* Scroll down to "Your Apps" and select "Add Firebase to your web app"
* In the "Your Apps" section, copy the Firebase config
* Paste the config into src/environments/environment.ts as follows:
```typescript
const environment = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```
4. Run the Application
```bash
ng serve
```
* Access the app in your browser at http://localhost:4200/

## Acknowledgements
* [Tinymce](https://github.com/tinymce/tinymce)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Firebase](https://github.com/firebase/)
* [PrismJS](https://prismjs.com/)
* [Ngx-dropzone](https://www.npmjs.com/package/ngx-dropzone)
* [Ngx-webstorage](https://www.npmjs.com/package/ngx-webstorage)
* [Ngx-toastr](https://www.npmjs.com/package/ngx-toastr)

## License
This project is licensed under the [MIT License](https://github.com/adampawelczyk/Socaly-Frontend/blob/master/LICENSE) - see the [LICENSE](https://github.com/adampawelczyk/Socaly-Frontend/blob/master/LICENSE) file for details.
