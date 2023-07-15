## Trello Clone
This project provides a basic implementation of Trello.

## Questions
1. If a user can create and edit stages for a particular board. For example instead of Open > In Progress > Done if they want the stages of their task board to be Read > Working > Reviewing > Completed
-  This can been implemented with the help of state management using redux.

2. If users can comment on task

-  A similar approach can be taken to implement commenting on tasks as we do with the task text. By adding an additional field to the task's state to store comments, we can manage and display them as needed.

3. How will you do error handling?

- We can define error boundaries as components which can catch errors anywhere in their child component tree, log those errors to the console, and display a fallback UI instead of the component tree crashing.
