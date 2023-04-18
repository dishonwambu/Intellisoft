
Intellisoft  
Web development  
simple web application that will be used to register patients and capture some basic clinical details during each visit.  
It uses RESTful backend service that holds the information collected during Registration and visits, and generates patients' Report  
Database  
● MySQL >> localhost  
API  
● NodeJS, Java Bootspring  
Below is the Flow:  
step 1. upon entering Patients' Details on the Registration data which is held by a RESTful backend service.  
  
![registration](https://user-images.githubusercontent.com/48084263/232753856-9870e2b8-3486-4dba-a6a4-de9a89005cae.PNG)  
  
upon clicking ok >> Visits page is displayed.  
  
![visits](https://user-images.githubusercontent.com/48084263/232754450-a400da0e-ff90-40b3-af64-1937f69b8f22.PNG)
  
  Decision is made as per the BMI value : If the patient’s BMI (BMI = kg/m2) is less than 25,  
  the system should show Section A; otherwise, show Section B.  
    
  ![Section A](https://user-images.githubusercontent.com/48084263/232758411-8818d224-44d0-41b8-b6c6-fd34f4cf4bc2.PNG)  
    
  Otherwise When BMI is greater than 25 section B is shown.     
    
![section B](https://user-images.githubusercontent.com/48084263/232759008-13d33614-635a-4d13-9e1d-b62737b23d9f.PNG)
  
  Finally after saving the data, A report is generated.  
    
  ![Report](https://user-images.githubusercontent.com/48084263/232759167-cd09a5fa-dc99-4605-b3ae-6efa6395b001.PNG)
