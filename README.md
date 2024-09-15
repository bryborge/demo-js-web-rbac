# Demo: Role-Based Access Control

Role-based access control (RBAC) is a widely used methodology for managing user-permissions within an application or
software ecosystem.  At a high-level it assigns roles to users, with each role granting a specific set of permissions.

This project demonstrates the functionality of an RBAC system implemented in NodeJS and React using the server/client
model. It is simple by design and intentionally leaves out additional authentication and authorization features in order
to highlight the fundamentals of RBAC. These additional features include but are not limited to:

* Password and session management
* Token refresh and token blocklisting
* Multifactor authentication and Bring Your Own Identity (BYOI)
* CORS and CSRF mitigation
* Rate limiting
* Email and other notification features to streamline security and identity verification
* Audit logging
* GDPR compliance

Again, this is intentional. Each of these topics is deserving of it's own in-depth demonstration and are simply out of
scope for the purposes of this exercise.

## Architecture Overview

```sh
+--------------------+       HTTP Requests      +--------------------+     Database Queries     +-------------------+
|                    |  <-------------------->  |                    |  <-------------------->  |                   |
|     Client         |                          |     Server         |                          |      MongoDB      |
|  (React Frontend)  |    API calls (login,     | (Node/Express API) |   Query/Store user data  |     (Docker)      |
|                    |   register, etc.)        |                    |                          |                   |
+--------------------+                          +--------------------+                          +-------------------+
```

### Web Server

The web server is a simple json api web server via `express`. It's the backend that handles authentication,
authorization (RBAC), and manages the requests from the client. It connects to MongoDB to store and retrieve user data.
It uses JWT for user authentication and role-based access control.

### Web Client

The web client application is a plain and simple React application via `create-react-app`. It is the user-facing
application that users interact with to login, register, view dashboard, etc. This sends HTTP requests to the server
using API calls.

### Data Store

The data store service used in this project is MongoDB, which is a document database (as opposed to relational or graph
databases). The service is spun up in a docker container via `docker compose`. The server communicates with MongoDB to
manage data (like user credentials, user roles, etc).

## Conclusion

There are many facets of authentication and access control in the wild, most of which has been listed at the beginning
of this document.  Role-based access control is fairly simple in concept and practice, making it a great solution for a
wide variety of applications.

### Pros/Cons

As with all things in engineering, RBAC has tradeoffs which will be discussed in this section.

| Pros | Cons |
|-|-|
| It scales fairly well -- you don't have to alter permissions at the user level for every single user. | It is a rigid structure that may require a sprawling list of roles that can become unwieldy over time. This is called "role explosion." |
| Separation of concerns and consistency as it aligns nicely with standard organizational structures. | By design, RBAC does not provide fine-grained controls, which will inevitably lead to emerging complexity if that level of control is needed later on. |
| Security and compliance -- this methodology follows the principle of least privilege when executed correctly. | Role heirarchies where one role inherits the the permissions of another can and will lead to confusion. |

### When to Consider RBAC

When the use-case is fairly simple (few roles to consider) and there is reasonable confidence that the need for
fine-grained access rules for a given system will not emerge, RBAC is a solid choice. It's structure aligns well with
most organization structures which makes RBAC simple to reason about inside and outside of the engineering department.

This paradigm is less desirable when complex or exceptionally high security environments with strict policies are
mandatory.

### Alternatives

* **Attribute-Based Access Control (ABAC)** - Where access control is based on attributes that are tied to users (such
  as "department" or "job title"), resource (like "file type" and "sensitivity level"), and environment/context ("time 
  of day" or "geolocation").

* **Mandatory Access Control (MAC)** - Where security is paramount and there is a central authority to manage access
  based on classification.

* **Poliy-Based Access Control (PBAC)** - This control system often borrows from several other types of systems to offer
  a more flexible and scalable solution.

## Additional Resources

*   [Computer Security Resource Center](https://csrc.nist.gov/glossary/term/role_based_access_control)
    - High level overview and links to original documentation provided by the Committee on National Security Systems.

*   [Auth0 "What is RBAC"](https://auth0.com/docs/manage-users/access-control/rbac)
    - High-level and vendor-specific overview of RBAC within the Auth0 ecosystem.

*   [RedHat "What is Role-Based Access Control"](https://www.redhat.com/en/topics/security/what-is-role-based-access-control)
    - A thorough exploration of RBAC with respect to application in automation systems.
