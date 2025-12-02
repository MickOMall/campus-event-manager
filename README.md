# campus-event-manager

A simple web application to manage campus events. Users can create, view, edit, and delete events, as well as sort them by the order they were added or by event date.  

# Team members:
Michael O'Malley  
Isaac Scaffer-Neitz  
Andrew Loniewski  
Hayk Grigorian  

# Tools/Frameworks 
- JavaScript  
- Node.js  
- Express.js  
- EJS  
- MongoDB + Mongoose  
- method-override  
- body-parser  
- dotenv  
- nodemon (for development)  

# Set up and Run
1. Download the files into a main folder
2. In your terminal ensure that mongoDB community version@7.0 is running
3. Make a connection to a mongo url in the .env file (MONGO_URI=mongodb://localhost:27017/campusEvents)
4. Install dependencies. npm install in the correct directory. (express, mongoose, ejs, body-parser, method-override, dotenv)
6. Go in the main folder and run the command npm start
7. Go to [localhost:](http://localhost:3000)

# Using the app
This app allows you to create, read, update, and delete different campus events inputted by the user. Simply fill out the fields and hit add event to create. You can read and sort the events under the "Sort Events" header then looking at the "Events" header. You can update and event by going to the event you want to edit and clicking edit. You can delete an event by clicking delete on the desired event. 
