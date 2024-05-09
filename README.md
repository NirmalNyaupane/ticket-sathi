
## Background

“Ticket Sathi” is my college project which is a web-based application that makes it easier and efficient to manage the events. With the help of the application organizers can create, promote, monitor, and sell tickets of an event online. The admin of a system can approve organizer’s identity, events and charge commission against organizers for an event. Users can use the application to view upcoming events, and buy tickets for these events.


## Tech Stack
**Backend**: Node, Typescript, Express, Typeorm, graphql \
**Frontend**: Nextjs, Typescript, React, Tailwindcss, shadcn, apollo client for graphql\
**Database**: Postgresql, redis (for caching and pubsub)
## Features

## User side
A home page is show for the users where user can see all the listing events, search events and filter events \
![home-page](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgq3FE5UW-kx-fsILzq77MyR_O6-iYIhW4t1ukVghGmj8vGBexftsufeGAb_VKN-DKIvHle9UQZZwSXP9FdSEl3HKsG7nhz8vYnfBUAXTA5L3ksuYL0ssLZGETewqp3Xt8d605EMll7qn8289djhqr25C5-GKj66qy6vUIisod42BKw7Pn6Y0Yo7bJW9JBb/s3871/screencapture-localhost-3000-2024-05-07-17_46_58.png)

Once user clicked on some particular events the next page would be 
![event-page](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBEOjf7998ltoqKprwcB49uXPWTVJtHmoBEc-lABW9ujLTHLufhxla9bykB-tWr35jf8H06JLnzKV7aa7sqKh2kwl698YxKSRVeXeFai8jvWxy4oDOuCS1R8HBKYkClqo_PB5M7WPZ_W2dPQD_S8D8hQf8n2GrFmLm6I1mv1g6706oxAlbM_hmAuVArbF_/s2097/screencapture-localhost-3000-event-Golden-Night-2024-05-07-17_51_02.png)

where user can buy a tickets for an event. *User need to login for ticket purchase* 

**User can provide feedback for a events**

**User can update profile**
![profile](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTP2kxa2za3_0lMxQtvIHBROnGeAUAnusv7lmtdg12eb11ZqK47WsEoXoCNGwvJUFEJyAIRWbwa5w7VfZfK5s65WxVBw5EUtrolj2KIVrcre0LAjf2t6Ipg4YLfHEmYA7XMAqxC9-zJJ5QYek3KCYnFsJZDoTI-uFKqj6_kOmQGzX_Q4bUQ5pTA1K-ESEu/s1920/screencapture-localhost-3000-user-my-account-2024-05-07-17_52_03.png)

## Organizer sides
**Organizer Register**: Organizer can register by submitting necessary information. Once organizer register, it will show in the admin pannel and admin approved/reject organizer based on document and other information. \
![organizer-register](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgdB-S8WQM8I8H0TdxVKppGJ-9Ma-C4ec5QcFSB0dvuVE5jU7-t6qt9eHR_RSHxYvIVQjiL4Y8ClxdOhJFKn0AWB-3IevV8hz8Javz4VscLrxMFSflwcymjtIFNnhfXIjGITULdb_INBUgOzzBbwlyz5EFRKh6rpashR4jgub33RZeJhHZ1hCX27iGYe4Lv/s1920/screencapture-localhost-3000-organizer-auth-register-2024-05-07-18_10_58.png)

**Event Category**: Organizer can create category for managing events. Organizer can update and delet category after creation \. 

**Trash features**: The deleted events will be stored in the trash for five days. Organizer can restore and permanently delete from trash if he doesnot do any things trash items will be automatically permanently deleted after one months \.

**Event creation**: A organizer can create events. After creating events it needs to be approval from admin for publish. Organizer can create and update \.
![event-create](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiaHphW5ib9zw5fzj6DVpHSMUdR70RbN-eSbAWlWUt6DTaOoErGB3qrvR6IJdZszOIDf4swE8a9cgQXmmf-lv0hsSrab6R0V1WIsY0xKglMueyUpfhFYWZ6snj8vZHG1ZICTB7kQXhaGu961iNV3n0YDpfFuN8j-gGeqrMCH96x3UVIAEkWSWF6eGVnsZc/s1920/screencapture-localhost-3000-organizer-dashboard-event-create-2024-05-07-18_21_24.png)
\
![event-view](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNuaZXPdQGrmxxNatou-6RwTJhO9hmuMxlM941qnDVKjPFEKcE9ChoTJ0CFdu8VexSMThHGV59mwaN63OzhpmH3viMX_wf4WLEoAuMWRzhoyOR9ILH_lCuHXX1fYlU_z8XpECje1C_cVvScrZMPtDdTcgVlk2z03S8fX4B_mmURkJ7-pQiv7BWPoKjEXHc/s1935/screencapture-localhost-3000-organizer-dashboard-event-view-2024-05-07-18_26_43.png)

**Ticket creation**: Organizer can create tickets for an events \
**Coupon**: Create a coupon for tickets

## Admin side (In progress)
**Approved/reject organizer** \
**Approved/reject events** \
**Create commission against organizer** 
