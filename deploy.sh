#!/bin/sh


git add --all
git commit -m $1
echo $1
git push
git push heroku master
heroku open