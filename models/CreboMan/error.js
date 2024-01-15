// ErrObject is the schema of the resturning object after an operation failed.
// The returning object for errors has always the same struture.
// Eech operation (insert, update, delete and find) has its own catch block.
const ErrObject = {
    type: null,             // Type number, example 503, https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    errors: [               // Type array, more errors can be returned to the client.
        {
            code: null,     // Type string, example "NotNull"
            message: null,  // Type string, example "Password is to short.", 
            detail: null,   // Type string, detailed information for the user.
            source: null    // Type string, example "creboModel/Delete"
        }
    ]
}

module.exports = ErrObject;