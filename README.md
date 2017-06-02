Test application
================

A simple express application to demonstrate how the library works.

    $ node index.js # start the app without coverage

    $ node index.js --coverage # start the app with coverage

    $ open http://localhost:8888/coverage # shows coverage info

    $ curl -o coverage.zip http://localhost:8888/coverage/download # gives you the zip file with reports

================

Difference with original version: Add coverage data collector for clients.

Steps to add this function:

* Add sending coverage data fucntion in `public/js/client.js`:

```
--- a/public/js/client.js
+++ b/public/js/client.js
@@ -5,4 +5,18 @@ $(function () {
         link.attr('href', '/authors/' + $(this).attr('id'));
         return link;
     });
-});
\ No newline at end of file
+});
+
+// post window.__coverage__ to server every 2 seconds
+setInterval(function() {
+    $.ajax({
+        url: "/coverage/client",
+        type: "POST",
+        data: JSON.stringify(window.__coverage__),
+        contentType: "application/json; charset=utf-8",
+        dataType:"json",
+        success: function(data) {
+            console.log("success!");
+        }
+    });
+}, 2000);
```

* Instrument js files

```
$ mv public public_without_coverage  # move client side js to another folder

$ nyc instrument public_without_coverage public  # instrument
```

* Update js files path in `server/index.js`

```
@@ -3,7 +3,7 @@ var path = require('path'),
     express = require('express'),
     url = require('url'),
     data = require('./data'),
-    publicDir = path.resolve(__dirname, '..', 'public'),
+    publicDir = path.resolve(__dirname, '..', 'public_without_coverage'),
     coverage = require('istanbul-middleware'),
     bodyParser = require('body-parser');
```

* Get coverage data

```

$ open http://localhost:8888 # Run the website

$ open http://localhost:8888/coverage # shows coverage info. public_without_coverage folder should exist in report after 2 seconds.
```