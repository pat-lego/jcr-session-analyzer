# Session Analyzer

This simple to use JCR Session Analyzer allows users to review AEM specific JCR Session Data in order to understand what users are currently logged into the Oak repository.

## How to use

1. Make sure to have nodejs installed, I tested this with NodeJs v14.18.1. 
2. Download the session data from AEM by going to http(s)://serverName:serverPort/system/sling/monitoring/mbeans/org/apache/jackrabbit/oak/SessionStatistics.tidy.1.json.
3. Run the following command `node index.js /path/to/the/downloaded/session.json`

## Understanding the result

The result will be a JSON file that contains 3 sections

1. numSessions            -> The total number of open sessions
2. sessionNames           -> The name of all the users who opened the session 
3. userIdSessionCount     -> An inverted object mapping the users to the sessions so that we can see how many sessions each individual user has opened

## Contributor

Patrique Legault