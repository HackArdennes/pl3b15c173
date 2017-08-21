var id = require('pow-mongodb-fixtures').createObjectId;

exports.candidates = [
    {
        _id: id('599adf504c10a70a48fd8d07'),
        name: 'Candidate #1',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sequi asperiores voluptate inventore culpa dolores nostrum consequuntur autem. Perspiciatis dolor nisi alias dolore autem! A sequi consequuntur eveniet sapiente accusamus.',
        votes: [
            {
                "_id" : id('599b4992706ce02f338a8fca'),
                "canonicalEmail" : "voter1@domain.tld",
                "email" : "voter.1@domain.tld",
                "token" : "b1837798247538736e34749b6e448086",
                "isConfirmed" : false
            },
            {
                "_id" : id('599b4a71588a852f9db69e95'),
                "canonicalEmail" : "voter2@domain.tld",
                "email" : "voter.2@domain.tld",
                "token" : "5f4a92e7b22aec6cbbb9ad22f5cda77f",
                "isConfirmed" : true
            },
            {
                "_id" : id('599b4abd588a852f9db69e96'),
                "canonicalEmail" : "voter2@domain.tld",
                "email" : "voter.2@domain.tld",
                "token" : "3e6f55d4787b1c54c525302570ca87f8",
                "isConfirmed" : false
            }
        ]
    },
    {
        _id: id('599adf504c10a70a48fd8d08'),
        name: 'Candidate #2',
        description: 'Donec finibus, magna a semper dapibus, nisi nibh suscipit enim, quis pharetra nisi mauris a ligula.',
        votes: [
            {
                "_id" : id('599b5619925a5a4d1b02d73f'),
                "canonicalEmail" : "voter1@domain.tld",
                "email" : "voter.1@domain.tld",
                "token" : "526dedb583bd62ff36774044c1852e3e",
                "isConfirmed" : false
            },
            {
                "_id" : id('599b563e925a5a4d1b02d740'),
                "canonicalEmail" : "voter4@domain.tld",
                "email" : "voter.4@domain.tld",
                "token" : "eb7ef499c197e95b0e47fd5860cdc2ae",
                "isConfirmed" : false
            }
        ]
    },
    {
        _id: id('599adf504c10a70a48fd8d09'),
        name: 'Candidate #3',
        description: 'Morbi rhoncus pretium vulputate. In hac habitasse platea dictumst. Proin mattis consectetur nunc, ac hendrerit quam lobortis ac. Praesent eget felis eu dolor euismod tempor. Fusce in aliquet erat.'
    }
];
