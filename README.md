<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Playfair+Display&size=38&center=true&vCenter=true&width=850&height=80&duration=3500&color=2563EB&lines=ThinkX+Platform;Full+Stack+MERN+Quiz+Application;Secure+JWT+Authentication;Admin+%26+User+Role+Based+System;Interactive+Learning+Experience" />
</h1>




Designed and developed a Quiz Application using the MERN stack (MongoDB, Express.js, React.js, Node.js). Implemented RESTful APIs for quiz management, real-time scoring, and result analysis. Built a responsive React-based user interface with optimized backend services. Secured the application using JWT authentication and role-based access control.



## 🏠 ThinkX – Home Page

- The Home Page is the main landing page of the ThinkX MERN stack project.
- It is developed using React.js with smooth navigation using React Router.
- The navigation bar includes links like Home, About, Services, Register, Contact, and Sign In.
- The Hero section displays the tagline “Learn Through Every Question” to introduce the platform.
- Register and Sign In buttons are connected to the backend (Node.js, Express.js, MongoDB) for secure authentication.
- The page highlights key features such as quizzes, score tracking, and progress analysis.
- The footer section contains contact details, quick links, and developer information.

<img width="1899" height="1077" alt="image" src="https://github.com/user-attachments/assets/b8508c76-5c71-4941-8b1c-3cf34cafa57f" />
<img width="1898" height="867" alt="image" src="https://github.com/user-attachments/assets/26e13869-c703-4743-8bd2-9019bc4a2998" />


 <hr>

## 📖 ThinkX – About Page

- The About Page provides an overview of the ThinkX Quiz application and explains its purpose as an interactive learning platform.
- It describes how the platform helps users explore topics, test their knowledge, and receive instant feedback with detailed explanations.
- The page highlights key features such as a user-friendly interface, real-time scoring, and multiple quiz categories.
- It is developed using React.js components with a clean and responsive UI design for better user experience.
- This section builds trust by clearly explaining the project goals and how ThinkX supports students in exam preparation and skill improvement.

<img width="1898" height="1068" alt="image" src="https://github.com/user-attachments/assets/73450787-9533-42ff-8038-0e9dd84945a2" />
<img width="1900" height="247" alt="image" src="https://github.com/user-attachments/assets/8d8e327d-696c-4e54-b934-69e843acf107" />

 <hr>

## 🛠️ ThinkX – Services Page

- The Services Page showcases the main features of the ThinkX platform, including Interactive Quizzes, Daily Quiz Challenges, Timed Quiz Battles, and Topic-Wise Quizzes.
- It allows users to attempt quizzes, participate in daily challenges, test their speed with timed quizzes, and explore subject-based categories for focused learning.
- The page is developed using reusable React.js components with responsive card layouts, and each service button is connected to backend APIs built with Node.js and Express.js.

<img width="1898" height="1089" alt="image" src="https://github.com/user-attachments/assets/ed5dbbf4-abc4-440a-871a-323102be2f2f" />
<img width="1900" height="265" alt="image" src="https://github.com/user-attachments/assets/f9700d0f-2365-4964-bcc7-aebe4538dde9" />

 <hr>
 
## 📝 ThinkX – Student Registration Page

- The Student Registration page allows students or users to create a new account by entering their basic details such as name, email, password, date of birth, gender, and phone number.
- The form is developed using React.js and Formik for efficient form handling and state management.
- Form validation is implemented using Formik (and Yup) to ensure proper email format, required fields, password rules, and valid input data.
- On successful validation, the data is sent to the backend API built with Node.js and Express.js for secure user registration.
- User details are stored in MongoDB, and proper error/success messages are displayed based on the registration response.

<img width="1898" height="1033" alt="image" src="https://github.com/user-attachments/assets/1eae1c5c-7314-4368-8342-acef6cf964e2" />
<img width="1898" height="246" alt="image" src="https://github.com/user-attachments/assets/daa907ff-9dcc-42cd-9528-898bce553203" />

 <hr>

 ## 📩 ThinkX – Contact Us Page

- The Contact Us page allows users to send queries, feedback, or suggestions by filling in their name, email, phone number, and message.
- The form is built using React.js with proper validation to ensure all required fields are correctly entered before submission.
- On submitting the form, the data is sent to the backend (Node.js and Express.js) for processing, and appropriate success or error messages are displayed.

<img width="1899" height="919" alt="image" src="https://github.com/user-attachments/assets/97fd98a2-5a66-435f-b0ba-b78992a43c7d" />
<img width="1901" height="244" alt="image" src="https://github.com/user-attachments/assets/340513e8-b1c7-4cdd-ad4d-26b3855bb020" />

<hr>

## 🔐 ThinkX – Sign In Page

- The Sign In page allows Admin and User to log in using email and password credentials.
- The form is built using React.js with Formik for form handling and validation of required fields.
- Password visibility toggle is provided for better user experience.
- On successful login, JWT (JSON Web Token) authentication is implemented to generate a secure token.
- The token is stored securely and used to authorize protected routes and dashboard access.

<img width="1744" height="1006" alt="image" src="https://github.com/user-attachments/assets/f821c727-3b5f-4549-9dca-f9a8b1cf6134" />


<hr>

## 📊 ThinkX – Admin Dashboard 

<hr>

- After successful Admin login using JWT authentication, the user is redirected to the secure Admin Dashboard.
- The dashboard provides options to Create Quiz, View Rankings, and Manage Students from a centralized control panel.
- Admin can create and manage quiz questions, monitor student performance, and track overall rankings.
- All dashboard routes are protected using JWT-based authorization to ensure secure access.
- The page is developed using React.js components with role-based access control for Admin functionality.

<img width="1915" height="982" alt="image" src="https://github.com/user-attachments/assets/6d1da6ab-1a04-4448-875a-1b9ec035c8c0" />

<hr>

## 📝 ThinkX – Create Quiz Page

- The Create Quiz page allows the Admin to create new quizzes by adding a quiz title, selecting a subject, and entering multiple questions with options.
- Admin can mark the correct answer for each question and dynamically add more questions before submitting.
- On submission, the quiz data is sent to the backend (Node.js & Express.js) and stored in MongoDB for student access.
  
<img width="1919" height="1075" alt="image" src="https://github.com/user-attachments/assets/0d62489a-d9e2-468b-bfcf-4fad4fd42c1b" />

<hr>

## 📚 ThinkX – Available Quizzes Page

- The Available Quizzes page displays all created quizzes with details such as quiz title, subject, and creation date.
- Admin can view student performance by clicking the “View Rankings” button for each quiz.
- The quiz list is fetched dynamically from the backend (Node.js & Express.js) and stored in MongoDB, ensuring real-time data display.
  
<img width="1919" height="991" alt="image" src="https://github.com/user-attachments/assets/f331569e-c72c-4b11-913c-af9e6adc1120" />
<hr>

## 👨‍🎓 ThinkX – Students List Page

- The Students List page allows the Admin to view all registered students along with their name, email, joined date, and account status.
- The total number of students is displayed, and data is fetched dynamically from the backend using secure API endpoints.
- This page helps the Admin manage student accounts and monitor user activity within the system.
  
<img width="1919" height="990" alt="image" src="https://github.com/user-attachments/assets/83f8d0ff-e1e0-47be-b5df-69b6672c017a" />

<hr>
## 📬 ThinkX – Contact Messages (Admin Panel)

- The Contact Messages page allows the Admin to view all messages submitted by users through the Contact Us form.
- It displays user details such as full name, email, phone number, message content, and submission date.
- Admin can manage messages efficiently, including deleting resolved or unwanted queries through secure backend API .
  
  <img width="1919" height="1022" alt="image" src="https://github.com/user-attachments/assets/4fc5d527-ab03-44a4-b5d7-4d32c948ce76" />

<hr>

## 🎯 ThinkX – User Quiz Home Page

<hr>

- After successful login using JWT authentication, the user is redirected to the User Quiz Home page.
- This page is accessible only to authenticated users, ensuring secure access to quiz features.
- It displays a welcome message and provides a simple interface to start the quiz.
- The “Start Quiz” button allows users to begin attempting available quizzes.
- Users can log out securely using the Logout option, which clears the authentication token.

<img width="1917" height="1073" alt="image" src="https://github.com/user-attachments/assets/1a7ef0eb-9b61-462e-9911-926a624d93a5" />

<hr> 

## 📝 ThinkX – User Available Quizzes Page

- After login, users can view all available quizzes categorized by subject and title.
- Each quiz card displays quiz name, subject, and basic details fetched dynamically from the backend.
- Users can start any quiz by clicking the “Start Quiz” button.
- Quiz data is retrieved using secure API calls built with Node.js and Express.js.
- This page ensures only authenticated users (via JWT) can access and attempt quizzes.
- 
  <img width="1919" height="1092" alt="image" src="https://github.com/user-attachments/assets/b01eefe3-4baf-416f-9ef0-0a5439966b02" />

<hr> 

## 🧠 ThinkX – Start Quiz Page

- When the user clicks “Start Quiz”, the selected quiz questions are loaded dynamically from the backend.
- Each question displays multiple options, and the user can select one answer at a time.
- Navigation buttons like “Previous” and “Next” allow users to move between questions smoothly.
- The quiz is accessible only to logged-in users through JWT-based authentication.
- User responses are captured and sent to the backend for score calculation and result processing.

  <img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/888df66a-c1dd-4ecc-987e-1c0f39a70e16" />
  
<hr> 
## 📊 ThinkX – Quiz Result Page

- After completing the quiz, the system calculates the score and displays the total percentage along with correct answers.
- Each question is shown with the correct option highlighted for better understanding and review.
- The result is generated based on user responses stored and evaluated through backend logic (Node.js & Express.js).
- This page helps users analyze their performance and understand their mistakes instantly.
- Users can navigate back to the dashboard to attempt more quizzes or view other options.

<img width="1577" height="1088" alt="image" src="https://github.com/user-attachments/assets/ace6d70c-de1a-4295-b827-7a917c682297" />

<hr> 

<hr>

## 🚀 ThinkX – Complete Application Flow (MERN Stack)

1. ThinkX is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) for building a scalable and modern quiz platform.

2. The frontend is built using React.js with reusable components, React Router for navigation, Formik for form handling, and proper client-side validation.

3. Users and Admin can register and log in through secure authentication APIs developed using Node.js and Express.js.

4. JWT (JSON Web Token) authentication is implemented to generate secure tokens after login, enabling protected routes and role-based access control.

5. Passwords are securely stored in the database (MongoDB/MySQL) using encryption (e.g., bcrypt hashing) to ensure data security.

6. After Admin login, the Admin Dashboard allows quiz creation, question management, student monitoring, ranking analysis, and contact message management.

7. Quiz creation includes dynamic question addition, correct answer marking, and subject management, with all data stored in the database.

8. After User login, users can view available quizzes, attempt questions, navigate between them, and submit responses securely.

9. The backend processes user answers, calculates scores, stores results, and displays detailed quiz results with performance feedback.

10. The entire system ensures secure API communication, role-based authorization (Admin/User), database integration, and responsive UI design for a complete end-to-end quiz management solution.

<hr> 
<hr>

