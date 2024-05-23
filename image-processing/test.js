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
        // input is base64 voor afbeelding van rode en groene pixel
        await handler({
            headers: {
                authorization: "Bearer my-serverless-secret"
            },
            body: "iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAD0lEQVR42mP6z8DA/l8YAAg1AhvhYAP3AAAAAElFTkSuQmCC"
        }, context);
        // verwachte output is base64 voor twee grijze pixels
        expect(context.data.trim()).to.equal("iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVR4AWM0MzP739zczAAADhYDLCgAyDMAAAAASUVORK5CYII=");
    })
})