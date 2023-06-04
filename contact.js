const firebaseConfig = {
    apiKey: "AIzaSyBS1iSSX8aqshvgQtV7BVXep8c5jQUILJI",
    authDomain: "school-f1a42.firebaseapp.com",
    databaseURL: "https://school-f1a42-default-rtdb.firebaseio.com",
    projectId: "school-f1a42",
    storageBucket: "school-f1a42.appspot.com",
    messagingSenderId: "73197735905",
    appId: "1:73197735905:web:5f0127716ea537e8950ca0"
  };

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
var db = firebase.firestore();

var contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit',function(e){
    e.preventDefault();

    var name = contactForm.name.value;
    var mob  = contactForm.mobile.value;
    var msg  = contactForm.message.value;

      
  // Validate form inputs
  if (!name || !mob || !msg) {
    showAlert('कृपया सभी फ़ील्ड भरें।');
    return;
  }

    if (mob.length !== 10 || isNaN(mob)) {
        showAlert('कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।', 'error');
        return;
      }

    // Validate mobile number (10 digits)
//   var mobileRegex = /^\d{10}$/;
//   if (!mobileRegex.test(mobile)) {
//     showAlert('कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।');
//     return;
//   }
 
  var db = firebase.firestore();

  db.collection('contacts').add({
    name:name,
    mobile:mob,
    message:msg,
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add timestamp field
  })
  .then(function(docRef){
    contactForm.reset();
    showAlert('आपका संदेश सफलतापूर्वक भेजा गया है!', 'success');
  })
  .catch(function(error) {
    showAlert('संदेश भेजते समय कुछ गड़बड़ हो गई है। कृपया पुनः प्रयास करें।', 'error');
    console.error('Error adding document: ', error);
  });
  // console.log(name,message,mobile);
});

// Function to show an alert message
function showAlert(message, type) {
  var alertDiv = document.getElementById('alertDiv');
  alertDiv.textContent = message;
  alertDiv.className = type;

  setTimeout(function() {
    alertDiv.textContent = '';
    alertDiv.className = '';
  }, 3000);
  }

