# Named Entity Recognition (NER)
This Named Entity Recognition (NER) application allows users to label and categorize text efficiently. It is particularly useful for processing transactional data by identifying key entities such as persons, organizations, locations, dates, and more.

![image](https://github.com/user-attachments/assets/3a4dbeea-38b7-4bde-a2f7-09b3066ec97f)

Key Features:
- Upload & Process Transactions: Users can upload .txt files containing transactions, and the system will automatically segment and prefill text for labeling.
- Interactive Labeling: Assign labels by highlighting text and selecting categories like Person, Organization, Location, and Date.
- Transaction Navigation: Move between transactions using previous/next controls with a built-in progress indicator.
- Entity Preview & Management: View labeled entities in a structured format, remove assigned labels, and reset if needed.
- Transaction Overview: A modal view allows users to browse all transactions in a structured table.
- Export Functionality: Download labeled data for further processing.
- Minimal External Dependencies: Built using an in-house entity recognizer with minimal reliance on external libraries.
- User-Friendly Interface: Features such as help indicators, notifications, and a clean UI enhance usability.
- This tool is designed for efficiency, making it easy to process and analyze large transaction datasets while maintaining flexibility in entity recognition.

### Screenshots
<img width="1613" alt="image" src="https://github.com/user-attachments/assets/8178d2b5-558a-44e8-b100-48aaac826968" />
<img width="1577" alt="image" src="https://github.com/user-attachments/assets/2b04d684-298a-4c68-8dea-0fe30305ba19" />
<img width="1638" alt="image" src="https://github.com/user-attachments/assets/45a60d93-6bb4-4e05-8057-1b4088998f71" />
<img width="1576" alt="image" src="https://github.com/user-attachments/assets/349b9dee-8cf5-49cc-8b57-77ffd18a3305" />
<img width="1598" alt="image" src="https://github.com/user-attachments/assets/cdb2f71a-9ecc-4961-b6d4-27db20bd68fa" />

## Getting Started

- Clone this repo: `https://github.com/nayemalam/named-entity-recognition.git`

```bash
cd named-entity-recognition
yarn
# or
npm i
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note
- Architecture implemented with proper file structuring
- UI and logic implemented (no storing of values for now - but can be)
- Some other nice features implemented: 
  - Help icon
  - See all transactions in a nice table
  - Pagination to view each transaction
  - Progress indicator
  - Notification manageer
  - Preview selected labels
  - Remove assigned label
  - export functionality, add custom label
- Tried my best to not use external libraries instead make an in-house entity-recognizer
- Built with Next.js, React, Redux + Redux Toolkit, styled with SASS.

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
