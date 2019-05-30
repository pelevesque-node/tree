[![Build Status](https://travis-ci.org/pelevesque/tree.svg?branch=master)](https://travis-ci.org/pelevesque/tree)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/tree/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/tree?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# tree

Creates an editable JSON tree structure.

## Node Repository

https://www.npmjs.com/package/@pelevesque/tree

## Installation

`npm install @pelevesque/tree`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Methods

- `ini` reinitialize
- `add` adds a node
- `del` deletes a node
- `set` sets custom properties on a node
- `get` gets a custom property from a node
- `cup` runs a callback up the tree
- `cdn` runs a callback down the tree

## Usage

### Introduction

Every node in a tree has three properties: `id`, `parentId`, and `children`.
`ids` and `parentIds` are generated and handled automatically.
They are reserved properties. `children` is an array of child nodes.
You can also add your own custom properties to nodes.

Below is an example of a node without children:

```js
{
    "id"       : 23,
    "parentId" : 12,
    "children" : []
}
```

### Initialization

When initializing a tree, a `root` node will be created. It has an `id = 0`
and a `parentId = null`. You can also add custom properties upon initialization.

format: `new Tree(props)`

```js
// initialize without custom properties
const tree = new Tree()

// creates this tree (just a root)
{
    "id"       : 0,
    "parentId" : null,
    "children" : []
}
```

```js
// initialize with custom properties
const tree = new Tree({
    "enemy" : "jack",
    "lover" : "jill"
})

// creates this tree (just a root)
{
   "id"       : 0,
   "parentId" : null,
   "children" : [],
   "enemy"    : "jack",
   "lover"    : "jill"
}
```

### Reinitialization

You can reinitialize the tree with the ini method.

format: `tree.ini(props)`

```js
// these are the same
const tree = new Tree()

tree.ini()
```

```js
// these are the same
const tree = new Tree({
    "enemy" : "jack",
    "lover" : "jill"
})

tree.ini({
    "enemy" : "jack",
    "lover" : "jill"
})
```

### Adding Nodes

To add a node, you must provide a `parentId` indicating where to add it.
Providing custom properties is optional. The `id` of the newly added node
is returned so that it can be used to add children.

format: `const id = tree.add(parentId, props)`

```js
// add an empty node to the root
const id = tree.add(0)

// add an empty node on parentId 3
const id = tree.add(3)

// add a node with a custom property on parentId 5
const id = tree.add(5, {"boss" : "jess"})
```

### Deleting Nodes

To delete a node and all its children, you simply need to provide the node's `id`.

format: `tree.del(id)`

```js
// delete node 5 and all its children
tree.del(5)

```

### Setting Node Custom Properties

To set a node's custom properties, you must provide the node's `id` and one or
many custom properties.

format: `tree.set(id, props)`

```js
// set custom properties on node 6
tree.set(6, {"game" : "juno", "score" : 13})
```

_Note: Setting custom properties does not overwrite previously set custom
properties that use other keys. Only values with the same keys are overwritten._

### Getting a Custom Property from a Node

To get a property value from a node, you must provide the node's `id`
and the property's name.

format: `const prop = tree.get(id, prop)`

```js
// get the value of the game property on node 6
const game = tree.get(6, "game")
```

### Running a Callback Up the Tree

`cup`, for callback + up, is used to run a callback upwards through the tree.
It starts on a node and propagates to all the descendants of that node.
If you don't provide a node `id` to start from, it will start from the
root and propagate throughout the entire tree.

format: `tree.cup(callback(node), id)`

```js
// run a callback on the entire tree
tree.cup(function(node) {
    node.selected = true
})

// run a callback from node id 11
tree.cup(function(node) {
    node.hovering = true
    if (node.selected) {
        node.score++
    }
}, 11)
```

### Running a Callback Down the Tree

`cdn`, for callback + down _(dn are the outer letters of down and up upside down)_,
is used to run a callback downwards through the tree. It starts on a node
and runs through all the ancestors until it reaches the root.
You must provide the node `id` to start from.

format: `tree.cdn(callback(node), id)`

```js
// run a callback from node 12 down to the root
tree.cdn(function(node) {
    node.selected = true
}, 12)
```

### Retrieving the Tree Object

You can retrieve the tree object using:

```js
tree.root
```

## Example

```js
const tree = new Tree()
const A = tree.add(0)
const B = tree.add(0)
const C = tree.add(0)
const D = tree.add(C, {"boss" : "john"})
tree.cup(function(node) {
    node.lover = "jess"
})
tree.set(A, {"friend" : "jill"})
tree.set(B, {"friend" : "jake"})
tree.cdn(function(node) {
    node.enemy = "joss"
}, C)
const enemy = tree.get(0, "enemy")
tree.del(3)
```
