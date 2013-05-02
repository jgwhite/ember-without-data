# Ember Without Data (A Demo App)

This is a little app built to accompany a little post on using Ember-Data’s
conventions as a starting point for your own model layer.

[Ember Without Data](http://jgwhite.co.uk/2013/04/29/ember-without-data.html)

Note that this app contains some concessions and compromises to working
with a CSV data source. The post describes a more abstract and idealised
scenario.

---

### A Quick Question for Ember’s Core Team

In this app, I iterate over each object in the response data then
have to explicity define the properites I want to set on the model.
Ideally, I’d like to just call `model.setProperties(object)`, but
that seems to blow up because of the assorted functions defined as
properties of the object.

Is it possible to add something like `Ember.Object#toDumbObject`
but with a better name?

---

Questions? Comments? Yes please: http://twitter.com/jgwhite
