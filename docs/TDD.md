Technical Design Document

An overview of the project and its goals.
Implement an Event app that gives user a calendar
This calendar would be in a form of event fliers
The user would be able to scroll through the events as if it were a social media app. 
Our goal is to provide a safe and fun event app for Rhodes students to be exposed to different events around campus. 

A proposed design and implementation strategy.:brief overview for the project architecture.
What are the major physical components/systems? For an app, this may be the mobile client and any remote server architecture.
We are thinking of a mobile client with cross-platform capabilities. Anyone with a smartphone would ideally be able to download the app. 
If possible we would want a desktop version as well. 
Data (posts, profiles, login credentials) will be stored on a remote server.
What are the responsibilities of these systems?
The server must be able to handle requests from the client quickly and efficiently.
The client must be able to display data fetched from the server (posts/personal information).
The client must allow users to input different types of data (image, text, video, etc.) that will be stored on the server. 
The server must protect the user’s login credentials and personal data. 
Within these physical components, what are the logical components and their responsibilities? What subsystems do you anticipate building and what are their responsibilities?
Authentication: 
Handles registration and sign-in
Verifies user’s identity
Calendar: 
Allows user to keeps track of upcoming events
Feed: 
Shows posted events
Allows user to filter events
Allows user to interact with posts (like/add to calendar)
Profile: 
Stores personal data
Allows user to change personal data

A description of APIs/interfaces between components. What data is being exchanged between components?
Data that would be exchanged would be the event, the time, and the place that it would be occurring at
This data would also include a JPG or PNG file option that would be an image of the event’s flier 
A description of the data model of the application. What will be stored persistently? Where? What format will the data be stored in?
Data that will be stored persistently would include user information, such as student or organization status, password, and ongoing or recurring events in their personal calendar.
Data that will be stored and later erased includes event details, such as event name, date, location, and the event post itself. These pieces of data would be erased from the system after the event concludes.




A testing plan. How will the project be tested?
After the coding is complete we would initially post as a user on our devices and download the app. There would also be another member monitoring the site from the desktop point of view. 
Here we would make sure that the user would be able to see what we wanted them to see and to make sure that they are able to see posts and favorite posts.
An enumeration of any alternative designs that were considered.
An alternative design considered was allowing any user to post events in the application. This was rejected by our team after considering the potential risk of students being able to post whatever they want- parties being thrown in dorms, for example. Obviously only events that are Rhodes sanctioned should be posted, and so our team decided that organizations should have separate accounts, and only organization accounts should be allowed to post events.
An analysis of the technical dependencies of the project. If you are doing user authentication, will this be through a third party (e.g., an SSO provider like OneLogin/Google/Apple/etc.)? If you will be using a service to store data, which one? This should include a discussion of alternative dependencies.
The plan is to use our own platform and database. We’re not really sure yet if we are are gonna use third parties to help users sign in
For storing data, we were probably going to use a google database to store all the information from the users
Most of the data in the app would typically depend on the database from google and the real time user input when they post something in the app. 
An analysis of project risks (from a technical standpoint).
Data leaks
Data breaches
Inappropriate posts of events
Loss of database data
Virus from unknown source
A project timeline/implementation plan – what are the major milestones? When will they be achieved? What dependencies exist between components, and how does that affect planning?
For the most part, the components are not really dependent on each other, apart from user login/creation, as being a logged in user is necessary to access the other components. In this way, there isn’t really a strict timeline, as long as milestones are hit and everything is linked together in the end. Milestones would be:
User login and creation
Calendar creation
Profile page creation
Feed creation/ability to post implemented
Post interaction implemented- liking events, adding events to calendar automatically
Managing calendar implemented- adding events, deleting events, adding class schedule
Linking components together to create streamlined UI
