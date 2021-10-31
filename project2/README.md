# NodeJS ShuttleStop Tracker
This project was a little bit more ambitious than I thought it was going to be, so I think I am going to expand on the web front for project 3, 
and allowing the information to be displayed in the index.html file, as well as allowing the user to submit the variables directly, 
rather than just manipulating the code themselves. I am planning on using the alert() function to expand much more on the functionality of the script.

I ran into a lot of problems with figuring out asynchronous functions.

# What is it?
This is a NodeJS script that analyzes a specific UC shuttle stop and alerts you when its time to leave, when the bus is five minutes away, one minute away, and arriving. 
It runs a library called axios on the shuttle stops to grab the json data, and to look for the avg estimated time of arrival. 
It refreshes the data every 10 seconds. And when the if statement matches the one of the designated times, 
it outputs an additional message to remind you.

# How to use it?

1. Ensure you have NodeJS installed.
