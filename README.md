# Rentals web application

Real estate listings advertising web application:
- Microservices-based built using Node.js, ReactJS and MongoDB, which
consist of multiple services like gateway, property-management and an
hosting service for managing media and uploading images to Amazon S3.
- CRUD user interface
- Allows different options of search such as ranged values or free text.

*You can see attached screenshots from web application in "screenshot rentals web application" folder

*You can see attached the architecture design Client & Service  

Todo List:
1. Change the application design client with context API or Redux.
2. Change all API requests to gateway-service
3. Finish remove and edit apartments - image feature
4. Add sign-up and login form
5. Enable adding apartment title and description
    - Enforce user to add a title.
    - Title max. 200 characters.
    - Description max. 200 characters.
    - Show the user how many characters were left while typing.
6. Enable apartment check-in date
   - When a user adds a new flat, show him an option to add a check-in date
   - Show the user check-in button with date picker.
   - Research what is the best data type (performance-wise) to save the check-in date in DB.
7. Add a check-in search filter
8. Add autocomplete search
