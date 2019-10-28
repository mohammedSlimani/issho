# Architecture
## Key Challenges, Architectural Properties
- Modularity: We want to be able to work in a very distributed environement. 
- Human-Computer Interaction: We will have A WEb App and a Mobile App. 
- Scalability: WE want to interact to user needs in the future and change the app as the users see fit.
- Performance

## Overall Architecture:
Event-Driven Architecure: It is the best one for our needs for the following reasons:
- It forces the usage of components.
- It splits the components in a logical way.
- It gives a very good control over the data flow => Flexible
- It is open for scalability

## Architectural Style:
- Server/Client
- It is an abvious choice to make as we have two different clients that will use the same server. 

## Architectural Design Pattern: 
- Making new "Events" in our App is like a messaging pattern, so it is logical to choose the [Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish–subscribe_pattern).
    - It has loose coupling
    - and affords scalability

## Design Patterns:
- Factory Design Pattern: the "Event" are going to be Generated following this pattern.
- ...

##  Technology Choice:
- [Docker](https://www.docker.com): Each Component will be independently deployed!
- [kubernetes](https://kubernetes.io): To group the components into logical units. 
- [Kafka](https://kafka.apache.org): It provides the best data flow control! 
- [NodeJs](https://nodejs.org/en/): The App is input/output intensive, This is the best technology to use.
- [FireBase](https://firebase.google.com): The fastest way to make push notifications
- [Angular](https://angular.io): For the WebApp.
- [NativeScript](https://www.nativescript.org/): To reuse the webapp code to make a mobile app.
- [Python](https://www.python.org): For the AI recommondation system.
