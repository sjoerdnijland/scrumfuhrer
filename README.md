Webstores Scrumführer
=====================

A simple, but fun dashboard with notifications based on 'Webstores insights' metrics.

**This version uses Webpack, Sass, Symfony 4 and React JS.**

-**Note**: The use of Symfony is optional and only setup as a skeleton in case you'd want to do some back-end magic. 

-**Note**: The dasboard by default calls data from the Webstores insights tool, to which access is restricted. 


How to run it
=============

First create a new Symfony project.

     composer create-project symfony/website-skeleton scrumfuhrer

Install React and Babel

    yarn add --dev babel-preset-react
    yarn add react react-dom prop-types

Install Sass
    
    npm install -g sass

Install Webfontloader
    
    npm install webfontloader


-**webpack**: For convenience, I've added an example of the Webpack config file.

-**htaccess**: For Symfony to run properly with docker, you might need to configure your .htaccess

```
# Bestanden en directories beschermen
<FilesMatch "\.(htaccess|log|php|twig|yml)$|^\..*$">
  Order Allow,Deny
  Deny from all
</FilesMatch>
<FilesMatch "index\.php$">
  Order Allow,Deny
  Allow from all
</FilesMatch>
# Inhoud van directories niet tonen.
Options -Indexes

# Volg symbolic links in deze directory.
Options +FollowSymLinks

# Alle 404 errors afhandelen door WM
ErrorDocument 404 /public/index.php

# Forceer eenvoudige foutmelding voor requests naar niet bestaande favicon.ico
<Files favicon.ico>
  ErrorDocument 404 "Het opgevraagde bestand favicon.ico werd niet gevonden."
</Files>

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Voorkomt toegang tot "verborgen" directories (beginnen met een punt).
  RewriteRule "(^|/)\." - [F]

  # Domein normaliseren, trailing . verwijderen
  RewriteCond %{HTTP_HOST} (.*)\.$ [NC]
  RewriteRule ^(.*)$ http://%1/$1 [L,R=301]

  # Stuurt alle requests door naar domein met 'www.' prefix. Dus:
  # http://webstores.nl/... wordt doorgestuurd naar http://www.webstores.nl/...
  # Subdomeinen worden uiteraard niet voorzien van 'www.'.
  RewriteCond %{HTTP_HOST} !^www\.[a-z0-9-]+\.[a-z]{2,6}$ [NC]
  RewriteCond %{HTTP_HOST} ^([a-z0-9-]+\.[a-z]{2,6})$ [NC]
  RewriteRule ^(.*)$ http://www.%1/$1 [L,R=301]

  # alle requests afhandelen in de public directory
  RewriteRule    ^$ public/    [L]
  RewriteRule    (.*) public/$1 [L]
</IfModule>
```

Now add/overwrite the following folders and their contents

    /asset
    /public
    /src
    /templates

Build React and Sass using Webpack.

    ./node_modules/.bin/encore dev --watch

Credits
=======

**Scrumführer** by *Sjoerd Nijland*.

Data provided by **Webstores Insights** by *Frank Klein Koerkamp* and *Ralf Overweg*.

**Icons** are collected from **Flaticon**.
