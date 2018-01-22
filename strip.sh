#!/bin/sh

for f in `ls original`
do
	sips --resampleWidth 640 original/$f --out large/$f
done
