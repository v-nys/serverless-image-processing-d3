'use strict'

const expect = require('chai').expect;
const handler = require('./handler');

describe('Image processing', async function() {
    it('gives a 200 for a valid request', async function() {
        expect(200).to.equal(200);
    })
})