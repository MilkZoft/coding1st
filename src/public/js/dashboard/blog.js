(function() {
    'use strict';

    // Writing the slug
    $('#title').on('keyup', function() {
        $('#slug').val($('#title').val(), 'slug');
    });

    // Adding a new ad
    $('#include-ad').on('click', function() {
        window.CKEDITOR.instances.content.insertHtml('[Ad:Sky]');
    });

    // Adding a new code
    $('#include-code').on('click', function() {
        var filename = prompt('Enter the filename', 'script.js');
        var current = $('#codes').val();
        var code;
        var extension;

        if (filename) {
            extension = filename.split('.').pop();

            code = '---' + extension + ':' + filename + '\n\n---\n\n';

            $('#codes').val(current + code);

            window.CKEDITOR.instances.content.insertHtml('<p>{{' + filename + '}}</p>');
        }
    });

    // Getting multiple CKEditor instances
    $('.editor').each(function() {
        var config = {};

        if (this.id === 'excerpt') {
            config.height = '150px';
        }

        CKEDITOR.replace(this.id, config);
    });
}());
