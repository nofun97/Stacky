# Skill Tree
Skill Tree is a platform that connects skill seekers with each other. We aim to facilitate meaningful interactions in local communities through encouraging learning together and helping each other grow.

## Installation
Use the package manager [npm](https://www.npmjs.com/) to install this app

`npm install`

`npm run client-install`

`npm run start`

## Core Functionalities
Our core functionalities that will be highlighted are as of follows:

- Profile (This functionality is mainly describing how will the user interact with the app):

  - Log in
    - View  ([Login.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Login.js))
    - Route (/login)
    - Controller (req,res)
    - Models (User)
    - [Client Route](https://skilltree-stacky.herokuapp.com/login)

  - Sign up 
    - View ([Signup.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Signup.js))
    - Routes (/register)
    - Controllers (userController.registerUser)
    - Models (User)
    - [Client Route](https://skilltree-stacky.herokuapp.com/signup)

  - Viewing your profile
    - View ([Profile.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/Profile.js))
    - Routes (/user/:id)
    - Controllers (userController.findUserById)
    - Models (User)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/profile)

  - Editing your profile
    - View ([ProfileEdit.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/ProfileEdit.js))
    - Routes (/user/:id, /skill)
    - Controllers (userController.findUserById, skillController.findAllSkills)
    - Models (User, Skill)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/profile_edit)

- Appointment System (This functionality is mainly describing how users will make appointments and how to manage them)
  - Searching users 
    - View ([Search.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/Search.js))
    - Routes (/users, /skill)
    - Controllers (userController.findNUsers, skillController.findAllSkills)
    - Models (User, Skill)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/search)

  - Filtering users (based on skills)
    - View ([Search.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/Search.js) & [FilterDrawer.js](https://github.com/nofun97/Stacky/blob/master/client/src/components/FilterDrawer.js))
    - Routes (/users, /skill)
    - Controllers (userController.findNUsers, skillController.findAllSkills)
    - Models (User, Skill)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/search) 

  - Viewing other users profile
    - View ([OthersProfile.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/OthersProfile.js))
    - Routes (/user/:id)
    - Controllers (userController.findUserById)
    - Models (User)
    - [Client Route](https://skilltree-stacky.herokuapp.com/user)

  - Creating appointments with other users
    - View ([CreateAppointment.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/CreateAppointment.js))
    - Routes (/appointment)
    - Controllers (appointmentController.addNewAppointments)
    - Models (Appointment)
    - [Client Route](https://skilltree-stacky.herokuapp.com/user/create_appointment)
    
  - Seeing appointments
    - View ([AllAppointment.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/AllAppointment.js))
    - Routes (/appointment/approve/:id, /appointment/:id, /appointment)
    - Controllers (appointmentController.approveAppointment, appointmentController.deleteAppointments, appointmentController.findAllAppointments)
    - Models (Appointment)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/appointments)
    
  - Accepting and rejecting appointments
    - View ([AllAppointment.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home/AllAppointment.js) & [AppointmentExpandable.js](https://github.com/nofun97/Stacky/blob/master/client/src/components/AppointmentExpandable.js))
    - Routes (/appointment/approve/:id, /appointment/:id, /appointment)
    - Controllers (appointmentController.approveAppointment, appointmentController.deleteAppointments, appointmentController.findAllAppointments)
    - Models (Appointment)
    - [Client Route](https://skilltree-stacky.herokuapp.com/home/appointments)

- Extra Features (This functionality is additional extra which supports the app)
  - Verification
    - View ([VerificationFail.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/VerificationFail.js) & [VerificationPass.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/VerificationPass.js))
    - [Verification Fail](https://skilltree-stacky.herokuapp.com/verification/fail) 
    - [Verification Pass](https://skilltree-stacky.herokuapp.com/verification/pass)

  - Guidelines
    - View ([Guideline.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Guideline.js))
    - [Guideline](https://skilltree-stacky.herokuapp.com/guideline) 

  - Page not found
    - View ([PageNotFound.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/PageNotFound.js))
    - [PageNotFound](https://skilltree-stacky.herokuapp.com/page_not_found) 


## Extra Details

To view the complete routes for the app, it can be viewed in [app.js](https://github.com/nofun97/Stacky/blob/master/client/src/App.js) and [home.js](https://github.com/nofun97/Stacky/blob/master/client/src/pages/Home.js)