# MySocialAPI

## Introduction

**MySocialAPI** is a web application that serves as a social network API, allowing users to share thoughts, react to friends' thoughts, and manage their friend list. The application uses **Express.js** for routing, a **MongoDB** database, and the **Mongoose ODM**. This API is designed to handle large amounts of unstructured data, making it an ideal solution for social networks.

## Challenge Overview

The challenge is to build a robust API for a social network web application. The foundation of this challenge is to understand how to structure and build an API effectively.

### User Story

As a social media startup, I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

### Acceptance Criteria

- The server starts successfully, and Mongoose models are synced with the MongoDB database.
- API GET routes for users and thoughts return data in a formatted JSON.
- API POST, PUT, and DELETE routes for users and thoughts function as expected.
- API POST and DELETE routes for reactions to thoughts and adding/removing friends work correctly.

## Walkthrough and Testing

To demonstrate the functionality of the API, a walkthrough video will be provided. The video should cover the following aspects:

- GET routes for retrieving all users and thoughts.
- GET routes for retrieving a single user and a single thought.
- POST, PUT, and DELETE routes for users.
- POST and DELETE routes for reactions to thoughts.
- Adding and removing friends from a user's friend list.

## Mock-Up

The challenge includes a series of API routes that can be tested in tools like Insomnia. The following animations showcase the API routes being tested in Insomnia:

- GET routes for returning all users and all thoughts.
- GET routes for returning a single user and a single thought.
- POST, PUT, and DELETE routes for users.
- POST and DELETE routes for a user's friend list.
- POST and DELETE routes for reactions to thoughts.

## Getting Started

### Models

**User**

- **username**: String
  - Unique
  - Required
  - Trimmed
- **email**: String
  - Required
  - Unique
  - Must match a valid email address
- **thoughts**: Array of _id values referencing the Thought model
- **friends**: Array of _id values referencing the User model (self-reference)
  - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

**Thought**

- **thoughtText**: String
  - Required
  - Must be between 1 and 280 characters
- **createdAt**: Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query
- **username**: String
  - Required
- **reactions** (These are like replies): Array of nested documents created with the reactionSchema
  - Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

**Reaction (SCHEMA ONLY)**

- **reactionId**: Use Mongoose's ObjectId data type
- **reactionBody**: String
  - Required
  - 280 character maximum
- **username**: String
  - Required
- **createdAt**: Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

### API Routes

#### `/api/users`

- **GET**: Get all users
- **GET**: Get a single user by its _id and populated thought and friend data
- **POST**: Create a new user
- **PUT**: Update a user by its _id
- **DELETE**: Remove a user by its _id
  - BONUS: Remove a user's associated thoughts when deleted.

#### `/api/users/:userId/friends/:friendId`

- **POST**: Add a new friend to a user's friend list
- **DELETE**: Remove a friend from a user's friend list

#### `/api/thoughts`

- **GET**: Get all thoughts
- **GET**: Get a single thought by its _id
- **POST**: Create a new thought (push the created thought's _id to the associated user's thoughts array field)
- **PUT**: Update a thought by its _id
- **DELETE**: Remove a thought by its _id

#### `/api/thoughts/:thoughtId/reactions`

- **POST**: Create a reaction stored in a single thought's reactions array field
- **DELETE**: Pull and remove a reaction by the reaction's reactionId value

## Walkthrough Video

A walkthrough video demonstrating the API's functionality will be provided alongside this README.

## Conclusion

MySocialAPI is a powerful NoSQL-based social network API that demonstrates the capabilities of Express.js and MongoDB. It is designed to handle large amounts of unstructured data and provides a robust foundation for social networking applications.
