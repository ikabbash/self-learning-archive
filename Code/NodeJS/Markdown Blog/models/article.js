// the database table
const mongoose = require('mongoose');
// to turn markdown into html
const marked = require('marked');
const slugify = require('slugify'); // turn long id into single name
// sanitiser so hackers don't put html malicious code into the markdown
// (dompurify and jsdom)
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// database already takes care of having unique id, but you can
// calculate it automatically this way
articleSchema.pre('validate', function(next) {
    if (this.title) {
        // if the title has special characters it's removed
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema);