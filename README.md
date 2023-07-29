# Urgent Flight Searcher

This is a web application that allows you to search for the cheapest flight available for one person between two airports for the next day.

## Description

The home page displays a form with five text fields and a button. The text fields allow you to enter the IATA code of the origin and destination airports respectively. The form can only be submitted if both fields are 3 characters long.

The application assumes that the flight is for one person and that the travel date is the day after the current day. When submitting the form, the application makes a request to the Amadeus API to obtain the corresponding results. Once the results are obtained, the application extracts the information of the cheapest flight and displays it on the page below the form. In case of any errors, such as non-existent airports, missing flights, connection problems, etc., the application will report the error on the screen.

You can perform multiple searches with different airports to find the cheapest flight options. Explore and discover the best options for your next trip!

## Technologies used

The project was developed using the following technologies:

- JavaScript
- HTML
- CSS
