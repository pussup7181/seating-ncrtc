  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
  import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDEoGSXWsvHphRQQoWnKg7o9Q3T2eB9jZ4",
    authDomain: "indoornavigation-429fd.firebaseapp.com",
    databaseURL: "https://indoornavigation-429fd-default-rtdb.firebaseio.com",
    projectId: "indoornavigation-429fd",
    storageBucket: "indoornavigation-429fd.appspot.com",
    messagingSenderId: "825368707275",
    appId: "1:825368707275:web:fae0c6e24365e5f570db4e",
    measurementId: "G-WC3DBMNZS9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth();
  var nam = document.getElementById("name");
  var designation = document.getElementById("designation");
  var floor = document.getElementById("floor");
  var type = document.getElementById("type");
  var number = document.getElementById("number");
  
  var seatNumber;
  var button = document.getElementById("submit");

  function GetSeat(f,t,n){
    var seat = null;

  switch (f)
  {
      case "GROUND FLOOR":
          seat = "G";
          break;
      case "FIRST FLOOR":
          seat = "F";
          break;
      case "SECOND FLOOR":
          seat = "S";
          break;
  }

  switch (t)
  {
    case "Chamber":
          seat += "CH";
          break;
      case "Cabin":
          seat += "C";
          break;
      case "Enclosure":
          seat += "E";
          break;
      case "Workstation":
          seat += "W";
          break;
  }
  return seat + n;
  }

  function CheckData(){
    seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
    const dbref = ref(db);
    get(child(dbref, "SeatNumber/"+seatNumber)).then((snapshot)=>{
      if(snapshot.exists()){
        alert("Seat Taken");   
      }
      else{
        SaveData();
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  function SaveData(){
   seatNumber = GetSeat(floor.options[floor.selectedIndex].text, type.options[type.selectedIndex].text, number.value);
    set(ref(db, "SeatNumber/"+seatNumber),{
      name:nam.value,
      designation:designation.value,
      floor:floor.options[floor.selectedIndex].text,
      seatNumber:seatNumber
    })
    .then(()=>{
      alert("Data Successfully uploaded");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

