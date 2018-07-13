'use strict'

const Tree = function (props) {
  this.ini(props)
}

Tree.prototype.ini = function (props) {
  this._id = -1
  this.root = this._makeNode(null, props)
}

Tree.prototype.add = function (parentId, props) {
  const node = this._makeNode(parentId, props)
  let parent = this._getNode(parentId)
  parent.children.push(node)
  return node.id
}

Tree.prototype.del = function (id) {
  if (id === 0) {
    throw new Error('You cannot delete the root.')
  }
  const parent = this._getParentNode(id)
  parent.children.forEach((_, i, arr) => {
    if (arr[i].id === id) {
      arr.splice(i, 1)
    }
  })
}

Tree.prototype.set = function (id, props) {
  const node = this._getNode(id)
  for (const prop in this._validateProps(props)) {
    node[prop] = props[prop]
  }
}

Tree.prototype.get = function (id, prop) {
  const node = this._getNode(id)
  return node[prop]
}

Tree.prototype.cup = function (callback, id) {
  const node = typeof id === 'undefined'
    ? this.root
    : this._getNode(id)
  const runner = (callback, node) => {
    callback(node)
    node.children.forEach(
      (_, i, arr) => runner(callback, arr[i])
    )
  }
  runner(callback, node)
}

Tree.prototype.cdn = function (callback, id) {
  const node = this._getNode(id)
  callback(node)
  if (node.id > 0) {
    this.cdn(callback, node.parentId)
  }
}

Tree.prototype._validateProps = function (props) {
  props = typeof props === 'undefined' ? {} : props
  if (typeof props !== 'object') {
    throw new Error("'Properties' must be an object.")
  }
  if ('id' in props) {
    throw new Error("'Properties' cannot contain the reserved 'id' key.")
  }
  if ('parentId' in props) {
    throw new Error("'Properties' cannot contain the reserved 'parentId' key.")
  }
  if ('children' in props) {
    throw new Error("'Properties' cannot contain the reserved 'children' key.")
  }
  return props
}

Tree.prototype._makeId = function () {
  this._id++
  return this._id
}

Tree.prototype._makeNode = function (parentId, props) {
  const node = {
    'id': this._makeId(),
    'parentId': parentId,
    'children': []
  }
  for (const prop in this._validateProps(props)) {
    node[prop] = props[prop]
  }
  return node
}

Tree.prototype._getNode = function (id) {
  const runner = (id, root) => {
    if (root.id === id) {
      return root
    } else {
      for (let i = 0; i < root.children.length; i++) {
        const node = runner(id, root.children[i])
        if (node) {
          return node
        }
      }
    }
  }
  const node = runner(id, this.root)
  if (!node) {
    throw new Error('Node with id ' + id + ' does not exist.')
  }
  return node
}

Tree.prototype._getParentNode = function (id) {
  const node = this._getNode(id)
  return this._getNode(node.parentId)
}

module.exports = Tree
