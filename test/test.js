/* global describe, it */
'use strict'

const expect = require('chai').expect
const Tree = require('../index')

describe('#tree', () => {
  describe('#constructor()', () => {
    it('should initialize without properties', () => {
      const expected = '{"id":0,"parentId":null,"children":[]}'
      const tree = new Tree()
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should initialize with properties', () => {
      let expected = '{"id":0,"parentId":null,"children":[],'
      expected += '"friend":"jess","score":1}'
      const tree = new Tree({ 'friend': 'jess', 'score': 1 })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should re-initialize without properties', () => {
      const expected = '{"id":0,"parentId":null,"children":[]}'
      const tree = new Tree({ 'name': 'jill' })
      const id1 = tree.add(0)
      const id2 = tree.add(id1)
      tree.add(id2)
      tree.ini()
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should re-initialize with properties', () => {
      let expected = '{"id":0,"parentId":null,"children":[],'
      expected += '"friend":"jess","score":1}'
      const tree = new Tree({ 'name': 'jill' })
      const id1 = tree.add(0)
      const id2 = tree.add(id1)
      tree.add(id2)
      tree.ini({ 'friend': 'jess', 'score': 1 })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })

  describe('#_makeId()', () => {
    it('should make an id', () => {
      const tree = new Tree()
      expect(tree._makeId()).to.equal(1)
      expect(tree._makeId()).to.equal(2)
      expect(tree._makeId()).to.equal(3)
      expect(tree._makeId()).to.equal(4)
      expect(tree._makeId()).to.equal(5)
    })
  })

  describe('#_validateProps()', () => {
    it('should validate without properties', () => {
      const tree = new Tree()
      const result = tree._validateProps()
      expect(typeof result).to.equal('object')
    })

    it('should validate with properties', () => {
      const expected = '{"friend":"john"}'
      const tree = new Tree()
      let result = tree._validateProps({ 'friend': 'john' })
      expect(typeof result).to.equal('object')
      result = JSON.stringify(result)
      expect(result).to.equal(expected)
    })
  })

  describe('#_makeNode()', () => {
    it('should make a node without properties', () => {
      const expected = '{"id":1,"parentId":null,"children":[]}'
      const tree = new Tree()
      let result = tree._makeNode(null)
      result = JSON.stringify(result)
      expect(result).to.equal(expected)
    })

    it('should make a node with properties', () => {
      const expected = '{"id":1,"parentId":1,"children":[],"friend":"jess"}'
      const tree = new Tree()
      let result = tree._makeNode(1, { 'friend': 'jess' })
      result = JSON.stringify(result)
      expect(result).to.equal(expected)
    })
  })

  describe('#_getNode()', () => {
    it('should get a node', () => {
      let expected = '{"id":3,"parentId":0,"children":['
      expected += '{"id":4,"parentId":3,"children":[]},'
      expected += '{"id":5,"parentId":3,"children":[]}]}'
      const tree = new Tree()
      tree.add(0)
      tree.add(0)
      const id = tree.add(0)
      tree.add(id)
      tree.add(id)
      let result = tree._getNode(3)
      result = JSON.stringify(result)
      expect(result).to.equal(expected)
    })
  })

  describe('#_getParentNode()', () => {
    it('should get a parent node', () => {
      let expected = '{"id":3,"parentId":0,"children":['
      expected += '{"id":4,"parentId":3,"children":[]},'
      expected += '{"id":5,"parentId":3,"children":[]}]}'
      const tree = new Tree()
      tree.add(0)
      tree.add(0)
      const id = tree.add(0)
      tree.add(id)
      tree.add(id)
      let result = tree._getParentNode(4)
      result = JSON.stringify(result)
      expect(result).to.equal(expected)
    })
  })

  describe('#add()', () => {
    it('should add a child to the root without properties', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[]}]}'
      const tree = new Tree()
      tree.add(0)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should add a child to the root with properties', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],'
      expected += '"boss":"john","lover":"jill"}]}'
      const tree = new Tree()
      tree.add(0, { 'boss': 'john', 'lover': 'jill' })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should add children to the root without properties', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[]},'
      expected += '{"id":2,"parentId":0,"children":[]},'
      expected += '{"id":3,"parentId":0,"children":[]}]}'
      const tree = new Tree()
      tree.add(0)
      tree.add(0)
      tree.add(0)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should add children to the root with properties', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],"friend":"jess"},'
      expected += '{"id":2,"parentId":0,"children":[],"cousin":"john"},'
      expected += '{"id":3,"parentId":0,"children":[],"lover":"jenn"}]}'
      const tree = new Tree()
      tree.add(0, { 'friend': 'jess' })
      tree.add(0, { 'cousin': 'john' })
      tree.add(0, { 'lover': 'jenn' })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should add a child to a child with and without properties', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],"name":"jane"},'
      expected += '{"id":2,"parentId":0,"children":[]},'
      expected += '{"id":3,"parentId":0,"children":['
      expected += '{"id":4,"parentId":3,"children":['
      expected += '{"id":5,"parentId":4,"children":[],"name":"jade"}]}],'
      expected += '"name":"john"}]}'
      const tree = new Tree()
      tree.add(0, { 'name': 'jane' })
      tree.add(0)
      let id = tree.add(0, { 'name': 'john' })
      id = tree.add(id)
      tree.add(id, { 'name': 'jade' })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })

  describe('#del()', () => {
    it('should delete a node', () => {
      const expected = '{"id":0,"parentId":null,"children":[]}'
      const tree = new Tree()
      const id = tree.add(0)
      tree.del(id)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should delete a node and its children', () => {
      const expected = '{"id":0,"parentId":null,"children":[]}'
      const tree = new Tree()
      const id = tree.add(0)
      tree.add(id)
      tree.add(id)
      tree.del(id)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })

  describe('#set()', () => {
    it('should set one property value on the root', () => {
      const expected = '{"id":0,"parentId":null,"children":[],"score":100}'
      const tree = new Tree()
      tree.set(0, { 'score': 100 })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should set multiple properties values on the root', () => {
      let expected = '{"id":0,"parentId":null,"children":[],'
      expected += '"score":100,"friend":"jess","cousin":"john"}'
      const tree = new Tree()
      tree.set(0, { 'score': 100, 'friend': 'jess', 'cousin': 'john' })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should set one property value on a node', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],"score":100}]}'
      const tree = new Tree()
      tree.add(0)
      tree.set(1, { 'score': 100 })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should set multiple properties values on a node', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],'
      expected += '"score":100,"friend":"jess","cousin":"john"}]}'
      const tree = new Tree()
      tree.add(0)
      tree.set(1, { 'score': 100, 'friend': 'jess', 'cousin': 'john' })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })

  describe('#get()', () => {
    it('should get a property value from the root', () => {
      const expected = 100
      const tree = new Tree({ 'score': 100 })
      const result = tree.get(0, 'score')
      expect(result).to.equal(expected)
    })

    it('should get an undefined property value from the root', () => {
      const expected = undefined
      const tree = new Tree()
      const result = tree.get(0, 'score')
      expect(result).to.equal(expected)
    })

    it('should get a property value from a node', () => {
      const expected = 100
      const tree = new Tree()
      const id = tree.add(0, { 'score': 100 })
      const result = tree.get(id, 'score')
      expect(result).to.equal(expected)
    })

    it('should get an undefined property value from a node', () => {
      const expected = undefined
      const tree = new Tree()
      const id = tree.add(0)
      const result = tree.get(id, 'score')
      expect(result).to.equal(expected)
    })
  })

  describe('#cup()', () => {
    it('should run a callback up throughout the tree', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[],"selected":true},'
      expected += '{"id":2,"parentId":0,"children":[],"selected":true},'
      expected += '{"id":3,"parentId":0,"children":['
      expected += '{"id":4,"parentId":3,"children":['
      expected += '{"id":5,"parentId":4,"children":['
      expected += '{"id":6,"parentId":5,"children":[],"selected":true},'
      expected += '{"id":7,"parentId":5,"children":[],"selected":true}],'
      expected += '"selected":true}],"selected":true}],"selected":true}],"selected":true}'
      const tree = new Tree()
      tree.add(0)
      tree.add(0)
      let id = tree.add(0)
      id = tree.add(id)
      id = tree.add(id)
      tree.add(id)
      tree.add(id)
      tree.cup((node) => {
        node.selected = true
      })
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })

    it('should run a callback up through part of the tree', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":[]},'
      expected += '{"id":2,"parentId":0,"children":[]},'
      expected += '{"id":3,"parentId":0,"children":['
      expected += '{"id":4,"parentId":3,"children":['
      expected += '{"id":5,"parentId":4,"children":['
      expected += '{"id":6,"parentId":5,"children":[],"selected":true},'
      expected += '{"id":7,"parentId":5,"children":[],"selected":true}],'
      expected += '"selected":true}],"selected":true}],"selected":true}]}'
      const tree = new Tree()
      tree.add(0)
      tree.add(0)
      let id = tree.add(0)
      id = tree.add(id)
      id = tree.add(id)
      tree.add(id)
      tree.add(id)
      tree.cup((node) => {
        node.selected = true
      }, 3)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })

  describe('#cdn()', () => {
    it('should run a callback down to root', () => {
      let expected = '{"id":0,"parentId":null,"children":['
      expected += '{"id":1,"parentId":0,"children":['
      expected += '{"id":2,"parentId":1,"children":['
      expected += '{"id":3,"parentId":2,"children":[]}],'
      expected += '"selected":true}],"selected":true}],"selected":true}'
      const tree = new Tree()
      let id = tree.add(0)
      id = tree.add(id)
      tree.add(id)
      tree.cdn((node) => {
        node.selected = true
      }, 2)
      const result = JSON.stringify(tree.root)
      expect(result).to.equal(expected)
    })
  })
})
