/*eslint strict: [2, "function"]*/

(function() {
    'use strict';

    /**
     * Blog functions
     */
    // Writing the slug
    $('#blogTitle').on('keyup', function() {
        $('#blogSlug').val($('#blogTitle').val(), 'slug');
    });

    // Adding a new ad
    $('#blogIncludeAd').on('click', function() {
        window.CKEDITOR.instances.content.insertHtml('[Ad:Sky]');
    });

    // Adding a new code
    $('#blogIncludeCode').on('click', function() {
        var filename = prompt('Enter the filename', 'script.js');
        var current = $('#blogCodes').val();
        var code;
        var extension;

        if (filename) {
            extension = filename.split('.').pop();

            code = '---' + extension + ':' + filename + '\n\n---\n\n';

            $('#blogCodes').val(current + code);

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
