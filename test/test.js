'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');
var raptorTemplates = require('raptor-templates');
var viewEngine = require('view-engine');
viewEngine.register('dust', require('view-engine-dust'));

var dust = require('dustjs-linkedin');

require('../dust').registerHelpers(dust);

function compare(outputFilename, actualHtml) {
    var actualHtmlPath = nodePath.join(__dirname, 'output/' + outputFilename + '.actual.html');
    var expectedHtmlPath = nodePath.join(__dirname, 'output/' + outputFilename + '.expected.html');

    var expectedHtml;

    try {
        expectedHtml = fs.readFileSync(expectedHtmlPath, 'utf8');
    } catch(e) {
        expectedHtml = 'TBD';
        fs.writeFileSync(expectedHtmlPath, expectedHtml, 'utf8');
    }

    fs.writeFileSync(actualHtmlPath, actualHtml, 'utf8');

    expect(expectedHtml).to.equal(actualHtml);
}

function testJavaScriptRender(component, data, outputFilename) {
    var renderResult = component(data);
    var actualHtml = renderResult.toString();
    compare(outputFilename, actualHtml);
}

function testTemplateRender(templatePath, outputFilename, done) {
    var ext = nodePath.extname(templatePath);
    templatePath = nodePath.join(__dirname, 'templates/' + templatePath);

    var template;

    if (ext === '.rhtml') {
        template = raptorTemplates.load(templatePath);
    } else if (ext === '.dust') {
        template = viewEngine.load(templatePath);
    } else {
        done(new Error('Invalid template extension for path: ' + templatePath));
        return;
    }

    template.render({}, function(err, actualHtml) {
        compare(outputFilename, actualHtml);
        done();
    });
    
}

describe('button/js' , function() {

    it('should correctly render a primary button rendered using JavaScript API', function() {
        testJavaScriptRender(require('../').button, {label: 'Primary', variant: 'primary'}, 'button-primary-js');
    });

    it('should correctly render a success button rendered using JavaScript API', function() {
        testJavaScriptRender(require('../').button, {label: 'Success', variant: 'success'}, 'button-success-js');
    });

});

describe('button/rhtml' , function() {

    it('should correctly render a primary button embedded in a Raptor template', function(done) {
        testTemplateRender('button-primary.rhtml', 'button-primary-rhtml', done);
    });

    it('should correctly render a success button embedded in a Raptor template', function(done) {
        testTemplateRender('button-success.rhtml', 'button-success-rhtml', done);
    });

});

describe('button/dust' , function() {

    it('should correctly render a primary button embedded in a Dust template', function(done) {
        testTemplateRender('button-primary.dust', 'button-primary-dust', done);
    });

    it('should correctly render a success button embedded in a Dust template', function(done) {
        testTemplateRender('button-success.dust', 'button-success-dust', done);
    });

});
