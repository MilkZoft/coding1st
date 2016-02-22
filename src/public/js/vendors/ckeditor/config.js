/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbar = [
		{ name:'group1', items:['Bold','Italic','Underline','StrikeThrough','PasteFromWord'] },
        { name:'group2', items:['Format'] },
        { name:'group3', items:['Outdent','Indent','NumberedList','BulletedList','Blockquote','PageBreak'] },
        { name:'group4', items:['Image','Link','Unlink','Source'] }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

    config.skin = 'office2013';
    config.width = '91%';
    config.height = '400px';
};

CKEDITOR.config.extraPlugins = 'codemirror,pagebreak';
