<template>
  <div id="firepad-container"></div>
</template>

<script>
import firebase from "firebase";
import CodeMirror from "codemirror";
import Firepad from "firepad";

export default {
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  }),

  mounted: async function() {
    console.log("I am mounted");
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: "AIzaSyBwqOfZ7NsVybtcK_w0r9FJ1HynkdNezH8",
      authDomain: "https://tooio-89793.firebaseio.com/",
      databaseURL: "https://tooio-89793.firebaseio.com/"
    };
    firebase.initializeApp(config);

    //// Get Firebase Database reference.
    var firepadRef = getExampleRef();

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById("firepad-container"), {
      lineWrapping: true
    });
    console.log(codeMirror);
    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      richTextShortcuts: true
    });

    //// Initialize contents.
    firepad.on("ready", function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml(
          '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n'
        );
      }
    });

    // Helper to get hash from end of URL or generate a random one.
    function getExampleRef() {
      var ref = firebase.database().ref();
      var hash = window.location.hash.replace(/#/g, "");
      if (hash) {
        ref = ref.child(hash);
      } else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + "#" + ref.key; // add it as a hash to the URL.
      }
      if (typeof console !== "undefined") {
        console.log("Firebase data: ", ref.toString());
      }
      return ref;
    }
  }
};
</script>

 