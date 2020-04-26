<template>
  <div id="firepad-container"></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import CodeMirror from "codemirror";

export default {
  props: {
    documentHash: String
  },
  mounted: async function() {
    window.CodeMirror = CodeMirror;
    const Firepad = require("firepad");
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    var config = {
      apiKey: "AIzaSyBwqOfZ7NsVybtcK_w0r9FJ1HynkdNezH8",
      authDomain: "https://tooio-89793.firebaseio.com/",
      databaseURL: "https://tooio-89793.firebaseio.com/"
    };
    try {
      firebase.initializeApp(config);
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
    }

    //// Get Firebase Database reference.
    var ref = firebase.database().ref();
    var firepadRef = ref.child(this.documentHash);

    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById("firepad-container"), {
      lineWrapping: true
    });
    //// Create Firepad (with rich text toolbar and shortcuts enabled).
    Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      richTextShortcuts: true
    });
  }
};
</script>

<style scoped>
#firepad-container {
  width: 100%;
  height: 60vh;
}
@import url(https://firepad.io/releases/v1.5.9/firepad.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.css);
</style>

 