# WeRoad Tech Case

## ASSIGNMENT

We need to build a travels and bookings management system consisting of 2 pages,
one to manage travel and the other to manage booking.

### Travels

Travels should have some basic information like:

- name of the travel,
- description
- departure date
- return date
- picture
- price for a single person
- average user rating

Travels should be listed in a dedicated page with a table and some basic filters.

The user should be able to:

- Use a form to add a new travel
- Edit an existing travel
- Delete a travel

### Bookings

The bookings should hold those info:

- the related travel
- customer infos (name, email, phone number, age, gender)
- payment type (Credit transfer, Paypal, Revolut)
- eventual internal notes

Bookings should be listed in a dedicated page with a table

A booking can be created with a dedicated multi-step form (wizard):

- first step: search and select the related travel
- second step: fill the customer info in a dedicated form (name, email, phone number, age, gender)
- third step: select the payment type (Credit transfer, Paypal, Revolut) and optionally add some notes

NOTES:
The backend/API part can be mocked (no database, optional validation, just mocked data) and implemented in the way the candidate prefers, for example with nuxt server routes or a dedicated simple server.

For every other detail not explicitly written in this docs, the candidate can independently design and build the way they prefer.

## REQUIRED TECH STACK

- Vue 3 with composition API
- Nuxt3
- Typescript
- Tailwind

## TASKS

- [x] setup nuxt3 project
- [x] Simple Travel CRUD API
- [x] List Bookings API
- [x] Create Booking API
- [x] Install Tailwindcss
- [x] Create UI Components
  - [x] Button
  - [x] Form Field
  - [x] Form Input
  - [x] Form Select
  - [x] Checkbox Input
  - [x] Text Area
  - [x] Modal
  - [x] DataTable
  - [x] FormSteps
  - [x] ProgressBar
- [x] List Travels Page
- [x] Create/Edit Travel Form
- [x] Delete Travel Flow
- [x] TravelSelect
- [x] List Bookings Page
- [x] Create Booking Form

## DEVELOPMENT

### Install dependencies

```
  pnpm install
```

### Run dev server

```
  pnpm dev
```

### Seed Database

```
  pnpm db:seed
```

⚠️ The Database file is in `.nuxt/dev/dev.json`
