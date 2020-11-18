# Sticker Notes

App made for self development and to expand knowledge of huge React ecosystem.
I've used there a lot of currently using front-end technologies.
In Brief it's CRUD, where you can store your notes,
photos, edit and update them. App also has
authorisation with JWT Token, form's and validations where i used Formik and Yup.

### 💻 Panel
Simple panel which you can menage your notes

<img src="https://user-images.githubusercontent.com/57623368/99564075-44d6ea00-29ca-11eb-9e7e-38dfa498b2d1.png" width="90%"></img>

### 🔐 Login & Register
Auth page where you can create own account going through the multi step form

<img src="https://user-images.githubusercontent.com/57623368/99564083-47d1da80-29ca-11eb-8fde-0fe93fc5085b.png" width="90%">
</img> 

### 📑 Note
One of selected notes

<img src="https://user-images.githubusercontent.com/57623368/99564090-4acccb00-29ca-11eb-9962-e9aa2c09b38c.png" width="90%"></img>

### 📝 Edit
Modal for deleting or updating certain note

<img src="https://user-images.githubusercontent.com/57623368/99564094-4b656180-29ca-11eb-98c9-bfe44df668c9.png" width="90%"></img>




## 🔬 Technologies, libraries and description why I ve used them

- Create-React-App - used for basic boilerplate application

- Redux - for keeping data state's and also authentication state

- Hooks - for building functional components

- Strapi - Headless CMS for communicate with Front-End, storing data and keep info about users

- React-Router - used for creation detail view for every
  notes after opening and split view for favorites notes

- Styled Components - for styling every component and changing appearance or behavior depending on current state

- GSAP - for making couple animations and loading page after authorisation or when user is logging out

- React Loader Spinner - to notificate user during loading or getting data from server

- React Tooltips - for explaining user's meaning icons

- Axios - for making HTTP requests and communicate with server

- Formik - great library to creating complex forms, i used
  to making form for adding items and auth users

- Yup - very well connected library with Formik for creation
  validation for forms

- Moment - For displaying time when notes were created or updated

and couple more..

## 💣 Features

- Multi Step Form - complex form during creating new users also has progress step bar to inform user which step and how many left stay to finish registration

- Dropzone - complex input for adding files by clicking or drag and droping images

- Tooltips - description icon's meaning for users

- Searchbar - component which allows you looking note by typing word's

- CRUD - Simple. create, read, update and delete your item's

- Favorite notification - small circle where you can see how many note's you ve added to favorites

- New item bar - another huge component with form and validation when you put your data to create new note with image

- Authorisation - Creating, authenticate and logging out users

- Local Storage - keeping JWT Token in browser memory and checking if user is authenticated or not

- Animations - couple small animations with GSAP library

and more..

## 🚀 HOSTING & DEMO

Backend:

- Strapi (hosted by https://heroku.com)

Frontend:

- CRA (hosted by https://netlify.com)

Link to see DEMO app: https://sticker-notes.netlify.app/

### 🔐 Possibilities to sign in or sign up

If you want test app you'd have create your own account,
what's is realy simple and i really encourge you just go with multi
step form when app is running then you will redirect to home page app.

or

You can login with these data:
- login: testuser@testuser.com
- password: testuser123
