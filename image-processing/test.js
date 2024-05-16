'use strict'

const expect = require('chai').expect;
const handler = require('./handler');

describe('Image processing', async function() {
    it('returns the original input', async function() {
        const context = {
            stored_status: undefined,
            data: undefined,
            status: function (value) {
                this.stored_status = value;
                return this;
            },
            succeed: function(value) {
                this.data = value;
            }
        };
        await handler({body: "ABCD"}, context);
        expect(context.data.trim()).to.equal("ABCD");
    })
})